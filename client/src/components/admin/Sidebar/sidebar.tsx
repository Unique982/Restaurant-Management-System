"use client";
import { Button } from "@/components/ui/button";
import { spawn } from "child_process";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  User,
  ListOrdered,
  Info,
  Server,
  Popsicle,
  Tags,
  Contact,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-lg transition-all duration-300 flex flex-col`}
      >
        {/* logo and toogles section */}
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className={`font-bold text-xl ${!sidebarOpen && "hidden"}`}>
            Unique
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu />
          </Button>
        </div>
        {/* side bar  */}
        <nav className="flex-1 p-2 space-y-2">
          {sidebarOpen && (
            <p className="text-gray-400 uppercase text-xs px-2 mb-1">
              Operation
            </p>
          )}
          <Link href="/admin/dashboard" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="w-5 h-5" />
              {sidebarOpen && "Dashboard"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Dashboard
                </span>
              )}
            </Button>
          </Link>

          <Link href="/admin/dashboard/users" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <User className="w-5 h-5" />
              {sidebarOpen && "User"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Users
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/users" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <ListOrdered className="w-5 h-5" />
              {sidebarOpen && "Orders"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Orders
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/users" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="w-5 h-5" />
              {sidebarOpen && "Setting"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Setting
                </span>
              )}
            </Button>
          </Link>

          {/* page section */}

          {sidebarOpen && (
            <p className="text-gray-400 uppercase text-xs px-2  mt-2">Pages</p>
          )}
          <Link href="/admin/users" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Info className="w-5 h-5" />

              {sidebarOpen && "About"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  About
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/users" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Server className="w-5 h-5" />
              {sidebarOpen && "Services"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Services
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/users" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Tags className="w-5 h-5" />

              {sidebarOpen && "Blog"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Blog
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/users" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Contact className="w-5 h-5" />

              {sidebarOpen && "Contact"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Contact
                </span>
              )}
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t">
          <Button variant="destructive" className="w-full justify-start gap-2">
            <LogOut className="w-5 h-5" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </aside>
    </>
  );
}
