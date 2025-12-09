// app/admin/category/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { IPayment } from "@/lib/store/admin/payment/paymentSlice.type";
import { singlePaymentGet } from "@/lib/store/admin/payment/paymentSlice";

export default function CategoryViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { singlePayment } = useAppSelector((store) => store.payment);
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      dispatch(singlePaymentGet(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePayment) {
      setSelectedPayment(singlePayment);
    }
  }, [singlePayment]);

  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <Button
            onClick={() => router.push("/customer/dashboard/payment")}
            variant="ghost"
            className="mb-4 text-gray-600 bg-green-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Payment History
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My PaymentDetails
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View detailed information about this payment Details
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 overflow-auto">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Name
              </label>
              <Input
                value={selectedPayment?.username || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Email
              </label>
              <Input
                value={selectedPayment?.email || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>
            {/* Invoice Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Invoice Number
              </label>
              <Input
                value={selectedPayment?.invoice_number || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>
            {/* Total Amount */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Total Amount
              </label>
              <Input
                value={selectedPayment?.total_amount || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>
            {/* Order Discount */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Discount
              </label>
              <Input
                value={""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>
            {/* Order Items
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Items
              </label>
              <div className="space-y-1">
                {selectedPayment?.order?.items?.length > 0 ? (
                  selectedPayment.order.items.map(
                    (item: any, index: number) => (
                      <div
                        key={index}
                        className="flex justify-between bg-gray-50 border border-gray-200 rounded p-2"
                      >
                        <span>Menu Item ID: {item.menu_item_id}</span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-500">No items found</p>
                )}
              </div>
            </div> */}
            {/* Created & Updated */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Created At
                </label>
                <Input
                  value={
                    selectedPayment?.updatedAt
                      ? new Date(selectedPayment.createdAt).toLocaleString()
                      : "-"
                  }
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900"
                />
              </div>

              {selectedPayment?.updatedAt && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Updated At
                  </label>
                  <Input
                    value={new Date(selectedPayment.updatedAt).toLocaleString()}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 flex gap-3">
            <Button
              onClick={() => router.push("/customer/dashboard/payment")}
              variant="outline"
              className="flex-1"
            >
              Back to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
