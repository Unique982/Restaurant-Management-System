import SideBar from "@/components/admin/Sidebar/sidebar";
import TopHeader from "@/components/admin/TopHeader/header";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideBar />

      {/* Header section */}
      <div className="flex flex-col flex-1">
        <TopHeader />

        {/* page content  */}
        <main className="flex-1 overflow-y-auto p-6 ">{children}</main>
      </div>
    </div>
  );
}
