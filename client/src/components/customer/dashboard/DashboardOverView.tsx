"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ShoppingCart,
  TrendingUp,
  Package,
  DollarSign,
  ArrowRight,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";

export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds

  if (diff < 60) return `${Math.floor(diff)} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  if (diff < 172800) return `Yesterday`;

  return `${Math.floor(diff / 86400)} days ago`;
}
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", // Jan, Feb, ...
    day: "numeric",
  };
  return date.toLocaleDateString(undefined, options); // Locale अनुसार format
}

interface ICustomerDashboardData {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalPoints: number;
  totalPayment: number;
  tableBooking: number;
  totalCartItems: number;
  recentOrders: IRecentOrder[];
  totalBookingTable: number;
  notifications: { title: string; createdAt: string }[];
}

interface IRecentOrder {
  orderId: number;
  createdAt: string;
  finalAmount: string;
  orderType: string;
}
const COLORS = ["#00C49F", "#FFBB28", "#FF0000"];

export default function DashboardOverview() {
  const [activityLogs, setActivityLogs] = useState<
    { title: string; createdAt: string }[]
  >([]);
  const [data, setData] = useState<ICustomerDashboardData | null>(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await APIWITHTOKEN.get("/customer/dashboard");

        const data = await response.data;
        if (data.success) {
          setData(data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Orders",
      value: data?.totalOrders,
      icon: Package,
      color: "bg-blue-500",
      link: "/customer/dashboard/my-order",
    },
    {
      title: "Cart Items",
      value: data?.totalCartItems,
      icon: ShoppingCart,
      color: "bg-green-500",
      link: "/customer/dashboard/cart",
    },
    {
      title: "Total Spent",
      value: data?.totalPayment,
      icon: DollarSign,
      color: "bg-purple-500",
      link: "/customer/dashboard/payment",
    },
    {
      title: "Total Table Booking",
      value: data?.tableBooking,
      icon: TrendingUp,
      color: "bg-orange-500",
      link: "/customer/dashboard/menu",
    },
  ];
  // Pie chart orders by status
  const ordersOverViewpie = [
    { name: "Completed", value: data?.completedOrders },
    { name: "Pending", value: Number(data?.pendingOrders) },
    { name: "Cancelled", value: Number(data?.cancelledOrders) },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.link}>
              <div className="bg-white rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition h-full flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* quick link pie chart activit log */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Quick Links */}
        <Card className="space-y-3">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/customer/dashboard/viewMenu">
              <Button className="w-full justify-between bg-blue-600 text-white">
                Browse Menu <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/customer/dashboard/cart">
              <Button variant="outline" className="w-full justify-between">
                View Cart <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/customer/dashboard/my-order">
              <Button variant="outline" className="w-full justify-between">
                Track Orders <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/customer/dashboard/payment">
              <Button variant="outline" className="w-full justify-between">
                Payment History <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 2. Pie Chart */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
            <CardDescription>Distribution by status</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ordersOverViewpie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label
                >
                  {ordersOverViewpie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. Active Logs */}
        <Card className="space-y-2">
          <CardHeader>
            <CardTitle className="mt-2">Active Logs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {data?.notifications.slice(0, 5).map((log, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-slate-100 rounded hover:bg-slate-200 transition"
              >
                <Bell className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-slate-800">{log.title}</p>
                  <p className="text-[10px] text-slate-500">
                    {" "}
                    {timeAgo(log.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-auto">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
        </div>

        <Table className="min-w-max">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.recentOrders.map((order, index) => (
              <TableRow
                key={index}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-medium text-slate-900">
                  {index + 1}
                </TableCell>
                <TableCell className="text-slate-600">
                  {formatDate(order.createdAt)}
                </TableCell>
                <TableCell className="font-semibold text-slate-900">
                  <span className="text-sm">Rs </span>
                  {Number(order.finalAmount).toLocaleString()}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.orderType === "delivery"
                        ? "bg-green-100 text-green-800"
                        : order.orderType === "takeaway"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.orderType.charAt(0).toUpperCase() +
                      order.orderType.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
