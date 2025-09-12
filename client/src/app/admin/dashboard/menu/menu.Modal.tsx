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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddMenu({ open, onOpenChange }: categoryProps) {
  const [isModal, setModal] = useState(true);

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
            Add Menu
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form className="space-y-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Menu Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="categoryDescription"
              placeholder="Enter category description"
            ></Textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Image</Label>
              <Input
                id="file"
                name="image_url"
                type="file"
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Ingredients</Label>
              <Input
                id="ingredients"
                name="ingredients"
                type="text"
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Availability</Label>
            <RadioGroup defaultValue="available" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="available" id="available" />
                <Label>Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="not_available" id="not_available" />
                <Label>Not Available</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Menu Types</Label>
            <Input
              id="types"
              name="types"
              type="text"
              placeholder="veg or non-veg"
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
