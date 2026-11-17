import Link from "next/link";
import {
  Compass,
  Layers,
  FileCheck,
  Sparkles,
  Bell,
  PlusCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store/demo-data";
import { getAllUserMatches } from "@/lib/api/items";
import { ItemCard } from "@/components/items/item-card";
import { AccountStatusBadge } from "@/components/ui/status-badge";
import { SmartMatchCard } from "@/components/items/smart-match-card";

export default async function UserDashboardPage() {
  const currentUser = store.getCurrentUser();
  const allItems = store.getItems();
  const userItems = allItems.filter((i) => i.user_id === currentUser.id);
  const userClaims = store.getClaimsByClaimant(currentUser.id);
  const notifications = store.getNotifications(currentUser.id);
  const unreadNotifs = notifications.filter((n) => !n.is_read);
  const matches = await getAllUserMatches();

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Profile Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-brand-warm-border bg-white shadow-card">
        <div className="flex items-center gap-4">
          {currentUser.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentUser.avatar_url}
              alt={currentUser.full_name}
              className="h-14 w-14 rounded-2xl object-cover border border-neutral-200"
            />
          ) : (
            <div className="h-14 w-14 rounded-2xl bg-brand-navy text-white flex items-center justify-center font-bold text-xl">
              {currentUser.full_name.charAt(0)}
            </div>
          )}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-brand-navy">{currentUser.full_name}</h1>
              <AccountStatusBadge status={currentUser.account_status} />
            </div>
            <p className="text-xs text-neutral-500 capitalize">
              {currentUser.member_type} • {currentUser.department || "Pundra University"} • ID: {currentUser.university_id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/report/lost">
            <Button variant="outline" size="sm" className="border-amber-300 text-amber-900">
              Report Lost
            </Button>
          </Link>
          <Link href="/report/found">
            <Button variant="primary" size="sm">
              <PlusCircle className="h-4 w-4 mr-1.5" />
              Report Found
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/posts"
          className="p-5 rounded-xl border border-brand-warm-border bg-white shadow-card hover:border-brand-navy transition-all"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold">My Listings</span>
            <Layers className="h-4 w-4 text-brand-navy" />
          </div>
          <p className="text-2xl font-bold text-brand-navy">{userItems.length}</p>
          <span className="text-[11px] text-neutral-400">Total posts published</span>
        </Link>

        <Link
          href="/dashboard/claims"
          className="p-5 rounded-xl border border-brand-warm-border bg-white shadow-card hover:border-brand-forest transition-all"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold">My Claims</span>
            <FileCheck className="h-4 w-4 text-brand-forest" />
          </div>
          <p className="text-2xl font-bold text-brand-forest">{userClaims.length}</p>
          <span className="text-[11px] text-neutral-400">Ownership claims filed</span>
        </Link>

        <Link
          href="/dashboard/matches"
          className="p-5 rounded-xl border border-brand-warm-border bg-white shadow-card hover:border-brand-amber transition-all"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold">Smart Matches</span>
            <Sparkles className="h-4 w-4 text-brand-amber" />
          </div>
          <p className="text-2xl font-bold text-brand-amber">{matches.length}</p>
          <span className="text-[11px] text-neutral-400">Algorithm suggestions</span>
        </Link>

        <Link
          href="/dashboard/notifications"
          className="p-5 rounded-xl border border-brand-warm-border bg-white shadow-card hover:border-rose-400 transition-all"
        >
          <div className="flex items-center justify-between text-neutral-500 mb-2">
            <span className="text-xs font-semibold">Notifications</span>
            <Bell className="h-4 w-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-800">{unreadNotifs.length}</p>
          <span className="text-[11px] text-neutral-400">Unread campus alerts</span>
        </Link>
      </div>

      {/* Suggested Matches Section */}
      {matches.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-amber" />
              <h2 className="text-base font-bold text-brand-navy">High-Probability Matches</h2>
            </div>
            <Link
              href="/dashboard/matches"
              className="text-xs font-semibold text-brand-navy hover:text-brand-forest flex items-center gap-1"
            >
              View All Matches <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-4">
            {matches.slice(0, 2).map((m, idx) => (
              <SmartMatchCard key={idx} match={m} />
            ))}
          </div>
        </div>
      )}

      {/* My Active Listings Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-brand-navy">My Recent Listings</h2>
          <Link
            href="/dashboard/posts"
            className="text-xs font-semibold text-brand-navy hover:text-brand-forest flex items-center gap-1"
          >
            Manage All Posts <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {userItems.length === 0 ? (
          <div className="p-8 rounded-xl border border-dashed border-neutral-300 text-center bg-white">
            <p className="text-xs text-neutral-500 mb-4">You have not created any lost or found listings yet.</p>
            <div className="flex justify-center gap-2">
              <Link href="/report/lost">
                <Button variant="outline" size="sm">Report Lost Item</Button>
              </Link>
              <Link href="/report/found">
                <Button variant="primary" size="sm">Report Found Item</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userItems.slice(0, 3).map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
