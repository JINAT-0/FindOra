import { store } from "@/lib/store/demo-data";
import { History, ShieldCheck, Clock } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";
import { ItemStatusBadge } from "@/components/ui/status-badge";

export default function HistoryPage() {
  const currentUser = store.getCurrentUser();
  const allHistory = store.getItemHistory();
  const allItems = store.getAllItemsIncludingArchived();

  // History entries related to user's items or actions
  const userItemsIds = new Set(allItems.filter((i) => i.user_id === currentUser.id).map((i) => i.id));
  const userHistory = allHistory.filter(
    (h) => userItemsIds.has(h.item_id) || h.actor_id === currentUser.id
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Personal Activity & Item History</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Permanent chronological log of status transitions and events on your listings
        </p>
      </div>

      {userHistory.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-neutral-200 bg-white">
          <p className="text-xs text-neutral-500">No activity history recorded yet.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card">
          <div className="relative border-l-2 border-neutral-200 ml-4 space-y-6 py-2">
            {userHistory.map((item) => (
              <div key={item.id} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-brand-forest border-4 border-white shadow-xs" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">{item.note}</span>
                    <ItemStatusBadge status={item.new_status} />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Logged: {formatDateTime(item.created_at)} • Actor: {item.actor?.full_name || "System"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
