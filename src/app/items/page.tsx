import { getItems } from "@/lib/api/items";
import { ItemFilters } from "@/components/items/item-filters";
import { ItemGrid } from "@/components/items/item-grid";
import { FilterParams } from "@/types";

export default async function ExploreItemsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filterParams: FilterParams = {
    search: searchParams.search,
    type: (searchParams.type as FilterParams["type"]) || "all",
    category: searchParams.category,
    status: (searchParams.status as FilterParams["status"]) || "all",
    sortBy: (searchParams.sortBy as FilterParams["sortBy"]) || "newest",
  };

  const { items, total } = await getItems(filterParams);

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            Explore Campus Belongings
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Search and filter all reported lost and found items across Pundra University of Science & Technology
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <ItemFilters />

        {/* Results Bar */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-500 font-medium">
          <span>
            Showing <strong className="text-neutral-800">{items.length}</strong> of{" "}
            <strong className="text-neutral-800">{total}</strong> items
          </span>
          <span className="text-neutral-400">PUST Campus Central Catalog</span>
        </div>

        {/* Items Grid */}
        <ItemGrid items={items} />
      </div>
    </div>
  );
}

