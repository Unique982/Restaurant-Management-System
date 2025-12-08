"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ShoppingCart,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ChefHat,
} from "lucide-react";

const dashboardData = [
  { time: "9 AM", orders: 12, revenue: 240 },
  { time: "10 AM", orders: 19, revenue: 380 },
  { time: "11 AM", orders: 25, revenue: 550 },
  { time: "12 PM", orders: 45, revenue: 890 },
  { time: "1 PM", orders: 52, revenue: 1200 },
  { time: "2 PM", orders: 38, revenue: 920 },
  { time: "3 PM", orders: 28, revenue: 640 },
];

const categoryData = [
  { name: "Appetizers", value: 25, color: "#f59e0b" },
  { name: "Mains", value: 45, color: "#ef4444" },
  { name: "Desserts", value: 18, color: "#ec4899" },
  { name: "Beverages", value: 12, color: "#3b82f6" },
];

const stats = [
  {
    label: "Today's Orders",
    value: 247,
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Total Revenue",
    value: "$5,240",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Active Tables",
    value: 18,
    icon: Users,
    color: "bg-orange-100 text-orange-600",
  },
  {
    label: "Avg Wait Time",
    value: "12 min",
    icon: Clock,
    color: "bg-purple-100 text-purple-600",
  },
];

const recentOrders = [
  {
    id: "#ORD001",
    customer: "John Doe",
    items: 3,
    amount: "$45.99",
    status: "Preparing",
    time: "5 min ago",
  },
  {
    id: "#ORD002",
    customer: "Jane Smith",
    items: 2,
    amount: "$32.50",
    status: "Ready",
    time: "8 min ago",
  },
  {
    id: "#ORD003",
    customer: "Mike Johnson",
    items: 4,
    amount: "$67.80",
    status: "Served",
    time: "12 min ago",
  },
  {
    id: "#ORD004",
    customer: "Sarah Wilson",
    items: 2,
    amount: "$28.99",
    status: "Preparing",
    time: "15 min ago",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-2 sm:gap-3">
          <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
          Restaurant Dashboard
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Welcome back! Here's what's happening in your restaurant today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-slate-800 border-slate-700 hover:border-orange-500 transition-all duration-300"
            >
              <CardContent className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                      {stat.label}
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-2 sm:p-3 rounded-lg`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-10">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader className="pb-3 sm:pb-4 md:pb-6">
            <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Today's Revenue
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Orders and revenue by hour
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3 md:p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={dashboardData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="time"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Revenue ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3 sm:pb-4 md:pb-6">
            <CardTitle className="text-lg sm:text-xl text-white">
              Menu Distribution
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Orders by category
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-3 md:p-6 flex justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={{ fill: "#fff", fontSize: 12 }}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3 sm:pb-4 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <CardTitle className="text-lg sm:text-xl text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                Recent Orders
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Live order updates
              </CardDescription>
            </div>
            <Button
              variant="outline"
              className="border-slate-600 text-orange-400 hover:bg-slate-700 w-full sm:w-auto text-xs sm:text-sm bg-transparent"
            >
              View All Orders
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 md:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-gray-300">
              <thead className="text-xs border-b border-slate-700">
                <tr>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-orange-400">
                    Order
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-orange-400">
                    Customer
                  </th>
                  <th className="text-center py-2 sm:py-3 px-2 sm:px-4 text-orange-400">
                    Items
                  </th>
                  <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-orange-400">
                    Amount
                  </th>
                  <th className="text-center py-2 sm:py-3 px-2 sm:px-4 text-orange-400">
                    Status
                  </th>
                  <th className="text-right py-2 sm:py-3 px-2 sm:px-4 text-orange-400">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-white">
                      {order.id}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                      {order.customer}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                      {order.items}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold text-green-400">
                      {order.amount}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          order.status === "Preparing"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : order.status === "Ready"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-right text-gray-400">
                      {order.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-4 sm:p-5 md:p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-yellow-200 text-sm sm:text-base">
                Kitchen Alert
              </h3>
              <p className="text-yellow-300/80 text-xs sm:text-sm mt-1">
                3 orders pending over 20 minutes
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4 sm:p-5 md:p-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-red-200 text-sm sm:text-base">
                Low Stock
              </h3>
              <p className="text-red-300/80 text-xs sm:text-sm mt-1">
                Tomato, Mozzarella running low
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
