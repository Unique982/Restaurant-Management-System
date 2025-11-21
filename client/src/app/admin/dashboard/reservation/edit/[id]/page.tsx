// app/admin/category/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { ArrowLeft, ImageIcon, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

import {
  IReservationPostData,
  ReservationStatus,
} from "@/lib/store/admin/reservation/reservationSlice.type";
import {
  editResvById,
  getReservation,
  singelFetchResv,
} from "@/lib/store/admin/reservation/reservationSlice";
import { Label } from "@radix-ui/react-dropdown-menu";
import { getTables } from "@/lib/store/admin/tables/tableSlice";
import { getUserList } from "@/lib/store/admin/users/userSlice";

export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { reservationData, singleDetails } = useAppSelector(
    (store) => store.reservation
  );
  const { data } = useAppSelector((store) => store.tables);
  const { usersData } = useAppSelector((store) => store.users);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [reservation, setUpdateReservation] = useState<IReservationPostData>({
    table_id: "",
    guests: 0,
    reservation_date: "",
    reservation_time: "",
    status: ReservationStatus.Pending,
    specailRequest: "",
    phoneNumber: null,
  });
  useEffect(() => {
    dispatch(getReservation());
    dispatch(getTables());
    dispatch(getUserList());
  }, [dispatch]);

  useEffect(() => {
    const fecthReservation = async () => {
      if (params.id) {
        setLoading(true);
        const existReservation = reservationData.find(
          (data) => data.id.toString() === params.id
        );

        if (existReservation) {
          setUpdateReservation({
            table_id: existReservation.table_id,
            guests: existReservation.guests,
            reservation_date: existReservation.reservation_date,
            reservation_time: existReservation.reservation_time,
            status: existReservation.status,
            specailRequest: existReservation.specailRequest || "",
            name: existReservation.name || "",
            phoneNumber: existReservation.phoneNumber || "",
          });
          setLoading(false);
        } else {
          await dispatch(singelFetchResv(params.id as string | number));
          setLoading(false);
        }
      }
    };

    fecthReservation();
  }, [params.id, reservationData]);

  // Update from single category
  useEffect(() => {
    if (singleDetails) {
      setUpdateReservation({
        table_id: singleDetails.table_id,
        guests: singleDetails.guests,
        reservation_date: singleDetails.reservation_date,
        reservation_time: singleDetails.reservation_time,
        status: singleDetails.status,
        specailRequest: singleDetails.specailRequest || "",
        name: singleDetails.name || "",
        phoneNumber: singleDetails.phoneNumber || "",
      });
    }
  }, [singleDetails]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdateReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await dispatch(
      editResvById(params.id as string, reservation)
    );

    setSubmitting(false);

    if (result.success) {
      toast.success("Menu item updated successfully!");
      router.push("/admin/dashboard/reservation");
    } else {
      toast.error(result.message || "Failed to update menu item");
    }
  };

  // cancel button
  const handleCancel = () => {
    router.push("/admin/dashboard/reservation");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit Reservation Details
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Update the reservation information below
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Table <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={
                    reservation.table_id ? String(reservation.table_id) : ""
                  }
                  onValueChange={(val) =>
                    setUpdateReservation((prev) => ({
                      ...prev,
                      table_id: Number(val),
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-11">
                    <SelectValue>
                      {reservation.table_id
                        ? data.find((tb: any) => tb.id === reservation.table_id)
                            ?.tableNumber
                        : "Select Table"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {data && data.length > 0 ? (
                      data.map((table: any) => (
                        <SelectItem key={table.id} value={String(table.id)}>
                          {table.tableNumber || table.table_name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        No tables found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="phoneNumber"
                  name="phoneNumber"
                  value={reservation.phoneNumber || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Guest <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  name="guests"
                  value={reservation.guests || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Status <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={reservation.status}
                  onValueChange={(val) =>
                    setUpdateReservation((p) => ({
                      ...p,
                      status: val as ReservationStatus,
                    }))
                  }
                >
                  <SelectTrigger className="w-full h-10 sm:h-11">
                    <SelectValue>
                      {reservation.status
                        ? reservation.status.charAt(0).toUpperCase() +
                          reservation.status.slice(1)
                        : "Select status"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="cancel">Cancel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Reservation Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={reservation.reservation_date || ""}
                  onChange={handleInputChange}
                  name="reservation_date"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Reservation Time
                </label>

                <Select
                  value={
                    reservation.reservation_time
                      ? // convert 24-hour HH:MM:SS to 12-hour format for select display
                        (() => {
                          const [hours, minutes] = reservation.reservation_time
                            .split(":")
                            .map(Number);
                          const ampm = hours >= 12 ? "PM" : "AM";
                          const hour12 = hours % 12 === 0 ? 12 : hours % 12;
                          return `${hour12}:${minutes
                            .toString()
                            .padStart(2, "0")} ${ampm}`;
                        })()
                      : ""
                  }
                  onValueChange={(value) => {
                    if (!value) return;

                    // Convert 12-hour format (e.g., "2:00 PM") to 24-hour HH:MM:SS
                    const [time, modifier] = value.split(" ");
                    let [hours, minutes] = time.split(":").map(Number);

                    if (modifier === "PM" && hours !== 12) hours += 12;
                    if (modifier === "AM" && hours === 12) hours = 0;

                    const time24 = `${hours
                      .toString()
                      .padStart(2, "0")}:${minutes
                      .toString()
                      .padStart(2, "0")}:00`;

                    // Update state
                    setUpdateReservation({
                      ...reservation,
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
              <Label className="text-sm font-semibold text-gray-700 uppercase">
                Special Request
              </Label>
              <Textarea
                value={reservation.specailRequest || ""}
                onChange={(e) =>
                  setUpdateReservation({
                    ...reservation,
                    specailRequest: e.target.value,
                  })
                }
                className="w-full bg-gray-50 border-gray-300 resize-none min-h-[100px] text-gray-900"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-5 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full sm:flex-1 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:flex-1 h-10 sm:h-11 text-sm sm:text-base"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Menu Item"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
