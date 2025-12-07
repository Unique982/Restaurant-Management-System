"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function MailRestoreLayout() {
  const [tables] = useState<string[]>(["emails", "archived_emails"]);
  const [selectedTable, setSelectedTable] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Demo data
  const demoData = [
    {
      id: 1,
      type: "emails",
      subject: "Welcome Email",
      from: "admin@example.com",
      date: "2025-12-07",
    },
    {
      id: 2,
      type: "archived_emails",
      subject: "Promotion",
      from: "promo@example.com",
      date: "2025-12-06",
    },
    {
      id: 3,
      type: "emails",
      subject: "Invoice",
      from: "billing@example.com",
      date: "2025-12-05",
    },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Mail Restore
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Select onValueChange={(value) => setSelectedTable(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Table" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table} value={table}>
                {table}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full"
        />

        <Input
          type="date"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full"
        />

        <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">
          Fetch
        </Button>
      </div>
      <div className="overflow-x-auto rounded-md border bg-white">
        <Table className="w-full">
          {/* Table header */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">ID</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Form </TableHead>
              <TableHead>To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {/* table body */}
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>Unique</TableCell>
              <TableCell>ahaha</TableCell>

              <TableCell>jhahsha</TableCell>

              <TableCell className="text-right flex flex-wrap justify-end gap-2">
                <Button variant="secondary" size="sm" title="View">
                  <Eye className="w-4 h-4" />
                </Button>

                {/* Edit */}
                <Button variant="outline" size="sm" title="Edit">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="destructive" size="sm" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={5} className="text-center text-red-600 py-4">
                No menus found
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
