"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserCheck,
  Users,
  Package,
  FileCheck2,
  AlertTriangle,
  Tags,
  BarChart3,
  History,
  ArrowLeft,
} from "lucide-react";
import { store } from "@/lib/store/demo-data";

export function AdminSidebar() {
  const pathname = usePathname();
  const stats = store.getPlatformStats();

  const links = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    {
      href: "/admin/memberships",
      label: "Membership Queue",
      icon: UserCheck,
      badge: stats.pendingMemberships > 0 ? stats.pendingMemberships : undefined,
    },
    { href: "/admin/users", label: "User Management", icon: Users },
    { href: "/admin/items", label: "Item Moderation", icon: Package },
    {
      href: "/admin/claims",
      label: "Claim Resolution",
      icon: FileCheck2,
      badge: stats.pendingClaims > 0 ? stats.pendingClaims : undefined,
    },
    {
      href: "/admin/reports",
      label: "Reported Content",
      icon: AlertTriangle,
      badge: stats.reportedPosts > 0 ? stats.reportedPosts : undefined,
    },
    { href: "/admin/categories", label: "Item Categories", icon: Tags },
    { href: "/admin/analytics", label: "Campus Analytics", icon: BarChart3 },
    { href: "/admin/audit-logs", label: "Audit & History", icon: History },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border-r border-brand-warm-border p-4 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <h2 className="text-sm font-bold text-brand-navy">PUST Proctor Center</h2>
          <p className="text-[11px] text-neutral-500">Administrative Oversight</p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs text-brand-forest hover:underline flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="h-3 w-3" /> User Mode
        </Link>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-brand-navy text-white font-semibold shadow-xs"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? "text-brand-amber" : "text-neutral-400"}`} />
                <span>{link.label}</span>
              </div>
              {link.badge !== undefined && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-brand-amber text-brand-navy" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

