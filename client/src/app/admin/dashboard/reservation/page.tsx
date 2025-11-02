"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/admin/Pagination/pagination";
import AddReservation from "./reservation.Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deleteReservation,
  getReservation,
  statusUpdate,
} from "@/lib/store/admin/reservation/reservationSlice";

import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";
import { initSocket } from "@/lib/socket";
import {
  IReservationPostData,
  ReservationStatus,
} from "@/lib/store/admin/reservation/reservationSlice.type";

export default function ReservationInfo() {
  const [isModal, setIsModal] = useState(false);
  const { reservationData, status } = useAppSelector(
    (store) => store.reservation
  );
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(getReservation());
    const socket = initSocket();
    const handleAdded = (data: IReservationPostData) => {
      dispatch(getReservation());
      toast.success("Reservation added successfully!");
    };
    const handleUpdated = (data: IReservationPostData) => {
      dispatch(getReservation());
      toast.success("Reservation updated successfully!");
    };
    const handleDeleted = (data: { id: number }) => {
      dispatch(getReservation());
      toast.success("Reservation deleted successfully!");
    };
    socket.on("reservationAdded", handleAdded);
    socket.on("reservationUpdated", handleUpdated);
    socket.on("reservationDeleted", handleDeleted);
    return () => {
      socket.off("tableAdded", handleAdded);
      socket.off("tableUpdated", handleUpdated);
      socket.off("tableDeleted", handleDeleted);
    };
  }, []);

  const handleStatus = async (
    id: number | string,
    currentStatus: ReservationStatus
  ) => {
    let nextStatus: ReservationStatus;
    switch (currentStatus) {
      case ReservationStatus.Pending:
        nextStatus = ReservationStatus.Booking;
        break;
      case ReservationStatus.Booking:
        nextStatus = ReservationStatus.Cancelled;
        break;
      default:
        nextStatus = ReservationStatus.Pending;
    }
    await dispatch(statusUpdate(id, nextStatus));
  };

  // search
  const filterData = reservationData.filter(
    (reservation) =>
      reservation.user.username
        .toLocaleString()
        .includes(searchText.toLowerCase()) ||
      reservation.user.username
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      new Date(reservation.reservation_date)
        .toLocaleDateString()
        .includes(searchText) ||
      reservation.table_id
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  // delete function
  const deleteHandle = async (id: string | number) => {
    await dispatch(deleteReservation(id));
    if (status === Status.SUCCESS) {
      dispatch(getReservation());
      toast.success("Delete Successful!");
    } else {
      toast.error("Something Wrong");
    }
  };

  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Reservation Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Reservation..."
              className="w-full sm:w-[250px]"
              onChange={(e) => setSearchText(e.target.value)}
            />
            {/* add button  */}
            <Button onClick={() => setIsModal(true)}>Add Reservation </Button>
          </div>
        </div>
        <AddReservation open={isModal} onOpenChange={setIsModal} />

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Table Number</TableHead>
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
                      {reservation.user.username
                        ? reservation.user.username.charAt(0).toUpperCase() +
                          reservation.user.username.slice(1)
                        : "Unknown User"}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {reservation.table.tableNumber || "No Table"}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {reservation.guests}
                    </TableCell>
                    <TableCell>{reservation.reservation_date}</TableCell>
                    <TableCell>
                      <span
                        onClick={() =>
                          handleStatus(reservation.id, reservation.status)
                        }
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

                    <TableCell>{reservation.createdAt}</TableCell>
                    <TableCell className="text-right flex flex-wrap justify-end gap-2">
                      <Button variant="secondary" size="sm" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        type="submit"
                        onClick={(e) => deleteHandle(reservation.id)}
                        variant="destructive"
                        size="sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-red-600"
                  >
                    No users found
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
