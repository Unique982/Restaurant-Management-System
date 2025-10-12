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
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  IReservationPostData,
  ReservationStatus,
} from "@/lib/store/admin/reservation/reservationSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  createReservation,
  fetchReservation,
  getReservation,
} from "@/lib/store/admin/reservation/reservationSlice";
import toast from "react-hot-toast";
import { getTables } from "@/lib/store/admin/tables/tableSlice";
import { getUserList } from "@/lib/store/admin/users/userSlice";

interface categoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddReservation({ open, onOpenChange }: categoryProps) {
  const dispatch = useAppDispatch();
  const { usersData } = useAppSelector((store) => store.users);
  const { data } = useAppSelector((store) => store.tables);
  useEffect(() => {
    dispatch(getTables());
    dispatch(getUserList());
  }, []);
  const [reservationDatas, setReservationDatas] =
    useState<IReservationPostData>({
      user_id: "",
      table_id: "",
      guests: 0,
      reservation_date: "",
      reservation_time: "",
      status: ReservationStatus.Pending,
      specailRequest: "",
    });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setReservationDatas({
      ...reservationDatas,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await dispatch(createReservation(reservationDatas));
    if (result.success) {
      toast.success("Reservation Booked success!");
      onOpenChange(false);
      dispatch(getReservation());
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>User Name</Label>
              <Select
                value={String(reservationDatas.user_id)}
                onValueChange={(value) =>
                  setReservationDatas({ ...reservationDatas, user_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                  {usersData.length > 0 ? (
                    usersData.map((user) => (
                      <SelectItem key={user.id} value={String(user.id)}>
                        {user.username}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem
                      key="no-user"
                      value="not found"
                      disabled
                      className="text-red-500 font-semibold text-sm"
                    >
                      No user found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="space-y-1">
              <Label>Table Number</Label>
              <Select
                value={String(reservationDatas.table_id)}
                onValueChange={(value) =>
                  setReservationDatas({ ...reservationDatas, table_id: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Table" />
                </SelectTrigger>
                <SelectContent>
                  {data.length > 0 ? (
                    data.map((table) => (
                      <SelectItem key={table.id} value={String(table.id)}>
                        {table.tableNumber}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem
                      key="no-table"
                      value="not found"
                      disabled
                      className="text-red-500 font-semibold text-sm"
                    >
                      No table found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label>Guest</Label>
            <Input
              id="name"
              type="number"
              name="guests"
              onChange={handleChange}
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
                name="reservation_date"
                onChange={handleChange}
                placeholder="Number of guest"
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Reservation Date</Label>
              <Input
                id="name"
                type="time"
                name="reservation_time"
                onChange={handleChange}
                placeholder="Number of guest"
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              name="status"
              value={reservationDatas.status}
              onValueChange={(value) =>
                setReservationDatas({
                  ...reservationDatas,
                  status: value as ReservationStatus,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ReservationStatus.Pending}>
                  Pending
                </SelectItem>
                <SelectItem value={ReservationStatus.Booking}>
                  Booking
                </SelectItem>
                <SelectItem value={ReservationStatus.Cancelled}>
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label> Specail Request</Label>
            <Textarea
              name="specailRequest"
              placeholder="Enter 	Specail Request"
              onChange={handleChange}
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
