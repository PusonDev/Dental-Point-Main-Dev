import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateVisitHistoryPdf } from "@/lib/pdf";
import type { Profile, Visit } from "@/types";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

  const { data: visits } = await supabase
    .from("visits")
    .select("*")
    .eq("patient_id", user.id)
    .order("visit_date", { ascending: false });

  const blob = await generateVisitHistoryPdf(profile as Profile, (visits || []) as Visit[]);
  const buffer = Buffer.from(await blob.arrayBuffer());

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="visit-history-${profile.full_name.replace(/\s+/g, "-")}.pdf"`,
    },
  });
}
