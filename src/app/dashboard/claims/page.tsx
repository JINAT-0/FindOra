import Link from "next/link";
import { FileCheck, ShieldCheck, Clock, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { store } from "@/lib/store/demo-data";
import { ClaimStatusBadge } from "@/components/ui/status-badge";
import { formatDate, formatDateTime } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default function MyClaimsPage() {
  const currentUser = store.getCurrentUser();
  const claims = store.getClaimsByClaimant(currentUser.id);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">My Ownership Claims</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Track the status of your claims submitted for items found on campus
        </p>
      </div>

      {claims.length === 0 ? (
        <EmptyState
          icon={<FileCheck className="h-6 w-6 text-neutral-400" />}
          title="No claims submitted"
          description="When you spot an item in the Found directory that belongs to you, submit an ownership claim to begin the verification process."
          action={
            <Link href="/items/found">
              <Button variant="primary" size="sm">
                Browse Found Items Directory
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Claim Ref #{claim.id} • Submitted {formatDate(claim.created_at)}
                  </span>
                  <h3 className="text-base font-bold text-brand-navy mt-0.5">
                    {claim.item?.title || "Item Listing"}
                  </h3>
                </div>
                <ClaimStatusBadge status={claim.status} />
              </div>

              {/* Submitted Evidence Details */}
              <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-200/60 space-y-2 text-xs">
                <span className="font-bold text-neutral-700 block">Your Confidential Evidence:</span>
                <p className="text-neutral-600 whitespace-pre-line leading-relaxed">
                  {claim.evidence}
                </p>
                <div className="pt-2 border-t border-neutral-200/60 flex items-center gap-2 text-neutral-500 text-[11px]">
                  <span className="font-medium">Registered Contact:</span>
                  <span>{claim.contact_info}</span>
                </div>
              </div>

              {/* Admin Decision Feedback */}
              {claim.status === "approved" && (
                <div className="rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-brand-forest" />
                    <span>Claim Verified & Approved by Proctor Office</span>
                  </div>
                  <p className="leading-relaxed">
                    {claim.admin_notes || "Your identity and submitted ownership details have been authenticated."}
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-700 pt-1">
                    Action: Please visit the PUST Security & Proctor Office (Academic Bldg 1, Room 108) with your Student/Staff ID to collect your item.
                  </p>
                </div>
              )}

              {claim.status === "rejected" && (
                <div className="rounded-xl bg-rose-50 p-4 border border-rose-200 text-xs text-rose-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-rose-800">
                    <XCircle className="h-4 w-4 text-rose-600" />
                    <span>Claim Could Not Be Authenticated</span>
                  </div>
                  <p className="leading-relaxed">
                    Reason: {claim.admin_notes || "Submitted details did not correspond with the verified physical item features."}
                  </p>
                </div>
              )}

              {claim.status === "pending" && (
                <div className="rounded-xl bg-amber-50 p-3.5 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Administrative review is in progress by university proctors.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                {claim.item && (
                  <Link href={`/items/${claim.item.id}`}>
                    <Button variant="outline" size="sm">
                      Inspect Item Post <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

