// src/app/notifications/page.tsx
"use client";

import Link from "next/link";
import {
  ChevronLeft,
  Bell,
  Search,
  Ticket,
  MessageSquare,
  Users,
  Loader2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import {
  fetchNotification,
  makeAllRead,
} from "@/lib/store/notification/notification";
import { Status } from "@/lib/types/type";

export default function NotificationsPage() {
  const dispatch = useAppDispatch();
  const { notificationData, status } = useAppSelector(
    (state) => state.notification
  );

  // fetch all notification only admin
  useEffect(() => {
    dispatch(fetchNotification());
  }, [dispatch]);

  return (
    <div className="bg-white overflow-x-auto rounded-xl w-full max-w-8xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-6">
        <Link
          href="/dashboard"
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h1>
        <p className="text-gray-600 text-sm">
          Stay updated with your latest activities and messages
        </p>
      </div>

      {/* Search & Mark All */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <button
          className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => dispatch(makeAllRead())}
        >
          <Bell size={16} className="mr-1" />
          Mark All as Read
        </button>
      </div>

      <div className="overflow-x-auto">
        {status === Status.LOADING ? (
          // loading

          <Loader2 className="w-8 h-8 animate-spin text-gray-600 justify-center" />
        ) : notificationData.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Notification
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {notificationData.map((n) => (
                <tr
                  key={n.id}
                  className={n.status === "unread" ? "bg-blue-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="relative  w-8 h-8 flex items-center justify-center rounded-full mr-3 bg-gray-200">
                        <Bell size={18} className="text-gray-700" />
                        {n.status === "unread" && (
                          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-1 ring-white"></span>
                        )}
                      </div>
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            n.status === "unread" ? "" : "text-gray-700"
                          }`}
                        >
                          {n.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {n.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(n.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
