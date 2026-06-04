import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const missingEnv = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const missingService = !process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (missingEnv) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message: "Missing Supabase public env vars.",
        missing: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"].filter(
          (key) => !process.env[key]
        ),
      },
      { status: 500 }
    );
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.from("appointments").select("id", { count: "exact", head: true }).limit(1);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          configured: !missingService,
          message: error.message,
          serviceRoleConfigured: !missingService,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      configured: true,
      serviceRoleConfigured: !missingService,
      message: "Supabase connection looks healthy.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: !missingService,
        message: error instanceof Error ? error.message : "Supabase health check failed",
      },
      { status: 500 }
    );
  }
}
