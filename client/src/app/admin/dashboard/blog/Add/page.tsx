// app/admin/dashboard/category/blog/Add/page.tsx
"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { useAppDispatch } from "@/lib/store/hooks";
import { Label } from "recharts";
import { IBlogPost } from "@/lib/store/admin/blog/blogSlice.type";
import { addBlog, createBlog } from "@/lib/store/admin/blog/blogSlice";

export default function AddBlogPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState<IBlogPost>({
    blogTitle: "",
    blogDescription: "",
    blogImage: null,
    blogCategory: "",
  });
  const changeHandle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;

    setBlogData({
      ...blogData,
      [name]: type === "file" && files ? files[0] : value,
    });
  };
  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await dispatch(createBlog(blogData));
    if (result?.success) {
      // Redirect to blog list page
      router.push("/admin/dashboard/blog");
    } else {
      // Handle error (optional)
      console.error(result?.message || "Failed to create blog");
    }
  };
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => router.push("/admin/dashboard/blog")}
          variant="ghost"
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Add New Blog
        </h1>

        <div className="bg-white rounded-lg  border border-gray-200 p-6 sm:p-8">
          <form className="space-y-6" onSubmit={submitHandle}>
            {/* Blog Title */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Blog Title <span className="text-red-500">*</span>
              </Label>
              <Input
                onChange={changeHandle}
                placeholder="Enter blog title"
                name="blogTitle"
                required
              />
            </div>

            {/* Blog Description */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Blog Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                onChange={changeHandle}
                name="blogDescription"
                placeholder="Enter blog description"
                className="min-h-[150px]"
                required
              />
            </div>

            {/* Blog Image URL */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Blog Image URL
              </Label>
              <Input
                onChange={changeHandle}
                placeholder="Enter image URL"
                type="file"
                accept="image/*"
                name="blogImage"
              />
            </div>

            {/* Blog Category */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Blog Category <span className="text-red-500">*</span>
              </Label>
              <Input
                onChange={changeHandle}
                placeholder="Enter Category"
                name="blogCategory"
                type="text"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding...
                  </>
                ) : (
                  "Add Blog"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
