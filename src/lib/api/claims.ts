"use server";

import { revalidatePath } from "next/cache";
import { store } from "@/lib/store/demo-data";
import { Claim } from "@/types";

export async function submitClaimAction(formData: {
  item_id: string;
  evidence: string;
  contact_info: string;
}) {
  const currentUser = store.getCurrentUser();
  if (currentUser.account_status !== "approved") {
    throw new Error("Only verified university members can submit ownership claims.");
  }

  const item = store.getItemById(formData.item_id);
  if (!item) throw new Error("Item not found");

  if (item.user_id === currentUser.id) {
    throw new Error("You cannot submit an ownership claim on your own post.");
  }

  const claim = store.createClaim({
    item_id: formData.item_id,
    claimant_id: currentUser.id,
    evidence: formData.evidence,
    contact_info: formData.contact_info,
  });

  revalidatePath(`/items/${formData.item_id}`);
  revalidatePath("/dashboard/claims");
  revalidatePath("/admin/claims");
  return { success: true, claim };
}

export async function getUserClaims(): Promise<Claim[]> {
  const currentUser = store.getCurrentUser();
  return store.getClaimsByClaimant(currentUser.id);
}

export async function getItemClaims(itemId: string): Promise<Claim[]> {
  const currentUser = store.getCurrentUser();
  const item = store.getItemById(itemId);
  if (!item) return [];

  // Security check: only item owner or admin can inspect claims
  if (item.user_id !== currentUser.id && currentUser.role !== "admin") {
    return [];
  }

  return store.getClaimsByItemId(itemId);
}

export async function resolveClaimAction(
  claimId: string,
  status: "approved" | "rejected",
  adminNotes?: string
) {
  const currentUser = store.getCurrentUser();
  if (currentUser.role !== "admin") {
    throw new Error("Unauthorized: Only university administrators can resolve claims.");
  }

  const result = store.resolveClaim(claimId, status, currentUser.id, adminNotes);
  if (!result) throw new Error("Claim resolution failed");

  revalidatePath("/admin/claims");
  revalidatePath("/dashboard/claims");
  revalidatePath("/items");
  return { success: true, claim: result };
}
