"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Item } from "@/types";
import { submitClaimAction } from "@/lib/api/claims";
import { ShieldCheck, AlertCircle, CheckCircle } from "lucide-react";

export function ClaimModal({
  item,
  isOpen,
  onClose,
  onClaimSubmitted,
}: {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onClaimSubmitted?: () => void;
}) {
  const [evidence, setEvidence] = React.useState("");
  const [contactInfo, setContactInfo] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidence.trim() || !contactInfo.trim()) {
      setError("Please provide verifiable evidence and your active contact information.");
      return;
    }
    if (!consent) {
      setError("You must confirm the ownership statement under PUST code of conduct.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await submitClaimAction({
        item_id: item.id,
        evidence,
        contact_info: contactInfo,
      });
      setSuccess(true);
      if (onClaimSubmitted) onClaimSubmitted();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to submit claim. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEvidence("");
    setContactInfo("");
    setConsent(false);
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Submit Ownership Claim"
      description={`Verifying ownership for: "${item.title}"`}
    >
      {success ? (
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-brand-forest">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h4 className="text-base font-bold text-neutral-900">Ownership Claim Submitted</h4>
          <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
            Your claim and confidential evidence have been securely dispatched to the PUST Proctor & Security Office for administrative review. You will receive an in-app notification once verified.
          </p>
          <Button onClick={handleReset} variant="primary" className="mt-2">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-lg bg-amber-50 p-3 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" />
            <span>
              <strong>Private & Confidential:</strong> Only authorized university proctors and administrators can view your submitted evidence. Do not disclose public details here.
            </span>
          </div>

          <Textarea
            label="Detailed Ownership Evidence"
            placeholder="Describe unique marks, serial numbers, wallpaper, folder contents, lock passwords, exact scratch positions, or invoice numbers..."
            rows={4}
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            required
            helperText="State specific details that only the true owner would know."
          />

          <Input
            label="Contact Information"
            placeholder="e.g., Phone: +880 17XXXXXXXX / Telegram: @username"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            helperText="Used by proctor staff to reach you for physical item handover."
          />

          <label className="flex items-start gap-2 text-xs text-neutral-700 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 rounded border-neutral-300 text-brand-forest focus:ring-brand-forest"
            />
            <span>
              I solemnly affirm under the Pundra University Code of Conduct that I am the rightful owner of this item and all submitted proof is authentic.
            </span>
          </label>

          {error && (
            <div className="rounded-lg bg-rose-50 p-3 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isLoading}>
              Submit Claim for Verification
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
