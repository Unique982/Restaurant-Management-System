"use client";
import { useState } from "react";
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
export default function ReservationInfo() {
  const [isModal, setIsModal] = useState(false);
  const [status, setStatus] = useState("Pending");

  const handleStatus = () => {
    if (status === "Pending") setStatus("Booked");
    else if (status === "Booked") setStatus("Completed");
    else setStatus("Pending");
  };
  //color set
  const setColor = () => {
    if (status === "Pending") return "bg-yellow-500 text-black";
    if (status === "Booked") return "bg-red-500 text-white";
    if (status == "Completed") return "bg-green-500 text-white";
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
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell className="whitespace-normal break-words">
                  Menu1
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  1001
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  6
                </TableCell>
                <TableCell>2082/12/12</TableCell>
                <TableCell>10:00 Am</TableCell>
                <TableCell>
                  <span
                    onClick={handleStatus}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${setColor()}`}
                  >
                    {status}
                  </span>
                </TableCell>

                <TableCell>2082/12/12</TableCell>
                <TableCell className="text-right flex flex-wrap justify-end gap-2">
                  <Button variant="secondary" size="sm" title="View">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" title="Edit">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {/* if table ma data xaina vani chai not found  */}
              {/* <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No users found
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}

        <Pagination />
      </div>
    </>
  );
}
