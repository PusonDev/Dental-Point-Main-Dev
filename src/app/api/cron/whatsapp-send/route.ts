import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWhatsAppMessage, sendWhatsAppTemplate } from "@/lib/whatsapp";

export async function GET(request: Request) {
  // Simple protection: check for a cron secret if provided in env
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  
  if (process.env.CRON_SECRET) {
    if (searchParams.get('secret') !== process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = createAdminClient();

  // 1. Get pending messages from queue
  const { data: queue, error: fetchError } = await supabase
    .from("whatsapp_queue")
    .select("*")
    .eq("status", "pending")
    .limit(10);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const results = [];

  for (const msg of queue || []) {
    try {
      let sendResult;
      
      // Check if the message is a JSON template
      if (msg.message_body.trim().startsWith('{')) {
        try {
          const payload = JSON.parse(msg.message_body);
          if (payload.isTemplate) {
            sendResult = await sendWhatsAppTemplate({
              to: msg.recipient_phone,
              template: payload.template,
              variables: payload.variables,
            });
          } else {
            sendResult = await sendWhatsAppMessage(msg.recipient_phone, msg.message_body);
          }
        } catch (parseErr) {
          // If JSON parse fails, treat as standard message
          sendResult = await sendWhatsAppMessage(msg.recipient_phone, msg.message_body);
        }
      } else {
        // Fallback to standard session message
        sendResult = await sendWhatsAppMessage(msg.recipient_phone, msg.message_body);
      }

      if (sendResult.ok) {
        // 3. Update status to sent
        await supabase
          .from("whatsapp_queue")
          .update({ 
            status: "sent", 
            sent_at: new Date().toISOString() 
          })
          .eq("id", msg.id);
        results.push({ id: msg.id, status: "sent" });
      } else {
        // 4. Update status to rejected if API error
        await supabase
          .from("whatsapp_queue")
          .update({ 
            status: "rejected", 
            error_message: sendResult.error || "Unknown API error" 
          })
          .eq("id", msg.id);
        results.push({ id: msg.id, status: "failed", error: sendResult.error });
      }
    } catch (e) {
      console.error(`Failed to process message ${msg.id}:`, e);
      results.push({ id: msg.id, status: "error", error: String(e) });
    }
  }

  return NextResponse.json({ 
    success: true, 
    processed: results.length,
    details: results
  });
}
