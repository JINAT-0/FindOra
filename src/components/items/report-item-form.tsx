"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  X,
  AlertCircle,
  Building2,
  Calendar,
  Tag,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Category, ItemType } from "@/types";
import { createItemAction } from "@/lib/api/items";

export function ReportItemForm({
  type,
  categories,
}: {
  type: ItemType;
  categories: Category[];
}) {
  const router = useRouter();

  const [title, setTitle] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(categories[0]?.id || "");
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [incidentDate, setIncidentDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [identifyingMarks, setIdentifyingMarks] = React.useState("");
  const [imageUrls, setImageUrls] = React.useState<string[]>([
    type === "lost"
      ? "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&auto=format&fit=crop&q=80",
  ]);
  const [newImageUrl, setNewImageUrl] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleAddImageUrl = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !color.trim() || !location.trim()) {
      setError("Please complete all required fields (title, description, color, location).");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await createItemAction({
        title,
        type,
        category_id: categoryId,
        description,
        color,
        brand: brand.trim() || undefined,
        location,
        incident_date: incidentDate,
        identifying_marks: identifyingMarks.trim() || undefined,
        image_urls: imageUrls,
      });

      if (result.success && result.item) {
        router.push(`/items/${result.item.id}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create post. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isLost = type === "lost";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={isLost ? "Lost Item Name" : "Found Item Name"}
          placeholder={isLost ? "e.g., Casio fx-991EX Calculator" : "e.g., Black HP Laptop Charger"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Select
          label="Item Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
      </div>

      {/* Description */}
      <Textarea
        label="Detailed Description"
        placeholder={
          isLost
            ? "Describe when and how you realized it was missing, unique physical characteristics..."
            : "Describe the condition of the object, where on campus it was found..."
        }
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Color, Brand & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Primary Color"
          placeholder="e.g. Matte Black, Navy Blue"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
        <Input
          label="Brand / Manufacturer"
          placeholder="e.g. Casio, Dell, SanDisk"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          helperText="Optional"
        />
        <Input
          label="Incident Date"
          type="date"
          value={incidentDate}
          onChange={(e) => setIncidentDate(e.target.value)}
          required
        />
      </div>

      {/* Location */}
      <Input
        label={isLost ? "Last Seen Campus Location" : "Campus Location Found"}
        placeholder="e.g., Central Library 2nd Floor, Room 302, Cafeteria Counter"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      {/* Identifying Marks */}
      <Textarea
        label="Identifying Information / Unique Marks"
        placeholder={
          isLost
            ? "e.g. Student roll number etched on reverse, specific sticker, tiny tear in seam..."
            : "e.g. Has specific stickers, keychain attachments (Keep private secrets confidential)"
        }
        rows={2}
        value={identifyingMarks}
        onChange={(e) => setIdentifyingMarks(e.target.value)}
        helperText="Used by proctors and the smart matching algorithm to verify ownership."
      />

      {/* Images Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-neutral-700">
          Photographs / Reference Images
        </label>
        
        {/* Preview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 group bg-neutral-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Upload ${idx + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600 text-white shadow-sm hover:bg-rose-700 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add photo URL */}
        <div className="flex gap-2">
          <Input
            placeholder="Paste image URL (or Supabase storage upload)"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
          />
          <Button type="button" variant="outline" size="md" onClick={handleAddImageUrl} className="shrink-0">
            <UploadCloud className="h-4 w-4 mr-1.5" />
            Add Image
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 p-3 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant={isLost ? "navy" : "primary"}
          size="lg"
          isLoading={isLoading}
        >
          {isLost ? "Publish Lost Item Listing" : "Publish Found Item Listing"}
        </Button>
      </div>
    </form>
  );
}
