"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, PlusCircle, Trash2, User } from "lucide-react";
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
  deleteMenuItemById,
  getMenuItem,
} from "@/lib/store/admin/menuItems/menuItemSlice";
import { de } from "zod/v4/locales";
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";

export default function MenuIfo() {
  const [isModal, setIsModal] = useState(false);
  const { menuDatas: menuItems, status } = useAppSelector(
    (store) => store.menuItems
  );
  const { data: categories } = useAppSelector((store) => store.category);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMenuItem());
  }, []);

  // delete
  const deleteHandle = async (id: string | number) => {
    await dispatch(deletemenuItem(id));
    if (status === Status.SUCCESS) {
      dispatch(getMenuItem());
      toast.success("Delete menu items successful!");
    } else {
      toast.error("Delete failed");
    }
  };

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
                      <Button variant="secondary" size="sm" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" title="Edit">
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
