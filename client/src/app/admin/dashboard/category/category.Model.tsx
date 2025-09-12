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

import { useState } from "react";

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCategory({ open, onOpenChange }: categoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[90%] rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Add Category
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Cateegory Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name.."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="categoryDescription"
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
