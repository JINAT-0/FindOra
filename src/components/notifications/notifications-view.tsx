"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  CheckCheck,
  Sparkles,
  FileCheck,
  Clock,
  ShieldCheck,
  Info,
} from "lucide-react";
import { Notification } from "@/types";
import { Button } from "@/components/ui/button";
import { markNotificationReadAction, markAllNotificationsReadAction } from "@/lib/api/notifications";
import { formatDateTime } from "@/lib/utils";

export function NotificationsView({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [notifications, setNotifications] = React.useState(initialNotifications);

  const handleMarkAsRead = async (id: string) => {
    await markNotificationReadAction(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const handleMarkAllRead = async () => {
    await markAllNotificationsReadAction();
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "match":
        return <Sparkles className="h-4 w-4 text-brand-amber" />;
      case "claim":
        return <FileCheck className="h-4 w-4 text-brand-forest" />;
      case "membership":
        return <ShieldCheck className="h-4 w-4 text-brand-navy" />;
      default:
        return <Bell className="h-4 w-4 text-neutral-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">Notifications</h1>
          <p className="text-xs text-neutral-500 mt-1">
            Important updates regarding your listings, claims, and institutional status
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
          Mark All as Read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-neutral-200 bg-white">
          <p className="text-xs text-neutral-500">You do not have any notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all ${
                notif.is_read
                  ? "bg-white border-neutral-200/80 text-neutral-700"
                  : "bg-amber-50/40 border-amber-200 text-neutral-900 shadow-xs"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 shrink-0 mt-0.5">
                  {getIcon(notif.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-neutral-900">{notif.title}</h4>
                    {!notif.is_read && (
                      <span className="h-2 w-2 rounded-full bg-brand-amber shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">{notif.message}</p>
                  <p className="text-[10px] text-neutral-400">{formatDateTime(notif.created_at)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {notif.link && (
                  <Link href={notif.link}>
                    <Button variant="ghost" size="sm" className="text-xs text-brand-forest hover:bg-neutral-100">
                      View
                    </Button>
                  </Link>
                )}
                {!notif.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    title="Mark as read"
                    className="p-1.5 rounded-lg hover:bg-neutral-200/60 text-neutral-400 hover:text-neutral-700 transition-colors"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

