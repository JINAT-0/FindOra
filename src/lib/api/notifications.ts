"use server";

import { revalidatePath } from "next/cache";
import { store } from "@/lib/store/demo-data";
import { Notification } from "@/types";

export async function getUserNotifications(): Promise<Notification[]> {
  const currentUser = store.getCurrentUser();
  return store.getNotifications(currentUser.id);
}

export async function markNotificationReadAction(notificationId: string) {
  const success = store.markNotificationAsRead(notificationId);
  revalidatePath("/dashboard/notifications");
  return { success };
}

export async function markAllNotificationsReadAction() {
  const currentUser = store.getCurrentUser();
  store.markAllNotificationsRead(currentUser.id);
  revalidatePath("/dashboard/notifications");
  return { success: true };
}

