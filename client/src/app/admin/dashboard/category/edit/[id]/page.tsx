// app/admin/category/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  editCategoryById,
  singelCategoryFetchById,
} from "@/lib/store/admin/category/categorySlice";

import toast from "react-hot-toast";
import { ICategoryData } from "@/lib/store/admin/category/categorySlice.type";

export default function CategoryEditPage() {
  const router = useRouter();

  const params = useParams();
  const dispatch = useAppDispatch();
  const { data: categories, singlecategory } = useAppSelector(
    (store) => store.category
  );

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updateCategory, setUpdatecategory] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      if (params.id) {
        setLoading(true);
        const existCategory = categories.find(
          (cat) => cat.id.toString() === params.id
        );

        if (existCategory) {
          setUpdatecategory({
            categoryName: existCategory.categoryName,
            categoryDescription: existCategory.categoryDescription,
          });
          setLoading(false);
        } else {
          await dispatch(singelCategoryFetchById(params.id as string | number));
          setLoading(false);
        }
      }
    };

    fetchCategory();
  }, [params.id, dispatch, categories]);

  // Update from single category
  useEffect(() => {
    if (singlecategory) {
      setUpdatecategory({
        categoryName: singlecategory.categoryName,
        categoryDescription: singlecategory.categoryDescription,
      });
    }
  }, [singlecategory]);

  const handleInputChange = (key: keyof ICategoryData, value: any) => {
    setUpdatecategory((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await dispatch(
      editCategoryById(params.id as string, updateCategory)
    );
    if (result.success) {
      toast.success("Category updated successfully!");
      router.push("/admin/dashboard/category");
    } else {
      toast.error(result.message || "Failed to update category");
    }
  };

  // cancel button
  const handleCancel = () => {
    router.push("/admin/dashboard/category");
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
            Edit Category
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the category information below
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name */}
            <div className="space-y-2">
              <label
                htmlFor="categoryName"
                className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
              >
                Category Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="categoryName"
                name="categoryName"
                value={updateCategory.categoryName}
                onChange={(e) =>
                  handleInputChange("categoryName", e.target.value)
                }
                placeholder="Enter category name"
                className="w-full"
                required
              />
            </div>

            {/* Category Description */}
            <div className="space-y-2">
              <label
                htmlFor="categoryDescription"
                className="text-sm font-semibold text-gray-700 uppercase tracking-wide"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="categoryDescription"
                name="categoryDescription"
                value={updateCategory.categoryDescription}
                onChange={(e) =>
                  handleInputChange("categoryDescription", e.target.value)
                }
                placeholder="Enter category description"
                className="w-full resize-none min-h-[150px]"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Category"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
