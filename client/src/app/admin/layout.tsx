"use client";
import SideBar from "@/components/admin/Sidebar/sidebar";
import TopHeader from "@/components/admin/TopHeader/header";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex h-screen">
        <SideBar />

        {/* Header section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <TopHeader />

          {/* page content  */}
          <main className="flex-1 overflow-auto p-6 ">{children}</main>
        </div>
      </div>
    </>
  );
}
