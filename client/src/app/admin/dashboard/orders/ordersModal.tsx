"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import toast from "react-hot-toast";
import { getMenuItem } from "@/lib/store/admin/menuItems/menuItemSlice";
import { getTables } from "@/lib/store/admin/tables/tableSlice";
import {
  IOrderPostData,
  OrderStatus,
  OrderType,
  PaymentMethod,
  PaymentStatus,
} from "@/lib/store/admin/orders/orders.types";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  createOrders,
  getALlOrderList,
} from "@/lib/store/admin/orders/orderSlice";

interface OrderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddOrders({ open, onOpenChange }: OrderProps) {
  const dispatch = useAppDispatch();
  const { data: tables } = useAppSelector((store) => store.tables);
  const menuItems = useAppSelector((store) => store.menuItems.menuDatas) || [];

  useEffect(() => {
    dispatch(getTables());
    dispatch(getMenuItem());
  }, [dispatch]);

  const [orderData, setOrderData] = useState<IOrderPostData>({
    user_id: "",
    table_id: "",
    order_type: OrderType.DineIn,
    discount: 0,
    status: OrderStatus.Pending,
    payment_method: PaymentMethod.Cash,
    payment_status: PaymentStatus.Unpaid,
    special_request: "",
    delivery_address: "",
    items: [{ id: "", quantity: 1 }],
    deleted_at: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newItems = [...orderData.items];
      if (name === "menu_item_id") newItems[index].id = value;
      if (name === "quantity") newItems[index].quantity = Number(value);
      setOrderData({ ...orderData, items: newItems });
    } else {
      setOrderData({ ...orderData, [name]: value });
    }
  };

  const addItem = () =>
    setOrderData({
      ...orderData,
      items: [...orderData.items, { id: "", quantity: 1 }],
    });

  const removeItem = (index: number) => {
    const newItems = orderData.items.filter((_, i) => i !== index);
    setOrderData({ ...orderData, items: newItems });
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result: any = await dispatch(createOrders(orderData));
    if (result.success) {
      toast.success("Order added successfully!");
      onOpenChange(false);
      dispatch(getALlOrderList());
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-3xl h-[90vh] p-6 sm:p-8 bg-white overflow-y-auto mx-auto border border-gray-200 rounded-md shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Add Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandle} className="space-y-4">
          {/* User & Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>User ID (optional)</Label>
              <Input
                type="text"
                name="user_id"
                value={orderData.user_id}
                onChange={handleChange}
                placeholder="User ID"
              />
            </div>
            <div className="space-y-1">
              <Label>Table ID</Label>
              <Select
                value={String(orderData.table_id)}
                onValueChange={(value) =>
                  setOrderData({ ...orderData, table_id: Number(value) })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Table" />
                </SelectTrigger>
                <SelectContent>
                  {tables?.length > 0 ? (
                    tables.map((table) => (
                      <SelectItem key={table.id} value={String(table.id)}>
                        {table.tableNumber}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="not-found" disabled>
                      No table found
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Order Type & Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Order Type</Label>
              <Select
                value={orderData.order_type}
                onValueChange={(value) =>
                  setOrderData({ ...orderData, order_type: value as OrderType })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DineIn">Dine In</SelectItem>
                  <SelectItem value="Delivery">Delivery</SelectItem>
                  <SelectItem value="TakeAway">Take Away</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Discount</Label>
              <Input
                type="number"
                name="discount"
                value={orderData.discount}
                onChange={handleChange}
                placeholder="Discount"
              />
            </div>
          </div>

          {/* Payment Method & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Payment Method</Label>
              <Select
                value={orderData.payment_method}
                onValueChange={(value) =>
                  setOrderData({
                    ...orderData,
                    payment_method: value as PaymentMethod,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentMethod.Cash}>Cash</SelectItem>
                  <SelectItem value={PaymentMethod.Esewa}>Esewa</SelectItem>
                  <SelectItem value={PaymentMethod.Khalti}>Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Payment Status</Label>
              <Select
                value={orderData.payment_status}
                onValueChange={(value) =>
                  setOrderData({
                    ...orderData,
                    payment_status: value as PaymentStatus,
                  })
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
          </div>

          {/* Order Status */}
          <div className="space-y-1">
            <Label>Order Status</Label>
            <Select
              value={orderData.status}
              onValueChange={(value) =>
                setOrderData({ ...orderData, status: value as OrderStatus })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OrderStatus.Pending}>Pending</SelectItem>
                <SelectItem value={OrderStatus.Preparing}>Preparing</SelectItem>
                <SelectItem value={OrderStatus.Confirmed}>Confirmed</SelectItem>
                <SelectItem value={OrderStatus.Completed}>Completed</SelectItem>
                <SelectItem value={OrderStatus.Ready}>Ready</SelectItem>
                <SelectItem value={OrderStatus.Cancelled}>Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Special Request & Delivery Address */}
          <div className="space-y-1">
            <Label>Special Request</Label>
            <Textarea
              name="special_request"
              value={orderData.special_request}
              onChange={handleChange}
              placeholder="Special request"
            />
          </div>

          <div className="space-y-1">
            <Label>Delivery Address</Label>
            <Textarea
              name="delivery_address"
              value={orderData.delivery_address}
              onChange={handleChange}
              placeholder="Delivery address"
            />
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <Label className="text-lg font-medium">Order Items</Label>
            {orderData.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full"
              >
                <div className="flex-1">
                  <Select
                    value={String(item.id)}
                    onValueChange={(value) =>
                      handleChange(
                        { target: { name: "menu_item_id", value } } as any,
                        index
                      )
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Menu Item" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuItems.length > 0 ? (
                        menuItems.map((menu) => (
                          <SelectItem key={menu.id} value={String(menu.id)}>
                            {menu.name} - Rs: {menu.price}
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

                <div className="w-full md:w-24">
                  <Input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(e as any, index)}
                    placeholder="Qty"
                    min={1}
                  />
                </div>

                {orderData.items.length > 1 && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => removeItem(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button
              type="button"
              onClick={addItem}
              className="bg-green-500 hover:bg-green-600 flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
          >
            Create Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
