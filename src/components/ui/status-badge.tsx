import { ItemStatus, ClaimStatus, AccountStatus, ItemType } from "@/types";
import { getItemStatusBadge, getClaimStatusBadge, getAccountStatusBadge, getItemTypeBadge } from "@/lib/utils";

export function ItemStatusBadge({ status }: { status: ItemStatus }) {
  const info = getItemStatusBadge(status);
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${info.bg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${info.dot}`} />
      {info.label}
    </span>
  );
}

export function ClaimStatusBadge({ status }: { status: ClaimStatus }) {
  const info = getClaimStatusBadge(status);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${info.bg}`}>
      {info.label}
    </span>
  );
}

export function AccountStatusBadge({ status }: { status: AccountStatus }) {
  const info = getAccountStatusBadge(status);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${info.bg}`}>
      {info.label}
    </span>
  );
}

export function ItemTypePill({ type }: { type: ItemType }) {
  const info = getItemTypeBadge(type);
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide uppercase border ${info.bg}`}>
      {info.label}
    </span>
  );
}
