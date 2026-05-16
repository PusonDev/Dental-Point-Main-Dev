import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireStaff } from "@/lib/auth-helpers";
import { z } from "zod";

export async function GET() {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("leads")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ leads: data || [] });
}

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "converted", "lost"]).optional(),
  notes: z.string().optional(),
});

export async function PATCH(request: Request) {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { id, ...updates } = patchSchema.parse(await request.json());
    const admin = createAdminClient();
    const { data, error } = await admin.from("leads").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return NextResponse.json({ lead: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}
