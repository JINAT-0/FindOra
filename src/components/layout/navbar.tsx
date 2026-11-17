"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  PlusCircle,
  Bell,
  ShieldAlert,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  FileCheck,
  Search,
  Sparkles,
  Layers,
  ArrowRightLeft,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store/demo-data";
import { Profile } from "@/types";
import { switchDemoUserAction } from "@/lib/api/profile";

export function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = React.useState<Profile>(store.getCurrentUser());
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = React.useState(false);

  React.useEffect(() => {
    const user = store.getCurrentUser();
    setCurrentUser(user);
    const notifs = store.getNotifications(user.id).filter((n) => !n.is_read);
    setUnreadCount(notifs.length);
  }, [pathname]);

  const handleSwitchUser = async (userId: string) => {
    await switchDemoUserAction(userId);
    const updated = store.getCurrentUser();
    setCurrentUser(updated);
    setRoleSwitcherOpen(false);
    setUserDropdownOpen(false);
    window.location.reload();
  };

  const isPending = currentUser.account_status === "pending";
  const isAdmin = currentUser.role === "admin";

  return (
    <>
      {/* Pending Account Notice Banner */}
      {isPending && (
        <div className="bg-amber-500 text-white px-4 py-2 text-xs md:text-sm font-medium flex items-center justify-between text-center shadow-inner">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 shrink-0" />
            <span>
              Your PUST university membership is currently <strong>Pending Admin Verification</strong>. Once verified by the Proctor Office, you can post items and file claims.
            </span>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-brand-warm-border/80 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white shadow-sm transition-transform group-hover:scale-105">
                <Compass className="h-5 w-5 text-brand-amber" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-brand-navy">
                  Find<span className="text-brand-forest">Ora</span>
                </span>
                <span className="text-[10px] -mt-1 font-medium text-neutral-500 tracking-wider uppercase">
                  PUST Bogura
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-neutral-600">
              <Link
                href="/items"
                className={`px-3 py-1.5 rounded-lg transition-colors hover:text-brand-navy hover:bg-neutral-100 ${
                  pathname === "/items" ? "text-brand-navy bg-neutral-100 font-semibold" : ""
                }`}
              >
                Explore Items
              </Link>
              <Link
                href="/items/lost"
                className={`px-3 py-1.5 rounded-lg transition-colors hover:text-brand-navy hover:bg-neutral-100 ${
                  pathname === "/items/lost" ? "text-brand-navy bg-neutral-100 font-semibold" : ""
                }`}
              >
                Lost
              </Link>
              <Link
                href="/items/found"
                className={`px-3 py-1.5 rounded-lg transition-colors hover:text-brand-navy hover:bg-neutral-100 ${
                  pathname === "/items/found" ? "text-brand-navy bg-neutral-100 font-semibold" : ""
                }`}
              >
                Found
              </Link>
              <Link
                href="/how-it-works"
                className={`px-3 py-1.5 rounded-lg transition-colors hover:text-brand-navy hover:bg-neutral-100 ${
                  pathname === "/how-it-works" ? "text-brand-navy bg-neutral-100 font-semibold" : ""
                }`}
              >
                How It Works
              </Link>
              <Link
                href="/about"
                className={`px-3 py-1.5 rounded-lg transition-colors hover:text-brand-navy hover:bg-neutral-100 ${
                  pathname === "/about" ? "text-brand-navy bg-neutral-100 font-semibold" : ""
                }`}
              >
                About
              </Link>
            </nav>
          </div>

          {/* Action Area & User Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Post Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/report/lost">
                <Button variant="outline" size="sm" className="border-amber-300 text-amber-800 hover:bg-amber-50">
                  <span className="h-2 w-2 rounded-full bg-brand-amber mr-1.5" />
                  Report Lost
                </Button>
              </Link>
              <Link href="/report/found">
                <Button variant="primary" size="sm">
                  <PlusCircle className="h-4 w-4 mr-1.5" />
                  Report Found
                </Button>
              </Link>
            </div>

            {/* Admin Center Quick Access */}
            {isAdmin && (
              <Link href="/admin">
                <Button variant="navy" size="sm" className="hidden lg:flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 text-brand-amber" />
                  Admin Panel
                </Button>
              </Link>
            )}

            {/* Notifications Bell */}
            <Link
              href="/dashboard/notifications"
              className="relative p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                {currentUser.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentUser.avatar_url}
                    alt={currentUser.full_name}
                    className="h-7 w-7 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-lg bg-brand-navy text-white flex items-center justify-center text-xs font-semibold">
                    {currentUser.full_name.charAt(0)}
                  </div>
                )}
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-semibold text-neutral-900 leading-tight">
                    {currentUser.full_name}
                  </span>
                  <span className="text-[10px] text-neutral-500 capitalize">
                    {currentUser.role === "admin" ? "Administrator" : currentUser.member_type}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
              </button>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 rounded-xl border border-neutral-200 bg-white p-2 shadow-dropdown z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-bold text-neutral-900">{currentUser.full_name}</p>
                    <p className="text-[11px] text-neutral-500 truncate">{currentUser.email || currentUser.university_id}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-navy-subtle text-brand-navy font-semibold uppercase">
                        {currentUser.member_type}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold capitalize ${
                        currentUser.account_status === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                      }`}>
                        {currentUser.account_status}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    <Compass className="h-4 w-4 text-brand-forest" />
                    Member Dashboard
                  </Link>

                  <Link
                    href="/dashboard/posts"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    <Layers className="h-4 w-4 text-neutral-500" />
                    My Listings & Posts
                  </Link>

                  <Link
                    href="/dashboard/claims"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    <FileCheck className="h-4 w-4 text-neutral-500" />
                    My Ownership Claims
                  </Link>

                  <Link
                    href="/dashboard/matches"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    <Sparkles className="h-4 w-4 text-brand-amber" />
                    Smart Match Suggestions
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    <User className="h-4 w-4 text-neutral-500" />
                    Profile & Verification
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-brand-navy bg-brand-navy/5 hover:bg-brand-navy/10 mt-1"
                    >
                      <ShieldAlert className="h-4 w-4 text-brand-amber" />
                      Proctor Admin Suite
                    </Link>
                  )}

                  <div className="border-t border-neutral-100 my-1 pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRoleSwitcherOpen(!roleSwitcherOpen);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-brand-navy hover:bg-neutral-100"
                    >
                      <span className="flex items-center gap-2">
                        <ArrowRightLeft className="h-3.5 w-3.5" />
                        Switch Persona (Demo)
                      </span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>

                    {roleSwitcherOpen && (
                      <div className="bg-neutral-50 p-1.5 rounded-lg border border-neutral-200 mt-1 space-y-1">
                        {store.getProfiles().map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleSwitchUser(p.id)}
                            className={`w-full text-left px-2 py-1.5 rounded text-[11px] flex items-center justify-between ${
                              p.id === currentUser.id ? "bg-white font-bold text-brand-navy shadow-xs" : "text-neutral-600 hover:bg-neutral-200/60"
                            }`}
                          >
                            <span>{p.full_name}</span>
                            <span className="text-[9px] uppercase px-1 rounded bg-neutral-200 text-neutral-700">
                              {p.role === "admin" ? "admin" : p.account_status}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    <Link
                      href="/login"
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <Link href="/report/lost" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full border-amber-300 text-amber-800">
                  Report Lost
                </Button>
              </Link>
              <Link href="/report/found" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  Report Found
                </Button>
              </Link>
            </div>
            <div className="flex flex-col space-y-1">
              <Link
                href="/items"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Explore Items
              </Link>
              <Link
                href="/items/lost"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Lost Items
              </Link>
              <Link
                href="/items/found"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Found Items
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/matches"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Smart Matches
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                How It Works
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                About FindOra
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100"
              >
                Contact & Support
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-bold text-brand-navy bg-brand-navy/10"
                >
                  Admin Center
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

