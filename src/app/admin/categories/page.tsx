import { store } from "@/lib/store/demo-data";
import { CategoryManagementView } from "@/components/admin/category-management-view";

export default function AdminCategoriesPage() {
  const categories = store.getCategories();
  const allItems = store.getItems();

  const itemCounts: Record<string, number> = {};
  for (const item of allItems) {
    itemCounts[item.category_id] = (itemCounts[item.category_id] || 0) + 1;
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Category Management</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Configure official item classifications and taxonomy for PUST lost and found listings
        </p>
      </div>

      <CategoryManagementView
        initialCategories={categories}
        itemCounts={itemCounts}
      />
    </div>
  );
}

