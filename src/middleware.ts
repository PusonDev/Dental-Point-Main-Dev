import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  const isAdminLogin = path === "/admin/login";
  const isDashboard = path.startsWith("/dashboard");
  const isAdmin = path.startsWith("/admin") && !isAdminLogin;
  const isReceptionist = path.startsWith("/receptionist");
  const isProtected = isDashboard || isAdmin || isReceptionist;

  if (isAdminLogin) {
    if (user) {
      const { data: staff } = await supabase
        .from("staff")
        .select("role")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .single();
      if (staff?.role === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      if (staff?.role === "receptionist") {
        return NextResponse.redirect(new URL("/receptionist", request.url));
      }
    }
    return supabaseResponse;
  }

  if (!isProtected) return supabaseResponse;

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = isAdmin || isReceptionist ? "/admin/login" : "/auth/login";
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  if (isDashboard) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();
    if (!profile) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/signup";
      return NextResponse.redirect(url);
    }
  }

  if (isAdmin || isReceptionist) {
    const { data: staff } = await supabase
      .from("staff")
      .select("role")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

    if (!staff) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (isAdmin && staff.role !== "admin") {
      return NextResponse.redirect(new URL("/receptionist", request.url));
    }
    if (isReceptionist && staff.role !== "receptionist") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/receptionist/:path*",
  ],
};
