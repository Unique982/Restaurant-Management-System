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

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getMenuItem } from "@/lib/store/admin/menuItems/menuItemSlice";
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";

import AddOrders from "./ordersModal";
import {
  getALlOrderList,
  softDeleteOrder,
} from "@/lib/store/admin/orders/orderSlice";
import { OrderStatus } from "@/lib/store/admin/orders/orders.types";

export default function MenuIfo() {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");

  const { orderDatas, status } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(getALlOrderList());
  }, [dispatch]);

  // delete
  const deleteHandle = async (id: string | number) => {
    await dispatch(softDeleteOrder(id));
    if (status === Status.SUCCESS) {
      dispatch(getALlOrderList());
      toast.success("Delete Successful!");
    } else {
      toast.error("Something Wrong");
    }
  };

  // search filter
  const filteredOrders = orderDatas.filter((order) => {
    const search = searchText.toLowerCase();
    return (
      order.table_id?.toString().toLowerCase().includes(search) ||
      order.status?.toString().toLowerCase().includes(search) ||
      new Date(order.created_at)
        .toLocaleDateString()
        .toLowerCase()
        .includes(search)
    );
  });

  return (
    <div className="space-y-6 overflow-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        {/* search section */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search Orders..."
            className="w-full sm:w-[250px]"
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* add button */}
          <Button onClick={() => setIsModal(true)}>Add Orders</Button>
        </div>
      </div>

      <AddOrders open={isModal} onOpenChange={setIsModal} />

      {/* Table content */}
      <div className="overflow-x-auto rounded-md border bg-white">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">#</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Table ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <TableRow key={order.order_id || index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    {order.user?.username
                      ? order.user.username.charAt(0).toUpperCase() +
                        order.user.username.slice(1)
                      : "No User"}
                  </TableCell>
                  <TableCell>
                    {order.table?.tableNumber
                      ? order.table.tableNumber
                      : "Online Order"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer capitalize
      ${
        order.status === OrderStatus.Ready
          ? "bg-green-100 text-green-700"
          : order.status === OrderStatus.Cancelled
          ? "bg-red-100 text-red-700"
          : order.status === OrderStatus.Completed
          ? "bg-blue-100 text-blue-700"
          : "bg-yellow-100 text-yellow-700"
      }
    `}
                    >
                      {order.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right flex flex-wrap justify-end gap-2">
                    <Button variant="secondary" size="sm" title="View">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" title="Edit">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => deleteHandle(order.order_id)}
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
                  colSpan={6}
                  className="text-center text-red-600 py-4"
                >
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
}
