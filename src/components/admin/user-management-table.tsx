"use client";

import * as React from "react";
import { Profile, AccountStatus, UserRole } from "@/types";
import { AccountStatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { updateMemberStatusAction } from "@/lib/api/admin";
import { Check, X, Ban, ShieldCheck } from "lucide-react";

export function UserManagementTable({ initialProfiles }: { initialProfiles: Profile[] }) {
  const [profiles, setProfiles] = React.useState(initialProfiles);
  const [filter, setFilter] = React.useState<string>("all");
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleUpdateStatus = async (userId: string, newStatus: AccountStatus) => {
    setLoadingId(userId);
    try {
      await updateMemberStatusAction(userId, newStatus);
      setProfiles((prev) =>
        prev.map((p) => (p.id === userId ? { ...p, account_status: newStatus } : p))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const filtered = profiles.filter((p) => {
    if (filter === "all") return true;
    return p.account_status === filter;
  });

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "approved", "pending", "suspended", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filter === tab
                ? "bg-brand-navy text-white shadow-xs"
                : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {tab} ({profiles.filter((p) => tab === "all" || p.account_status === tab).length})
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-brand-warm-border bg-white shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">University ID</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Role / Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Registered</th>
                <th className="px-4 py-3 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((profile) => (
                <tr key={profile.id} className="hover:bg-neutral-50/70">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      {profile.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={profile.avatar_url}
                          alt={profile.full_name}
                          className="h-7 w-7 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-lg bg-brand-navy text-white flex items-center justify-center font-bold text-xs">
                          {profile.full_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-neutral-900">{profile.full_name}</p>
                        <p className="text-[10px] text-neutral-400">{profile.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-800">{profile.university_id}</td>
                  <td className="px-4 py-3 text-neutral-600">{profile.department || "PUST"}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-neutral-700 capitalize">
                      {profile.role === "admin" ? "Administrator" : profile.member_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <AccountStatusBadge status={profile.account_status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{formatDate(profile.created_at)}</td>
                  <td className="px-4 py-3 text-right space-x-1.5">
                    {profile.account_status !== "approved" && (
                      <Button
                        variant="primary"
                        size="sm"
                        isLoading={loadingId === profile.id}
                        onClick={() => handleUpdateStatus(profile.id, "approved")}
                        className="text-[11px] py-1 px-2.5"
                      >
                        <Check className="h-3 w-3 mr-1" /> Approve
                      </Button>
                    )}
                    {profile.account_status !== "suspended" && profile.role !== "admin" && (
                      <Button
                        variant="outline"
                        size="sm"
                        isLoading={loadingId === profile.id}
                        onClick={() => handleUpdateStatus(profile.id, "suspended")}
                        className="text-[11px] py-1 px-2 text-rose-600 hover:bg-rose-50"
                      >
                        <Ban className="h-3 w-3 mr-1" /> Suspend
                      </Button>
                    )}
                    {profile.account_status === "suspended" && (
                      <Button
                        variant="outline"
                        size="sm"
                        isLoading={loadingId === profile.id}
                        onClick={() => handleUpdateStatus(profile.id, "approved")}
                        className="text-[11px] py-1 px-2"
                      >
                        Unsuspend
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
