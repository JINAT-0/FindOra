import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { getAllUserMatches } from "@/lib/api/items";
import { SmartMatchCard } from "@/components/items/smart-match-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export default async function PossibleMatchesPage() {
  const matches = await getAllUserMatches();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
          <Sparkles className="h-4 w-4 text-brand-amber" />
          Intelligent Correspondence
        </div>
        <h1 className="text-2xl font-extrabold text-brand-navy">Possible Matches</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Rule-based smart matches comparing your reported posts against other campus listings
        </p>
      </div>

      {matches.length === 0 ? (
        <EmptyState
          icon={<Sparkles className="h-6 w-6 text-brand-amber" />}
          title="No possible matches found right now"
          description="Our algorithm continuously evaluates new posts. As soon as another member logs an item with overlapping category, keywords, color, or location, it will appear here."
          action={
            <Link href="/items">
              <Button variant="primary" size="sm">
                Browse Campus Catalog Manually
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {matches.map((match, idx) => (
            <SmartMatchCard key={idx} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}

