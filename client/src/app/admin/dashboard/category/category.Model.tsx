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

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCategory({ open, onOpenChange }: categoryProps) {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((store) => store.category);
  const [data, setCategoryData] = useState<ICategoryData>({
    categoryName: "",
    categoryDescription: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategoryData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addCategory(data));
    if (status === Status.SUCCESS) {
      toast.success("Category added successfully!");
      setCategoryData({ categoryName: "", categoryDescription: "" });
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
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Cateegory Name</Label>
            <Input
              id="categoryName"
              type="text"
              name="categoryName"
              onChange={handleChange}
              placeholder="Enter your name.."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="categoryDescription"
              onChange={handleChange}
              placeholder="Enter category description"
            ></Textarea>
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
