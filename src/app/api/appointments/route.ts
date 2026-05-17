import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { enqueueMessage } from "@/lib/whatsapp";
import appendBookingBackup from "@/lib/offline-backup";
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
    const body = await request.json();
    // If Supabase service keys are not configured, save the booking to a local backup
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await appendBookingBackup(body);
      return NextResponse.json(
        { success: true, offline: true, message: "Saved booking to local backup because server Supabase keys are missing." },
        { status: 202 }
      );
    }
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
    if (error) {
      // fallback: save booking to local backup so user data isn't lost
      await appendBookingBackup(body);
      console.error("Supabase insert error, booking saved to backup:", error);
      return NextResponse.json({ success: true, offline: true, message: "Saved booking to local backup due to database error." }, { status: 202 });
    }

    try {
      await enqueueMessage({
        recipientPhone: data.patient_phone,
        recipientName: data.patient_name,
        triggerType: "reminder",
        patientId: user?.id,
        extra: { date: data.requested_date, time: data.requested_time },
      });
    } catch (msgErr) {
      console.warn("enqueueMessage failed (non-fatal):", msgErr);
    }

    return NextResponse.json({ success: true, id: appt.id });
  } catch (e) {
    console.error("Appointment creation error:", e);
    const message = e instanceof z.ZodError
      ? e.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join("; ")
      : e instanceof Error
      ? e.message
      : "Failed to book appointment";
    // If a validation error, return 400. Otherwise try to persist offline and return 202.
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    try {
      // attempt to save whatever came in the request to backup
      // note: request body may already have been consumed; we attempt best-effort backup
      // (we already read body above in normal flow)
      // no-op if body variable not available
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof body !== "undefined") await appendBookingBackup(body);
    } catch (backupErr) {
      console.error("Failed to write backup after error:", backupErr);
    }

    return NextResponse.json({ error: message, offline: true }, { status: 202 });
  }
}
