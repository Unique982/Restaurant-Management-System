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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import toast from "react-hot-toast";
import {
  createMenuItems,
  getMenuItem,
} from "@/lib/store/admin/menuItems/menuItemSlice";
import { IMenuItemsData } from "@/lib/store/admin/menuItems/menuItemSlice.type";
import { getCategory } from "@/lib/store/admin/category/categorySlice";

interface menuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddMenu({ open, onOpenChange }: menuProps) {
  const [isModal, setModal] = useState(true);
  const { status } = useAppSelector((store) => store.menuItems);
  const { data: categories } = useAppSelector((store) => store.category);
  const dispatch = useAppDispatch();
  const [menuData, setMenuData] = useState<IMenuItemsData>({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image_url: "",
    type: "",
    availability: "",
    ingredients: "",
  });
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const chnageHandle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMenuData({
      ...menuData,
      [name]: value,
    });
  };
  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await dispatch(createMenuItems(menuData));
    if (result) {
      toast.success("menu added successfully!");
      onOpenChange(false);
      dispatch(getMenuItem());
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
        <form className="space-y-3 " onSubmit={submitHandle}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Menu Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                onChange={chnageHandle}
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Price</Label>
              <Input
                id="price"
                name="price"
                onChange={chnageHandle}
                type="number"
                placeholder="Enter your name.."
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select>
              <SelectTrigger className="w-full" name="categoryId">
                <SelectValue
                  placeholder="Select Category"
                  onChange={chnageHandle}
                />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.categoryName}>
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
              name="description"
              onChange={chnageHandle}
            ></Textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Image</Label>
              <Input
                id="file"
                name="image_url"
                onChange={chnageHandle}
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
                onChange={chnageHandle}
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
              name="type"
              onChange={chnageHandle}
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
