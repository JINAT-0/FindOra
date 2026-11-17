import { store } from "@/lib/store/demo-data";
import { UserManagementTable } from "@/components/admin/user-management-table";

export default function AdminUsersPage() {
  const profiles = store.getProfiles();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">User Management</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review university members, enforce account status, and manage access roles
        </p>
      </div>

      <UserManagementTable initialProfiles={profiles} />
    </div>
  );
}

