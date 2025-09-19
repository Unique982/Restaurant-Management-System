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
import {
  addCategory,
  getCategory,
} from "@/lib/store/admin/category/categorySlice";
import { ICategoryData } from "@/lib/store/admin/category/categorySlice.type";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Status } from "@/lib/types/type";
import { Label } from "@radix-ui/react-dropdown-menu";

import { ChangeEvent, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  categorySchema,
  categorySchemaType,
} from "@/lib/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCategory({ open, onOpenChange }: categoryProps) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.category);
  // const [data, setCategoryData] = useState<ICategoryData>({
  //   categoryName: "",
  //   categoryDescription: "",
  // });

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
    const success = await dispatch(addCategory(data));
    if (success) {
      toast.success("Category added successfully!");
      onOpenChange(false); // Close modal
      dispatch(getCategory());
    } else {
      toast.error("Failed to add category!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[90%] rounded-lg p-6 bg-white">
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
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
