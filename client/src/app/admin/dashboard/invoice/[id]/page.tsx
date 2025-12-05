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

  // Ensure paymentId is a string
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id) {
      dispatch(singlePaymentGet(id));
    }
  }, [dispatch, id]);
  // Update selectedPayment when singlePayment is available
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
            onClick={() => router.push("/admin/dashboard/blog")}
            variant="ghost"
            className="mb-4 text-gray-600 bg-green-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog Page
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Blog Details
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View detailed information about this Blog Details
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
                value={selectedPayment?.username}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Description
              </label>

              <Textarea
                value={selectedPayment?.invoice_number}
                readOnly
                className="w-full bg-gray-50 border-gray-300 resize-none min-h-[150px] text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Blog Category
              </label>
              <Input
                value={selectedPayment?.total_amount || ""}
                readOnly
                className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
              />
            </div>

            {/* Created & Updated */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Created At
                </label>
                <Input
                  value={
                    selectedPayment?.createdAt
                      ? new Date().toLocaleString()
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
                    value={new Date(
                      selectedPayment?.updatedAt
                    ).toLocaleString()}
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>
              )}
            </div>
            {/* Image Preview */}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-200 flex gap-3">
            <Button
              onClick={() => router.push("/admin/dashboard/blog")}
              variant="outline"
              className="flex-1"
            >
              Back to List
            </Button>
            <Button
              onClick={() =>
                router.push(`/admin/dashboard/blog/edit/${selectedPayment?.id}`)
              }
              className="flex-1"
            >
              Edit blog
            </Button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-6">
            <p className="text-sm text-blue-800 text-center sm:text-left">
              💡 Tap <span className="font-semibold">"Edit Blog"</span> to make
              changes to this blog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
