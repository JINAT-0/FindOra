"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, RotateCcw } from "lucide-react";
import { store } from "@/lib/store/demo-data";
import { Button } from "@/components/ui/button";

export function ItemFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [type, setType] = React.useState(searchParams.get("type") || "all");
  const [category, setCategory] = React.useState(searchParams.get("category") || "");
  const [status, setStatus] = React.useState(searchParams.get("status") || "all");
  const [sortBy, setSortBy] = React.useState(searchParams.get("sortBy") || "newest");

  const categories = store.getCategories();

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (type && type !== "all") params.set("type", type);
    if (category) params.set("category", category);
    if (status && status !== "all") params.set("status", status);
    if (sortBy && sortBy !== "newest") params.set("sortBy", sortBy);

    router.push(`/items?${params.toString()}`);
  };

  const handleReset = () => {
    setSearch("");
    setType("all");
    setCategory("");
    setStatus("all");
    setSortBy("newest");
    router.push("/items");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  return (
    <div className="rounded-xl border border-brand-warm-border bg-white p-4 shadow-card mb-6 space-y-4">
      {/* Top search bar row */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by title, description, location, or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-neutral-300 pl-10 pr-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={applyFilters} variant="navy" size="md">
            <Filter className="h-4 w-4 mr-1.5" />
            Apply Filters
          </Button>
          <Button onClick={handleReset} variant="outline" size="md" title="Reset Filters">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Select Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-neutral-100 text-xs">
        {/* Type Filter */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-500 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-brand-navy focus:outline-none"
          >
            <option value="all">All Items (Lost & Found)</option>
            <option value="lost">Lost Belongings</option>
            <option value="found">Found Belongings</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-500 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-brand-navy focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-500 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-brand-navy focus:outline-none"
          >
            <option value="all">All Active Statuses</option>
            <option value="active">Active</option>
            <option value="matched">Match Found</option>
            <option value="pending_claim">Claim Pending</option>
            <option value="reunited">Reunited</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-[11px] font-medium text-neutral-500 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white px-2.5 py-1.5 text-xs text-neutral-800 focus:border-brand-navy focus:outline-none"
          >
            <option value="newest">Newest Listed</option>
            <option value="oldest">Oldest Listed</option>
            <option value="date_desc">Incident Date (Recent)</option>
            <option value="date_asc">Incident Date (Earliest)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
