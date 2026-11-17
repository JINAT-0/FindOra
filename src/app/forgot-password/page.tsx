"use client";

import * as React from "react";
import Link from "next/link";
import { Compass, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm">
              <Compass className="h-6 w-6 text-brand-amber" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-brand-navy">
            Reset Password
          </h1>
          <p className="text-xs text-neutral-500">
            Enter your registered university email to receive a recovery link
          </p>
        </div>

        <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card space-y-5">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-brand-forest">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Check Your Inbox</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                If an account associated with <strong>{email}</strong> exists, password reset instructions have been dispatched.
              </p>
              <Link href="/login">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Registered Email Address"
                type="email"
                placeholder="e.g. sourov.cse@pust.ac.bd"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary" size="md" className="w-full">
                Send Recovery Instructions
              </Button>
            </form>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-brand-navy"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

