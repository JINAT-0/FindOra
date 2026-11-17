import Link from "next/link";
import { getItems } from "@/lib/api/items";
import { ItemGrid } from "@/components/items/item-grid";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function FoundItemsPage() {
  const { items } = await getItems({ type: "found" });

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <span className="h-2 w-2 rounded-full bg-brand-forest" />
              In Safe Custody
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
              Found Belongings Directory
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Items handed in across campus or logged with the Proctor & Security Office.
            </p>
          </div>
          <Link href="/report/found">
            <Button variant="primary" size="md">
              <PlusCircle className="h-4 w-4 mr-2" />
              Report Found Item
            </Button>
          </Link>
        </div>

        <ItemGrid
          items={items}
          emptyTitle="No found items listed"
          emptyDescription="There are currently no items waiting to be claimed under this section."
        />
      </div>
    </div>
  );
}
