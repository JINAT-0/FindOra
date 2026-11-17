import { store } from "@/lib/store/demo-data";
import { ProfileSettingsForm } from "@/components/profile/profile-settings-form";

export default function ProfilePage() {
  const currentUser = store.getCurrentUser();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="pb-4 border-b border-neutral-200">
        <h1 className="text-2xl font-extrabold text-brand-navy">Profile & Verification</h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review and update your university identity records and contact preferences
        </p>
      </div>

      <div className="rounded-2xl border border-brand-warm-border bg-white p-6 sm:p-8 shadow-card">
        <ProfileSettingsForm profile={currentUser} />
      </div>
    </div>
  );
}

