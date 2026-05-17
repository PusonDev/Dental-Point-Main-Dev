import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/auth-helpers";

export async function GET() {
  const auth = await requireStaff("admin");
  if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const config = [
    {
      key: "NEXT_PUBLIC_SUPABASE_URL",
      label: "Supabase Project URL",
      configured: !!process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("[your-"),
      isPublic: true,
    },
    {
      key: "SUPABASE_SERVICE_ROLE_KEY",
      label: "Supabase Service Role Key",
      configured: !!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.startsWith("sb_secret_"),
      isPublic: false,
    },
    {
      key: "WHATSAPP_ACCESS_TOKEN",
      label: "WhatsApp Access Token",
      configured: !!process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_ACCESS_TOKEN.length > 20,
      isPublic: false,
    },
    {
      key: "WHATSAPP_PHONE_NUMBER_ID",
      label: "WhatsApp Phone Number ID",
      configured: !!process.env.WHATSAPP_PHONE_NUMBER_ID,
      isPublic: false,
    },
    {
      key: "MAILCHIMP_API_KEY",
      label: "Mailchimp API Key",
      configured: !!process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_API_KEY.includes("-"),
      isPublic: false,
    },
  ];

  return NextResponse.json({ config });
}
