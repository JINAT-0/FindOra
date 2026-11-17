import Link from "next/link";
import { getItems } from "@/lib/api/items";
import { ItemGrid } from "@/components/items/item-grid";
import { Button } from "@/components/ui/button";

export default async function LostItemsPage() {
  const { items } = await getItems({ type: "lost" });

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
              <span className="h-2 w-2 rounded-full bg-brand-amber" />
              Active Searches
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Lost Belongings Directory
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Items currently reported missing by PUST students, faculty, and campus staff.
            </p>
          </div>
          <Link href="/report/lost">
            <Button variant="outline" size="md" className="border-amber-400 text-amber-900 hover:bg-amber-50">
              <span className="h-2 w-2 rounded-full bg-brand-amber mr-2" />
              Report Lost Item
            </Button>
          </Link>
        </div>

        <ItemGrid
          items={items}
          emptyTitle="No lost items currently listed"
          emptyDescription="Great news! There are currently no missing items listed under this category."
        />
      </div>
    </div>
  );
}

