"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Layers,
  FileCheck,
  Sparkles,
  Bell,
  User,
  History,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview", icon: Compass },
    { href: "/dashboard/posts", label: "My Listings", icon: Layers },
    { href: "/dashboard/claims", label: "My Claims", icon: FileCheck },
    { href: "/dashboard/matches", label: "Possible Matches", icon: Sparkles },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
    { href: "/dashboard/profile", label: "Profile & Identity", icon: User },
    { href: "/dashboard/history", label: "Activity Log", icon: History },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white border-r border-brand-warm-border p-4 space-y-6">
      <div className="space-y-2">
        <Link href="/report/lost">
          <Button variant="outline" size="sm" className="w-full justify-start text-xs border-amber-300 text-amber-900 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-brand-amber mr-2" />
            Report Lost Item
          </Button>
        </Link>
        <Link href="/report/found">
          <Button variant="primary" size="sm" className="w-full justify-start text-xs">
            <PlusCircle className="h-3.5 w-3.5 mr-2" />
            Report Found Item
          </Button>
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
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? "bg-brand-navy text-white font-semibold shadow-xs"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-brand-amber" : "text-neutral-400"}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

