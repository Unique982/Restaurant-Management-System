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

import toast from "react-hot-toast";

import AddOrders from "./ordersModal";
import {
  getALlOrderList,
  orderStatusUpdate,
  orderTypeUpdate,
  softDeleteOrder,
} from "@/lib/store/admin/orders/orderSlice";
import {
  IOrderPostData,
  OrderStatus,
  OrderType,
  PaymentStatus,
} from "@/lib/store/admin/orders/orders.types";
import { initSocket } from "@/lib/socket";

export default function MenuIfo() {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");

  const { orderDatas, status } = useAppSelector((store) => store.order);

  useEffect(() => {
    dispatch(getALlOrderList());
    const socket = initSocket();

    const handleAdded = (data: IOrderPostData) => {
      dispatch(getALlOrderList());
      toast.success("Order added successfully!");
    };
    const handleUpdated = (data: IOrderPostData) => {
      dispatch(getALlOrderList());
      toast.success("Order updated successfully!");
    };
    const handleDeleted = (data: { order_id: number }) => {
      dispatch(getALlOrderList());
    };

    socket.on("orderAdded", handleAdded);
    socket.on("orderUpdated", handleUpdated);
    socket.on("orderDeleted", handleDeleted);

    return () => {
      socket.off("orderAdded", handleAdded);
      socket.off("orderUpdated", handleUpdated);
      socket.off("orderDeleted", handleDeleted);
    };
  }, [dispatch]);

  // delete handler
  const deleteHandle = async (id: string | number) => {
    const res: any = await dispatch(softDeleteOrder(id));
    if (res.success) {
      toast.success("Order deleted successfully!");
    } else {
      toast.error(res.message || "Something went wrong!");
    }
  };
  // order statius chnage
  const handleOrderTypeChange = async (
    id: number | string,
    currentType: OrderType
  ) => {
    let nextType: OrderType;
    if (currentType === OrderType["DineIn"]) {
      nextType = OrderType.TakeAway;
    } else if (currentType === OrderType.TakeAway) {
      nextType = OrderType.Delivery;
    } else {
      nextType = OrderType.DineIn;
    }
    const res: any = await dispatch(orderTypeUpdate(id, nextType));
  };
  const handleOrderStatusChange = async (
    id: number | string,
    currentStatus: OrderStatus
  ) => {
    let nextStatus: OrderStatus;

    switch (currentStatus) {
      case OrderStatus.Pending:
        nextStatus = OrderStatus.Confirmed;
        break;
      case OrderStatus.Confirmed:
        nextStatus = OrderStatus.Preparing;
        break;
      case OrderStatus.Preparing:
        nextStatus = OrderStatus.Ready;
        break;
      case OrderStatus.Ready:
        nextStatus = OrderStatus.Completed;
        break;
      default:
        nextStatus = OrderStatus.Pending; // fallback
    }

    const res: any = await dispatch(orderStatusUpdate(id, nextStatus));
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
              <TableHead>OrderType</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Status</TableHead>
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
                      onClick={() =>
                        handleOrderStatusChange(order.order_id, order.status)
                      }
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer capitalize ${
                        order.status === OrderStatus.Pending
                          ? "bg-gray-100 text-gray-700"
                          : order.status === OrderStatus.Confirmed
                          ? "bg-blue-100 text-blue-700"
                          : order.status === OrderStatus.Preparing
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === OrderStatus.Ready
                          ? "bg-blue-100 text-blue-700"
                          : order.status === OrderStatus.Completed
                          ? "bg-purple-100 text-purple-700"
                          : order.status === OrderStatus.Cancelled
                          ? "bg-red-100 text-red-700"
                          : "bg-black text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      onClick={() =>
                        handleOrderTypeChange(order.order_id, order.order_type)
                      }
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer capitalize
      ${
        order.order_type === OrderType.DineIn
          ? "bg-green-100 text-green-700"
          : order.order_type === OrderType.TakeAway
          ? "bg-blue-100 text-blue-700"
          : "bg-red-500 text-white"
      }
    `}
                    >
                      {order.order_type}
                    </span>
                  </TableCell>
                  <TableCell>Rs:-{order.final_amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs cursor-pointer capitalize font-bold ${
                        order.payment_status === PaymentStatus.Unpaid
                          ? "text-red-700"
                          : order.payment_status === "paid"
                          ? "text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {order.payment_status.charAt(0).toUpperCase() +
                        order.payment_status.slice(1)}
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
