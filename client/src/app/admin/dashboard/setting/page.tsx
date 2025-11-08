"use client";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ISettingPostData } from "@/lib/store/admin/setting/settingSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addSettings,
  settingFetch,
} from "@/lib/store/admin/setting/settingSlice";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((state) => state.setting);
  const [activeTab, setActiveTab] = useState("system");

  const [settings, setSettings] = useState<ISettingPostData>({
    restaurantName: "",
    address: "",
    contactNumber: "",
    openingTime: "",
    closingTime: "",
    timezone: "",
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

  const [changedFields, setChangedFields] = useState<Partial<ISettingPostData>>(
    {}
  );

  useEffect(() => {
    dispatch(settingFetch());
  }, [dispatch]);

  useEffect(() => {
    if (setting.length > 0) {
      const data: ISettingPostData = setting[0];
      setSettings(data);
    }
  }, [setting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
    setChangedFields((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(changedFields).length === 0) {
      toast("No changes made!");
      return;
    }
    const result: any = await dispatch(
      addSettings(changedFields as ISettingPostData)
    );
    if (result.success) {
      toast.success("Settings updated successfully");
      setChangedFields({});
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };

  const tabs = [
    { name: "System Settings", key: "system" },
    { name: "Email Settings", key: "email" },
    { name: "Advanced Settings", key: "advanced" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-md">
      {/* Header Tabs */}
      <div className="border-b flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 gap-4">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <div className="flex flex-wrap gap-3">
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
      <div className="p-6 sm:p-10">
        {activeTab === "system" && (
          <SystemSettings
            settings={settings}
            handleChange={handleChange}
            submitHandle={submitHandle}
          />
        )}
        {activeTab === "email" && (
          <EmailSettings
            settings={settings}
            handleChange={handleChange}
            submitHandle={submitHandle}
          />
        )}
        {activeTab === "advanced" && <AdvancedSettings />}
      </div>
    </div>
  );
}

// ------------------ System Settings ------------------
function SystemSettings({ settings, handleChange, submitHandle }: any) {
  return (
    <form className="space-y-6" onSubmit={submitHandle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Restaurant Name
          </label>
          <Input
            type="text"
            name="restaurantName"
            value={settings.restaurantName || ""}
            onChange={handleChange}
            placeholder="Enter restaurant name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Address / Location
          </label>
          <Input
            name="address"
            value={settings.address || ""}
            onChange={handleChange}
            placeholder="Enter restaurant address"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Contact Number
          </label>
          <Input
            name="contactNumber"
            value={settings.contactNumber || ""}
            onChange={handleChange}
            placeholder="+977-XXXXXXXXX"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Opening Time
            </label>
            <Input
              type="time"
              name="openingTime"
              value={settings.openingTime || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Closing Time
            </label>
            <Input
              type="time"
              name="closingTime"
              value={settings.closingTime || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Timezone
          </label>
          <Input
            type="text"
            name="timezone"
            value={settings.timezone || ""}
            onChange={handleChange}
            placeholder="e.g. Asia/Kathmandu"
          />
        </div>

        {/* Social Links */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Facebook URL
          </label>
          <Input
            type="url"
            name="facebookUrl"
            value={settings.facebookUrl || ""}
            onChange={handleChange}
            placeholder="https://facebook.com/yourpage"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Instagram URL
          </label>
          <Input
            type="url"
            name="instagramUrl"
            value={settings.instagramUrl || ""}
            onChange={handleChange}
            placeholder="https://instagram.com/yourpage"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            TikTok URL
          </label>
          <Input
            type="url"
            name="tiktokUrl"
            value={settings.tiktokUrl || ""}
            onChange={handleChange}
            placeholder="https://tiktok.com/@yourpage"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            YouTube URL
          </label>
          <Input
            type="url"
            name="youtubeUrl"
            value={settings.youtubeUrl || ""}
            onChange={handleChange}
            placeholder="https://youtube.com/channel/yourpage"
          />
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
function EmailSettings({ settings, handleChange, submitHandle }: any) {
  return (
    <form className="space-y-6" onSubmit={submitHandle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email Sender Name
          </label>
          <Input
            name="emailSenderName"
            value={settings.emailSenderName || ""}
            onChange={handleChange}
            placeholder="Admin / Restaurant Name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            SMTP Host
          </label>
          <Input
            name="smtpHost"
            value={settings.smtpHost || ""}
            onChange={handleChange}
            placeholder="smtp.example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            SMTP Port
          </label>
          <Input
            name="smtpPort"
            value={settings.smtpPort || ""}
            onChange={handleChange}
            placeholder="587"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            SMTP Username
          </label>
          <Input
            name="smtpUsername"
            value={settings.smtpUsername || ""}
            onChange={handleChange}
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            SMTP Password
          </label>
          <Input
            type="password"
            name="smtpPassword"
            value={settings.smtpPassword || ""}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Encryption
          </label>
          <Input
            name="smtpEncryption"
            value={settings.smtpEncryption || ""}
            onChange={handleChange}
            placeholder="tls / ssl"
          />
        </div>
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
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          System Backup / Restore
        </label>
        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full md:w-auto">
          Backup Now
        </Button>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Clear Cache / Reset Data
        </label>
        <Button className="bg-red-500 text-white hover:bg-red-600 w-full md:w-auto">
          Clear Cache
        </Button>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Audit Logs / Activity Logs
        </label>
        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300 w-full md:w-auto">
          View Logs
        </Button>
      </div>
    </form>
  );
}
