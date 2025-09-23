"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, PlusCircle, Trash2, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
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
  deleteReservationById,
  getReservation,
} from "@/lib/store/admin/reservation/reservationSlice";
import { current } from "@reduxjs/toolkit";
import { toLowerCase } from "zod";
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";
export default function ReservationInfo() {
  const [isModal, setIsModal] = useState(false);
  const { reservationData, status } = useAppSelector(
    (store) => store.reservation
  );
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(getReservation());
  }, []);

  const handleStatus = (current: string) => {
    if (current === "Pending") return "Booked";
    else if (current === "Booked") return "Completed";
    else return "Pending";
  };
  //color set
  const setColor = (current: string) => {
    if (current === "Pending") return "bg-yellow-500 text-black";
    if (current === "Booked") return "bg-red-500 text-white";
    if (current == "Completed") return "bg-green-500 text-white";
  };
  // search
  const filterData = reservationData.filter(
    (reservation) =>
      reservation.username
        .toLocaleString()
        .includes(searchText.toLowerCase()) ||
      reservation.username
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
                      {reservation.username
                        ? reservation.username.charAt(0).toUpperCase() +
                          reservation.username.slice(1)
                        : "Unknown User"}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {reservation.tableNumber || "No Table"}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {reservation.guests}
                    </TableCell>
                    <TableCell>{reservation.reservation_date}</TableCell>
                    <TableCell>{reservation.reservation_time}</TableCell>
                    <TableCell>
                      <span
                        onClick={() => handleStatus(reservation.status)}
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${setColor(
                          reservation.status
                        )}`}
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
