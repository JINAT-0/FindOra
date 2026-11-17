"use client";

import * as React from "react";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addCategoryAction } from "@/lib/api/admin";
import { Tags, Plus, CheckCircle2, Tag } from "lucide-react";

export function CategoryManagementView({
  initialCategories,
  itemCounts,
}: {
  initialCategories: Category[];
  itemCounts: Record<string, number>;
}) {
  const [categories, setCategories] = React.useState(initialCategories);
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAddForm, setShowAddForm] = React.useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const res = await addCategoryAction({
        name,
        slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
        icon: "Tag",
        description,
      });

      if (res.success && res.category) {
        setCategories([...categories, res.category]);
        setName("");
        setSlug("");
        setDescription("");
        setShowAddForm(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500 font-medium">
          Total Categories: {categories.length}
        </span>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="h-4 w-4 mr-1.5" />
          {showAddForm ? "Close Form" : "Add New Category"}
        </Button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleAddCategory}
          className="rounded-2xl border border-brand-warm-border bg-white p-6 shadow-card space-y-4 animate-in fade-in"
        >
          <h3 className="text-sm font-bold text-brand-navy">Create Item Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Category Name"
              placeholder="e.g. Sports & Fitness Equipment"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
            <Input
              label="URL Slug"
              placeholder="sports-equipment"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <Textarea
            label="Description"
            placeholder="Briefly describe what items fall under this classification..."
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isLoading}>
              Save Category
            </Button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl border border-brand-warm-border bg-white p-5 shadow-card space-y-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="h-8 w-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
                  <Tag className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                  {itemCounts[cat.id] || 0} items
                </span>
              </div>
              <h4 className="text-sm font-bold text-neutral-900">{cat.name}</h4>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                {cat.description || "Campus belongings classification"}
              </p>
            </div>
            <div className="pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 font-mono">
              slug: {cat.slug}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
