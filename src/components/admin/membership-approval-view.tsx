"use client";

import * as React from "react";
import { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { updateMemberStatusAction } from "@/lib/api/admin";
import { Check, X, ShieldAlert, UserCheck, Building2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function MembershipApprovalView({ initialProfiles }: { initialProfiles: Profile[] }) {
  const [profiles, setProfiles] = React.useState(initialProfiles);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleDecision = async (userId: string, decision: "approved" | "rejected") => {
    setLoadingId(userId);
    try {
      await updateMemberStatusAction(userId, decision);
      setProfiles((prev) => prev.filter((p) => p.id !== userId));
    } finally {
      setLoadingId(null);
    }
  };

  const pendingMembers = profiles.filter((p) => p.account_status === "pending");

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" />
        <div>
          <span className="font-bold block">Institutional Identity Verification Policy</span>
          <p className="mt-0.5 text-amber-800 leading-relaxed">
            Verify the applicant&apos;s Student ID or Employee ID against the official PUST student information system before approving. Once approved, the member receives immediate clearance to post items and file claims.
          </p>
        </div>
      </div>

      {pendingMembers.length === 0 ? (
        <EmptyState
          icon={<UserCheck className="h-6 w-6 text-emerald-600" />}
          title="All membership applications processed"
          description="There are currently no new registration requests pending verification in the Proctor queue."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border border-brand-warm-border bg-white p-5 shadow-card space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {member.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.avatar_url}
                      alt={member.full_name}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                      {member.full_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">{member.full_name}</h4>
                    <span className="text-[11px] font-semibold text-brand-navy capitalize px-1.5 py-0.5 rounded bg-brand-navy-subtle">
                      {member.member_type}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-neutral-400">
                  Applied {formatDate(member.created_at)}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-600 bg-neutral-50 p-3 rounded-lg border border-neutral-200/60">
                <p>
                  <strong>University ID:</strong> {member.university_id}
                </p>
                <p>
                  <strong>Email:</strong> {member.email}
                </p>
                <p>
                  <strong>Department:</strong> {member.department || "PUST"}
                </p>
                <p>
                  <strong>Phone:</strong> {member.phone_number || "Not provided"}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
                <Button
                  variant="outline"
                  size="sm"
                  isLoading={loadingId === member.id}
                  onClick={() => handleDecision(member.id, "rejected")}
                  className="text-rose-600 hover:bg-rose-50"
                >
                  <X className="h-3.5 w-3.5 mr-1" /> Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  isLoading={loadingId === member.id}
                  onClick={() => handleDecision(member.id, "approved")}
                >
                  <Check className="h-3.5 w-3.5 mr-1" /> Verify & Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
