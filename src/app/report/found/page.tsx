import { store } from "@/lib/store/demo-data";
import { ReportItemForm } from "@/components/items/report-item-form";
import { AlertCircle } from "lucide-react";

export default function ReportFoundPage() {
  const categories = store.getCategories();
  const currentUser = store.getCurrentUser();
  const isPending = currentUser.account_status === "pending";

  return (
    <div className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <span className="h-2 w-2 rounded-full bg-brand-forest" />
            University Found Report
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight">
            Report a Found Belonging
          </h1>
          <p className="text-sm text-neutral-600 mt-1">
            Found something on campus? Register the item so its rightful owner can submit an ownership claim.
          </p>
        </div>

        {isPending ? (
          <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="h-5 w-5 text-amber-700" />
              <span>Membership Pending Verification</span>
            </div>
            <p className="text-xs leading-relaxed">
              Your account is currently awaiting administrative approval from the PUST Proctor Office. Once verified, you can report found items.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-brand-warm-border bg-white p-6 sm:p-8 shadow-card">
            <ReportItemForm type="found" categories={categories} />
          </div>
        )}
      </div>
    </div>
  );
}

