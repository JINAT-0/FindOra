"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Calendar,
  Tag,
  ShieldCheck,
  FileCheck2,
  AlertTriangle,
  ArrowLeft,
  User,
  History,
  Clock,
  Sparkles,
  Archive,
  Edit3,
} from "lucide-react";
import { Item, Profile, SmartMatchResult, ItemHistory, Claim } from "@/types";
import { formatDate, timeAgo } from "@/lib/utils";
import { ItemStatusBadge, ItemTypePill } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { ClaimModal } from "./claim-modal";
import { ReportModal } from "./report-modal";
import { SmartMatchCard } from "./smart-match-card";
import { archiveItemAction } from "@/lib/api/items";

export function ItemDetailView({
  item,
  currentUser,
  matches,
  history,
  existingClaims,
}: {
  item: Item;
  currentUser: Profile;
  matches: SmartMatchResult[];
  history: ItemHistory[];
  existingClaims: Claim[];
}) {
  const router = useRouter();
  const [claimModalOpen, setClaimModalOpen] = React.useState(false);
  const [reportModalOpen, setReportModalOpen] = React.useState(false);
  const [isArchiving, setIsArchiving] = React.useState(false);

  const isOwner = currentUser.id === item.user_id;
  const isAdmin = currentUser.role === "admin";
  const isApproved = currentUser.account_status === "approved";

  // Check if current user already submitted a claim
  const userClaim = existingClaims.find((c) => c.claimant_id === currentUser.id);

  const primaryImage =
    item.images && item.images.length > 0
      ? item.images[0].storage_path
      : "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80";

  const handleArchive = async () => {
    if (!confirm("Are you sure you want to archive this post? It will be removed from public listings.")) {
      return;
    }
    setIsArchiving(true);
    await archiveItemAction(item.id);
    router.push("/items");
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/items"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-brand-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Listings
          </Link>
          <div className="flex items-center gap-2">
            {(isOwner || isAdmin) && item.status !== "archived" && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleArchive}
                isLoading={isArchiving}
                className="text-neutral-600 hover:text-rose-600"
              >
                <Archive className="h-3.5 w-3.5 mr-1.5" />
                Archive Post
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setReportModalOpen(true)}
              className="text-neutral-500 hover:text-rose-600"
            >
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              Report
            </Button>
          </div>
        </div>

        {/* Main Item Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl border border-brand-warm-border bg-white p-6 sm:p-8 shadow-card">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={primaryImage}
                alt={item.title}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute top-3 left-3">
                <ItemTypePill type={item.type} />
              </div>
              <div className="absolute top-3 right-3">
                <ItemStatusBadge status={item.status} />
              </div>
            </div>

            {/* Poster Info Card */}
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/70 p-4 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Reported by University Member
              </span>
              <div className="flex items-center gap-3">
                {item.user?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.user.avatar_url}
                    alt={item.user.full_name}
                    className="h-10 w-10 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-xl bg-brand-navy text-white flex items-center justify-center font-bold text-sm">
                    {item.user?.full_name?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <h5 className="text-xs font-bold text-neutral-900">{item.user?.full_name}</h5>
                  <p className="text-[11px] text-neutral-500 capitalize">
                    {item.user?.member_type} • {item.user?.department || "PUST"}
                  </p>
                  <p className="text-[10px] text-neutral-400">ID: {item.user?.university_id}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Information & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                  <span className="flex items-center gap-1 font-medium text-neutral-700">
                    <Tag className="h-3.5 w-3.5 text-neutral-400" />
                    {item.category?.name || "General"}
                  </span>
                  <span>•</span>
                  <span>Reported {timeAgo(item.created_at)}</span>
                </div>
                <h1 className="text-2xl font-extrabold text-brand-navy">{item.title}</h1>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs">
                <div>
                  <span className="text-[11px] text-neutral-400 block">Primary Color</span>
                  <span className="font-semibold text-neutral-800">{item.color}</span>
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 block">Brand / Make</span>
                  <span className="font-semibold text-neutral-800">{item.brand || "Unspecified"}</span>
                </div>
                <div>
                  <span className="text-[11px] text-neutral-400 block">Incident Date</span>
                  <span className="font-semibold text-neutral-800">{formatDate(item.incident_date)}</span>
                </div>
                <div className="col-span-2 sm:col-span-3 pt-2 border-t border-neutral-200/60 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-forest shrink-0" />
                  <span className="font-medium text-neutral-700">{item.location}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Description</h3>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                  {item.description}
                </p>
              </div>

              {/* Identifying Marks (Safe notes) */}
              {item.identifying_marks && (
                <div className="space-y-1 p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs">
                  <span className="font-bold text-amber-900 block">Reported Identifying Notes:</span>
                  <p className="text-amber-800">{item.identifying_marks}</p>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-3">
              {item.type === "found" && !isOwner && (
                <>
                  {userClaim ? (
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
                      <FileCheck2 className="h-4 w-4 text-amber-700" />
                      <span>Your Claim is Submitted (Status: {userClaim.status})</span>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => setClaimModalOpen(true)}
                      disabled={!isApproved}
                    >
                      <FileCheck2 className="h-4 w-4 mr-2" />
                      Claim This Found Item
                    </Button>
                  )}
                </>
              )}

              {item.type === "lost" && !isOwner && (
                <Link href="/report/found">
                  <Button variant="primary" size="lg">
                    I Found a Matching Item
                  </Button>
                </Link>
              )}

              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Inquire at Proctor Office
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Possible Matches Section */}
        {matches.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-amber" />
              <h3 className="text-lg font-bold text-brand-navy">
                Smart Match Suggestions ({matches.length})
              </h3>
            </div>
            <div className="space-y-4">
              {matches.map((m, idx) => (
                <SmartMatchCard key={idx} match={m} />
              ))}
            </div>
          </div>
        )}

        {/* Status History Timeline */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <History className="h-4 w-4 text-brand-forest" />
            <h3 className="text-sm font-bold text-neutral-900">Item Lifecycle & Audit History</h3>
          </div>
          <div className="space-y-3">
            {history.map((hist) => (
              <div key={hist.id} className="flex items-start gap-3 text-xs">
                <div className="h-2 w-2 rounded-full bg-brand-forest mt-1.5 shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-neutral-800">
                    {hist.note || `Status shifted from ${hist.old_status} to ${hist.new_status}`}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Recorded {formatDate(hist.created_at)} • by {hist.actor?.full_name || "Proctor System"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        <ClaimModal
          item={item}
          isOpen={claimModalOpen}
          onClose={() => setClaimModalOpen(false)}
          onClaimSubmitted={() => router.refresh()}
        />
        <ReportModal
          item={item}
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
        />
      </div>
    </div>
  );
}

