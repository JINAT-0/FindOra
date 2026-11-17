import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, MapPin, Calendar, Tag } from "lucide-react";
import { SmartMatchResult } from "@/types";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ItemTypePill } from "@/components/ui/status-badge";

export function SmartMatchCard({ match }: { match: SmartMatchResult }) {
  const { targetItem, matchedItem, totalScore, breakdown, reasons } = match;

  const scoreColor =
    totalScore >= 75
      ? "text-emerald-700 bg-emerald-50 border-emerald-200"
      : totalScore >= 50
      ? "text-amber-700 bg-amber-50 border-amber-200"
      : "text-neutral-700 bg-neutral-100 border-neutral-200";

  const progressBg =
    totalScore >= 75 ? "bg-brand-forest" : totalScore >= 50 ? "bg-brand-amber" : "bg-neutral-500";

  return (
    <div className="rounded-xl border border-brand-warm-border bg-white p-5 shadow-card hover:shadow-card-hover transition-all">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-50 text-brand-amber">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-neutral-900">Potential Match Detected</h4>
            <p className="text-xs text-neutral-500">
              Rule-based weighted similarity score between your listing and a reported item
            </p>
          </div>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-bold text-sm ${scoreColor}`}>
          <span>{totalScore}% Similarity</span>
        </div>
      </div>

      {/* Score Progress Bar */}
      <div className="my-3">
        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
          <div className={`h-full ${progressBg} transition-all duration-500`} style={{ width: `${totalScore}%` }} />
        </div>
        <div className="grid grid-cols-5 text-[10px] text-neutral-400 mt-1.5 text-center">
          <span>Cat: {breakdown.categoryScore}/30</span>
          <span>Text: {breakdown.textScore}/25</span>
          <span>Color: {breakdown.colorScore}/15</span>
          <span>Loc: {breakdown.locationScore}/15</span>
          <span>Date: {breakdown.dateScore}/15</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 p-3 rounded-lg bg-neutral-50/80 border border-neutral-200/60">
        {/* Target Item */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <ItemTypePill type={targetItem.type} />
            <span className="text-[11px] font-semibold text-neutral-600">Your Post</span>
          </div>
          <h5 className="text-xs font-bold text-neutral-900 line-clamp-1">{targetItem.title}</h5>
          <div className="space-y-1 text-[11px] text-neutral-500">
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-neutral-400" />
              {targetItem.location}
            </p>
            <p className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-neutral-400" />
              {formatDate(targetItem.incident_date)}
            </p>
          </div>
        </div>

        {/* Matched Candidate */}
        <div className="space-y-1.5 md:border-l md:border-neutral-200 md:pl-4">
          <div className="flex items-center gap-2">
            <ItemTypePill type={matchedItem.type} />
            <span className="text-[11px] font-semibold text-neutral-600">Matched Listing</span>
          </div>
          <h5 className="text-xs font-bold text-neutral-900 line-clamp-1">{matchedItem.title}</h5>
          <div className="space-y-1 text-[11px] text-neutral-500">
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-neutral-400" />
              {matchedItem.location}
            </p>
            <p className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-neutral-400" />
              {formatDate(matchedItem.incident_date)}
            </p>
          </div>
        </div>
      </div>

      {/* Why Matched Reasons */}
      <div className="space-y-1 mb-4">
        <span className="text-[11px] font-bold text-neutral-700">Matching Factors:</span>
        <ul className="space-y-1">
          {reasons.map((reason, idx) => (
            <li key={idx} className="flex items-center gap-1.5 text-xs text-neutral-600">
              <CheckCircle2 className="h-3.5 w-3.5 text-brand-forest shrink-0" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
        <Link href={`/items/${matchedItem.id}`}>
          <Button variant="primary" size="sm">
            Inspect Item & Claim Ownership
            <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
