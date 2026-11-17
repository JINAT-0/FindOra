"use server";

import { revalidatePath } from "next/cache";
import { store } from "@/lib/store/demo-data";
import { Profile, PlatformStats, Report, ItemHistory, Category, AccountStatus } from "@/types";

function checkAdmin() {
  const currentUser = store.getCurrentUser();
  if (currentUser.role !== "admin") {
    throw new Error("Unauthorized: Administrator privileges required.");
  }
  return currentUser;
}

export async function getAdminStats(): Promise<PlatformStats> {
  checkAdmin();
  return store.getPlatformStats();
}

export async function getAdminUsers(): Promise<Profile[]> {
  checkAdmin();
  return store.getProfiles();
}

export async function updateMemberStatusAction(userId: string, status: AccountStatus) {
  checkAdmin();
  const updated = store.updateUserStatus(userId, status);
  if (!updated) throw new Error("User not found");

  revalidatePath("/admin/users");
  revalidatePath("/admin/memberships");
  revalidatePath("/admin");
  return { success: true, profile: updated };
}

export async function getAdminReports(): Promise<Report[]> {
  checkAdmin();
  return store.getReports();
}

export async function resolveReportAction(reportId: string, status: "reviewed" | "dismissed") {
  const admin = checkAdmin();
  const resolved = store.resolveReport(reportId, status, admin.id);
  if (!resolved) throw new Error("Report not found");

  revalidatePath("/admin/reports");
  return { success: true, report: resolved };
}

export async function getAdminAuditLogs(): Promise<ItemHistory[]> {
  checkAdmin();
  return store.getItemHistory();
}

export async function addCategoryAction(data: { name: string; slug: string; icon: string; description?: string }): Promise<{ success: boolean; category: Category }> {
  checkAdmin();
  const newCat = store.addCategory(data);
  revalidatePath("/admin/categories");
  revalidatePath("/items");
  return { success: true, category: newCat };
}

