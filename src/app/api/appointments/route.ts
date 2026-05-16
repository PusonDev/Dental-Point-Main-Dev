import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { enqueueMessage } from "@/lib/whatsapp";
import { z } from "zod";

const schema = z.object({
  patient_name: z.string().min(2),
  patient_phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  requested_date: z.string(),
  requested_time: z.string(),
  reason: z.string(),
  special_note: z.string().optional(),
});

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ appointments: [] });

  const { data } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", user.id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });
  return NextResponse.json({ appointments: data || [] });
}

export async function POST(request: Request) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json(
        { error: "Server configuration missing Supabase keys. Check SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL." },
        { status: 500 }
      );
    }
    const body = await request.json();
    const data = schema.parse(body);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user && user === null) {
      // Allow guest appointment booking, but log if auth retrieval fails unexpectedly.
    }
    const admin = createAdminClient();

    const { data: appt, error } = await admin.from("appointments").insert({
      patient_id: user?.id || null,
      patient_name: data.patient_name,
      patient_phone: data.patient_phone,
      requested_date: data.requested_date,
      requested_time: data.requested_time,
      reason: data.reason,
      special_note: data.special_note || null,
      status: "pending",
    }).select().single();

    if (error) throw error;

    await enqueueMessage({
      recipientPhone: data.patient_phone,
      recipientName: data.patient_name,
      triggerType: "reminder",
      patientId: user?.id,
      extra: { date: data.requested_date, time: data.requested_time },
    });

    return NextResponse.json({ success: true, id: appt.id });
  } catch (e) {
    console.error("Appointment creation error:", e);
    const message = e instanceof z.ZodError
      ? e.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join("; ")
      : e instanceof Error
      ? e.message
      : "Failed to book appointment";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
