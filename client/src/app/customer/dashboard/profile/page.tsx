"use client";
import { use, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { passwordUpdate } from "@/lib/store/auth/authSlice";
import toast from "react-hot-toast";
import { profileGet, profileUpdate } from "@/lib/store/admin/profile/profile";

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.profile);

  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [profileForm, setProfileForm] = useState({ username: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(profileGet());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        username: profile.username || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      profileUpdate(profileForm.username, profileForm.email)
    );

    if (result.success) {
      toast.success(result.message);
      dispatch(profileGet());
    } else {
      toast.error(result.message);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      passwordUpdate(
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword
      )
    );
    if (result.success) {
      toast.success(result.message);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="max-w-full mx-auto bg-white rounded-2xl shadow-sm p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 border-b pb-2">
        <button
          className={`px-4 py-2 rounded-t-md text-sm font-medium transition ${
            activeTab === "profile"
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </button>
        <button
          className={`px-4 py-2 rounded-t-md text-sm font-medium transition ${
            activeTab === "password"
              ? "bg-orange-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change Password
        </button>
      </div>

      {/* Profile Form */}
      {activeTab === "profile" && (
        <form className="space-y-6" onSubmit={handleProfileSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              name="username"
              value={profileForm.username}
              onChange={handleProfileChange}
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              name="email"
              value={profileForm.email}
              onChange={handleProfileChange}
              placeholder="Your Email"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Save Profile
            </Button>
          </div>
        </form>
      )}

      {/* Password Form */}
      {activeTab === "password" && (
        <form className="space-y-6" onSubmit={handlePasswordSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <Input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Current Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              placeholder="New Password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm New Password"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Change Password
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
