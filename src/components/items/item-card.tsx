import Link from "next/link";
import { MapPin, Calendar, Tag, ShieldCheck } from "lucide-react";
import { Item } from "@/types";
import { formatDate, timeAgo } from "@/lib/utils";
import { ItemStatusBadge, ItemTypePill } from "@/components/ui/status-badge";

export function ItemCard({ item }: { item: Item }) {
  const primaryImage =
    item.images && item.images.length > 0
      ? item.images[0].storage_path
      : "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80";

  return (
    <Link
      href={`/items/${item.id}`}
      className="group flex flex-col rounded-xl border border-brand-warm-border bg-white overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Image & Type Header */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={primaryImage}
          alt={item.title}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <ItemTypePill type={item.type} />
        </div>
        <div className="absolute top-2.5 right-2.5">
          <ItemStatusBadge status={item.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Color */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1.5">
          <span className="flex items-center gap-1 font-medium text-neutral-700">
            <Tag className="h-3 w-3 text-neutral-400" />
            {item.category?.name || "General Item"}
          </span>
          <span className="font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
            {item.color}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-brand-forest line-clamp-1 mb-2">
          {item.title}
        </h4>

        {/* Description snippet */}
        <p className="text-xs text-neutral-500 line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Meta details */}
        <div className="mt-auto space-y-1.5 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
              {formatDate(item.incident_date)}
            </span>
            <span className="text-[10px] text-neutral-400">{timeAgo(item.created_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

