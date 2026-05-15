import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { StaffRole } from "@/types";

export async function getSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getStaffRole(userId: string): Promise<StaffRole | null> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("staff")
    .select("role")
    .eq("user_id", userId)
    .eq("is_active", true)
    .single();
  return data?.role as StaffRole | null;
}

export async function isPatient(userId: string): Promise<boolean> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .eq("is_active", true)
    .single();
  return !!data;
}

export async function requireStaff(role?: StaffRole) {
  const user = await getSession();
  if (!user) return { error: "Unauthorized", status: 401 as const, user: null, staffRole: null };
  const staffRole = await getStaffRole(user.id);
  if (!staffRole) return { error: "Forbidden", status: 403 as const, user, staffRole: null };
  if (role && staffRole !== role) return { error: "Forbidden", status: 403 as const, user, staffRole };
  return { error: null, status: 200 as const, user, staffRole };
}
