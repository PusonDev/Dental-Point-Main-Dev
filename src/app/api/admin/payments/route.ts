import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/auth-helpers";
import { z } from "zod";

export async function GET() {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("payments")
    .select("*, profiles(full_name, phone)")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ payments: data || [] });
}

const createSchema = z.object({
  patient_id: z.string().uuid(),
  visit_id: z.string().uuid().optional(),
  total_amount: z.number().positive(),
  paid_amount: z.number().min(0).default(0),
  payment_type: z.enum(["cash", "bkash", "nagad", "online", "other"]).optional(),
  transaction_id: z.string().optional(),
  payment_date: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const data = createSchema.parse(await request.json());
    const due = data.total_amount - data.paid_amount;
    const payment_status = due <= 0 ? "paid" : data.paid_amount > 0 ? "partial" : "due";

    const admin = createAdminClient();
    const { data: staff } = await admin
      .from("staff")
      .select("id")
      .eq("user_id", auth.user!.id)
      .single();

    const { data: payment, error } = await admin.from("payments").insert({
      patient_id: data.patient_id,
      visit_id: data.visit_id || null,
      total_amount: data.total_amount,
      paid_amount: data.paid_amount,
      due_amount: Math.max(0, due),
      payment_type: data.payment_type || null,
      payment_status,
      transaction_id: data.transaction_id || null,
      payment_date: data.payment_date || new Date().toISOString().slice(0, 10),
      notes: data.notes || null,
      recorded_by: staff?.id || null,
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ payment });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to record payment" }, { status: 400 });
  }
}
