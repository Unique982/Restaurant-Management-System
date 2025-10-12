import SideBar from "@/components/admin/Sidebar/sidebar";
import TopHeader from "@/components/admin/TopHeader/header";
import { ReactNode } from "react";

export default function CustomerLayout({ children }: { children: ReactNode }) {
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
