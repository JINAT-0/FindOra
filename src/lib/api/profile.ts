"use server";

import { revalidatePath } from "next/cache";
import { store } from "@/lib/store/demo-data";
import { Profile } from "@/types";

export async function getCurrentUserProfile(): Promise<Profile> {
  return store.getCurrentUser();
}

export async function updateCurrentUserProfile(data: {
  full_name?: string;
  phone_number?: string;
  department?: string;
  avatar_url?: string;
}) {
  const current = store.getCurrentUser();
  const updated = store.updateProfile(current.id, data);
  if (!updated) throw new Error("Failed to update profile");

  revalidatePath("/dashboard/profile");
  revalidatePath("/dashboard");
  return { success: true, profile: updated };
}

export async function switchDemoUserAction(userId: string) {
  const user = store.setCurrentUser(userId);
  if (!user) throw new Error("User not found");

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/items");
  revalidatePath("/admin");
  return { success: true, user };
}

export async function reportItemAction(formData: {
  item_id: string;
  reason: string;
  description?: string;
}) {
  const currentUser = store.getCurrentUser();
  if (currentUser.account_status !== "approved") {
    throw new Error("Only verified members can report listings.");
  }

  const report = store.createReport({
    item_id: formData.item_id,
    reporter_id: currentUser.id,
    reason: formData.reason,
    description: formData.description,
  });

  return { success: true, report };
}
