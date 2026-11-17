"use client";

import * as React from "react";
import Link from "next/link";
import { Item, ItemStatus } from "@/types";
import { ItemStatusBadge, ItemTypePill } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { updateItemAction } from "@/lib/api/items";
import { ExternalLink, Check, Archive, Eye } from "lucide-react";

export function ItemModerationTable({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = React.useState(initialItems);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleUpdateStatus = async (itemId: string, newStatus: ItemStatus) => {
    setLoadingId(itemId);
    try {
      await updateItemAction(itemId, { status: newStatus });
      setItems((prev) =>
        prev.map((i) => (i.id === itemId ? { ...i, status: newStatus } : i))
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-brand-warm-border bg-white shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200">
            <tr>
              <th className="px-4 py-3">Item Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Poster</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-neutral-50/70">
                <td className="px-4 py-3">
                  <div className="font-bold text-neutral-900">{item.title}</div>
                  <span className="text-[10px] text-neutral-400">ID: {item.id}</span>
                </td>
                <td className="px-4 py-3">
                  <ItemTypePill type={item.type} />
                </td>
                <td className="px-4 py-3 text-neutral-600">{item.category?.name || "General"}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-neutral-800">{item.user?.full_name}</span>
                  <span className="text-[10px] text-neutral-400 block">{item.user?.university_id}</span>
                </td>
                <td className="px-4 py-3 text-neutral-600 max-w-xs truncate">{item.location}</td>
                <td className="px-4 py-3">
                  <ItemStatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-right space-x-1.5 whitespace-nowrap">
                  <Link href={`/items/${item.id}`} target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs p-1.5" title="View Post">
                      <Eye className="h-3.5 w-3.5 text-neutral-600" />
                    </Button>
                  </Link>

                  {item.status !== "reunited" && (
                    <Button
                      variant="outline"
                      size="sm"
                      isLoading={loadingId === item.id}
                      onClick={() => handleUpdateStatus(item.id, "reunited")}
                      className="text-[11px] text-emerald-700 hover:bg-emerald-50"
                    >
                      Mark Reunited
                    </Button>
                  )}

                  {item.status !== "archived" && (
                    <Button
                      variant="outline"
                      size="sm"
                      isLoading={loadingId === item.id}
                      onClick={() => handleUpdateStatus(item.id, "archived")}
                      className="text-[11px] text-neutral-600 hover:bg-neutral-100"
                    >
                      Archive
                    </Button>
                  )}

                  {item.status === "archived" && (
                    <Button
                      variant="outline"
                      size="sm"
                      isLoading={loadingId === item.id}
                      onClick={() => handleUpdateStatus(item.id, "active")}
                      className="text-[11px]"
                    >
                      Restore
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

