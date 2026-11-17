import Link from "next/link";
import { Compass, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-brand-warm-border bg-brand-navy text-neutral-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand & Institution */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-brand-amber">
                <Compass className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Find<span className="text-brand-forest">Ora</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Official university-exclusive Lost and Found Management Platform for Pundra University of Science & Technology (PUST), Bogura.
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-amber font-medium">
              <ShieldCheck className="h-4 w-4" />
              Verified Institutional Community
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/items" className="hover:text-white transition-colors">
                  Browse All Items
                </Link>
              </li>
              <li>
                <Link href="/items/lost" className="hover:text-white transition-colors">
                  Lost Items Directory
                </Link>
              </li>
              <li>
                <Link href="/items/found" className="hover:text-white transition-colors">
                  Found Items Directory
                </Link>
              </li>
              <li>
                <Link href="/report/lost" className="hover:text-white transition-colors">
                  File a Lost Report
                </Link>
              </li>
              <li>
                <Link href="/report/found" className="hover:text-white transition-colors">
                  Hand-In Found Item
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Trust & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Information & Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  Verification & Claim Workflow
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About FindOra PUST
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Lost & Found Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Proctor Office Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campus Contact</h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-forest shrink-0 mt-0.5" />
                <span>Pundra University of Science & Technology, Rangpur Road, Gokul, Bogura-5800, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-forest shrink-0" />
                <span>Proctor Office Helpline: +880 1711-000001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-forest shrink-0" />
                <span>findora@pust.ac.bd</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} FindOra — Pundra University of Science & Technology. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built with Next.js, Supabase & Tailwind CSS</span>
            <span className="text-neutral-500">|</span>
            <span className="text-brand-amber font-medium">Tagline: Lost it. Found it. Bring it home.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

