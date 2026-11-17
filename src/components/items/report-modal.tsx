"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Item } from "@/types";
import { reportItemAction } from "@/lib/api/profile";
import { AlertTriangle, CheckCircle } from "lucide-react";

export function ReportModal({
  item,
  isOpen,
  onClose,
}: {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [reason, setReason] = React.useState("Spam or duplicate post");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await reportItemAction({
        item_id: item.id,
        reason,
        description,
      });
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to submit report. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReason("Spam or duplicate post");
    setDescription("");
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title="Report Listing to Administration"
      description={`Reporting post: "${item.title}"`}
    >
      {success ? (
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-brand-forest">
            <CheckCircle className="h-6 w-6" />
          </div>
          <h4 className="text-base font-bold text-neutral-900">Report Filed</h4>
          <p className="text-xs text-neutral-600 max-w-sm mx-auto">
            Thank you for helping keep FindOra safe. University administrators will review this report promptly.
          </p>
          <Button onClick={handleReset} variant="primary" size="sm">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Reason for Report"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            options={[
              { value: "Spam or duplicate post", label: "Spam or duplicate post" },
              { value: "Inappropriate or abusive content", label: "Inappropriate or abusive content" },
              { value: "Misleading information or fake item", label: "Misleading information or fake item" },
              { value: "Suspicious ownership or phishing", label: "Suspicious ownership or phishing" },
              { value: "Other violation of campus code", label: "Other violation of campus code" },
            ]}
          />

          <Textarea
            label="Additional Details (Optional)"
            placeholder="Please provide any extra context to help proctor staff investigate..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p className="text-xs font-medium text-rose-600">{error}</p>}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
            <Button type="button" variant="outline" size="sm" onClick={handleReset}>
              Cancel
            </Button>
            <Button type="submit" variant="danger" size="sm" isLoading={isLoading}>
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              Submit Report
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

