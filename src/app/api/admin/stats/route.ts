import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();
  const [patients, leads, appointments, payments, whatsapp] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    admin.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("payments").select("due_amount").eq("payment_status", "due"),
    admin.from("whatsapp_queue").select("id", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  const totalDue = (payments.data || []).reduce((s, p) => s + Number(p.due_amount || 0), 0);

  return NextResponse.json({
    patients: patients.count || 0,
    newLeads: leads.count || 0,
    pendingAppointments: appointments.count || 0,
    totalDue,
    pendingWhatsApp: whatsapp.count || 0,
  });
}
