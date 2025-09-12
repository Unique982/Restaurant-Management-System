"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddTable({ open, onOpenChange }: categoryProps) {
  const [isModal, setIsModal] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Add Table</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label>Table Number</Label>
            <Input
              id="tableNumber"
              type="text"
              name="tableNumber"
              placeholder="Enter Table number"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Total Seats</Label>
            <Input
              id="seats"
              type="text"
              name="seats"
              placeholder="Total Seats"
              className="w-full"
            />
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
