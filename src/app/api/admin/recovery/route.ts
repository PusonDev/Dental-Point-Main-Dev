import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/auth-helpers";
import { z } from "zod";

const payloadSchema = z.object({
  table: z.enum(["profiles", "leads", "appointments", "payments"]),
  id: z.string().uuid(),
  action: z.enum(["delete", "restore"]),
});

export async function GET() {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();
  const [profiles, leads, appointments, payments] = await Promise.all([
    admin.from("profiles").select("*").eq("is_deleted", true).order("deleted_at", { ascending: false }).limit(100),
    admin.from("leads").select("*").eq("is_deleted", true).order("deleted_at", { ascending: false }).limit(100),
    admin.from("appointments").select("*").eq("is_deleted", true).order("deleted_at", { ascending: false }).limit(100),
    admin.from("payments").select("*").eq("is_deleted", true).order("deleted_at", { ascending: false }).limit(100),
  ]);

  return NextResponse.json({
    profiles: profiles.data || [],
    leads: leads.data || [],
    appointments: appointments.data || [],
    payments: payments.data || [],
  });
}

export async function PATCH(request: Request) {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { table, id, action } = payloadSchema.parse(await request.json());
    const admin = createAdminClient();
    const updates = action === "delete"
      ? { is_deleted: true, deleted_at: new Date().toISOString() }
      : { is_deleted: false, deleted_at: null };

    const { data, error } = await admin.from(table).update(updates).eq("id", id).select().single();
    if (error) throw error;

    return NextResponse.json({ item: data });
  } catch (e) {
    console.error("Recovery action failed:", e);
    return NextResponse.json({ error: "Recovery action failed" }, { status: 400 });
  }
}
