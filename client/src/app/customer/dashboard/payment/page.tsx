"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Loader2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import {
  IPayment,
  IPaymentStatus,
  PaymentMethod,
} from "@/lib/store/admin/payment/paymentSlice.type";
import { fetchAllPayment } from "@/lib/store/admin/payment/paymentSlice";

export default function PaymentHistory() {
  const router = useRouter();
  const { paymentData } = useAppSelector((store) => store.payment);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllPayment());
    setLoading(false);
  }, []);
  // const sortedData = [...paymentData].sort((a, b) => b.id - a.id);

  const filterData = paymentData.filter((pay) => {
    const search = searchText.toLowerCase();
    return (
      (pay.invoice_number?.toString().toLowerCase().includes(search) ??
        false) ||
      (pay.total_amount?.toString().toLowerCase().includes(search) ?? false) ||
      (pay.username?.toLowerCase().includes(search) ?? false) ||
      (pay.email?.toLowerCase().includes(search) ?? false) ||
      (pay.payment_method?.toLowerCase().includes(search) ?? false)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }
  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Payment Management</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Payment..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-[250px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead>Invoice Number</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((pay: IPayment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{pay.invoice_number}</TableCell>
                    <TableCell>
                      {pay.username
                        ? pay.username.charAt(0).toUpperCase() +
                          pay.username.slice(1)
                        : "N/A"}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
                          ${
                            pay.paymentStatus === IPaymentStatus.Completed
                              ? "bg-green-100 text-green-700 font-semibold"
                              : pay.paymentStatus === IPaymentStatus.Pending
                              ? "bg-blue-100 text-blue-700"
                              : pay.paymentStatus === IPaymentStatus.Failed
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {pay.paymentStatus}
                      </span>
                    </TableCell>

                    <TableCell className="capitalize">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs cursor-pointer capitalize font-bold  ${
                          pay.payment_method === PaymentMethod.Khalti
                            ? "bg-purple-100 text-purple-700"
                            : pay.payment_method === PaymentMethod.Card
                            ? "bg-orange-100 text-orange-700"
                            : pay.payment_method === PaymentMethod.Cash
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {pay.payment_method.charAt(0).toUpperCase() +
                          pay.payment_method.slice(1)}
                      </span>
                    </TableCell>

                    <TableCell>Rs. {pay.total_amount}</TableCell>

                    <TableCell>
                      {new Date(pay.createdAt).toLocaleDateString("en-GB")}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        title="View"
                        onClick={() =>
                          router.push(`/customer/dashboard/payment/${pay.id}`)
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-4 text-red-600"
                  >
                    No Payment Records Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination />
      </div>
    </>
  );
}
