"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  CalendarCheck,
  Clock,
  DollarSign,
  MessageCircle,
  ShoppingBag,
  Table2,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardData {
  totalOrder: number;
  pendingOrder: number;
  activeOrder: number;
  cancelledOrder: number;
  totalTable: number;
  totalInquiry: number;
}

export default function CardView() {
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:4000/admin/dashboard");

        const data = await response.json();
        if (data.success) {
          setData(data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <User className="w-8 h-8 text-blue-600" />
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{data?.totalOrder || "2000"}</p>
        </CardContent>
      </Card>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-orange-600" />
            Activie Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,250</p>
        </CardContent>
      </Card>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-yellow-600" />
            Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,250</p>
        </CardContent>
      </Card>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <Table2 className="w-8 h-8 text-purple-600" />
            Total Tables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,250</p>
        </CardContent>
      </Card>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <Clock className="w-8 h-8 text-orange-500" />
            Pending Order
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,250</p>
        </CardContent>
      </Card>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <XCircle className="w-8 h-8 text-red-600" />
            Orders Cancell
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,250</p>
        </CardContent>
      </Card>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <CalendarCheck className="w-8 h-8 text-red-600" />
            Booking Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,250</p>
        </CardContent>
      </Card>
      <Card className="bg-white py-4 rounded-lg shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-gray-900 text-sm font-semibold flex items-center gap-2">
            <MessageCircle className="w-8 h-8 text-red-600" />
            Inquery Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">1,250</p>
        </CardContent>
      </Card>
    </>
  );
}
