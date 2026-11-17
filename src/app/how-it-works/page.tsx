import Link from "next/link";
import {
  FileText,
  Camera,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  UserCheck,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Standard Operating Procedure
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            How FindOra Operates
          </h1>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            A step-by-step walkthrough of the lost item reporting, found item hand-in, smart matching, and official ownership claim verification procedure at PUST.
          </p>
        </div>

        {/* 2 Track Columns: If You Lost / If You Found */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TRACK 1: LOST SOMETHING */}
          <div className="rounded-2xl border border-amber-200 bg-white p-6 shadow-card space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-amber-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-brand-amber font-bold text-sm">
                A
              </span>
              <div>
                <h2 className="text-base font-bold text-neutral-900">If You Lost an Item</h2>
                <p className="text-xs text-neutral-500">How to report and track missing property</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">Submit a Lost Post</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Log in and click &ldquo;Report Lost&rdquo;. Provide the item category, exact brand, primary colors, incident date, and the campus zone where you last possessed it (e.g., CSE Lab 2, Cafeteria, Library 2nd floor).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">Review Smart Match Alerts</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Our matching algorithm continuously checks newly registered found items. If a listing shares key attributes, you will receive an in-app match notification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">File an Ownership Claim</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Found an item matching yours? Submit an Ownership Claim with confidential proof (e.g. lock code, unique scratches, purchase receipt).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-amber-50 text-amber-700 font-bold flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">Collect at Proctor Office</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Once the proctor reviews and approves your claim, visit the Proctor Office with your university ID to retrieve your item.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/report/lost">
                <Button variant="outline" size="sm" className="w-full border-amber-300 text-amber-800">
                  Report a Lost Item Now
                </Button>
              </Link>
            </div>
          </div>

          {/* TRACK 2: FOUND SOMETHING */}
          <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-card space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-emerald-100">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-brand-forest font-bold text-sm">
                B
              </span>
              <div>
                <h2 className="text-base font-bold text-neutral-900">If You Found an Item</h2>
                <p className="text-xs text-neutral-500">How to safely catalog and deposit found goods</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-brand-forest font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">Log a Found Post</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Click &ldquo;Report Found&rdquo; and take a clear photograph of the object. Specify where and when on campus you found it. Do not photograph private serial numbers or ID card roll numbers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-brand-forest font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">Physical Deposit at Proctor Office</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Hand over the physical item to the PUST Security or Proctor Desk in Academic Building 1. Staff will tag the item with its FindOra reference ID.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-brand-forest font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">Administrative Claim Review</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    When potential owners submit claims, administrators cross-examine their submitted evidence against the physical item.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-50 text-brand-forest font-bold flex items-center justify-center shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 mb-0.5">Successful Handover</h4>
                  <p className="text-neutral-600 leading-relaxed">
                    Once returned, the item is marked &ldquo;Reunited&rdquo;. You receive an in-app thank you notification acknowledging your contribution!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/report/found">
                <Button variant="primary" size="sm" className="w-full">
                  Report a Found Item Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Algorithm details */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-brand-navy font-bold text-base">
            <Sparkles className="h-5 w-5 text-brand-amber" />
            <h3>The FindOra Smart Matching System (Rule-Based Formulation)</h3>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            FindOra computes a weighted percentage score across five distinct vectors:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-center text-xs">
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <p className="text-base font-bold text-brand-navy">30%</p>
              <p className="text-[11px] text-neutral-500 font-medium">Category</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <p className="text-base font-bold text-brand-navy">25%</p>
              <p className="text-[11px] text-neutral-500 font-medium">Text Keywords</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <p className="text-base font-bold text-brand-navy">15%</p>
              <p className="text-[11px] text-neutral-500 font-medium">Color Match</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <p className="text-base font-bold text-brand-navy">15%</p>
              <p className="text-[11px] text-neutral-500 font-medium">Location</p>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
              <p className="text-base font-bold text-brand-navy">15%</p>
              <p className="text-[11px] text-neutral-500 font-medium">Date Proximity</p>
            </div>
          </div>
          <p className="text-[11px] text-neutral-500 italic pt-1">
            * Note: Matching suggestions never automatically transfer ownership. In accordance with university policy, all items require verified proctor approval.
          </p>
        </div>
      </div>
    </div>
  );
}
