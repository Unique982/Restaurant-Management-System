"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/admin/Pagination/pagination";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { deleteUser, getUserList } from "@/lib/store/admin/users/userSlice";
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { usersData: users, status } = useAppSelector((store) => store.users);
  const [searchText, setSearchText] = useState<string>("");
  useEffect(() => {
    dispatch(getUserList());
  }, []);

  // delete handle
  const deleteHandle = async (id: string | number) => {
    await dispatch(deleteUser(id));
    if (status === Status.SUCCESS) {
      dispatch(getUserList());

      toast.success("Delete users successfully!");
    } else {
      toast.error("Delete Failed");
    }
  };
  const sortedData = [...users].sort((a, b) => Number(b.id) - Number(a.id));
  // search
  const filterData = sortedData.filter(
    (user) =>
      user.username
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      user.email.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      user.role.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );
  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">User Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search users..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-[250px]"
            />
          </div>
        </div>

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {user.username}
                    </TableCell>
                    <TableCell className="whitespace-normal break-words">
                      {user.email}
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell className="text-right flex flex-wrap justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        title="View"
                        onClick={() =>
                          router.push(`/admin/dashboard/users/${user.id}`)
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Button
                        onClick={(e) => deleteHandle(user.id)}
                        variant="destructive"
                        size="sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-red-600"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}

        <Pagination />
      </div>
    </>
  );
}
