import Link from "next/link";
import {
  Users,
  UserCheck,
  Package,
  FileCheck2,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { store } from "@/lib/store/demo-data";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const stats = store.getPlatformStats();
  const pendingUsers = store.getProfiles().filter((p) => p.account_status === "pending");
  const pendingClaims = store.getClaims().filter((c) => c.status === "pending");
  const reports = store.getReports().filter((r) => r.status === "pending");

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy mb-1">
            <ShieldAlert className="h-4 w-4 text-brand-amber" />
            PUST Proctor Administration Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Institutional Operations Overview
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time management metrics, membership queue, and claim verifications
          </p>
        </div>
      </div>

      {/* Actual Database-Driven Metrics Grid (Section 17) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="p-4 rounded-xl border border-brand-warm-border bg-white shadow-card">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-xs font-semibold">Registered Users</span>
            <Users className="h-4 w-4 text-brand-navy" />
          </div>
          <p className="text-2xl font-bold text-brand-navy">{stats.totalUsers}</p>
          <span className="text-[10px] text-emerald-600 font-medium">
            {stats.approvedUsers} approved members
          </span>
        </div>

        {/* Pending Memberships */}
        <Link
          href="/admin/memberships"
          className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 shadow-card hover:bg-amber-50 transition-all"
        >
          <div className="flex items-center justify-between text-amber-800 mb-1.5">
            <span className="text-xs font-semibold">Pending Members</span>
            <UserCheck className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-900">{stats.pendingMemberships}</p>
          <span className="text-[10px] text-amber-700 font-medium">Requires identity check</span>
        </Link>

        {/* Pending Claims */}
        <Link
          href="/admin/claims"
          className="p-4 rounded-xl border border-brand-warm-border bg-white shadow-card hover:border-brand-forest transition-all"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-xs font-semibold">Pending Claims</span>
            <FileCheck2 className="h-4 w-4 text-brand-forest" />
          </div>
          <p className="text-2xl font-bold text-brand-forest">{stats.pendingClaims}</p>
          <span className="text-[10px] text-neutral-400 font-medium">Awaiting proctor review</span>
        </Link>

        {/* Reunited Items */}
        <div className="p-4 rounded-xl border border-brand-warm-border bg-white shadow-card">
          <div className="flex items-center justify-between text-neutral-500 mb-1.5">
            <span className="text-xs font-semibold">Reunited Items</span>
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-700">{stats.reunitedItems}</p>
          <span className="text-[10px] text-purple-600 font-medium">
            {stats.recoveryRate}% recovery efficiency
          </span>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-brand-warm-border bg-white">
          <span className="text-xs font-medium text-neutral-500">Active Lost Posts</span>
          <p className="text-xl font-bold text-amber-800 mt-1">{stats.totalLostPosts}</p>
        </div>
        <div className="p-4 rounded-xl border border-brand-warm-border bg-white">
          <span className="text-xs font-medium text-neutral-500">Active Found Logs</span>
          <p className="text-xl font-bold text-emerald-800 mt-1">{stats.totalFoundPosts}</p>
        </div>
        <Link
          href="/admin/reports"
          className="p-4 rounded-xl border border-brand-warm-border bg-white hover:border-rose-300"
        >
          <span className="text-xs font-medium text-neutral-500">Flagged Posts / Reports</span>
          <p className="text-xl font-bold text-rose-700 mt-1">{stats.reportedPosts}</p>
        </Link>
      </div>

      {/* Action Queues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue 1: Pending Membership Applications */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-brand-navy" />
              <h3 className="text-sm font-bold text-brand-navy">Pending Membership Queue</h3>
            </div>
            <Link
              href="/admin/memberships"
              className="text-xs font-semibold text-brand-forest hover:underline"
            >
              View All ({pendingUsers.length})
            </Link>
          </div>

          {pendingUsers.length === 0 ? (
            <p className="text-xs text-neutral-400 py-4 text-center">No pending membership requests.</p>
          ) : (
            <div className="space-y-3">
              {pendingUsers.slice(0, 3).map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-200/60 text-xs"
                >
                  <div>
                    <h5 className="font-bold text-neutral-900">{u.full_name}</h5>
                    <p className="text-[11px] text-neutral-500 capitalize">
                      {u.member_type} • ID: {u.university_id} • {u.department}
                    </p>
                  </div>
                  <Link href="/admin/memberships">
                    <Button variant="outline" size="sm" className="text-xs">
                      Review
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Queue 2: Pending Claims to Verify */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-brand-forest" />
              <h3 className="text-sm font-bold text-brand-navy">Ownership Claims Awaiting Review</h3>
            </div>
            <Link
              href="/admin/claims"
              className="text-xs font-semibold text-brand-forest hover:underline"
            >
              Review All ({pendingClaims.length})
            </Link>
          </div>

          {pendingClaims.length === 0 ? (
            <p className="text-xs text-neutral-400 py-4 text-center">No pending claims awaiting decision.</p>
          ) : (
            <div className="space-y-3">
              {pendingClaims.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-neutral-200/60 text-xs"
                >
                  <div className="max-w-xs">
                    <h5 className="font-bold text-neutral-900 truncate">{c.item?.title || "Item Claim"}</h5>
                    <p className="text-[11px] text-neutral-500 truncate">
                      Claimant: {c.claimant?.full_name} ({c.claimant?.university_id})
                    </p>
                  </div>
                  <Link href="/admin/claims">
                    <Button variant="primary" size="sm" className="text-xs">
                      Verify Evidence
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

