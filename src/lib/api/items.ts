"use server";

import { revalidatePath } from "next/cache";
import { store } from "@/lib/store/demo-data";
import { Item, FilterParams, SmartMatchResult } from "@/types";
import { findMatchesForItem } from "@/lib/matching";
import { createClient } from "@/lib/supabase/server";

export async function getItems(params: FilterParams = {}): Promise<{ items: Item[]; total: number }> {
  const supabase = createClient();

  if (supabase) {
    try {
      let query = supabase
        .from("items")
        .select("*, category:categories(*), user:profiles(*), images:item_images(*)", { count: "exact" });

      if (params.type && params.type !== "all") {
        query = query.eq("type", params.type);
      }
      if (params.category) {
        query = query.eq("category_id", params.category);
      }
      if (params.status && params.status !== "all") {
        query = query.eq("status", params.status);
      } else {
        query = query.neq("status", "archived");
      }
      if (params.search) {
        query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%,location.ilike.%${params.search}%`);
      }

      const { data, count, error } = await query.order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return { items: data as Item[], total: count || data.length };
      }
    } catch {
      // Fallback to in-memory store
    }
  }

  // In-Memory store filtering
  let items = store.getItems();

  if (params.type && params.type !== "all") {
    items = items.filter((i) => i.type === params.type);
  }

  if (params.category) {
    items = items.filter((i) => i.category_id === params.category || i.category?.slug === params.category);
  }

  if (params.color) {
    const col = params.color.toLowerCase();
    items = items.filter((i) => i.color.toLowerCase().includes(col));
  }

  if (params.location) {
    const loc = params.location.toLowerCase();
    items = items.filter((i) => i.location.toLowerCase().includes(loc));
  }

  if (params.status && params.status !== "all") {
    items = items.filter((i) => i.status === params.status);
  }

  if (params.search) {
    const query = params.search.toLowerCase();
    items = items.filter(
      (i) =>
        i.title.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query) ||
        i.location.toLowerCase().includes(query) ||
        (i.brand && i.brand.toLowerCase().includes(query))
    );
  }

  if (params.startDate) {
    items = items.filter((i) => new Date(i.incident_date) >= new Date(params.startDate!));
  }
  if (params.endDate) {
    items = items.filter((i) => new Date(i.incident_date) <= new Date(params.endDate!));
  }

  // Sorting
  if (params.sortBy === "oldest") {
    items.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  } else if (params.sortBy === "date_desc") {
    items.sort((a, b) => new Date(b.incident_date).getTime() - new Date(a.incident_date).getTime());
  } else if (params.sortBy === "date_asc") {
    items.sort((a, b) => new Date(a.incident_date).getTime() - new Date(b.incident_date).getTime());
  } else {
    // Default newest
    items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const total = items.length;
  const page = params.page || 1;
  const limit = params.limit || 20;
  const paginated = items.slice((page - 1) * limit, page * limit);

  return { items: paginated, total };
}

export async function getItemById(id: string): Promise<Item | null> {
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("items")
        .select("*, category:categories(*), user:profiles(*), images:item_images(*)")
        .eq("id", id)
        .single();
      if (!error && data) return data as Item;
    } catch {
      // Fallback
    }
  }

  const item = store.getItemById(id);
  return item || null;
}

export async function createItemAction(formData: {
  title: string;
  type: "lost" | "found";
  category_id: string;
  description: string;
  color: string;
  brand?: string;
  location: string;
  incident_date: string;
  identifying_marks?: string;
  image_urls?: string[];
}) {
  const currentUser = store.getCurrentUser();
  if (currentUser.account_status !== "approved") {
    throw new Error("Your account is pending institutional approval. You cannot post items yet.");
  }

  const images = (formData.image_urls || []).map((url, index) => ({
    id: `img-${Date.now()}-${index}`,
    item_id: "",
    storage_path: url,
    is_primary: index === 0,
  }));

  const newItem = store.createItem({
    user_id: currentUser.id,
    category_id: formData.category_id,
    title: formData.title,
    type: formData.type,
    description: formData.description,
    color: formData.color,
    brand: formData.brand || null,
    location: formData.location,
    incident_date: formData.incident_date,
    identifying_marks: formData.identifying_marks || null,
    status: "active",
    images,
  });

  // Automatically run matching against candidate pool
  const allOpposite = store.getItems().filter((i) => i.type !== newItem.type);
  const potentialMatches = findMatchesForItem(newItem, allOpposite);
  if (potentialMatches.length > 0 && potentialMatches[0].totalScore >= 70) {
    // Flag item status as matched
    store.updateItem(newItem.id, { status: "matched" });
    // Notify the user
    store.addNotification({
      user_id: currentUser.id,
      title: `Potential Match Detected (${potentialMatches[0].totalScore}%)`,
      message: `We found a potential match for your ${newItem.type} item "${newItem.title}". Check your Possible Matches dashboard.`,
      type: "match",
      link: "/dashboard/matches",
    });
  }

  revalidatePath("/items");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/posts");
  return { success: true, item: newItem };
}

export async function updateItemAction(
  id: string,
  updates: Partial<Item>
) {
  const currentUser = store.getCurrentUser();
  const item = store.getItemById(id);
  if (!item) throw new Error("Item not found");

  if (item.user_id !== currentUser.id && currentUser.role !== "admin") {
    throw new Error("Unauthorized to edit this post");
  }

  const updated = store.updateItem(id, updates, currentUser.id);
  revalidatePath(`/items/${id}`);
  revalidatePath("/items");
  revalidatePath("/dashboard/posts");
  return { success: true, item: updated };
}

export async function archiveItemAction(id: string) {
  const currentUser = store.getCurrentUser();
  const item = store.getItemById(id);
  if (!item) throw new Error("Item not found");

  if (item.user_id !== currentUser.id && currentUser.role !== "admin") {
    throw new Error("Unauthorized to archive this post");
  }

  store.archiveItem(id, currentUser.id);
  revalidatePath("/items");
  revalidatePath("/dashboard/posts");
  return { success: true };
}

export async function getItemMatches(itemId: string): Promise<SmartMatchResult[]> {
  const target = store.getItemById(itemId);
  if (!target) return [];

  const candidates = store.getItems().filter((i) => i.type !== target.type);
  return findMatchesForItem(target, candidates);
}

export async function getAllUserMatches(): Promise<SmartMatchResult[]> {
  const currentUser = store.getCurrentUser();
  const userItems = store.getItems().filter((i) => i.user_id === currentUser.id);
  const candidates = store.getItems().filter((i) => i.user_id !== currentUser.id);

  const results: SmartMatchResult[] = [];
  const seenPairKeys = new Set<string>();

  for (const item of userItems) {
    const pool = candidates.filter((c) => c.type !== item.type);
    const matches = findMatchesForItem(item, pool);
    for (const match of matches) {
      const pairKey = [match.targetItem.id, match.matchedItem.id].sort().join("::");
      if (!seenPairKeys.has(pairKey)) {
        seenPairKeys.add(pairKey);
        results.push(match);
      }
    }
  }

  return results.sort((a, b) => b.totalScore - a.totalScore);
}

