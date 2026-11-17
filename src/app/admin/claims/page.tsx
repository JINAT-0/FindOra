import { store } from "@/lib/store/demo-data";
import { ClaimResolutionView } from "@/components/admin/claim-resolution-view";

export default function AdminClaimsPage() {
  const claims = store.getClaims();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Ownership Claim Verification</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review confidential evidence, authenticate rightful ownership, and release items for collection
        </p>
      </div>

      <ClaimResolutionView initialClaims={claims} />
    </div>
  );
}

