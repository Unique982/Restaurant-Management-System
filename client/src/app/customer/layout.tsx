"use client";
import { ReactNode } from "react";
import SideBar from "@/components/admin/Sidebar/sidebar";
import TopHeader from "@/components/admin/TopHeader/header";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
