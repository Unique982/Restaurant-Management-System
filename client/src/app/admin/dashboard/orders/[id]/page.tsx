"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Printer, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { QRCodeCanvas } from "qrcode.react";
import { getALlOrderList } from "@/lib/store/admin/orders/orderSlice";
import { IIOrderItems } from "@/lib/store/admin/orders/orders.types";

export default function OrderViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orderDatas } = useAppSelector((store) => store.order);

  const [orderDetails, setOrderDetails] = useState<IIOrderItems | null>(null);
  const [showBilling, setShowBilling] = useState(false);
  useEffect(() => {
    if (orderDatas.length === 0) {
      dispatch(getALlOrderList());
    }
  }, [dispatch, orderDatas.length]);

  useEffect(() => {
    if (params.id && orderDatas.length > 0) {
      const foundOrder = orderDatas.find(
        (o) => o.order_id.toString() === params.id
      );

      setOrderDetails(foundOrder || null);
    }
  }, [params.id, orderDatas]);

  if (!orderDatas || !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }
  const handlePrint = () => {
    window.print();
  };
  const subtotal = orderDetails.items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.13;
  const discount = orderDetails.discount || 0;
  const totalAmount = subtotal + tax - discount;
  console.log(orderDetails);
  return (
    <>
      <div className="min-h-screen overflow-y-auto bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <Button
              onClick={() => router.push("/admin/dashboard/orders")}
              variant="ghost"
              className="mb-4 text-gray-600 bg-green-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Order Details
            </h1>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 overflow-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  User ID
                </label>
                <Input
                  value={orderDetails.user?.username || "Online user"}
                  readOnly
                  className="bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Table ID
                </label>
                <Input
                  value={orderDetails?.table?.tableNumber || ""}
                  readOnly
                  className="bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Order Type
                </label>
                <Input
                  value={orderDetails.order_type}
                  readOnly
                  className="bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Status
                </label>
                <Input
                  value={orderDetails.status}
                  readOnly
                  className="bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Payment Status
                </label>
                <Input
                  value={orderDetails.payment_status}
                  readOnly
                  className="bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase">
                  Payment Method
                </label>
                <Input
                  value={orderDetails.payment_method}
                  readOnly
                  className="bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>
              {orderDetails.discount && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase">
                    Discount
                  </label>
                  <Input
                    value={`Rs ${orderDetails.discount}`}
                    readOnly
                    className="bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
              {orderDetails.final_amount && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase">
                    Final Amount
                  </label>
                  <Input
                    value={`Rs ${orderDetails.final_amount}`}
                    readOnly
                    className="bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
              {orderDetails.delivery_address && (
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase">
                    Delivery Address
                  </label>
                  <Textarea
                    value={orderDetails.delivery_address}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 resize-none text-gray-900"
                  />
                </div>
              )}
              {orderDetails.special_request && (
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase">
                    Special Request
                  </label>
                  <Textarea
                    value={orderDetails.special_request}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 resize-none text-gray-900"
                  />
                </div>
              )}
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto rounded-md border bg-white mt-6">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-3 py-2">#</th>
                    <th className="text-left px-3 py-2">Item Name</th>
                    <th className="text-left px-3 py-2">Quantity</th>
                    <th className="text-left px-3 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2">{item.quantity}</td>
                      <td className="px-3 py-2">Rs {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Back Button */}
            <div className="pt-4 border-t border-gray-200 flex gap-3">
              <Button
                onClick={() => router.push("/admin/dashboard/orders")}
                variant="outline"
                className="flex-1"
              >
                Back to Orders
              </Button>
              <Button
                onClick={() => setShowBilling(true)}
                variant="default"
                className="bg-blue-600 text-white"
              >
                Billing
              </Button>
            </div>
          </div>
        </div>
      </div>
      {showBilling && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl print-area">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-purple-500 to-pink-500">
              <h2 className="text-xl font-bold text-white">Invoice</h2>
              <Button
                onClick={() => setShowBilling(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Invoice Content */}
            <div className="p-6 text-sm">
              {/* Header */}
              <div className="text-center mb-6 pb-4 border-b-4 border-double border-purple-500">
                <div className="text-2xl font-black text-purple-700 mb-1">
                  THE 90'S RESTAURANT
                </div>
                <div className="text-xs text-gray-500">Kathmandu, Nepal</div>
              </div>

              {/* Customer & Admin Info + QR */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div>
                    <span className="font-semibold">Customer Name:</span>{" "}
                    {orderDetails.user?.username || "Guest"}
                  </div>
                  <div>
                    <span className="font-semibold">Table Number:</span>{" "}
                    {orderDetails.table?.tableNumber || "Takeaway"}
                  </div>
                </div>
                <div className="text-right">
                  {/* <div>
                    <span className="font-semibold">Billing Name:</span>{" "}
                    {orderDetails.user?.username || "Admin"}
                  </div> */}
                  <div>
                    <span className="font-semibold">Invoice #:</span>{" "}
                    {orderDetails.order_id}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(orderDetails.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full mb-4 border border-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 py-2 text-left border-b">#</th>
                    <th className="px-3 py-2 text-left border-b">Item</th>
                    <th className="px-3 py-2 text-center border-b">Qty</th>
                    <th className="px-3 py-2 text-right border-b">Price</th>
                    <th className="px-3 py-2 text-right border-b">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{item.name}</td>
                      <td className="px-3 py-2 text-center">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">Rs {item.price}</td>
                      <td className="px-3 py-2 text-right font-semibold">
                        Rs {((item.price || 0) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end flex-col text-right space-y-1">
                <div>
                  <span className="font-semibold">Subtotal: </span> Rs{" "}
                  {subtotal.toFixed(2)}
                </div>
                <div>
                  <span className="font-semibold">Tax (13%): </span> Rs{" "}
                  {tax.toFixed(2)}
                </div>
                {discount > 0 && (
                  <div className="text-green-600">
                    <span className="font-semibold">Discount: </span> Rs{" "}
                    {discount.toFixed(2)}
                  </div>
                )}
                <div className="mt-2 text-lg font-bold text-purple-700">
                  TOTAL: Rs {totalAmount.toFixed(2)}
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-4 p-3 bg-purple-50 rounded border border-purple-300 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold">Payment Method:</span> Online
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="text-green-600 font-bold">
                    {orderDetails.payment_status}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                <span>
                  Thank you for dining with us! Visit again for nostalgic
                  flavors.
                </span>
                <QRCodeCanvas
                  value={`https://restaurant-management-system-sooty.vercel.app/admin/dashboard/orders/${orderDetails.order_id}`}
                  size={50}
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-3 no-print">
                <Button
                  onClick={() => setShowBilling(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={handlePrint}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Invoice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
