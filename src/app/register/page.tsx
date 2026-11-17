"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, CheckCircle2, ShieldAlert, AlertCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { store } from "@/lib/store/demo-data";
import { switchDemoUserAction } from "@/lib/api/profile";
import { MemberType } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [universityId, setUniversityId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [department, setDepartment] = React.useState("Computer Science & Engineering");
  const [memberType, setMemberType] = React.useState<MemberType>("student");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !universityId || !email || !password) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create new profile with pending status in store
      const newUserId = `user-${Date.now()}`;
      const newProfile = {
        id: newUserId,
        email,
        full_name: fullName,
        university_id: universityId,
        member_type: memberType,
        role: "user" as const,
        account_status: "pending" as const, // Strict rule: must remain pending until approved
        department,
        phone_number: phoneNumber,
        avatar_url: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Add to store profiles
      store.getProfiles().push(newProfile);

      // Create initial pending notification
      store.addNotification({
        user_id: newUserId,
        title: "Membership Request Received",
        message: "Your registration is pending administrator approval. Proctor Office staff will verify your institutional credentials.",
        type: "membership",
        link: "/dashboard/profile",
      });

      // Switch active session to the new user
      await switchDemoUserAction(newUserId);
      setSuccess(true);
    } catch {
      setError("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm">
              <Compass className="h-6 w-6 text-brand-amber" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-brand-navy">
            Pundra University Membership Application
          </h1>
          <p className="text-xs text-neutral-500">
            Institutional Lost & Found Access Registration
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card space-y-5">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-brand-amber">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Registration Submitted!</h3>
              <div className="rounded-lg bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 text-left space-y-2">
                <p className="font-semibold">Membership Status: Pending Administrator Approval</p>
                <p className="leading-relaxed">
                  In accordance with university security policies, your account is queued for review by the PUST Proctor Office. While pending, you can explore the landing page and overview. Once verified, full posting and claiming privileges will activate automatically.
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => router.push("/dashboard")}
              >
                Proceed to Member Dashboard
              </Button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="rounded-lg bg-brand-navy-subtle p-3 border border-brand-navy/15 text-xs text-brand-navy flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-brand-amber" />
                <span>
                  <strong>Administrator Approval Policy:</strong> All new student, teacher, and staff registrations remain pending until verified against official university records.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="e.g. Nafis Hasan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  label="University ID / Roll Number"
                  placeholder="e.g. 23100589 or FAC-102"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="University Member Type"
                  value={memberType}
                  onChange={(e) => setMemberType(e.target.value as MemberType)}
                  options={[
                    { value: "student", label: "Student" },
                    { value: "teacher", label: "Faculty / Teacher" },
                    { value: "staff", label: "University Staff" },
                  ]}
                />
                <Select
                  label="Academic Department"
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
                    { value: "Proctor & Security Wing", label: "Proctor & Security Wing" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="student@gmail.com or institutional"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  helperText="Official domain or personal email"
                />
                <Input
                  label="Contact Phone"
                  type="tel"
                  placeholder="+880 1XXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Create Password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <div className="rounded-lg bg-rose-50 p-3 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" variant="primary" size="md" className="w-full" isLoading={isLoading}>
                Submit Registration for Approval
              </Button>
            </form>
          )}
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-neutral-500">
          Already registered?{" "}
          <Link href="/login" className="font-semibold text-brand-navy hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
