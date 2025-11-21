// app/admin/category/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImageIcon, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import toast from "react-hot-toast";
import Image from "next/image";
import { Label } from "recharts";
import { IBlogPost } from "@/lib/store/admin/blog/blogSlice.type";
import { editBlogById, singleBlogs } from "@/lib/store/admin/blog/blogSlice";

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const { blogData, singleBlog } = useAppSelector((store) => store.blog);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updateBlog, setUpdateBlog] = useState<IBlogPost>({
    blogTitle: "",
    blogDescription: "",
    blogImage: null,
    blogCategory: "",
  });

  useEffect(() => {
    const fecthBlog = async () => {
      if (params.id) {
        setLoading(true);
        const existBlog = blogData.find((b) => b.id.toString() === params.id);

        if (existBlog) {
          setUpdateBlog({
            blogTitle: existBlog.blogTitle,
            blogDescription: existBlog.blogDescription,
            blogImage: existBlog.blogImage,
            blogCategory: existBlog.blogCategory,
          });
          setLoading(false);
        } else {
          await dispatch(singleBlogs(params.id as string | number));
          setLoading(false);
        }
      }
    };

    fecthBlog();
  }, [params.id, dispatch, blogData]);

  // Update from single category
  useEffect(() => {
    if (singleBlog) {
      setUpdateBlog({
        blogTitle: singleBlog.blogTitle,
        blogDescription: singleBlog.blogDescription,
        blogImage: singleBlog.blogImage,
        blogCategory: singleBlog.blogCategory,
      });
    }
  }, [singleBlog]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdateBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "blogImage") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await dispatch(
      editBlogById(params.id as string, updateBlog)
    );

    setSubmitting(false);

    if (result.success) {
      toast.success("Blog updated successfully!");
      router.push("/admin/dashboard/blog");
    } else {
      toast.error(result.message || "Failed to update blog");
    }
  };

  // cancel button
  const handleCancel = () => {
    router.push("/admin/dashboard/blog");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit Blog
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the blog information below
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="blogTitle"
                name="blogTitle"
                value={updateBlog.blogTitle}
                onChange={handleInputChange}
                placeholder="Enter title"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                required
                disabled={submitting}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={updateBlog.blogDescription}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="w-full resize-none min-h-[100px] text-sm sm:text-base"
                disabled={submitting}
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                category<span className="text-red-500">*</span>
              </Label>
              <Input
                id="blogCategory"
                name="blogCategory"
                value={updateBlog.blogCategory || "Foode update"}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                required
              />
            </div>

            {/* Image Preview */}
            {/* {updateBlog.blogImage && (
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Image Preview
                </Label>
                <div className="relative w-full h-48 sm:h-64 md:h-72 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  {!imageError ? (
                    <Image
                      src={updateBlog.blogImage}
                      alt="Blog Image"
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <ImageIcon className="w-12 h-12 mb-2" />
                      <p className="text-sm">Failed to load image</p>
                      <p className="text-xs mt-1">Please check the URL</p>
                    </div>
                  )}
                </div>
              </div>
            )} */}

            {/* Action Buttons */}
            <div className="pt-5 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full sm:flex-1 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:flex-1 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Blog"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
