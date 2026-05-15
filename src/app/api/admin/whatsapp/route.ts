import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/auth-helpers";
import { sendWhatsAppMessage } from "@/lib/whatsapp";
import { z } from "zod";

export async function GET() {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("whatsapp_queue")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ queue: data || [] });
}

const actionSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["approve", "reject", "send"]),
});

export async function PATCH(request: Request) {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id, action } = actionSchema.parse(await request.json());
    const admin = createAdminClient();

    const { data: staff } = await admin
      .from("staff")
      .select("id")
      .eq("user_id", auth.user!.id)
      .single();

    if (action === "approve") {
      const { data, error } = await admin
        .from("whatsapp_queue")
        .update({
          status: "approved",
          approved_by: staff?.id,
          approved_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ item: data });
    }

    if (action === "reject") {
      const { data, error } = await admin
        .from("whatsapp_queue")
        .update({ status: "rejected" })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return NextResponse.json({ item: data });
    }

    const { data: item } = await admin.from("whatsapp_queue").select("*").eq("id", id).single();
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const result = await sendWhatsAppMessage(item.recipient_phone, item.message_body);
    const { data, error } = await admin
      .from("whatsapp_queue")
      .update({
        status: result.ok ? "sent" : "approved",
        sent_at: result.ok ? new Date().toISOString() : null,
        error_message: result.error || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ item: data, sendResult: result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Action failed" }, { status: 400 });
  }
}
