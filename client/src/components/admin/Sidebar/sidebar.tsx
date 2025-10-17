"use client";
import { Button } from "@/components/ui/button";
import { userLogout } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  Info,
  Server,
  TagIcon,
  MenuIcon,
  NotebookPenIcon,
  TabletsIcon,
  Tags,
  Contact,
  Image,
  MessageCircle,
  ListOrdered,
  User,
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

  const menuItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/dashboard/category", icon: TagIcon, label: "Category" },
    { href: "/admin/dashboard/menu", icon: MenuIcon, label: "Menu" },
    {
      href: "/admin/dashboard/reservation",
      icon: NotebookPenIcon,
      label: "Reservations",
    },
    { href: "/admin/dashboard/tables", icon: TabletsIcon, label: "Tables" },
    { href: "/admin/dashboard/users", icon: User, label: "Users" },
    { href: "/admin/dashboard/orders", icon: ListOrdered, label: "Orders" },
  ];

  const pageItems = [
    { href: "/admin/dashboard/about", icon: Info, label: "About" },
    { href: "/admin/dashboard/services", icon: Server, label: "Services" },
    { href: "/admin/dashboard/blog", icon: Tags, label: "Blog" },
    { href: "/admin/dashboard/contact", icon: Contact, label: "Contact" },
    { href: "/admin/dashboard/gallery", icon: Image, label: "Gallery" },
    {
      href: "/admin/dashboard/testimonials",
      icon: MessageCircle,
      label: "Testimonials",
    },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "w-56" : "w-16"
      } h-screen bg-white shadow-lg border-r transition-all duration-300 flex flex-col`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        <h1
          className={`font-bold text-xl text-gray-800 tracking-wide ${
            !sidebarOpen && "hidden"
          }`}
        >
          Unique
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sidebarOpen && (
          <p className="text-gray-400 uppercase text-xs px-2 mb-2">Operation</p>
        )}
        {menuItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            sidebarOpen={sidebarOpen}
          />
        ))}

        {sidebarOpen && (
          <p className="text-gray-400 uppercase text-xs px-2 mt-4 mb-2">
            Pages
          </p>
        )}
        {pageItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            sidebarOpen={sidebarOpen}
          />
        ))}
      </nav>

      {/* Logout */}
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
  );
}

/**
 * 🔸 Reusable Nav Item Component
 */
function NavItem({
  href,
  icon: Icon,
  label,
  sidebarOpen,
}: {
  href: string;
  icon: any;
  label: string;
  sidebarOpen: boolean;
}) {
  return (
    <Link href={href} className="group relative">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 hover:bg-gray-100"
      >
        <Icon className="w-5 h-5" />
        {sidebarOpen && label}
        {!sidebarOpen && (
          <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap shadow-lg">
            {label}
          </span>
        )}
      </Button>
    </Link>
  );
}
