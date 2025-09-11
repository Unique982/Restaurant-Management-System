import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Users,
  Settings,
  LogOut,
  Bell,
  User,
  User2Icon,
  DatabaseBackup,
  KeyIcon,
} from "lucide-react";
import { Profiler } from "react";
export default function TopHeader() {
  return (
    <>
      {/* Top Header */}
      <header className="flex items-center justify-between bg-white shadow px-6 py-3">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
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
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <KeyIcon className="mr-2 h-4 w-4" />
                Password Change
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DatabaseBackup className="mr-2 h-4 w-4" />
                System Backup
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User2Icon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
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
