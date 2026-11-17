import { store } from "@/lib/store/demo-data";
import { BarChart3, TrendingUp, CheckCircle2, ShieldCheck, MapPin, Tag } from "lucide-react";

export default function AdminAnalyticsPage() {
  const stats = store.getPlatformStats();
  const allItems = store.getAllItemsIncludingArchived();
  const categories = store.getCategories();
  const profiles = store.getProfiles();

  // Category breakdown
  const categoryBreakdown = categories.map((cat) => {
    const count = allItems.filter((i) => i.category_id === cat.id).length;
    return { name: cat.name, count };
  });

  // Status breakdown
  const statusCounts = {
    active: allItems.filter((i) => i.status === "active").length,
    matched: allItems.filter((i) => i.status === "matched").length,
    pending_claim: allItems.filter((i) => i.status === "pending_claim").length,
    reunited: allItems.filter((i) => i.status === "reunited").length,
    archived: allItems.filter((i) => i.status === "archived").length,
  };

  // Location hotspots
  const locations: Record<string, number> = {};
  for (const item of allItems) {
    const loc = item.location.split(",")[0].trim();
    locations[loc] = (locations[loc] || 0) + 1;
  }
  const topLocations = Object.entries(locations)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Campus Analytics & Insights</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Empirical data on item recovery efficiency, incident hotspots, and membership activity
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-brand-warm-border bg-white shadow-card">
          <p className="text-xs font-semibold text-neutral-500">Recovery Rate</p>
          <p className="text-3xl font-extrabold text-brand-forest mt-1">{stats.recoveryRate}%</p>
          <span className="text-[10px] text-neutral-400">Total resolved / logged</span>
        </div>
        <div className="p-5 rounded-2xl border border-brand-warm-border bg-white shadow-card">
          <p className="text-xs font-semibold text-neutral-500">Reunited Belongings</p>
          <p className="text-3xl font-extrabold text-purple-700 mt-1">{stats.reunitedItems}</p>
          <span className="text-[10px] text-neutral-400">Handed to rightful owners</span>
        </div>
        <div className="p-5 rounded-2xl border border-brand-warm-border bg-white shadow-card">
          <p className="text-xs font-semibold text-neutral-500">Total Items Cataloged</p>
          <p className="text-3xl font-extrabold text-brand-navy mt-1">{allItems.length}</p>
          <span className="text-[10px] text-neutral-400">{stats.totalLostPosts} lost • {stats.totalFoundPosts} found</span>
        </div>
        <div className="p-5 rounded-2xl border border-brand-warm-border bg-white shadow-card">
          <p className="text-xs font-semibold text-neutral-500">Institutional Members</p>
          <p className="text-3xl font-extrabold text-brand-amber mt-1">{stats.totalUsers}</p>
          <span className="text-[10px] text-neutral-400">{stats.approvedUsers} verified • {stats.pendingMemberships} pending</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <Tag className="h-4 w-4 text-brand-forest" />
            <h3 className="text-sm font-bold text-brand-navy">Items by Category</h3>
          </div>
          <div className="space-y-3">
            {categoryBreakdown.map((cat, idx) => {
              const pct = allItems.length > 0 ? Math.round((cat.count / allItems.length) * 100) : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-neutral-800">{cat.name}</span>
                    <span className="font-bold text-neutral-600">{cat.count} items ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-navy transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Location Hotspots */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <MapPin className="h-4 w-4 text-brand-amber" />
            <h3 className="text-sm font-bold text-brand-navy">Top Campus Incident Hotspots</h3>
          </div>
          <p className="text-xs text-neutral-500">Locations with the highest concentration of lost and found reports:</p>
          <div className="space-y-3">
            {topLocations.map(([loc, count], idx) => {
              const maxCount = topLocations[0][1] || 1;
              const pct = Math.round((count / maxCount) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-neutral-800">{loc}</span>
                    <span className="font-bold text-brand-navy">{count} reports</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-amber transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lifecycle Status Breakdown */}
      <div className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4">
        <h3 className="text-sm font-bold text-brand-navy pb-3 border-b border-neutral-100">
          Item Status Distribution
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className="text-2xl font-bold text-emerald-800">{statusCounts.active}</p>
            <span className="text-xs font-semibold text-emerald-700">Active</span>
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-2xl font-bold text-blue-800">{statusCounts.matched}</p>
            <span className="text-xs font-semibold text-blue-700">Matched</span>
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-2xl font-bold text-amber-800">{statusCounts.pending_claim}</p>
            <span className="text-xs font-semibold text-amber-700">Claim Pending</span>
          </div>
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
            <p className="text-2xl font-bold text-purple-800">{statusCounts.reunited}</p>
            <span className="text-xs font-semibold text-purple-700">Reunited</span>
          </div>
          <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200">
            <p className="text-2xl font-bold text-neutral-700">{statusCounts.archived}</p>
            <span className="text-xs font-semibold text-neutral-600">Archived</span>
          </div>
        </div>
      </div>
    </div>
  );
}

