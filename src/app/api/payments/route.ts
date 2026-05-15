import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("show_payment")
    .eq("id", user.id)
    .single();

  if (!profile?.show_payment) {
    return NextResponse.json({ payments: [], hidden: true });
  }

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("patient_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ payments: data || [] });
}
