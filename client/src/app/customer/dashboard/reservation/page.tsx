"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Loader2, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/admin/Pagination/pagination";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  getReservation,
  statusUpdate,
} from "@/lib/store/admin/reservation/reservationSlice";

import toast from "react-hot-toast";
import { ReservationStatus } from "@/lib/store/admin/reservation/reservationSlice.type";
import { getTables } from "@/lib/store/admin/tables/tableSlice";
import { getUserList } from "@/lib/store/admin/users/userSlice";
import { useParams, useRouter } from "next/navigation";

export default function ReservationInfo() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const { reservationData, status } = useAppSelector(
    (state) => state.reservation
  );
  const { data } = useAppSelector((state) => state.tables);
  const { usersData } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");
  // cancel Reservvation
  const handleCancel = async (id: number | string) => {
    const result = await dispatch(
      statusUpdate(id, ReservationStatus.Cancelled)
    );
    if (result.success) {
      toast.success("Reservation cancelled successfully!");
    } else {
      toast.error(result.message || "Failed to cancel!");
    }
  };

  useEffect(() => {
    setLoading(true);
    dispatch(getReservation());
    dispatch(getTables());
    dispatch(getUserList());
    setLoading(false);
  }, [dispatch]);

  // search
  const filterData = reservationData.filter((reservation) => {
    const username = reservation.user?.username || "";
    const tableNumber = reservation.table?.tableNumber || "";
    return (
      username.toLowerCase().includes(searchText.toLowerCase()) ||
      new Date(reservation.reservation_date)
        .toLocaleDateString()
        .includes(searchText) ||
      tableNumber.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold"> My Reservation</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Reservation..."
              className="w-full sm:w-[250px]"
              onChange={(e) => setSearchText(e.target.value)}
            />
            {/* add button  */}
          </div>
        </div>

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Table Number</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Reservation Date</TableHead>
                <TableHead>Reservation Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((reservation, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {reservation.user_id
                        ? reservation.name ||
                          reservation.user?.username ||
                          "Unknown User"
                        : reservation.name || "No"}
                    </TableCell>

                    <TableCell className="whitespace-normal break-words">
                      {reservation.tableNumber}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {reservation.phoneNumber}
                    </TableCell>

                    <TableCell className="whitespace-normal break-words">
                      {reservation.guests}
                    </TableCell>
                    <TableCell>{reservation.reservation_date}</TableCell>
                    <TableCell>
                      {new Date(
                        `1970-01-01T${reservation.reservation_time}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer capitalize ${
                          reservation.status === ReservationStatus.Pending
                            ? "bg-blue-500 text-white"
                            : reservation.status === ReservationStatus.Booking
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {reservation.status.charAt(0).toUpperCase() +
                          reservation.status.slice(1)}
                      </span>
                    </TableCell>

                    <TableCell>
                      {new Date(reservation.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right flex flex-wrap justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        title="View"
                        onClick={() =>
                          router.push(
                            `/customer/dashboard/reservation/${reservation.id}`
                          )
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {reservation.status === "pending" ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          title="Cancel"
                          onClick={() => handleCancel(reservation.id)}
                          className="p-1"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </Button>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-4 text-red-600"
                  >
                    No reservations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}

        <Pagination />
      </div>
    </>
  );
}
