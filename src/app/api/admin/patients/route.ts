import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/auth-helpers";
import { z } from "zod";

export async function GET(request: Request) {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  const admin = createAdminClient();
  let query = admin.from("profiles").select("*").order("created_at", { ascending: false }).limit(100);

  if (q) {
    query = query.or(`full_name.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ patients: data || [] });
}

const visitSchema = z.object({
  patient_id: z.string().uuid(),
  visit_date: z.string(),
  chief_complaint: z.string().optional(),
  treatment_done: z.string().optional(),
  doctor_notes: z.string().optional(),
  prescription: z.string().optional(),
  next_visit_date: z.string().optional(),
  next_visit_note: z.string().optional(),
});

export async function POST(request: Request) {
  const auth = await requireStaff();
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const body = await request.json();
    const data = visitSchema.parse(body);
    const admin = createAdminClient();

    const { data: staff } = await admin
      .from("staff")
      .select("id")
      .eq("user_id", auth.user!.id)
      .single();

    const { data: visit, error } = await admin.from("visits").insert({
      ...data,
      created_by: staff?.id || null,
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ visit });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create visit" }, { status: 400 });
  }
}
