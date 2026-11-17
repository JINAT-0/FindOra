import Link from "next/link";
import { PlusCircle, Layers, Archive, ExternalLink } from "lucide-react";
import { store } from "@/lib/store/demo-data";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/items/item-card";
import { EmptyState } from "@/components/ui/empty-state";

export default function MyPostsPage() {
  const currentUser = store.getCurrentUser();
  const allItems = store.getAllItemsIncludingArchived();
  const myItems = allItems.filter((i) => i.user_id === currentUser.id);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">My Listings & Posts</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Manage your reported lost and found belongings across PUST
          </p>
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

      {myItems.length === 0 ? (
        <EmptyState
          icon={<Layers className="h-6 w-6 text-neutral-400" />}
          title="No posts created yet"
          description="You haven't reported any lost or found items. Get started whenever something goes missing or you recover an item."
          action={
            <Link href="/report/lost">
              <Button variant="primary" size="sm">
                Create First Report
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
