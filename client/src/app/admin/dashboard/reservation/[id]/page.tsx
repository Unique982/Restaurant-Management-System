"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getReservation } from "@/lib/store/admin/reservation/reservationSlice";
import { IIReservation } from "@/lib/store/admin/reservation/reservationSlice.type";

export default function ReservationViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { reservationData } = useAppSelector((store) => store.reservation);
  const [reservation, setReservation] = useState<IIReservation | null>(null);

  useEffect(() => {
    if (reservationData.length === 0) {
      dispatch(getReservation());
    }
  }, [dispatch, reservationData.length]);

  useEffect(() => {
    if (params.id && reservationData.length > 0) {
      const found = reservationData.find(
        (res) => res.id.toString() === params.id
      );
      setReservation(found || null);
    }
  }, [params.id, reservationData]);

  if (!reservationData || reservationData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-2">Reservation Not Found</h2>
        <p className="text-gray-600 mb-4">
          The reservation you are looking for does not exist.
        </p>
        <Button
          onClick={() => router.push("/admin/dashboard/reservations")}
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Reservations
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            onClick={() => router.push("/admin/dashboard/reservation")}
            variant="ghost"
            className="mb-4 text-gray-600 bg-green-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reservations
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Reservation Details
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase">
                User Name
              </label>
              <Input
                value={
                  reservation.user?.username || reservation.name || "Unknown"
                }
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase">
                Phone Number
              </label>
              <Input
                value={reservation.phoneNumber || "-"}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Table Number
                </label>
                <Input
                  value={reservation.tableNumber || ""}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Guests
                </label>
                <Input
                  value={reservation.guests}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Reservation Date
                </label>
                <Input
                  value={reservation.reservation_date}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Reservation Time
                </label>
                <Input
                  value={reservation.reservation_time}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase">
                Status
              </label>
              <Input
                value={
                  reservation.status
                    ? reservation.status.charAt(0).toUpperCase() +
                      reservation.status.slice(1)
                    : ""
                }
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase">
                Special Request
              </label>
              <Textarea
                value={reservation.specailRequest || "-"}
                readOnly
                className="w-full bg-gray-50 border-gray-300 resize-none min-h-[100px] text-gray-900"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Created At
                </label>
                <Input
                  value={new Date(reservation.createdAt).toLocaleString()}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>

              {reservation.updatedAt && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase">
                    Updated At
                  </label>
                  <Input
                    value={new Date(reservation.updatedAt).toLocaleString()}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex gap-3">
            <Button
              onClick={() => router.push("/admin/dashboard/reservation")}
              variant="outline"
              className="flex-1"
            >
              Back to List
            </Button>
            <Button
              onClick={() =>
                router.push(
                  `/admin/dashboard/reservation/edit/${reservation.id}`
                )
              }
              className="flex-1"
            >
              Edit Reservation
            </Button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-6">
            <p className="text-sm text-blue-800 text-center sm:text-left">
              💡 Tap <span className="font-semibold">"Edit Reservations"</span>{" "}
              to make changes to this reservation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
