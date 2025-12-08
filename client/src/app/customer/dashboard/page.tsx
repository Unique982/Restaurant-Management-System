"use client";
import CardView from "@/components/admin/Crad/card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  TrendingUp,
  Package,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DashboardOverView from "@/components/customer/dashboard/DashboardOverView";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen from-slate-50 to-slate-100 p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <Card className="mb-6 bg-gradient-to-r from-green-500 to-green-500 text-white">
        <CardHeader>
          <CardTitle>Welcome Back, Customer👋</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Here’s what’s happening with your dashboard today.
          </p>
        </CardContent>
      </Card>
      <DashboardOverView />
    </div>
  );
}
