import { store } from "@/lib/store/demo-data";
import { ReportModerationView } from "@/components/admin/report-moderation-view";

export default function AdminReportsPage() {
  const reports = store.getReports();

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Flagged Listings & Reports</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review community reports regarding duplicate, spam, or misleading items
        </p>
      </div>

      <ReportModerationView initialReports={reports} />
    </div>
  );
}
