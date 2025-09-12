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

export default function AddReservation({ open, onOpenChange }: categoryProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full h-full sm:h-auto 
    max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl 
    rounded-none sm:rounded-lg 
    p-6 
    bg-white 
    mx-auto 
    overflow-y-auto
    border border-gray-200
    shadow-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Reservation Add
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form className="space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>User Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <Input
                id="phoneNumber"
                type="number"
                name="phoneNumber"
                placeholder="Enter phone number..."
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Address</Label>
              <Input
                id="address"
                type="text"
                name="address"
                placeholder="Enter your address ..."
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Table Number</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Table" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">A1</SelectItem>
                  <SelectItem value="health">A2</SelectItem>
                  <SelectItem value="finance">A3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Guest</Label>
            <Input
              id="name"
              type="number"
              name="name"
              placeholder="Number of guest"
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Reservation Date</Label>
              <Input
                id="name"
                type="date"
                name="name"
                placeholder="Number of guest"
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Reservation Date</Label>
              <Input
                id="name"
                type="time"
                name="name"
                placeholder="Number of guest"
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label> Specail Request</Label>
            <Textarea
              name="specailRequest"
              placeholder="Enter 	Specail Request"
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
