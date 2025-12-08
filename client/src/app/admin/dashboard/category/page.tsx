"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import AddCategory from "./category.Model";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deleteCategoryById,
  getCategory,
} from "@/lib/store/admin/category/categorySlice";
import { ICategory } from "@/lib/store/admin/category/categorySlice.type";

import toast from "react-hot-toast";
import { initSocket } from "@/lib/socket";
import { openConfirmDeleteToast } from "@/components/ConfirmToast/ConfirmToast";

export default function CategoryInfo() {
  const router = useRouter();
  const { data: categories } = useAppSelector((store) => store.category);
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(getCategory());
    setLoading(false);
    const socket = initSocket();
    // lisiting for backend events
    socket.on("categoryAdded", (ICategory) => {
      dispatch(getCategory());
      toast.success(`Category added successfully!`);
    });
    // update
    socket.on("categoryUpdated", (ICategory) => {
      dispatch(getCategory());
    });
    // fetch all
    socket.on("categoryGet", (data) => {
      console.log("All categories:", data.categoryData);
    });
    // delete
    socket.on("categoryDeleted", (id: number) => {
      dispatch(getCategory());
    });
    //single data
    socket.on("singleCategoryFetched", (data) => {
      console.log("single category data:", data);
    });

    return () => {
      socket.off("categoryAdded");
      socket.off("CategoryUpdated");
      socket.off("categoryDeleted");
      socket.off("singleCategoryFetched");
      socket.off("categoryGet");
    };
  }, []);
  // delete
  const handleCategoryDelete = async (id: string | number) => {
    openConfirmDeleteToast({
      message: "Do you really want to delete this gallery image?",
      onConfirm: () => dispatch(deleteCategoryById(id)),
    });
    // await dispatch(deleteCategoryById(id));
  };
  const sortedData = [...categories].sort(
    (a, b) => Number(b.id) - Number(a.id)
  );

  // search
  const filterData = sortedData.filter((category) =>
    category.categoryName
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase())
  );
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
          <h1 className="text-2xl font-bold">Category Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Category..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-[250px]"
            />
            {/* add button  */}
            <Button onClick={() => setIsModal(true)}>Add Category</Button>
          </div>
        </div>
        <AddCategory open={isModal} onOpenChange={setIsModal} />

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((category: ICategory, index) => {
                  return (
                    <TableRow key={index + 1}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {category.categoryName}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {category.categoryDescription.substring(0, 30) + "..."}
                      </TableCell>
                      <TableCell>
                        {new Date(category.createdAt).toLocaleDateString("np")}
                      </TableCell>
                      <TableCell className="text-right flex flex-wrap justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          title="View"
                          onClick={() =>
                            router.push(
                              `/admin/dashboard/category/${category.id}`
                            )
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
                            router.push(
                              `/admin/dashboard/category/edit/${category.id}`
                            )
                          }
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {/* delete button */}
                        <Button
                          variant="destructive"
                          size="sm"
                          title="Delete"
                          onClick={() => handleCategoryDelete(category?.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
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
