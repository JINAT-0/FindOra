"use client";

import * as React from "react";
import Link from "next/link";
import { Report } from "@/types";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { resolveReportAction } from "@/lib/api/admin";
import { archiveItemAction } from "@/lib/api/items";
import { AlertTriangle, CheckCircle, ExternalLink, Archive } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export function ReportModerationView({ initialReports }: { initialReports: Report[] }) {
  const [reports, setReports] = React.useState(initialReports);
  const [loadingId, setLoadingId] = React.useState<string | null>(null);

  const handleResolve = async (reportId: string, status: "reviewed" | "dismissed") => {
    setLoadingId(reportId);
    try {
      await resolveReportAction(reportId, status);
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status } : r))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const handleArchiveReportedItem = async (reportId: string, itemId: string) => {
    setLoadingId(reportId);
    try {
      await archiveItemAction(itemId);
      await resolveReportAction(reportId, "reviewed");
      setReports((prev) =>
        prev.map((r) => (r.id === reportId ? { ...r, status: "reviewed" } : r))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const pendingReports = reports.filter((r) => r.status === "pending");

  return (
    <div className="space-y-6">
      {pendingReports.length === 0 ? (
        <EmptyState
          icon={<CheckCircle className="h-6 w-6 text-emerald-600" />}
          title="No reports awaiting review"
          description="All flagged items and community reports have been resolved."
        />
      ) : (
        <div className="space-y-4">
          {pendingReports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm">Reason: {report.reason}</h4>
                    <span className="text-[10px] text-neutral-400">
                      Reported {formatDate(report.created_at)} by {report.reporter?.full_name} ({report.reporter?.university_id})
                    </span>
                  </div>
                </div>
                {report.item && (
                  <Link href={`/items/${report.item.id}`} target="_blank">
                    <Button variant="outline" size="sm" className="text-xs">
                      <ExternalLink className="h-3.5 w-3.5 mr-1" /> View Listing
                    </Button>
                  </Link>
                )}
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 text-xs space-y-2">
                <p>
                  <strong>Target Listing:</strong> {report.item?.title || "Item Post"}
                </p>
                {report.description && (
                  <p className="text-neutral-600">
                    <strong>Reporter Notes:</strong> {report.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  isLoading={loadingId === report.id}
                  onClick={() => handleResolve(report.id, "dismissed")}
                  className="text-xs text-neutral-600"
                >
                  Dismiss Report
                </Button>
                {report.item && (
                  <Button
                    variant="danger"
                    size="sm"
                    isLoading={loadingId === report.id}
                    onClick={() => handleArchiveReportedItem(report.id, report.item!.id)}
                  >
                    <Archive className="h-3.5 w-3.5 mr-1" />
                    Archive Listing & Resolve
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

