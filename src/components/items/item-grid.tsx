import { Item } from "@/types";
import { ItemCard } from "./item-card";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ItemGrid({
  items,
  emptyTitle = "No items found",
  emptyDescription = "Try adjusting your search criteria or filters to locate what you are looking for.",
}: {
  items: Item[];
  emptyTitle?: string;
  emptyDescription?: string;
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<SearchX className="h-6 w-6 text-neutral-400" />}
        title={emptyTitle}
        description={emptyDescription}
        action={
          <div className="flex gap-2">
            <Link href="/items">
              <Button variant="outline" size="sm">
                Clear Filters
              </Button>
            </Link>
            <Link href="/report/lost">
              <Button variant="primary" size="sm">
                Report an Item
              </Button>
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}

