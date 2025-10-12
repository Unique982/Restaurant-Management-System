"use client";
import { Button } from "@/components/ui/button";
import { userLogout } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
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
  TagIcon,
  MenuIcon,
  NotebookIcon,
  NotebookPenIcon,
  TabletsIcon,
  GalleryThumbnailsIcon,
  Image,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function SideBar() {
  const { user } = useAppSelector((store) => store.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    router.push("/");
  };

  return (
    <>
      <aside
        className={`${
          sidebarOpen ? "w-50" : "w-16"
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
          <Link href="/admin/dashboard/category" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <TagIcon className="w-5 h-5" />
              {sidebarOpen && "Category"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Category
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/dashboard/menu" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MenuIcon className="w-5 h-5" />
              {sidebarOpen && "Menu"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Menu
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/dashboard/reservation" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <NotebookPenIcon className="w-5 h-5" />
              {sidebarOpen && "Reservations"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Reservations
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/dashboard/tables" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <TabletsIcon className="w-5 h-5" />
              {sidebarOpen && "tables"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Tables
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
          <Link href="/admin/dashboard/orders" className="group relative">
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

          {/* page section */}

          {sidebarOpen && (
            <p className="text-gray-400 uppercase text-xs px-2  mt-2">Pages</p>
          )}
          <Link href="/admin/dashboard/about" className="group relative">
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
          <Link href="/admin/dashboard/services" className="group relative">
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
          <Link href="/admin/dashboard/blog" className="group relative">
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
          <Link href="/admin/dashboard/contact" className="group relative">
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
          <Link href="/admin/dashboard/gallery" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Image className="w-5 h-5" />

              {sidebarOpen && "Gallery"}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Gallery
                </span>
              )}
            </Button>
          </Link>
          <Link href="/admin/dashboard/testimonials" className="group relative">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageCircle className="w-5 h-5" />

              {sidebarOpen && "Testimonials "}
              {!sidebarOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  Testimonials
                </span>
              )}
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="destructive"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>
      </aside>
    </>
  );
}
