"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Loader2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/admin/Pagination/pagination";
import AddMenu from "./menu.Modal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deletemenuItem,
  getMenuItem,
} from "@/lib/store/admin/menuItems/menuItemSlice";

import toast from "react-hot-toast";
import { initSocket } from "@/lib/socket";
import { IMenuItems } from "@/lib/store/admin/menuItems/menuItemSlice.type";
import { useRouter } from "next/navigation";

export default function MenuIfo() {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const { menuDatas: menuItems } = useAppSelector((store) => store.menuItems);
  const { data: categories } = useAppSelector((store) => store.category);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getMenuItem());
    setLoading(false);
    const socket = initSocket();
    // added
    socket.on("menuAdded", (data: IMenuItems) => {
      dispatch(getMenuItem());
      toast.success("Menu added successfully!");
    });

    // delete
    socket.on("menuDeleted", (id: number) => {
      dispatch(getMenuItem());
      toast.success("Menu deleted successfully!");
    });
    socket.on("menuUpdated", (data: IMenuItems) => {
      dispatch(getMenuItem());
      toast.success(`Menu ${data.name} updated successfully!`);
    });

    return () => {
      socket.off("menuAdded");
      socket.off("menuDeleted");
      socket.off("menuUpdated");
    };
  }, []);

  // delete
  const deleteHandle = async (id: string | number) => {
    await dispatch(deletemenuItem(id));
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Menu Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Category..."
              className="w-full sm:w-[250px]"
            />
            {/* add button  */}
            <Button onClick={() => setIsModal(true)}>Add Category</Button>
          </div>
        </div>
        <AddMenu open={isModal} onOpenChange={setIsModal} />

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>men</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Catgeory Name</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {menuItems.length > 0 ? (
                menuItems.map((menu, index) => (
                  <TableRow key={menu.id || index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{menu.name}</TableCell>
                    <TableCell>
                      {menu.description?.substring(0, 30) + "..."}
                    </TableCell>
                    <TableCell>{menu.price}</TableCell>
                    <TableCell>
                      {menu.categoryName
                        ? menu.categoryName
                        : "No Category $(`<spen className='text-red-600'></span>`)"}
                    </TableCell>
                    <TableCell>
                      {new Date(menu.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right flex flex-wrap justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        title="View"
                        onClick={() =>
                          router.push(`/admin/dashboard/menu/${menu.id}`)
                        }
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      {/* Edit */}
                      <Button
                        variant="outline"
                        size="sm"
                        title="Edit"
                        onClick={() =>
                          router.push(`/admin/dashboard/menu/edit/${menu.id}`)
                        }
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => deleteHandle(menu.id)}
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
                    className="text-center text-red-600 py-4"
                  >
                    No menus found
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
