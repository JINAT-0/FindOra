"use client";

import * as React from "react";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy-subtle text-brand-navy text-xs font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            Proctor & Security Wing
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Contact FindOra Support
          </h1>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Have urgent questions regarding a high-value lost item, claim dispute, or institutional membership verification? Reach out to the university proctor team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information & Office Hours */}
          <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card space-y-6">
            <h3 className="text-lg font-bold text-brand-navy pb-3 border-b border-neutral-100">
              Campus Security & Proctor Office
            </h3>

            <div className="space-y-4 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Physical Office Location</p>
                  <p className="leading-relaxed">
                    Ground Floor, Academic Building 1, Room 108 <br />
                    Pundra University of Science & Technology, Gokul, Bogura-5800
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Office Working Hours</p>
                  <p className="leading-relaxed">
                    Saturday — Thursday: 09:00 AM – 05:00 PM <br />
                    Friday: Closed (Emergency campus security gate remains active 24/7)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Helpline / Phone</p>
                  <p className="leading-relaxed">+880 1711-000001 (Proctor Desk)</p>
                  <p className="leading-relaxed">+880 1711-000002 (Campus Gate 1 Security)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-neutral-900">Official Inquiries</p>
                  <p className="leading-relaxed">findora@pust.ac.bd</p>
                  <p className="leading-relaxed">proctor@pust.ac.bd</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-brand-warm-border bg-white p-8 shadow-card space-y-6">
            <h3 className="text-lg font-bold text-brand-navy pb-3 border-b border-neutral-100">
              Send an Official Inquiry
            </h3>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-brand-forest">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-neutral-900">Message Received</h4>
                <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                  Thank you, {name}. Your inquiry has been forwarded to the PUST Proctor Office. You will receive an official response via your email shortly.
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="e.g. Sourov Sarkar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="e.g. student@pust.ac.bd or personal email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Subject"
                  placeholder="e.g. Inquiring about Lost Scientific Calculator Casio"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                <Textarea
                  label="Inquiry Details"
                  placeholder="Describe your question, item ID, or claim reference number in detail..."
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" size="md" className="w-full">
                  <Send className="h-4 w-4 mr-1.5" />
                  Submit Inquiry
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

