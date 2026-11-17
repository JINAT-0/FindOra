import Link from "next/link";
import {
  Compass,
  Search,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Lock,
  Building2,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store/demo-data";
import { ItemCard } from "@/components/items/item-card";

export default function LandingPage() {
  const stats = store.getPlatformStats();
  const allItems = store.getItems();
  const recentLost = allItems.filter((i) => i.type === "lost").slice(0, 4);
  const recentFound = allItems.filter((i) => i.type === "found").slice(0, 4);
  const categories = store.getCategories();

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-brand-navy text-white py-20 lg:py-28">
        {/* Subtle background university architectural accents */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* University Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-brand-amber">
              <Building2 className="h-3.5 w-3.5" />
              <span>Pundra University of Science & Technology, Bogura</span>
            </div>

            {/* Main Headline & Tagline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Lost it. Found it. <br />
              <span className="text-brand-forest">Bring it home.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              The official, secure university-exclusive Lost and Found network. Connect with fellow students, faculty, and campus security to recover lost belongings with confidential ownership verification.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto pt-4">
              <form
                action="/items"
                method="GET"
                className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-white shadow-2xl border border-white/20"
              >
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by item name, room number, brand or color..."
                    className="w-full rounded-xl pl-11 pr-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto shrink-0">
                  Search Catalog
                </Button>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/report/lost">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-amber-400/50 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-amber mr-2" />
                  I Lost Something
                </Button>
              </Link>
              <Link href="/report/found">
                <Button variant="primary" size="lg">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  I Found an Item
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL PLATFORM METRICS */}
      <section className="bg-white border-b border-brand-warm-border py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-brand-navy">{stats.approvedUsers}+</p>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Verified PUST Members</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-brand-forest">{stats.recoveryRate}%</p>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Item Recovery Rate</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-brand-amber">{stats.totalLostPosts + stats.totalFoundPosts}</p>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Total Cataloged Items</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-extrabold text-brand-navy">{stats.reunitedItems}</p>
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Reunited with Owners</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECENTLY REPORTED LOST */}
      <section className="py-16 bg-brand-warm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                <span className="h-2 w-2 rounded-full bg-brand-amber" />
                Active Searches
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">Recently Lost on Campus</h2>
              <p className="text-sm text-neutral-600 mt-1">Help your university peers recover these missing belongings</p>
            </div>
            <Link href="/items/lost" className="text-sm font-semibold text-brand-navy hover:text-brand-forest flex items-center gap-1">
              View All Lost Items <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentLost.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENTLY HANDED-IN FOUND */}
      <section className="py-16 bg-white border-t border-b border-brand-warm-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                <span className="h-2 w-2 rounded-full bg-brand-forest" />
                Safe Custody
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">Recently Found Items</h2>
              <p className="text-sm text-neutral-600 mt-1">Found something yours? Submit an ownership claim with evidence</p>
            </div>
            <Link href="/items/found" className="text-sm font-semibold text-brand-navy hover:text-brand-forest flex items-center gap-1">
              View All Found Items <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentFound.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-brand-warm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-forest">Step-by-Step Workflow</h2>
            <h3 className="text-3xl font-bold text-brand-navy">How FindOra Reunites Belongings</h3>
            <p className="text-sm text-neutral-600">
              Designed with strict privacy safeguards and university proctor oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-brand-amber">
                <PlusCircle className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-brand-navy">1. Report with Photographs</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Post lost or found belongings in seconds. Specify the campus location, date, color, and photos. Sensitive serial numbers remain protected.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-brand-forest">
                <Sparkles className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-brand-navy">2. Smart Match Engine</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our rule-based matching engine pairs lost posts with found logs across category, keywords, color, location, and date proximity.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-brand-navy">
                <FileCheck2 className="h-7 w-7" />
              </div>
              <h4 className="text-lg font-bold text-brand-navy">3. Verified Ownership Handover</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Submit confidential proof (lock codes, receipts, unique markings). Once proctors verify, claim the item at the PUST security office.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUST & SAFETY SECTION */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-brand-forest text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">University-Exclusive Security Standards</h3>
                <p className="text-xs text-neutral-300">Protected by PUST Proctor Office Regulations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Administrator-Approved Membership:</strong> Only verified students, teachers, and university staff can browse protected item information and file claims.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Confidential Evidence Vault:</strong> Ownership proof (passcodes, student ID roll numbers, receipts) is never shown publicly. Only administrators review claims.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Audit History Tracking:</strong> Every status transition from initial report to final handover is preserved permanently in the database audit log.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Public Bounty Scams:</strong> No monetary rewards or extortion. The platform operates solely on institutional integrity and community assistance.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-brand-warm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-brand-forest">Help & FAQ</h2>
            <h3 className="text-3xl font-bold text-brand-navy">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-brand-warm-border bg-white p-5 shadow-card">
              <h4 className="text-sm font-bold text-brand-navy mb-1">
                Who can register and report items on FindOra?
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                FindOra is exclusively available to active students, faculty members, and authorized administrative staff of Pundra University of Science & Technology (PUST). All new registrations undergo membership verification before access is granted.
              </p>
            </div>

            <div className="rounded-xl border border-brand-warm-border bg-white p-5 shadow-card">
              <h4 className="text-sm font-bold text-brand-navy mb-1">
                Where should I physically hand over an item I found on campus?
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                After submitting a Found Report on FindOra, please deposit high-value items (smartphones, laptops, wallets, ID cards) directly to the PUST Proctor & Security Office in Academic Building 1.
              </p>
            </div>

            <div className="rounded-xl border border-brand-warm-border bg-white p-5 shadow-card">
              <h4 className="text-sm font-bold text-brand-navy mb-1">
                How does the Smart Matching System work?
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                When a post is submitted, our algorithm computes a weighted similarity score comparing categories (30%), title/description keywords (25%), color (15%), campus location (15%), and incident date proximity (15%). If a match exceeds 70%, both parties receive automated notifications.
              </p>
            </div>

            <div className="rounded-xl border border-brand-warm-border bg-white p-5 shadow-card">
              <h4 className="text-sm font-bold text-brand-navy mb-1">
                How do I prove an item belongs to me?
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Submit an Ownership Claim on the found item page. Provide details known only to the owner: unique scratch marks, lock screen wallpaper, folder contents, lock combination, or original purchase receipt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
