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

import { ChangeEvent, FormEvent, useState } from "react";
import {
  ITablesData,
  tableStatus,
} from "@/lib/store/admin/tables/tableSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { createTables, getTables } from "@/lib/store/admin/tables/tableSlice";

import toast from "react-hot-toast";

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddTable({ open, onOpenChange }: categoryProps) {
  const [isModal, setIsModal] = useState(true);
  const { status } = useAppSelector((store) => store.tables);
  const dispatch = useAppDispatch();

  const [tablesData, setTablesData] = useState<ITablesData>({
    tableNumber: "",
    seats: "",
    tableStatus: tableStatus.Available,
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTablesData({
      ...tablesData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await dispatch(createTables(tablesData));
    if (result.success) {
      toast.success("Table added successfully!");
      onOpenChange(false);
      dispatch(getTables());
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Add Table</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label>Table Number</Label>
            <Input
              id="tableNumber"
              type="text"
              name="tableNumber"
              onChange={handleChange}
              placeholder="Enter Table number"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>

            <Select name="	tableStatus">
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Select Status"
                  onChange={handleChange}
                />
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
              onChange={handleChange}
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
