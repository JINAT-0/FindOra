"use client";

import * as React from "react";
import { Profile } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { AccountStatusBadge } from "@/components/ui/status-badge";
import { updateCurrentUserProfile } from "@/lib/api/profile";
import { ShieldCheck, UserCheck, CheckCircle2, Lock } from "lucide-react";

export function ProfileSettingsForm({ profile }: { profile: Profile }) {
  const [fullName, setFullName] = React.useState(profile.full_name);
  const [phoneNumber, setPhoneNumber] = React.useState(profile.phone_number || "");
  const [department, setDepartment] = React.useState(profile.department || "Computer Science & Engineering");
  const [avatarUrl, setAvatarUrl] = React.useState(profile.avatar_url || "");
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);

    try {
      await updateCurrentUserProfile({
        full_name: fullName,
        phone_number: phoneNumber,
        department,
        avatar_url: avatarUrl,
      });
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* University Verification Status Box */}
      <div className="rounded-xl border border-brand-warm-border bg-neutral-50/70 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-forest" />
            <h3 className="text-sm font-bold text-brand-navy">Institutional Membership Status</h3>
          </div>
          <AccountStatusBadge status={profile.account_status} />
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          {profile.account_status === "approved"
            ? "Your PUST identity has been officially approved by the Proctor Office. You possess full clearance to report items and verify claims."
            : "Your account is pending review by the campus administration. You will receive an alert once your university ID is verified."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Read only University ID */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700">
            University ID / Roll Number
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.university_id}
              disabled
              className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3.5 py-2 text-sm text-neutral-500 cursor-not-allowed"
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          </div>
          <p className="text-[11px] text-neutral-400">Locked to official university roster</p>
        </div>

        {/* Member Type (read only) */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-neutral-700">
            Institutional Role
          </label>
          <input
            type="text"
            value={profile.role === "admin" ? "Campus Administrator" : profile.member_type.toUpperCase()}
            disabled
            className="w-full rounded-lg border border-neutral-200 bg-neutral-100 px-3.5 py-2 text-sm text-neutral-500 cursor-not-allowed uppercase font-semibold"
          />
        </div>
      </div>

      {/* Editable Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Legal Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          label="Contact Phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Department / Faculty"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          options={[
            { value: "Computer Science & Engineering", label: "Computer Science & Engineering (CSE)" },
            { value: "Electrical & Electronic Engineering", label: "Electrical & Electronic Engineering (EEE)" },
            { value: "Civil Engineering", label: "Civil Engineering (CE)" },
            { value: "Department of Pharmacy", label: "Department of Pharmacy" },
            { value: "Business Administration", label: "Business Administration (BBA/MBA)" },
            { value: "Department of English", label: "Department of English" },
            { value: "Central Library", label: "Central Library" },
            { value: "Proctor & Security Office", label: "Proctor & Security Office" },
          ]}
        />
        <Input
          label="Avatar Image URL"
          placeholder="https://images.unsplash.com/..."
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </div>

      {success && (
        <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Profile changes successfully saved.</span>
        </div>
      )}

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
          Save Profile Updates
        </Button>
      </div>
    </form>
  );
}
