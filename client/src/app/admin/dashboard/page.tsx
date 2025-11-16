"use client";

import CardView from "@/components/admin/Crad/card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/lib/store/hooks";

export default function AdminDashboard() {
  return (
    <>
      <Card className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <CardHeader>
          <CardTitle>Welcome Back, Admin {}👋</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Here’s what’s happening with your dashboard today.
          </p>
        </CardContent>
      </Card>
      {/* over view */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardView />
      </div>
    </>
  );
}
