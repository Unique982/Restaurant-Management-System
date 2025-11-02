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
import AddTable from "./table.Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deleteTablesById,
  getTables,
  tableStatausUpdate,
} from "@/lib/store/admin/tables/tableSlice";
import toast from "react-hot-toast";
import { initSocket } from "@/lib/socket";
import { ITableData } from "@/lib/store/admin/orders/orders.types";
import { tableStatus } from "@/lib/store/admin/tables/tableSlice.type";

export default function TableInfo() {
  const [isModal, setIsModal] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const dispatch = useAppDispatch();
  const { data: tables, status } = useAppSelector((store) => store.tables);
  useEffect(() => {
    dispatch(getTables());
    const socket = initSocket();
    const handleAdded = (data: ITableData) => {
      dispatch(getTables());
      toast.success("Table added successfully!");
    };
    const handleUpdated = (data: ITableData) => {
      dispatch(getTables());
      toast.success("Table updated successfully!");
    };
    const handleDeleted = (data: { id: number }) => {
      dispatch(getTables());
      toast.success("Table deleted successfully!");
    };
    socket.on("tableAdded", handleAdded);
    socket.on("tableUpdated", handleUpdated);
    socket.on("tableDeleted", handleDeleted);
    return () => {
      socket.off("tableAdded", handleAdded);
      socket.off("tableUpdated", handleUpdated);
      socket.off("tableDeleted", handleDeleted);
    };
  }, []);
  const handleStatus = async (
    id: number | string,
    currentStatus: tableStatus
  ) => {
    let nextStatus: tableStatus;

    switch (currentStatus) {
      case tableStatus.Available:
        nextStatus = tableStatus.Unavailable;
        break;
      case tableStatus.Unavailable:
        nextStatus = tableStatus.Available;
        break;
      default:
        nextStatus = tableStatus.Available;
    }
    const res: any = await dispatch(tableStatausUpdate(id, nextStatus));
  };
  const deleteHandleTable = async (id: string | number) => {
    (await id) && dispatch(deleteTablesById(id));
  };

  // search
  const filterHandle = tables.filter((table) =>
    table.tableNumber
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase())
  );

  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Table Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Reservation..."
              onChange={(e) => setSearchText(e.target.value)}
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
              {filterHandle.length > 0 ? (
                filterHandle.map((table, index) => {
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
                          onClick={() =>
                            handleStatus(table.id, table.tableStatus)
                          }
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                            table.tableStatus === tableStatus.Available
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {table.tableStatus.charAt(0).toUpperCase() +
                            table.tableStatus.slice(1)}
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
