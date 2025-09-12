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

import { useState } from "react";

interface UserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddUser({ open, onOpenChange }: UserProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md w-[90%] rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add User</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>User Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name.."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email.."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password.."
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password.."
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
