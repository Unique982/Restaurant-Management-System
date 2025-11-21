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
  const [loading, setLoading] = useState(false);
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
      name: null,
      phoneNumber: null,
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
    setLoading(true);
    const result: any = await dispatch(createReservation(reservationDatas));
    if (result.success) {
      onOpenChange(false);
      dispatch(getReservation());
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
    setLoading(false);
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
              <Input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Enter guest name"
                className="w-full"
              />
            </div>
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                placeholder="Enter guest name"
                className="w-full"
              />
            </div>
          </div>
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
                type="date"
                onChange={handleChange}
                value={reservationDatas.reservation_date || ""}
                name="reservation_date"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-1">
              <Label>Reservation Time</Label>
              <Select
                value={reservationDatas.reservation_time || ""}
                onValueChange={(value) => {
                  if (!value) return;

                  // Convert 12-hour format (e.g., "2:00 PM") to 24-hour HH:MM:SS
                  const [time, modifier] = value.split(" ");
                  let [hours, minutes] = time.split(":").map(Number);

                  if (modifier === "PM" && hours !== 12) hours += 12;
                  if (modifier === "AM" && hours === 12) hours = 0;

                  const time24 = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:00`;

                  // Update state with 24-hour format
                  setReservationDatas({
                    ...reservationDatas,
                    reservation_time: time24,
                  });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => {
                    const hour24 = i + 10; // 10 AM to 8 PM
                    const ampm = hour24 < 12 ? "AM" : "PM";
                    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
                    const formattedTime = `${hour12}:00 ${ampm}`;
                    return (
                      <SelectItem key={hour24} value={formattedTime}>
                        {formattedTime}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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
            disabled={loading}
            className={`w-full bg-orange-500 hover:bg-orange-600 ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Processing..." : " Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
