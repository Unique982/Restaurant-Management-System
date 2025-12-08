"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import APIWITHTOKEN from "@/lib/http/APIWITHTOKEN";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CalendarCheck,
  Clock,
  DollarSign,
  MessageCircle,
  ShoppingBag,
  ShoppingCart,
  Table2,
  TrendingDown,
  TrendingUp,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
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
import Link from "next/link";
interface OrderByHour {
  time: string;
  orders: number;
  revenue: number;
}
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

interface OrderByCategory {
  name: string;
  value: number;
}
const COLORS = [
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#3b82f6",
  "#10b981",
  "#6366f1",
];
interface OrderItem {
  order_item_id: number | null;
  menu_item_id: number | null;
  quantity: number | null;
  price: string | null;
}

interface RecentOrder extends OrderItem {
  order_id: number;
  user_id: number;
  username: string;
  total_amount: string | number;
  status: string;
  order_time: string;
  items: OrderItem[];
}

interface DashboardData {
  totalOrder: number;
  pendingOrder: number;
  activeOrders: number;
  totalRevenue: number;
  cancelledOrder: number;
  totalTable: number;
  totalInquiry: number;
  tableBooking: number;
  totalUser: number;
  ordersByHour: OrderByHour[];
  ordersByCategory: OrderByCategory[];
  recentOrder: RecentOrder[];
}

export default function CardView() {
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await APIWITHTOKEN.get("/admin/dashboard");

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
      label: "Total Users",
      value: data?.totalUser ?? 0,
      icon: User,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Orders",
      value: data?.activeOrders ?? 0,
      icon: ShoppingBag,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Revenue",
      value: `Rs ${data?.totalRevenue ?? 0}`,
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Total Tables",
      value: data?.totalTable ?? 0,
      icon: Table2,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Pending Orders",
      value: data?.pendingOrder ?? 0,
      icon: Clock,
      color: "bg-orange-100 text-orange-500",
    },
    {
      label: "Orders Cancelled",
      value: data?.cancelledOrder ?? 0,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
    {
      label: "Booking Tables",
      value: data?.tableBooking ?? 0,
      icon: CalendarCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Inquiry Messages",
      value: data?.totalInquiry ?? 0,
      icon: MessageCircle,
      color: "bg-pink-100 text-pink-600",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-8 sm:mb-10 md:mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 cursor-pointer group h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-slate-600 text-xs sm:text-sm font-medium mb-1 truncate">
                    {stat.label}
                  </p>
                  <p className="text-xl sm:text-xl md:text-xl font-bold text-slate-900 truncate">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`${stat.color} p-2 sm:p-3 rounded-lg flex-shrink-0 flex items-center justify-center`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Today's Revenue
            </CardTitle>
            <CardDescription className="text-sm">
              Orders and revenue by hour
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data?.ordersByHour}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
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
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Menu Distribution
            </CardTitle>
            <CardDescription className="text-sm">
              Orders by category
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 flex justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data?.ordersByCategory?.map((item) => ({
                    ...item,
                    value: Number(item.value), // string -> number conversion
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {data?.ordersByCategory?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fefe",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
        <CardHeader className="pb-3 sm:pb-4 md:pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <div>
              <CardTitle className="text-lg sm:text-xl text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-orange-500" />
                Recent Orders
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500">
                Live order updates
              </CardDescription>
            </div>
            <Link href={"/admin/dashboard/orders"}>
              <Button
                variant="outline"
                className="border-gray-300 text-orange-500 hover:bg-gray-100 w-full sm:w-auto text-xs sm:text-sm bg-transparent"
              >
                View All Orders
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="">
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-orange-500">Order</TableHead>
                  <TableHead className="text-orange-500">Customer</TableHead>
                  <TableHead className="text-orange-500 text-center">
                    Items
                  </TableHead>
                  <TableHead className="text-orange-500 text-right">
                    Amount
                  </TableHead>
                  <TableHead className="text-orange-500 text-center">
                    Status
                  </TableHead>
                  <TableHead className="text-orange-500 text-right">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.recentOrder?.map((order, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-semibold text-gray-900">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-gray-700">
                      {order.username}
                    </TableCell>
                    <TableCell className="text-center text-gray-700">
                      {order.quantity || "No  Itmes"}
                    </TableCell>

                    <TableCell className="text-right font-semibold text-green-600">
                      ${order.total_amount}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          order.status === "Preparing"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Ready"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-gray-500">
                      {timeAgo(order.order_time)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
