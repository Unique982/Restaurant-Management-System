"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
export default function UserInfo() {
  const allUsers = [
    { id: 1, name: "Khemraj", email: "khem@example.com", role: "Admin" },
    { id: 2, name: "Sita", email: "sita@example.com", role: "Editor" },
    { id: 3, name: "Ram", email: "ram@example.com", role: "User" },
    { id: 4, name: "Hari", email: "hari@example.com", role: "User" },
    { id: 5, name: "Gita", email: "gita@example.com", role: "Editor" },
    { id: 6, name: "Nabin", email: "nabin@example.com", role: "Admin" },
    { id: 7, name: "Maya", email: "maya@example.com", role: "User" },
  ];

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Filter by search
  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <>
      {/* <div className="flex flex-col sm:flex-row  items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-ato">
          <Input
            placeholder="Search users....."
            className="w-full sm:w-[250px]"
          ></Input>
          <Button>Search</Button>
        </div>
      </div> */}
    </>
  );
}
