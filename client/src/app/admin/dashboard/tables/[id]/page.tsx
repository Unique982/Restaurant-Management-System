// app/admin/category/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { getMenuItem } from "@/lib/store/admin/menuItems/menuItemSlice";
import { ITableData } from "@/lib/store/admin/orders/orders.types";
import { ITables, ITablesData } from "@/lib/store/admin/tables/tableSlice.type";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function CategoryViewPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();

  const { data } = useAppSelector((store) => store.tables);
  const [tableData, setTableData] = useState<ITables | null>(null);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getMenuItem());
    }
  }, [dispatch, data.length]);

  useEffect(() => {
    if (params.id && data.length > 0) {
      const foundMenu = data.find((cat) => cat.id.toString() === params.id);
      setTableData(foundMenu || null);
    }
  }, [params.id, data]);

  if (!data && data > 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Table Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The Table you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/admin/dashboard/menu")}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Categories
          </Button>
        </div>
      </div>
    );
  }

  if (!tableData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen overflow-y-auto bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <Button
              onClick={() => router.push("/admin/dashboard/menu")}
              variant="ghost"
              className="mb-4 text-gray-600 bg-green-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Table Page
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Table Details
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              View detailed information about this Table Details
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 overflow-auto">
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Name
                </Label>
                <Input
                  value={tableData.tableNumber}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Seats
                </Label>

                <Input
                  value={tableData.tableNumber}
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 uppercase w-full">
                  Category
                </Label>
                <Input
                  value={
                    tableData?.tableStatus
                      ? tableData.tableStatus.charAt(0).toUpperCase() +
                        tableData.tableStatus.slice(1)
                      : ""
                  }
                  readOnly
                  className="w-full bg-gray-50 border-gray-300 text-gray-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Created At
                  </label>
                  <Input
                    value={
                      tableData?.createdAt
                        ? new Date(tableData.createdAt).toLocaleString()
                        : "-"
                    }
                    readOnly
                    className="w-full bg-gray-50 border-gray-300 text-gray-900"
                  />
                </div>

                {tableData?.updatedAt && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                      Updated At
                    </label>
                    <Input
                      value={new Date(tableData.updatedAt).toLocaleString()}
                      readOnly
                      className="w-full bg-gray-50 border-gray-300 text-gray-900"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-gray-200 flex gap-3">
              <Button
                onClick={() => router.push("/admin/dashboard/tables")}
                variant="outline"
                className="flex-1"
              >
                Back to List
              </Button>
              <Button
                onClick={() =>
                  router.push(`/admin/dashboard/tables/edit/${tableData?.id}`)
                }
                className="flex-1"
              >
                Edit Menu Item
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-6">
              <p className="text-sm text-blue-800 text-center sm:text-left">
                💡 Tap <span className="font-semibold">"Edit Menu Item"</span>{" "}
                to make changes to this menu item.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
