import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { enqueueMessage } from "@/lib/whatsapp";
import { syncLead } from "@/lib/mailchimp";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  source: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    const admin = createAdminClient();

    const { data: lead, error } = await admin.from("leads").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      source: data.source || "funnel",
    }).select().single();

    if (error) throw error;

    await enqueueMessage({
      recipientPhone: data.phone,
      recipientName: data.full_name,
      triggerType: "welcome",
    });

    await syncLead({ full_name: data.full_name, phone: data.phone, email: data.email });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 400 });
  }
}
