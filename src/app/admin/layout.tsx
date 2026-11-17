import { store } from "@/lib/store/demo-data";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = store.getCurrentUser();
  const isAdmin = currentUser.role === "admin";

  if (!isAdmin) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-brand-warm">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white border border-rose-200 shadow-card space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-neutral-900">Restricted Administration Area</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            You are signed in as <strong>{currentUser.full_name}</strong> ({currentUser.member_type}). Only authorized PUST Proctor and System Administrators have permission to access this portal.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Return to Member Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-brand-warm">
      <AdminSidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</div>
    </div>
  );
}

