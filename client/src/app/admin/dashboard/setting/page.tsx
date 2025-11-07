"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IISetting,
  ISettingPostData,
} from "@/lib/store/admin/setting/settingSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { settingFetch } from "@/lib/store/admin/setting/settingSlice";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((state) => state.setting);
  const [activeTab, setActiveTab] = useState("system");

  const [settings, setSetting] = useState<ISettingPostData>({
    restaurantName: "",
    logo: "",
    address: "",
    contactNumber: "",
    openingTime: "",
    closingTime: "",
    timeZone: "",
    websiteUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
    youtubeUrl: "",
    emailSenderName: "",
    smtpHost: "",
    smtpPort: "",
    smtpUsername: "",
    smtpPassword: "",
    smtpEncryption: "",
  });
  useEffect(() => {
    dispatch(settingFetch());
  }, [dispatch]);

  useEffect(() => {
    if (setting.length > 0) {
      const data: IISetting = setting[0];
      setSetting({
        restaurantName: data.restaurantName || "",
        logo: data.logo || "",
        address: data.address || "",
        contactNumber: data.contactNumber || "",
        openingTime: data.openingTime || "",
        closingTime: data.closingTime || "",
        timeZone: data.timeZone || "",
        websiteUrl: data.websiteUrl || "",
        facebookUrl: data.facebookUrl || "",
        instagramUrl: data.instagramUrl || "",
        tiktokUrl: data.tiktokUrl || "",
        youtubeUrl: data.youtubeUrl || "",
        emailSenderName: data.emailSenderName || "",
        smtpHost: data.smtpHost || "",
        smtpPort: data.smtpPort || "",
        smtpUsername: data.smtpUsername || "",
        smtpPassword: data.smtpPassword || "",
        smtpEncryption: data.smtpEncryption || "",
      });
    }
  }, [setting]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSetting({
      ...settings,
      [name]: value,
    });
  };
  const tabs = [
    { name: "System Settings", key: "system" },
    { name: "Email Settings", key: "email" },
    { name: "Advanced Settings", key: "advanced" },
  ];

  return (
    <div className="w-full max-w-8xl mx-auto bg-white rounded-2xl shadow-sm">
      {/* Header Tabs */}
      <div className="border-b flex flex-wrap justify-between items-center p-4">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <div className="flex gap-3 mt-2 md:mt-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-10">
        {activeTab === "system" && <SystemSettings />}
        {activeTab === "email" && <EmailSettings />}
        {activeTab === "advanced" && <AdvancedSettings />}
      </div>
    </div>
  );
}

// ------------------ System Settings ------------------
function SystemSettings() {
  return (
    <form className="space-y-6">
      {/* Restaurant Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Restaurant Name
        </label>
        <Input placeholder="Enter restaurant name" />
      </div>

      {/* Logo */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Logo / Favicon
        </label>
        <Input type="file" />
      </div>

      {/* Address */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Address / Location
        </label>
        <Input placeholder="Enter address or location" />
      </div>

      {/* Contact Number */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Contact Number
        </label>
        <Input placeholder="+977-XXXXXXXXX" />
      </div>

      {/* Working Hours */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Opening Time
          </label>
          <Input type="time" name="openingTime" />
        </div>
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Closing Time
          </label>
          <Input type="time" name="closingTime" />
        </div>
      </div>
      {/* Timezone */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Timezone
        </label>
        <Input placeholder="e.g. Asia/Kathmandu" />
      </div>

      {/* Website / Social Links */}

      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Social Media Links
        </label>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-globe"
              viewBox="0 0 16 16"
            >
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z" />
            </svg>
            <Input
              type="websiteUrl"
              name="websiteUrl"
              placeholder="WebSite Url"
            />
          </div>
          {/* Facebook */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
            <Input type="facebook" name="facebook" placeholder="Facebook URL" />
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
            <Input type="url" name="instagram" placeholder="Instagram URL" />
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-tiktok"
              viewBox="0 0 16 16"
            >
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
            </svg>
            <Input type="url" name="instagram" placeholder="Instagram URL" />
          </div>

          {/* YouTube */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-youtube"
              viewBox="0 0 16 16"
            >
              <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
            </svg>
            <Input type="url" placeholder="YouTube URL" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600">
          Save System Settings
        </Button>
      </div>
    </form>
  );
}

// ------------------ Email Settings ------------------
function EmailSettings() {
  return (
    <form className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Email Settings</h2>

      {/* Email Sender Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Email Sender Name
        </label>
        <Input placeholder="Admin / Restaurant Name" />
      </div>

      {/* SMTP Host */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          SMTP Host
        </label>
        <Input placeholder="smtp.example.com" />
      </div>

      {/* SMTP Port */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          SMTP Port
        </label>
        <Input placeholder="587" />
      </div>

      {/* SMTP Username */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          SMTP Username
        </label>
        <Input placeholder="user@example.com" />
      </div>

      {/* SMTP Password */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          SMTP Password
        </label>
        <Input type="password" placeholder="Password" />
      </div>

      {/* Encryption */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Encryption
        </label>
        <Input placeholder="tls / ssl" />
      </div>

      <div className="flex justify-end">
        <Button className="bg-orange-500 hover:bg-orange-600">
          Save Email Settings
        </Button>
      </div>
    </form>
  );
}

// ------------------ Advanced Settings ------------------
function AdvancedSettings() {
  return (
    <form className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Advanced Settings</h2>

      {/* System Backup / Restore */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          System Backup / Restore
        </label>
        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
          Backup Now
        </Button>
      </div>

      {/* Clear Cache / Reset Data */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Clear Cache / Reset Data
        </label>
        <Button className="bg-red-500 text-white hover:bg-red-600">
          Clear Cache
        </Button>
      </div>

      {/* Audit Logs / Activity Logs */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Audit Logs / Activity Logs
        </label>
        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
          View Logs
        </Button>
      </div>
    </form>
  );
}
