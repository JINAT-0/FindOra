"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Lock, Mail, ArrowRight, AlertCircle, Building2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/lib/store/demo-data";
import { switchDemoUserAction } from "@/lib/api/profile";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("sourov.cse@pust.ac.bd");
  const [password, setPassword] = React.useState("pustpassword123");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Look up member by email or university_id
    const profiles = store.getProfiles();
    const matched = profiles.find(
      (p) => p.email?.toLowerCase() === email.toLowerCase() || p.university_id.toLowerCase() === email.toLowerCase()
    );

    if (matched) {
      await switchDemoUserAction(matched.id);
      router.push("/dashboard");
    } else {
      setError("Invalid university credentials. Please check your email or student/staff ID.");
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (userId: string) => {
    setIsLoading(true);
    await switchDemoUserAction(userId);
    router.push("/dashboard");
  };

  return (
    <div className="py-12 md:py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Branding */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm">
              <Compass className="h-6 w-6 text-brand-amber" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-brand-navy">
            Sign In to FindOra
          </h1>
          <p className="text-xs text-neutral-500">
            Pundra University of Science & Technology Portal
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="University Email or ID"
              placeholder="e.g. sourov.cse@pust.ac.bd or 21100234"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-neutral-700">Password</label>
                <Link href="/forgot-password" className="text-xs text-brand-forest hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2 text-sm text-neutral-900 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-rose-50 p-3 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" variant="primary" size="md" className="w-full" isLoading={isLoading}>
              Sign In to Account
            </Button>
          </form>

          {/* Quick Demo Switcher Pills */}
          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider text-center">
              Quick Test Personas
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-admin-1")}
                className="p-2 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-left font-medium text-neutral-800 transition-colors"
              >
                <span className="block font-bold text-brand-navy">Administrator</span>
                <span className="text-[10px] text-neutral-500">Proctor Office</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-student-1")}
                className="p-2 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-left font-medium text-neutral-800 transition-colors"
              >
                <span className="block font-bold text-emerald-700">Sourov (Student)</span>
                <span className="text-[10px] text-neutral-500">Approved Member</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-teacher-1")}
                className="p-2 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-left font-medium text-neutral-800 transition-colors"
              >
                <span className="block font-bold text-neutral-800">Dr. Mahbub (Faculty)</span>
                <span className="text-[10px] text-neutral-500">CSE Department</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("user-pending-1")}
                className="p-2 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-left font-medium text-neutral-800 transition-colors"
              >
                <span className="block font-bold text-amber-700">Nafis (Pending)</span>
                <span className="text-[10px] text-neutral-500">Awaiting Approval</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-neutral-500">
          Not registered yet?{" "}
          <Link href="/register" className="font-semibold text-brand-navy hover:underline">
            Request University Membership
          </Link>
        </p>
      </div>
    </div>
  );
}
