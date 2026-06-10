import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/auth-helpers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireStaff();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();
  const { id } = await params;

  const [profile, visits, reports, payments, appointments] = await Promise.all([
    admin.from("profiles").select("*").eq("id", id).single(),
    admin.from("visits").select("*").eq("patient_id", id).order("visit_date", { ascending: false }),
    admin.from("reports").select("*").eq("patient_id", id).order("uploaded_at", { ascending: false }),
    admin.from("payments").select("*").eq("patient_id", id).order("created_at", { ascending: false }),
    admin.from("appointments").select("*").eq("patient_id", id).order("requested_date", { ascending: false }),
  ]);

  if (profile.error) {
    return NextResponse.json({ error: profile.error.message }, { status: 404 });
  }

  return NextResponse.json({
    profile: profile.data,
    visits: visits.data || [],
    reports: reports.data || [],
    payments: payments.data || [],
    appointments: appointments.data || [],
  });
}
