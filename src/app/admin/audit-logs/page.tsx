import { store } from "@/lib/store/demo-data";
import { History, ShieldCheck, Clock } from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";
import { ItemStatusBadge } from "@/components/ui/status-badge";

export default function AdminAuditLogsPage() {
  const auditLogs = store.getItemHistory();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Administrative Audit Logs</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Immutable historical audit trail of all status transitions, verification rulings, and administrative actions
        </p>
      </div>

      <div className="rounded-xl border border-brand-warm-border bg-white shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Actor / Author</th>
                <th className="px-4 py-3">Item Ref</th>
                <th className="px-4 py-3">Old Status</th>
                <th className="px-4 py-3">New Status</th>
                <th className="px-4 py-3">Audit Details / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/70">
                  <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">
                    {formatDateTime(log.created_at)}
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900">
                    {log.actor?.full_name || "System Automated"}
                    <span className="text-[10px] text-neutral-400 block">
                      {log.actor?.role === "admin" ? "Proctor Admin" : log.actor?.university_id}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-neutral-600">
                    {log.item_id}
                  </td>
                  <td className="px-4 py-3">
                    <ItemStatusBadge status={log.old_status} />
                  </td>
                  <td className="px-4 py-3">
                    <ItemStatusBadge status={log.new_status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-700 max-w-sm">
                    {log.note || "Status updated"}
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

