import { store } from "@/lib/store/demo-data";
import { MembershipApprovalView } from "@/components/admin/membership-approval-view";

export default function AdminMembershipsPage() {
  const profiles = store.getProfiles();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Membership Verification Queue</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review new student, faculty, and staff registration requests to grant institutional access
        </p>
      </div>

      <MembershipApprovalView initialProfiles={profiles} />
    </div>
  );
}

