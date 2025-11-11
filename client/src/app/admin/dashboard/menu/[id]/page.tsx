// app/admin/category/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { IMenuItems } from "@/lib/store/admin/menuItems/menuItemSlice.type";
import { getMenuItem } from "@/lib/store/admin/menuItems/menuItemSlice";

export default function CategoryViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector((store) => store.category);

  const { menuDatas } = useAppSelector((store) => store.menuItems);
  const [menuItems, setMenuItems] = useState<IMenuItems | null>(null);

  useEffect(() => {
    if (menuDatas.length === 0) {
      dispatch(getMenuItem());
    }
  }, [dispatch, menuDatas.length]);

  useEffect(() => {
    if (params.id && menuDatas.length > 0) {
      const foundMenu = menuDatas.find(
        (cat) => cat.id.toString() === params.id
      );
      setMenuItems(foundMenu || null);
    }
  }, [params.id, menuDatas]);

  if (!menuDatas && menuDatas > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            MenuItems Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The menu items you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/admin/dashboard/menu")}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Categories
          </Button>
        </div>
      </div>
    );
  }

  if (!menuDatas) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/admin/dashboard/menu")}
            variant="ghost"
            className="mb-4 text-gray-600 bg-green-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Menu Page
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            MenuItems Details
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View detailed information about this Menu Details
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 overflow-auto">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Name
              </label>
              <Input
                value={menuItems?.name || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Description
              </label>

              <Textarea
                value={menuItems?.description || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 resize-none min-h-[150px] text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Category
                </label>
                <Input
                  value={menuItems?.categoryName}
                  readOnly
                  className="bg-gray-50 border-gray-300 text-gray-900 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Price
                </label>
                <Input
                  value={menuItems?.price || ""}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Type
                </label>
                <Input
                  value={menuItems?.type || ""}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Availability
                </label>
                <Input
                  value={menuItems?.availability || ""}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Ingredients
              </label>
              <Textarea
                value={menuItems?.ingredients || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 resize-none min-h-[80px] text-gray-900"
              />
            </div>
            {/* Created & Updated */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Created At
                </label>
                <Input
                  value={
                    menuItems?.created_at
                      ? new Date(menuItems.created_at).toLocaleString()
                      : "-"
                  }
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>

              {menuItems?.updated_at && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Updated At
                  </label>
                  <Input
                    value={new Date(menuItems.updated_at).toLocaleString()}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
            </div>
            {/* Image Preview */}
            {menuItems?.image_url && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Image
                </label>
                <img
                  src={menuItems.image_url}
                  alt={menuItems.name}
                  className="w-full max-h-64 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 flex gap-3">
            <Button
              onClick={() => router.push("/admin/dashboard/menu")}
              variant="outline"
              className="flex-1"
            >
              Back to List
            </Button>
            <Button
              onClick={() =>
                router.push(`/admin/dashboard/menu/edit/${menuItems?.id}`)
              }
              className="flex-1"
            >
              Edit Menu Item
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-6">
            <p className="text-sm text-blue-800 text-center sm:text-left">
              💡 Tap <span className="font-semibold">"Edit Menu Item"</span> to
              make changes to this menu item.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
