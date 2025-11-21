"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getUserList } from "@/lib/store/admin/users/userSlice";
import { IUserList } from "@/lib/store/admin/users/userSlice.types";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function CategoryViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const { usersData } = useAppSelector((store) => store.users);

  const [userData, setUserData] = useState<IUserList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (usersData.length === 0) {
      dispatch(getUserList());
    }
  }, [dispatch, usersData.length]);

  useEffect(() => {
    if (params.id && usersData.length > 0) {
      const foundUser = usersData.find(
        (user) => user.id.toString() === params.id
      );
      setUserData(foundUser || null);
      setLoading(false);
    }
  }, [params.id, usersData]);

  // If still loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            User Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The user you are trying to view does not exist.
          </p>
          <Button
            onClick={() => router.push("/admin/dashboard/users")}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/admin/dashboard/users")}
            variant="ghost"
            className="mb-4 text-gray-600 bg-green-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Users
          </Button>

          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
          <p className="text-sm text-gray-600 mt-2">
            View complete information about this user.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 sm:p-8">
          <div className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase">
                Username
              </Label>
              <Input
                value={
                  userData.username
                    ? userData.username.charAt(0).toUpperCase() +
                      userData.username.slice(1)
                    : ""
                }
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase">
                Email
              </Label>
              <Input
                value={userData.email}
                readOnly
                className="bg-gray-50 border-gray-300"
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase">
                Role
              </Label>
              <Input
                value={
                  userData.role
                    ? userData.role.charAt(0).toUpperCase() +
                      userData.role.slice(1)
                    : ""
                }
                readOnly
                className="bg-gray-50 border-gray-300"
              />
            </div>

            {/* Created At */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700 uppercase">
                Created At
              </Label>
              <Input
                value={new Date(userData.createdAt).toLocaleString()}
                readOnly
                className="bg-gray-50 border-gray-300"
              />
            </div>

            {/* No password shown */}
            <p className="text-xs text-gray-500 italic">
              🔒 Password is hidden for security reasons.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t mt-6 flex gap-3">
            <Button
              onClick={() => router.push("/admin/dashboard/users")}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
