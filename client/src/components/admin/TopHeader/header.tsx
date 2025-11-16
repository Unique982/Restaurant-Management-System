import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Bell, User, User2Icon } from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { userLogin, userLogout } from "@/lib/store/auth/authSlice";
import NoticePage from "@/app/customer/dashboard/notification/page";
export default function TopHeader() {
  const { user } = useAppSelector((store) => store.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
    router.push("/");
  };
  const handleNoticeClick = () => {
    if (user?.role === "admin") {
      router.push("/admin/dashboard/notification");
    } else if (user?.role === "customer") {
      router.push("/customer/dashboard/notification");
    }
  };

  return (
    <>
      {/* Top Header */}
      <header className="flex items-center justify-between bg-white shadow px-6 py-3">
        <h2 className="text-xl font-bold">
          {user?.role === "admin"
            ? "Admin Dashboard"
            : user?.role === "customer"
            ? "Customer Dashboard"
            : "Dashboard"}
        </h2>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleNoticeClick}>
            <Bell className="w-5 h-5" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {user?.role === "admin" ? (
                <>
                  <Link href="/admin/dashboard/setting" passHref>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/admin/dashboard/profile" passHref>
                    <DropdownMenuItem>
                      <User2Icon className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  <Link href="/admin/dashboard/restore" passHref>
                    <DropdownMenuItem>
                      <User2Icon className="mr-2 h-4 w-4" />
                      Restore
                    </DropdownMenuItem>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/customer/dashboard/profile" passHref>
                    <DropdownMenuItem>
                      <User2Icon className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                </>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
