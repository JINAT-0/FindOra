import { notFound } from "next/navigation";
import { getItemById, getItemMatches } from "@/lib/api/items";
import { store } from "@/lib/store/demo-data";
import { ItemDetailView } from "@/components/items/item-detail-view";

export default async function ItemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const item = await getItemById(params.id);
  if (!item) {
    notFound();
  }

  const matches = await getItemMatches(item.id);
  const currentUser = store.getCurrentUser();
  const history = store.getItemHistory(item.id);
  const existingClaims = store.getClaimsByItemId(item.id);

  return (
    <ItemDetailView
      item={item}
      currentUser={currentUser}
      matches={matches}
      history={history}
      existingClaims={existingClaims}
    />
  );
}

