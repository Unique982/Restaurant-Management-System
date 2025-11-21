// app/admin/order/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Trash2, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import toast from "react-hot-toast";
import {
  fetchMenuItems,
  getMenuItem,
} from "@/lib/store/admin/menuItems/menuItemSlice";
import {
  IOrderPostData,
  OrderStatus,
  OrderType,
  PaymentStatus,
} from "@/lib/store/admin/orders/orders.types";
import {
  editOrderById,
  getALlOrderList,
  singelFetchOrder,
} from "@/lib/store/admin/orders/orderSlice";
import { getTables } from "@/lib/store/admin/tables/tableSlice";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function OrderEditPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orderDatas, singleOrder } = useAppSelector((store) => store.order);
  const { data: tables } = useAppSelector((store) => store.tables);
  const { menuDatas: menuItems } = useAppSelector((store) => store.menuItems);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updateOrder, setUpdateOrder] = useState<IOrderPostData>({
    user_id: "",
    table_id: "",
    order_type: OrderType.DineIn,
    discount: 0,
    status: OrderStatus.Pending,
    payment_status: PaymentStatus.Unpaid,
    special_request: "",
    delivery_address: "",
    items: [{ id: "", name: "", quantity: 1 }],
    deleted_at: false,
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        dispatch(getTables()),
        dispatch(getMenuItem()),
        dispatch(getALlOrderList()),
      ]);
    };
    fetchData();
  }, [dispatch]);

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      if (params.id) {
        setLoading(true);

        // Check if order exists in store
        const existOrder = orderDatas.find(
          (item) => item.order_id.toString() === params.id
        );

        if (existOrder) {
          // Pre-fill form with existing order data
          setUpdateOrder({
            user_id: existOrder.user_id || "",
            table_id: existOrder.table_id?.toString() || "",
            order_type: existOrder.order_type || OrderType.DineIn,
            status: existOrder.status || OrderStatus.Pending,
            payment_status: existOrder.payment_status || PaymentStatus.Unpaid,
            discount: existOrder.discount || 0,
            final_amount: existOrder.final_amount || 0,
            delivery_address: existOrder.delivery_address || "",
            special_request: existOrder.special_request || "",
            items:
              existOrder.items && existOrder.items.length > 0
                ? existOrder.items.map((item) => ({
                    id: item.id?.toString() || item.id?.toString() || "",
                    name: item.name || "",
                    quantity: item.quantity || 1,
                  }))
                : [{ id: "", name: "", quantity: 1 }],
            deleted_at: false,
          });
          setLoading(false);
        } else {
          // Fetch single order if not in store
          await dispatch(singelFetchOrder(params.id as string));
        }
      }
    };

    fetchOrder();
  }, [params.id, dispatch, orderDatas]);

  // Update from single order fetch
  useEffect(() => {
    if (singleOrder) {
      setUpdateOrder({
        user_id: singleOrder.user_id || "",
        table_id: singleOrder.table_id?.toString() || "",
        order_type: singleOrder.order_type || OrderType.DineIn,
        status: singleOrder.status || OrderStatus.Pending,
        payment_status: singleOrder.payment_status || PaymentStatus.Unpaid,
        discount: singleOrder.discount || 0,
        final_amount: singleOrder.final_amount || 0,
        delivery_address: singleOrder.delivery_address || "",
        special_request: singleOrder.special_request || "",
        items:
          singleOrder.items && singleOrder.items.length > 0
            ? singleOrder.items.map((item) => ({
                id: item.id?.toString() || item.id?.toString() || "",
                name: item.name || "",
                quantity: item.quantity || 1,
              }))
            : [{ id: "", name: "", quantity: 1 }],
        deleted_at: false,
      });
      setLoading(false);
    }
  }, [singleOrder]);

  // Handle simple field changes
  const handleChange = (key: keyof IOrderPostData, value: any) => {
    setUpdateOrder((prev) => ({ ...prev, [key]: value }));
  };

  // Handle item changes (menu selection and quantity)
  const handleItemChange = (
    index: number,
    field: "id" | "quantity",
    value: string | number
  ) => {
    const newItems = [...updateOrder.items];

    if (field === "quantity") {
      newItems[index].quantity = Number(value);
    } else if (field === "id") {
      const menuId = value.toString();
      const selectedMenu = menuItems.find(
        (menu) => menu.id.toString() === menuId
      );
      newItems[index].id = menuId;
      newItems[index].name = selectedMenu ? selectedMenu.name : "";
    }

    setUpdateOrder({ ...updateOrder, items: newItems });
  };

  // Add new item
  const addItem = () => {
    setUpdateOrder({
      ...updateOrder,
      items: [...updateOrder.items, { id: "", name: "", quantity: 1 }],
    });
  };

  // Remove item
  const removeItem = (index: number) => {
    if (updateOrder.items.length > 1) {
      const newItems = updateOrder.items.filter((_, i) => i !== index);
      setUpdateOrder({ ...updateOrder, items: newItems });
    } else {
      toast.error("At least one item is required");
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!updateOrder.table_id && updateOrder.order_type === OrderType.DineIn) {
      toast.error("Please select a table");
      return;
    }

    if (updateOrder.items.some((item) => !item.id)) {
      toast.error("Please select menu items for all order items");
      return;
    }

    if (updateOrder.items.some((item) => item.quantity < 1)) {
      toast.error("Quantity must be at least 1");
      return;
    }

    setSubmitting(true);

    try {
      const result = await dispatch(
        editOrderById(params.id as string, updateOrder)
      );

      if (result.success) {
        toast.success("Order updated successfully!");
        router.push("/admin/dashboard/orders");
      } else {
        toast.error(result.message || "Failed to update order");
      }
    } catch (error) {
      toast.error("An error occurred while updating the order");
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel button
  const handleCancel = () => {
    router.push("/admin/dashboard/orders");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/admin/dashboard/orders")}
            variant="ghost"
            className="mb-4 text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Orders
          </Button>

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Order</h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 ">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Table Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Table Number
                </Label>

                <Select
                  onValueChange={(value) => handleChange("table_id", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {tables?.length && updateOrder.table_id
                        ? tables.find(
                            (tb) => tb.id.toString() === updateOrder.table_id
                          )?.tableNumber || "Select Table"
                        : "Select Table"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {tables && tables.length > 0 ? (
                      tables.map((table) => (
                        <SelectItem key={table.id} value={table.id.toString()}>
                          Table {table.tableNumber}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="not-found" disabled>
                        No tables found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Order Type */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Order Type
                </Label>
                <Select
                  value={updateOrder.order_type}
                  onValueChange={(value) =>
                    handleChange("order_type", value as OrderType)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Order Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OrderType.DineIn}>Dine In</SelectItem>
                    <SelectItem value={OrderType.TakeAway}>
                      Take Away
                    </SelectItem>
                    <SelectItem value={OrderType.Delivery}>Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Status
                </Label>
                <Select
                  value={updateOrder.status}
                  onValueChange={(value) =>
                    handleChange("status", value as OrderStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={OrderStatus.Pending}>Pending</SelectItem>
                    <SelectItem value={OrderStatus.Confirmed}>
                      Confirmed
                    </SelectItem>
                    <SelectItem value={OrderStatus.Preparing}>
                      Preparing
                    </SelectItem>
                    <SelectItem value={OrderStatus.Ready}>Ready</SelectItem>
                    <SelectItem value={OrderStatus.Completed}>
                      Completed
                    </SelectItem>
                    <SelectItem value={OrderStatus.Cancelled}>
                      Cancelled
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Status */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Payment Status
                </Label>
                <Select
                  value={updateOrder.payment_status}
                  onValueChange={(value) =>
                    handleChange("payment_status", value as PaymentStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PaymentStatus.Paid}>Paid</SelectItem>
                    <SelectItem value={PaymentStatus.Unpaid}>Unpaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Discount */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Discount (%)
                </Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={updateOrder.discount || 0}
                  onChange={(e) =>
                    handleChange("discount", parseFloat(e.target.value) || 0)
                  }
                />
              </div>

              {/* Final Amount */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Final Amount
                </Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={updateOrder.final_amount || 0}
                  onChange={(e) =>
                    handleChange(
                      "final_amount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                />
              </div>

              {/* Delivery Address */}
              <div className="sm:col-span-2 space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Delivery Address
                </Label>
                <Textarea
                  value={updateOrder.delivery_address || ""}
                  onChange={(e) =>
                    handleChange("delivery_address", e.target.value)
                  }
                  placeholder="Enter delivery address (if applicable)"
                  rows={2}
                />
              </div>

              {/* Special Request */}
              <div className="sm:col-span-2 space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Special Request
                </Label>
                <Textarea
                  value={updateOrder.special_request || ""}
                  onChange={(e) =>
                    handleChange("special_request", e.target.value)
                  }
                  placeholder="Enter any special requests"
                  rows={2}
                />
              </div>
            </div>

            {/* Order Items Section */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-gray-900">
                  Order Items
                </Label>
                <Button
                  type="button"
                  onClick={addItem}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </Button>
              </div>

              {updateOrder.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-end gap-3 p-4 border rounded-lg bg-gray-50"
                >
                  {/* Menu Item Selection */}
                  <div className="flex-1 space-y-2">
                    <Label className="text-sm text-gray-600">Menu Item</Label>
                    <Select
                      onValueChange={(value) =>
                        handleItemChange(index, "id", value)
                      }
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select Menu Item">
                          {item.id
                            ? `${
                                menuItems.find(
                                  (menu) => menu.id.toString() === item.id
                                )?.name || "Select Menu Item"
                              } - Rs. ${
                                menuItems.find(
                                  (menu) => menu.id.toString() === item.id
                                )?.price || 0
                              }`
                            : "Select Menu Item"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {menuItems && menuItems.length > 0 ? (
                          menuItems.map((menu) => (
                            <SelectItem
                              key={menu.id}
                              value={menu.id.toString()}
                            >
                              {menu.name} - Rs. {menu.price}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="not-found" disabled>
                            No menu items found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity */}
                  <div className="w-full md:w-28 space-y-2">
                    <Label className="text-sm text-gray-600">Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="bg-white"
                    />
                  </div>

                  {/* Remove Button */}
                  <Button
                    type="button"
                    onClick={() => removeItem(index)}
                    variant="destructive"
                    size="icon"
                    disabled={updateOrder.items.length === 1}
                    className="self-end md:self-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Order"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
