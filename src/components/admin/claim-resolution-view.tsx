"use client";

import * as React from "react";
import Link from "next/link";
import { Claim } from "@/types";
import { ClaimStatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { resolveClaimAction } from "@/lib/api/claims";
import { CheckCircle2, XCircle, ShieldCheck, Clock, ExternalLink } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function ClaimResolutionView({ initialClaims }: { initialClaims: Claim[] }) {
  const [claims, setClaims] = React.useState(initialClaims);
  const [filter, setFilter] = React.useState<string>("all");
  const [adminNotesMap, setAdminNotesMap] = React.useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleResolve = async (claimId: string, status: "approved" | "rejected") => {
    setLoadingId(claimId);
    const notes = adminNotesMap[claimId] || "";

    try {
      const result = await resolveClaimAction(claimId, status, notes);
      if (result.success && result.claim) {
        setClaims((prev) =>
          prev.map((c) => (c.id === claimId ? result.claim! : c))
        );
      }
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = claims.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-2">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === tab
                ? "bg-brand-navy text-white shadow-xs"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {tab} ({claims.filter((c) => tab === "all" || c.status === tab).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<ShieldCheck className="h-6 w-6 text-neutral-400" />}
          title="No claims matching filter"
          description="There are currently no ownership claims under this category."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((claim) => (
            <div
              key={claim.id}
              className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Claim Ref #{claim.id} • Submitted {formatDate(claim.created_at)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mt-0.5">
                    Item: {claim.item?.title || "Item Listing"}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <ClaimStatusBadge status={claim.status} />
                  {claim.item && (
                    <Link href={`/items/${claim.item.id}`} target="_blank">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Item Post
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Claimant Information & Evidence Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Claimant Details */}
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 space-y-2">
                  <span className="font-bold text-neutral-800 block">Claimant Identity:</span>
                  <p><strong>Name:</strong> {claim.claimant?.full_name}</p>
                  <p><strong>University ID:</strong> {claim.claimant?.university_id}</p>
                  <p><strong>Department:</strong> {claim.claimant?.department || "PUST"}</p>
                  <p><strong>Contact Provided:</strong> {claim.contact_info}</p>
                </div>

                {/* Confidential Evidence */}
                <div className="md:col-span-2 p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                    <ShieldCheck className="h-4 w-4 text-brand-amber" />
                    <span>Confidential Ownership Evidence Submitted:</span>
                  </div>
                  <p className="text-neutral-700 whitespace-pre-line leading-relaxed">
                    {claim.evidence}
                  </p>
                </div>
              </div>

              {/* Proctor Decision Controls (if pending) */}
              {claim.status === "pending" ? (
                <div className="pt-3 border-t border-neutral-100 space-y-3">
                  <Textarea
                    placeholder="Enter administrative verification notes (e.g., 'Serial number matched', or reason for rejection)..."
                    rows={2}
                    value={adminNotesMap[claim.id] || ""}
                    onChange={(e) =>
                      setAdminNotesMap({ ...adminNotesMap, [claim.id]: e.target.value })
                    }
                    helperText="These notes will be recorded permanently in the audit trail and shared with the claimant."
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      isLoading={loadingId === claim.id}
                      onClick={() => handleResolve(claim.id, "rejected")}
                      className="text-rose-600 hover:bg-rose-50"
                    >
                      <XCircle className="h-4 w-4 mr-1.5" />
                      Reject Claim
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      isLoading={loadingId === claim.id}
                      onClick={() => handleResolve(claim.id, "approved")}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1.5" />
                      Authenticate & Approve Claim
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-neutral-50 text-xs text-neutral-600 border border-neutral-200/60">
                  <span className="font-semibold text-neutral-800">Proctor Decision Notes: </span>
                  {claim.admin_notes || "Decision rendered by university proctor."}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

