// app/admin/category/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getCategory } from "@/lib/store/admin/category/categorySlice";
import { ICategory } from "@/lib/store/admin/category/categorySlice.type";

export default function CategoryViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector((store) => store.category);
  const [category, setCategory] = useState<ICategory | null>(null);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategory());
    }
  }, [dispatch, categories.length]);

  useEffect(() => {
    if (params.id && categories.length > 0) {
      const foundCategory = categories.find(
        (cat) => cat.id.toString() === params.id
      );
      setCategory(foundCategory || null);
    }
  }, [params.id, categories]);

  if (!category && categories.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Category Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The category you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/admin/category")}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Categories
          </Button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/admin/dashboard/category")}
            variant="ghost"
            className="mb-4 text-gray-600 bg-green-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Category Details
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View detailed information about this category
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 overflow-auto">
          <div className="space-y-6 ">
            {/* Category Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Category Name
              </label>
              <Input
                value={category.categoryName}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>

            {/* Category Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Description
              </label>
              <Textarea
                value={category.categoryDescription}
                readOnly
                className="w-full bg-gray-50 border-gray-300 resize-none min-h-[150px] text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Created At */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Created At
                </label>
                <Input
                  value={
                    category.createdAt
                      ? new Date(category.createdAt).toLocaleString()
                      : "-"
                  }
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>

              {/* Updated At */}
              {category.updatedAt && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Updated At
                  </label>
                  <Input
                    value={new Date(category.updatedAt).toLocaleString()}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 flex gap-3">
            <Button
              onClick={() => router.push("/admin/dashboard/category")}
              variant="outline"
              className="flex-1"
            >
              Back to List
            </Button>
            <Button
              onClick={() =>
                router.push(`/admin/dashboard/category/edit/${category.id}`)
              }
              className=""
            >
              Edit Category
            </Button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-6">
            <p className="text-sm text-blue-800 text-center sm:text-left">
              💡 Tap <span className="font-semibold">"Edit Category"</span> to
              make changes to this category.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
