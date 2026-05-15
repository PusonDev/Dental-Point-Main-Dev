"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import BuiltBy from "@/components/layout/BuiltBy";
import { CLINIC_INFO } from "@/lib/clinic-info";

export type NavItem = { href: string; label: string; icon?: string };

interface DashboardShellProps {
  title: string;
  nav: NavItem[];
  children: React.ReactNode;
  roleLabel?: string;
}

export default function DashboardShell({
  title,
  nav,
  children,
  roleLabel,
}: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-light-bg flex flex-col md:flex-row">
      <aside className="bg-primary text-white w-full md:w-64 md:min-h-screen shrink-0">
        <div className="p-4 border-b border-white/20">
          <p className="font-bold text-sm">{CLINIC_INFO.name}</p>
          <p className="text-xs text-white/70">{title}</p>
          {roleLabel && <p className="text-xs text-accent mt-1">{roleLabel}</p>}
        </div>
        <nav className="p-3 flex md:flex-col gap-1 overflow-x-auto">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  active ? "bg-white text-primary font-semibold" : "text-white/90 hover:bg-white/10"
                }`}
              >
                {item.icon && <span className="mr-1">{item.icon}</span>}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 hidden md:block mt-auto">
          <button
            type="button"
            onClick={logout}
            className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between md:hidden">
          <span className="font-semibold text-primary text-sm">{title}</span>
          <button type="button" onClick={logout} className="text-sm text-gray-500">
            Logout
          </button>
        </header>
        <main className="flex-1 p-4 md:p-6 max-w-6xl w-full mx-auto">{children}</main>
        <BuiltBy />
      </div>
    </div>
  );
}
