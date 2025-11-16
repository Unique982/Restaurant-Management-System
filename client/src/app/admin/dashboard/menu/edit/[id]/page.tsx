// app/admin/category/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ArrowLeft, ImageIcon, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import {
  editMenuItemsById,
  fetchMenuItems,
  singelFetchMenuItems,
} from "@/lib/store/admin/menuItems/menuItemSlice";
import Image from "next/image";
import {
  IMenuItems,
  IMenuItemsData,
} from "@/lib/store/admin/menuItems/menuItemSlice.type";
import { getCategory } from "@/lib/store/admin/category/categorySlice";
import { Label } from "recharts";

export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { data: categories } = useAppSelector((store) => store.category);
  const { menuDatas, singleMenu } = useAppSelector((store) => store.menuItems);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updateMenuItems, setUpdateMenuItmes] = useState<IMenuItemsData>({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
    type: "",
    availability: "available",
    ingredients: "",
  });

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (params.id) {
        setLoading(true);
        const existMenuItems = menuDatas.find(
          (item) => item.id.toString() === params.id
        );

        if (existMenuItems) {
          setUpdateMenuItmes({
            name: existMenuItems.name,
            description: existMenuItems.description,
            price: existMenuItems.price,
            category_id: existMenuItems.category_id,
            image_url: existMenuItems.image_url,
            type: existMenuItems.type,
            availability: existMenuItems.availability,
            ingredients: existMenuItems.ingredients,
          });
          setLoading(false);
        } else {
          await dispatch(singelFetchMenuItems(params.id as string | number));
          setLoading(false);
        }
      }
    };

    fetchMenuItems();
  }, [params.id, dispatch, menuDatas]);

  // Update from single category
  useEffect(() => {
    if (singleMenu) {
      setUpdateMenuItmes({
        name: singleMenu.name,
        description: singleMenu.description,
        price: singleMenu.price,
        category_id: singleMenu.category_id,
        image_url: singleMenu.image_url,
        type: singleMenu.type,
        availability: singleMenu.availability,
        ingredients: singleMenu.ingredients,
      });
    }
  }, [singleMenu]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdateMenuItmes((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "image_url") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await dispatch(
      editMenuItemsById(params.id as string, updateMenuItems)
    );

    setSubmitting(false);

    if (result.success) {
      toast.success("Menu item updated successfully!");
      router.push("/admin/dashboard/menu");
    } else {
      toast.error(result.message || "Failed to update menu item");
    }
  };

  // cancel button
  const handleCancel = () => {
    router.push("/admin/dashboard/menu");
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
            Edit Menu Item
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the menu item information below
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
                id="name"
                name="name"
                value={updateMenuItems.name}
                onChange={handleInputChange}
                placeholder="Enter menu item name"
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
                value={updateMenuItems.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="w-full resize-none min-h-[100px] text-sm sm:text-base"
                disabled={submitting}
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={updateMenuItems.price}
                onChange={handleInputChange}
                placeholder="0.00"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                required
                disabled={submitting}
              />
            </div>

            {/* Category ID */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={updateMenuItems.category_id}
                onValueChange={(value) =>
                  setUpdateMenuItmes({ ...updateMenuItems, category_id: value })
                }
                disabled={submitting}
              >
                <SelectTrigger id="category" className="w-full h-10 sm:h-11">
                  <SelectValue>
                    {categories?.length
                      ? categories.find(
                          (cat) =>
                            cat.id === Number(updateMenuItems.category_id)
                        )?.categoryName || "Select Category"
                      : "Loading Categories..."}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {categories && categories.length > 0 ? (
                    categories.map((category: any) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.categoryName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem
                      key="no-category"
                      value="not-found"
                      disabled
                      className="text-red-500 font-semibold text-sm"
                    >
                      No category found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Type & Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Type
                </Label>
                <Input
                  id="type"
                  name="type"
                  value={updateMenuItems.type}
                  onChange={handleInputChange}
                  placeholder="e.g., Starter, Main Course"
                  className="w-full h-10 sm:h-11 text-sm sm:text-base"
                  disabled={submitting}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Availability <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={updateMenuItems.availability}
                  onValueChange={(value) =>
                    setUpdateMenuItmes({
                      ...updateMenuItems,
                      availability: value,
                    })
                  }
                  disabled={submitting}
                >
                  <SelectTrigger
                    id="availability"
                    className="w-full h-10 sm:h-11"
                  >
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Image URL
              </Label>
              <Input
                id="image_url"
                name="image_url"
                value={updateMenuItems.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                disabled={submitting}
              />
            </div>

            {/* Image Preview */}
            {updateMenuItems.image_url && (
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Image Preview
                </Label>
                <div className="relative w-full h-48 sm:h-64 md:h-72 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                  {!imageError ? (
                    <Image
                      src={updateMenuItems.image_url}
                      alt={updateMenuItems.name || "Menu item"}
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
            )}

            {/* Ingredients */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Ingredients
              </Label>
              <Textarea
                id="ingredients"
                name="ingredients"
                value={updateMenuItems.ingredients}
                onChange={handleInputChange}
                placeholder="Enter ingredients (comma separated)"
                className="w-full resize-none min-h-[100px] text-sm sm:text-base"
                disabled={submitting}
              />
            </div>

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
                    "Update Menu Item"
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
