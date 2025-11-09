"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IReservationPostData,
  ReservationStatus,
} from "@/lib/store/admin/reservation/reservationSlice.type";
import { Calendar, Clock, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { getTables } from "@/lib/store/admin/tables/tableSlice";
import { bookingTable } from "@/lib/store/admin/reservation/reservationSlice";
import toast from "react-hot-toast";

export default function ReservationSection() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.tables);
  const [loading, setLoading] = useState(false);
  const [reservationDatas, setReservationDatas] =
    useState<IReservationPostData>({
      user_id: null,
      table_id: "",
      guests: 0,
      reservation_date: "",
      reservation_time: "",
      status: ReservationStatus.Pending,
      specailRequest: "",
      name: null,
      phoneNumber: null,
    });

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch]);

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
    const result: any = await dispatch(bookingTable(reservationDatas));
    setLoading(false);
    if (result.success) {
      toast.success("Reservation Booked success!");
      setReservationDatas({
        user_id: null,
        table_id: "",
        guests: 0,
        reservation_date: "",
        reservation_time: "",
        status: ReservationStatus.Pending,
        specailRequest: "",
        name: null,
        phoneNumber: null,
      });
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };
  return (
    <section id="reservation" className="px-4 py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Reservation</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Book your table easily with our online reservation system and enjoy a
          delightful dining experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Info */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Reserve?
          </h3>
          <p className="text-gray-600 mb-6">
            Enjoy hassle-free dining with guaranteed seating. Perfect for family
            gatherings, special occasions, or business meetings.
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-orange-600" /> Flexible Date
              Selection
            </li>
            <li className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-600" /> Choose Your
              Preferred Time
            </li>
            <li className="flex items-center gap-3">
              <Users className="w-5 h-5 text-orange-600" /> Book for Family or
              Group
            </li>
          </ul>
        </div>

        {/* Reservation Form */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
            Book a Table
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Reserve your spot and enjoy a delightful dining experience with us.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                onChange={handleChange}
                value={reservationDatas.name || ""}
                name="name"
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                value={reservationDatas.phoneNumber || ""}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="date"
                onChange={handleChange}
                value={reservationDatas.reservation_date || ""}
                name="reservation_date"
                min={new Date().toISOString().split("T")[0]}
              />

              <Select
                value={reservationDatas.reservation_time || ""}
                onValueChange={(value) =>
                  setReservationDatas({
                    ...reservationDatas,
                    reservation_time: value,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => {
                    const hour24 = i + 9; // 9 AM to 11 PM
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                value={String(reservationDatas.table_id)}
                onValueChange={(value) =>
                  setReservationDatas({
                    ...reservationDatas,
                    table_id: value,
                  })
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
                      value="not-found"
                      disabled
                      className="text-red-500 font-semibold text-sm"
                    >
                      No tables found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Input
                type="number"
                name="guests"
                placeholder="Number of Guests"
                min="1"
                onChange={handleChange}
                value={reservationDatas.guests || ""}
              />
            </div>

            <Textarea
              placeholder="Additional Message"
              onChange={handleChange}
              name="specailRequest"
              value={reservationDatas.specailRequest || ""}
            />

            <Button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-600 hover:bg-orange-700 text-white ${
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
              {loading ? "Processing..." : "Book Now"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
