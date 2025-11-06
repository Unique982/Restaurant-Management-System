"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IContactUs } from "@/lib/store/contactUs/contactSlice.type";
import { Label } from "@radix-ui/react-dropdown-menu";
interface ViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: IContactUs;
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
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Username */}
          <div className="flex flex-col">
            <Label>Username</Label>
            <Input
              value={data.username}
              readOnly
              className="w-full bg-gray-50 "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <Label>Email</Label>
            <Input value={data.email} readOnly className="w-full bg-gray-50" />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <Label>Phone Number</Label>
            <Input
              value={data.phoneNumber}
              readOnly
              className="w-full bg-gray-50 "
            />
          </div>

          {/* Message */}
          <div className="flex flex-col">
            <Label>Message</Label>
            <Textarea
              value={data.message}
              readOnly
              className="w-full bg-gray-50  resize-none min-h-[150px] p-3 rounded-md"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
