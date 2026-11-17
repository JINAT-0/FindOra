import { UserSidebar } from "@/components/layout/user-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col lg:flex-row bg-brand-warm">
      <UserSidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</div>
    </div>
  );
}
