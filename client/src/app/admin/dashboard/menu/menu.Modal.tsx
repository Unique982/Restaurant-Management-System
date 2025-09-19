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
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useForm } from "react-hook-form";
import {
  menuItemsSchema,
  menuItemsSchemaTypes,
} from "@/lib/validations/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  createMenuItems,
  getMenuItem,
} from "@/lib/store/admin/menuItems/menuItemSlice";

interface menuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddMenu({ open, onOpenChange }: menuProps) {
  const [isModal, setModal] = useState(true);
  const { status } = useAppSelector((store) => store.menuItems);
  const { data: categories } = useAppSelector((store) => store.category);
  const dispatch = useAppDispatch();
  const {
    register: menuRegister,
    handleSubmit: handleMenuItemsSubmit,
    formState: { errors: menuErrors },
  } = useForm<menuItemsSchemaTypes>({
    resolver: zodResolver(menuItemsSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      image_url: "",
      availability: "available",
      ingredients: "",
      type: "",
    },
  });
  const onSubmit = async (menuItems: menuItemsSchemaTypes) => {
    const success = await dispatch(createMenuItems(menuItems));
    if (success) {
      toast.success("Menu Items added successful!");
      onOpenChange(false);
      dispatch(getMenuItem);
    } else {
      toast.error("Failed to added menuItems ");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full h-screen 
  max-w-full 
  rounded-md 
  p-8 sm:p-6 md:p-8 
  bg-white 
  mx-auto 
  overflow-y-auto
  border border-gray-200
  shadow-sm"
      >
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold text-center">
            Add Menu
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form className="space-y-3 " onSubmit={handleMenuItemsSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Menu Name</Label>
              <Input
                id="name"
                type="text"
                {...menuRegister("name")}
                placeholder="Enter your name.."
                className="w-full"
              />
              {menuErrors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {menuErrors.name.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                id="price"
                {...menuRegister("price")}
                type="number"
                placeholder="Enter your name.."
                className="w-full"
              />
              {menuErrors.price && (
                <span className="text-red-500 text-sm mt-1 block">
                  {menuErrors.price.message}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select Category"
                  {...menuRegister("categoryId")}
                />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.categoryName}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem
                    key="no-category"
                    value="not found"
                    disabled
                    className="text-red-500 font-semibold text-sm"
                  >
                    No data found
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter description"
              {...menuRegister("description")}
            ></Textarea>
            {menuErrors.description && (
              <span className="text-red-500 text-sm mt-1 block">
                {menuErrors.description.message}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Image</Label>
              <Input
                id="file"
                {...menuRegister("image_url")}
                type="file"
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <Label>Ingredients</Label>
              <Input
                id="ingredients"
                {...menuRegister("ingredients")}
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
              {...menuRegister("type")}
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
