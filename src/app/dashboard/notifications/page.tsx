import { store } from "@/lib/store/demo-data";
import { NotificationsView } from "@/components/notifications/notifications-view";

export default function NotificationsPage() {
  const currentUser = store.getCurrentUser();
  const notifications = store.getNotifications(currentUser.id);

  return <NotificationsView initialNotifications={notifications} />;
}
