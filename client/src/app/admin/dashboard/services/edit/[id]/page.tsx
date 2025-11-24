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

import { Label } from "recharts";
import { postServiceItems } from "@/lib/store/services/servicesSlice.type";
import {
  editServiceById,
  fetchServices,
} from "@/lib/store/services/servicesSlice";

export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [imageError, setImageError] = useState(false);
  const { data } = useAppSelector((store) => store.services);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [serviceItem, setServiceUpdate] = useState<postServiceItems>({
    serviceTitle: "",
    serviceDescription: "",
    serviceIcon: null,
  });

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const fetchService = async () => {
      if (params.id) {
        setLoading(true);
        const exitsService = data.find(
          (item) => item.id.toString() === params.id
        );
        if (exitsService) {
          setServiceUpdate({
            serviceTitle: exitsService.serviceTitle,
            serviceDescription: exitsService.serviceDescription,
            serviceIcon: exitsService.serviceIcon,
          });
          setLoading(false);
        }
      }
    };

    fetchService();
  }, [params.id, dispatch, data]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setServiceUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "serviceIcon") {
      setImageError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await dispatch(
      editServiceById(params.id as string, serviceItem)
    );

    setSubmitting(false);
    if (result.success) {
      toast.success("Service updated successfully!");
      router.push("/admin/dashboard/services");
    } else {
      toast.error(result.message || "Failed to update service");
    }
  };
  // cancel button
  const handleCancel = () => {
    router.push("/admin/dashboard/services");
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
            Edit Service
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the service information below
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
                name="serviceTitle"
                value={serviceItem.serviceTitle}
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
                id="serviceDescription"
                name="serviceDescription"
                value={serviceItem.serviceDescription}
                onChange={handleInputChange}
                placeholder="Enter description"
                className="w-full resize-none min-h-[100px] text-sm sm:text-base"
                disabled={submitting}
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Image URL
              </Label>
              <Input
                type="file"
                name="serviceIcon"
                onChange={handleInputChange}
                placeholder="Upload image"
                className="w-full h-10 sm:h-11 text-sm sm:text-base"
                disabled={submitting}
              />
            </div>

            {/* Image Preview */}
            {serviceItem.serviceIcon && (
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Image Preview
                </Label>
                <div className="relative">
                  {!imageError ? (
                    <img
                      src={serviceItem.serviceIcon}
                      alt={serviceItem.serviceTitle || "no image"}
                      className="w-20 h-20 object-contain rounded-md border border-gray-300 mt-1"
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
                    "Update Service"
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
