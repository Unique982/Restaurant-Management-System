"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { verifyPayment } from "@/lib/store/customer/checkout/checkoutSlice";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { Status } from "@/lib/types/type";

export default function PaymentSuccess() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<Status>(Status.LOADING);

  const [transactionId, setTransactionId] = useState<string>("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const pidx = searchParams.get("pidx");
    const total_amount = searchParams.get("total_amount");

    if (!pidx || !total_amount) {
      setStatus(Status.LOADING);
      return;
    }

    setTransactionId(pidx);
    // setAmount(total_amount);

    const verify = async () => {
      try {
        const res: any = await dispatch(
          verifyPayment(pidx, Number(total_amount))
        );
        if (res.success) setStatus(Status.SUCCESS);
        else setStatus(Status.ERROR);
      } catch (error) {
        console.error(error);
        setStatus(Status.ERROR);
      }
    };

    verify();
  }, [dispatch]);

  if (status === Status.LOADING) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">
            Verifying Payment...
          </p>
        </div>
      </div>
    );
  }

  if (status === Status.ERROR) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-4">
            Your payment could not be verified.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your transaction is completed successfully.
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Transaction ID:</span> {transactionId}
        </p>
        <p className="text-gray-700 mb-6">
          <span className="font-semibold">Amount:</span> Rs
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
