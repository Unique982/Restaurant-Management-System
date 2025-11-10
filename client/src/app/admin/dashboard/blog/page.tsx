"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Eye, Trash2 } from "lucide-react";
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
import {
  deleteCategoryById,
  getCategory,
} from "@/lib/store/admin/category/categorySlice";
import { ICategory } from "@/lib/store/admin/category/categorySlice.type";
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";
import { fectchBlogs } from "@/lib/store/admin/blog/blogSlice";
import { IBlogDetails } from "@/lib/store/admin/blog/blogSlice.type";

export default function CategoryInfo() {
  const { blogData, status } = useAppSelector((store) => store.blog);
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(fectchBlogs());
  }, []);
  // delete
  const handleBlogDelete = async (id: string | number) => {
    // await dispatch();
    if (status === Status.SUCCESS) {
      dispatch(fectchBlogs());
      toast.success("Category Delete successfully!");
    } else {
      toast.error("Failed to delete !");
    }
  };
  // search
  const filterData = blogData.filter(
    (blog) =>
      blog.blogTitle
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      blog.blogDescription
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase()) ||
      blog.blogCategory
        .toLocaleLowerCase()
        .includes(searchText.toLocaleLowerCase())
  );

  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Blog Management</h1>
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

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((blog: IBlogDetails, index) => {
                  return (
                    <TableRow key={index + 1}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {blog.blogTitle}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {blog.blogDescription.substring(0, 30) + "..."}
                      </TableCell>
                      <TableCell>
                        {new Date(blog.createdAt).toLocaleDateString("np")}
                      </TableCell>
                      <TableCell className="text-right flex flex-wrap justify-end gap-2">
                        <Button variant="secondary" size="sm" title="View">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {/* delete button */}
                        <Button
                          variant="destructive"
                          size="sm"
                          title="Delete"
                          // onClick={() => handleCategoryDelete(blog?.id)}
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
