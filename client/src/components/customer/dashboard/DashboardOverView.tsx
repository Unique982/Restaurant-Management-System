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
// Demo stats data
const stats = [
  {
    title: "Total Orders",
    value: "12",
    icon: Package,
    color: "bg-blue-500",
    link: "/customer/dashboard/my-order",
  },
  {
    title: "Cart Items",
    value: "3",
    icon: ShoppingCart,
    color: "bg-green-500",
    link: "/customer/dashboard/cart",
  },
  {
    title: "Total Spent",
    value: "$2,450",
    icon: DollarSign,
    color: "bg-purple-500",
    link: "/customer/dashboard/payment",
  },
  {
    title: "Total Table Booking",
    value: "8",
    icon: TrendingUp,
    color: "bg-orange-500",
    link: "/customer/dashboard/menu",
  },
];
const activityLogs = [
  { type: "order", message: "New order ORD-005 placed.", time: "2 min ago" },
  { type: "login", message: "User John Doe logged in.", time: "5 min ago" },
  {
    type: "cart",
    message: "New item added to cart by Jane.",
    time: "10 min ago",
  },
  {
    type: "table",
    message: "Table booking #12 confirmed.",
    time: "30 min ago",
  },
  { type: "order", message: "Order ORD-004 delivered.", time: "1 hour ago" },
];

// Demo recent orders
const recentOrders = [
  {
    id: "ORD-001",
    date: "Jan 15, 2025",
    amount: "$245.00",
    status: "Delivered",
  },
  {
    id: "ORD-002",
    date: "Jan 12, 2025",
    amount: "$89.50",
    status: "In Transit",
  },
  {
    id: "ORD-003",
    date: "Jan 10, 2025",
    amount: "$156.75",
    status: "Processing",
  },
  {
    id: "ORD-004",
    date: "Jan 8, 2025",
    amount: "$320.00",
    status: "Delivered",
  },
];

// Pie chart orders by status
const ordersByCategory = [
  { name: "Completed", value: 50 },
  { name: "Pending", value: 10 },
  { name: "Cancelled", value: 3 },
];
const COLORS = ["#00C49F", "#FFBB28", "#FF0000"];

export default function DashboardOverview() {
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

      {/* Row with 3 columns: Quick Links | Pie Chart | Active Logs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Quick Links */}
        <Card className="space-y-3">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/customer/dashboard/menu">
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
                  data={ordersByCategory}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label
                >
                  {ordersByCategory.map((entry, index) => (
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
            {activityLogs.slice(0, 5).map((log, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 bg-slate-100 rounded hover:bg-slate-200 transition"
              >
                <Bell className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-slate-800">{log.message}</p>
                  <p className="text-[10px] text-slate-500">{log.time}</p>
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
            {recentOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell className="font-medium text-slate-900">
                  {order.id}
                </TableCell>
                <TableCell className="text-slate-600">{order.date}</TableCell>
                <TableCell className="font-semibold text-slate-900">
                  {order.amount}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "In Transit"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
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
