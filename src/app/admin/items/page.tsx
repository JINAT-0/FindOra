import { store } from "@/lib/store/demo-data";
import { ItemModerationTable } from "@/components/admin/item-moderation-table";

export default function AdminItemsPage() {
  const allItems = store.getAllItemsIncludingArchived();

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Item Moderation & Catalog Management</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Monitor all campus listings, manage lifecycle states, and restore or archive items
        </p>
      </div>

      <ItemModerationTable initialItems={allItems} />
    </div>
  );
}

