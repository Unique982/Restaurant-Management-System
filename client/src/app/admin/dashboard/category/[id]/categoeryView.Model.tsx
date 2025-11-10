"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ICategory } from "@/lib/store/admin/category/categorySlice.type";
import { Label } from "@radix-ui/react-dropdown-menu";
interface ViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ICategory;
}

export default function ViewCategorModal({
  open,
  onOpenChange,
  data,
}: ViewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} close-none>
      <DialogContent className="w-full sm:max-w-md rounded-lg p-6 bg-white border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col">
            <Label>Category Name</Label>
            <Input
              value={data.categoryName}
              readOnly
              className="w-full bg-gray-50 "
            />
          </div>
          {/* Message */}
          <div className="flex flex-col">
            <Label>Message</Label>
            <Textarea
              value={data.categoryDescription}
              readOnly
              className="w-full bg-gray-50  resize-none min-h-[150px] p-3 rounded-md"
            />
          </div>
          {/* Created At */}
          <div className="flex flex-col">
            <Label>Created At</Label>
            <Input
              value={
                data.createdAt ? new Date(data.createdAt).toLocaleString() : "-"
              }
              readOnly
              className="w-full bg-gray-50"
            />
          </div>

          {/* Updated At */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
