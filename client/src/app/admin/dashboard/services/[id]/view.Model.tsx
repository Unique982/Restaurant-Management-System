"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceItems } from "@/lib/store/services/servicesSlice.type";

import { Label } from "@radix-ui/react-dropdown-menu";
interface ViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: serviceItems;
}

export default function ViewModal({
  open,
  onOpenChange,
  data,
}: ViewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-md rounded-lg p-6 bg-white border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Service Deatils
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col">
            <Label>Service Title</Label>
            <Input
              value={data.serviceTitle}
              readOnly
              className="w-full bg-gray-50 "
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <Label>Service Description</Label>
            <Textarea
              value={data.serviceDescription}
              readOnly
              className="w-full bg-gray-50  resize-none min-h-[150px] p-3 rounded-md"
            />
          </div>
          {data.serviceIcon && (
            <div className="flex flex-col">
              <Label>Service Icon</Label>
              <img
                src={data.serviceIcon}
                alt={data.serviceTitle}
                className="w-20 h-20 object-contain rounded-md border border-gray-300 mt-1"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
