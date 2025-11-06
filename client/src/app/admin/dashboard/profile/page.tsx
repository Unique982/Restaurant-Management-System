"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Updated", profileForm);
    // API call here
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password Changed", passwordForm);
    // API call here
  };

  return (
    <div className="max-w-full mx-auto bg-white rounded-2xl shadow-sm p-4 md:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

      {/* --- Tabs --- */}
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

      {/* --- Tab Content --- */}
      {activeTab === "profile" && (
        <form className="space-y-6" onSubmit={handleProfileSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              name="name"
              value={profileForm.name}
              onChange={handleProfileChange}
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
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
          {/* More Options */}
          <div className="mt-8 border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              More Options
            </h2>
            <Button size="sm" variant="outline" className="mr-2">
              Delete Account
            </Button>
            <Button size="sm" variant="outline">
              Logout
            </Button>
          </div>
        </form>
      )}

      {activeTab === "password" && (
        <form className="space-y-6" onSubmit={handlePasswordSubmit}>
          {/* Current Password */}
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

          {/* New Password */}
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

          {/* Confirm Password */}
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
