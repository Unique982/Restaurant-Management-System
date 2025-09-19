"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, PlusCircle, Trash2, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/admin/Pagination/pagination";
import AddTable from "./table.Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deleteTableById,
  deleteTablesById,
  getTables,
} from "@/lib/store/admin/tables/tableSlice";
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";

export default function ReservationInfo() {
  const [isModal, setIsModal] = useState(false);
  const [tableStatus, setStatus] = useState("Available");
  const dispatch = useAppDispatch();
  const { data: tables, status } = useAppSelector((store) => store.tables);
  useEffect(() => {
    dispatch(getTables());
  }, []);

  const handleStatus = () => {
    if (tableStatus === "Available") setStatus("Unavailable");
    else setStatus("Available");
  };
  //color set
  const setColor = () => {
    if (tableStatus === "Available") return "bg-green-500 text-white";
    if (tableStatus === "Unavailable") return "bg-red-500 text-white";
  };
  const deleteHandleTable = async (id: string | number) => {
    (await id) && dispatch(deleteTablesById(id));
    if (status === Status.SUCCESS) {
      dispatch(getTables());
      toast.success("Delete successful!");
    } else {
      toast.error("Deleted Failed");
    }
  };
  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Table Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Reservation..."
              className="w-full sm:w-[250px]"
            />
            {/* add button  */}
            <Button onClick={() => setIsModal(true)}>Add Table </Button>
          </div>
        </div>
        <AddTable open={isModal} onOpenChange={setIsModal} />

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>Table Number</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead> Status</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {tables.length > 0 ? (
                tables.map((table, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {table.tableNumber}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {table.seats}
                      </TableCell>
                      <TableCell>
                        <span
                          onClick={handleStatus}
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${setColor()}`}
                        >
                          {status}
                        </span>
                      </TableCell>

                      <TableCell>
                        {new Date(table.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right flex flex-wrap justify-end gap-2">
                        <Button variant="secondary" size="sm" title="View">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          type="submit"
                          onClick={() => deleteHandleTable(table.id)}
                          variant="destructive"
                          size="sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
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
