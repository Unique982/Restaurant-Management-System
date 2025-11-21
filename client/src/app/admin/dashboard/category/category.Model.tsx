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
import { addCategory } from "@/lib/store/admin/category/categorySlice";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Label } from "@radix-ui/react-dropdown-menu";

import { useForm } from "react-hook-form";
import {
  categorySchema,
  categorySchemaType,
} from "@/lib/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCategory({ open, onOpenChange }: categoryProps) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const {
    register: category,
    handleSubmit: handleCategorySubmit,
    formState: { errors: categoryErrors },
  } = useForm<categorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: "",
      categoryDescription: "",
    },
  });
  const onSubmit = async (data: categorySchemaType) => {
    setLoading(true);
    const success = await dispatch(addCategory(data));
    if (success) {
      onOpenChange(false); // Close modal
    } else {
      toast.error("Failed to add category!");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full rounded-lg p-6 bg-white ">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add Category
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form
          className="space-y-4 mt-4"
          onSubmit={handleCategorySubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Label>Cateegory Name</Label>
            <Input
              id="categoryName"
              type="text"
              {...category("categoryName")}
              placeholder="Enter your name.."
              className="w-full"
            />
            {categoryErrors.categoryName && (
              <span className="text-red-500 text-sm mt-1 block">
                {categoryErrors.categoryName.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...category("categoryDescription")}
              placeholder="Enter category description"
              className="w-full resize-none"
              rows={2}
              cols={4}
            ></Textarea>
            {categoryErrors.categoryDescription && (
              <span className="text-red-500 text-sm mt-1 block">
                {categoryErrors.categoryDescription.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 hover:bg-orange-600 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading && (
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
            )}
            {loading ? "Processing..." : " Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
