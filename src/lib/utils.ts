import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ItemStatus, ClaimStatus, AccountStatus, ItemType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | Date | undefined): string {
  if (!dateString) return "N/A";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(dateString: string | Date | undefined): string {
  if (!dateString) return "N/A";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return "N/A";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function timeAgo(dateString: string | Date | undefined): string {
  if (!dateString) return "Unknown";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return "Unknown";
  
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

export function getItemStatusBadge(status: ItemStatus) {
  switch (status) {
    case "active":
      return {
        label: "Active",
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
      };
    case "matched":
      return {
        label: "Match Found",
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
      };
    case "pending_claim":
      return {
        label: "Claim Pending",
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
      };
    case "reunited":
      return {
        label: "Reunited",
        bg: "bg-purple-50 text-purple-700 border-purple-200",
        dot: "bg-purple-500",
      };
    case "archived":
      return {
        label: "Archived",
        bg: "bg-neutral-100 text-neutral-600 border-neutral-300",
        dot: "bg-neutral-400",
      };
    case "rejected":
      return {
        label: "Rejected",
        bg: "bg-rose-50 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
      };
    default:
      return {
        label: status,
        bg: "bg-neutral-100 text-neutral-700 border-neutral-200",
        dot: "bg-neutral-400",
      };
  }
}

export function getClaimStatusBadge(status: ClaimStatus) {
  switch (status) {
    case "pending":
      return {
        label: "Under Review",
        bg: "bg-amber-50 text-amber-700 border-amber-200",
      };
    case "approved":
      return {
        label: "Verified & Approved",
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    case "rejected":
      return {
        label: "Claim Rejected",
        bg: "bg-rose-50 text-rose-700 border-rose-200",
      };
    default:
      return {
        label: status,
        bg: "bg-neutral-100 text-neutral-700 border-neutral-200",
      };
  }
}

export function getAccountStatusBadge(status: AccountStatus) {
  switch (status) {
    case "approved":
      return {
        label: "Verified Member",
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    case "pending":
      return {
        label: "Pending Verification",
        bg: "bg-amber-50 text-amber-700 border-amber-200",
      };
    case "rejected":
      return {
        label: "Application Rejected",
        bg: "bg-rose-50 text-rose-700 border-rose-200",
      };
    case "suspended":
      return {
        label: "Account Suspended",
        bg: "bg-neutral-100 text-neutral-700 border-neutral-300",
      };
    default:
      return {
        label: status,
        bg: "bg-neutral-100 text-neutral-700 border-neutral-200",
      };
  }
}

export function getItemTypeBadge(type: ItemType) {
  if (type === "lost") {
    return {
      label: "Lost Item",
      bg: "bg-amber-50 text-amber-800 border-amber-300",
      accent: "text-amber-600",
    };
  }
  return {
    label: "Found Item",
    bg: "bg-emerald-50 text-emerald-800 border-emerald-300",
    accent: "text-emerald-600",
  };
}

