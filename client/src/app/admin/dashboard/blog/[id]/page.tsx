// app/admin/category/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { singleBlogs } from "@/lib/store/admin/blog/blogSlice";
import { id } from "zod/v4/locales";
import { IBlogDetails } from "@/lib/store/admin/blog/blogSlice.type";

export default function CategoryViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { blogData } = useAppSelector((store) => store.blog);
  const [selectedBlog, setSelectedBlog] = useState<IBlogDetails | null>(null);

  const blogId = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (blogId) {
      dispatch(singleBlogs(blogId));
    }
  }, [dispatch, blogId]);
  useEffect(() => {
    if (params.id && blogData.length > 0) {
      const found = blogData.find((b) => b.id.toString() === params.id);
      setSelectedBlog(found || null);
    }
  }, [params.id, blogData]);

  if (!blogData && blogData > 0) {
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

  if (!blogData) {
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
            Back to Blog Page
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
                value={selectedBlog?.blogTitle || ""}
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
                value={selectedBlog?.blogDescription || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 resize-none min-h-[150px] text-gray-900"
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
                    selectedBlog?.createdAt ? new Date().toLocaleString() : "-"
                  }
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>

              {selectedBlog?.updatedAt && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Updated At
                  </label>
                  <Input
                    value={new Date(selectedBlog?.updatedAt).toLocaleString()}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
            </div>
            {/* Image Preview */}
            {selectedBlog?.blogImage && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Image
                </label>
                <img
                  src={selectedBlog?.blogImage}
                  alt={selectedBlog?.blogTitle}
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
                router.push(`/admin/dashboard/menu/edit/${selectedBlog?.id}`)
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
