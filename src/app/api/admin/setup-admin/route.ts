import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/admin/setup-admin
 * Creates the first admin staff user in Supabase.
 * IMPORTANT: Delete or disable this API route after first use!
 * 
 * Body: { email, password, secret }
 * The secret must match CRON_SECRET env variable for security.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, full_name, secret } = body;

    // Basic security: require setup secret
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || secret !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized. Set CRON_SECRET in .env.local and pass it as 'secret'." }, { status: 401 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Create auth user
    const { data: userData, error: userErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: full_name || "Admin" },
    });

    if (userErr) {
      return NextResponse.json({ error: userErr.message }, { status: 400 });
    }

    const userId = userData.user.id;

    // Insert into staff table
    const { error: staffErr } = await admin.from("staff").upsert({
      user_id: userId,
      email,
      full_name: full_name || "Admin",
      role: "admin",
      is_active: true,
    });

    if (staffErr) {
      return NextResponse.json({ error: `User created but staff record failed: ${staffErr.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Admin user '${email}' created successfully. You can now login at /admin/login`,
      user_id: userId,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Setup failed" }, { status: 500 });
  }
}
