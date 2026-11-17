import Link from "next/link";
import { Compass, ShieldCheck, HeartHandshake, Award, Users, MapPin, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-subtle text-brand-navy text-xs font-semibold">
            <Building2 className="h-3.5 w-3.5" />
            Pundra University of Science & Technology
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            About FindOra
          </h1>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            A dedicated, institutional-grade Lost and Found platform built to restore peace of mind and reunite personal belongings with their rightful owners across the PUST campus.
          </p>
        </div>

        {/* Mission Card */}
        <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
            <div className="p-2.5 rounded-xl bg-brand-forest text-white">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-navy">Our Mission & Tagline</h2>
              <p className="text-xs font-semibold text-brand-amber">&ldquo;Lost it. Found it. Bring it home.&rdquo;</p>
            </div>
          </div>
          <p className="text-sm text-neutral-700 leading-relaxed">
            At Pundra University of Science & Technology, thousands of students, faculty members, and administrative staff move across faculties, lecture theatres, engineering laboratories, the central library, and cafeterias every day. It is inevitable that essential personal belongings—such as scientific calculators, student identification cards, laptops, USB flash drives, eyeglasses, and course registers—get misplaced.
          </p>
          <p className="text-sm text-neutral-700 leading-relaxed">
            Prior to FindOra, noticeboards and social media groups were fragmented, insecure, and prone to fraudulent claims. FindOra centralizes all campus lost-and-found records into a single, reliable university platform featuring rule-based smart matching, verified membership identity, and confidential ownership verification overseen by the Proctor Office.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-brand-warm-border bg-white p-6 shadow-card space-y-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-brand-forest flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy">Institutional Security</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Every member is verified against official student and faculty records. Sensitive evidence is kept strictly private between the claimant and authorized proctors.
            </p>
          </div>

          <div className="rounded-xl border border-brand-warm-border bg-white p-6 shadow-card space-y-3">
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-brand-amber flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy">Rule-Based Intelligence</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Automated multi-attribute scoring eliminates endless manual scrolling by highlighting high-confidence matches with clear explanations.
            </p>
          </div>

          <div className="rounded-xl border border-brand-warm-border bg-white p-6 shadow-card space-y-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-brand-navy flex items-center justify-center">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-brand-navy">Campus Integrity</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Promoting an ethical university atmosphere where lost belongings are responsibly handed in and swiftly returned to their genuine owners.
            </p>
          </div>
        </div>

        {/* University Location Banner */}
        <div className="rounded-2xl bg-brand-navy text-white p-8 space-y-4">
          <div className="flex items-center gap-2 text-brand-amber text-xs font-bold uppercase tracking-wider">
            <MapPin className="h-4 w-4" />
            Campus Location
          </div>
          <h3 className="text-2xl font-bold">Pundra University of Science & Technology</h3>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Rangpur Road, Gokul, Bogura-5800, Rajshahi Division, Bangladesh. <br />
            FindOra is managed in coordination with the PUST Proctor & Campus Security Wing.
          </p>
          <div className="pt-2">
            <Link href="/items">
              <Button variant="primary" size="md">
                Browse Campus Listings <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
