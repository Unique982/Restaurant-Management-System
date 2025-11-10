"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import toast from "react-hot-toast";
import { postServiceItems } from "@/lib/store/services/servicesSlice.type";
import {
  fetchServices,
  serviceAdded,
} from "@/lib/store/services/servicesSlice";

interface serviceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddServices({ open, onOpenChange }: serviceProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { data } = useAppSelector((store) => store.services);
  const [serviceItem, setServiceItem] = useState<postServiceItems>({
    serviceTitle: "",
    serviceDescription: "",
    serviceIcon: null,
  });
  useEffect(() => {
    dispatch(fetchServices());
  }, []);
  const changeHandle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;

    setServiceItem({
      ...serviceItem,
      [name]: type === "file" && files ? files[0] : value,
    });
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result: any = await dispatch(serviceAdded(serviceItem));
    setLoading(true);
    if (result.success) {
      onOpenChange(false);
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
      w-[95%] sm:w-[90%] md:w-[600px]
      max-h-[90vh]
      rounded-2xl 
      p-6 sm:p-8
      bg-white 
      mx-auto 
      overflow-y-auto
      border border-gray-200
      shadow-lg
    "
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-center text-gray-800">
            Add Service
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form className="space-y-4 mt-4" onSubmit={submitHandle}>
          {/* Service Title */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Service Title
            </Label>
            <Input
              id="serviceTitle"
              type="text"
              name="serviceTitle"
              onChange={changeHandle}
              placeholder="Enter your service title"
              className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="serviceDescription"
              name="serviceDescription"
              onChange={changeHandle}
              placeholder="Enter description"
              rows={4}
              className="w-full border-gray-300 focus:border-orange-500 focus:ring-orange-500 resize-none"
              required
            />
          </div>

          {/* Icon Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Icon</Label>
            <Input
              id="file"
              name="serviceIcon"
              onChange={changeHandle}
              type="file"
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-300 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
