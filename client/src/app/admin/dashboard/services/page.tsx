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
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";
import {
  deleteServiceIdBy,
  fetchServices,
} from "@/lib/store/services/servicesSlice";
import AddServices from "./service.Model";
import { serviceItems } from "@/lib/store/services/servicesSlice.type";
import ViewModal from "./[id]/view.Model";

export default function Blogs() {
  const { data, status } = useAppSelector((store) => store.services);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<serviceItems | null>(null);
  const [isModal, setIsModal] = useState(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(fetchServices());
  }, []);
  // delete
  const handleServiceDelete = async (id: string | number) => {
    await dispatch(deleteServiceIdBy(id));
    if (status === Status.SUCCESS) {
      dispatch(fetchServices());
      toast.success("Service Delete successfully!");
    } else {
      toast.error("Failed to delete !");
    }
  };
  // search
  const filterData = data.filter((serv) =>
    serv.serviceTitle
      .toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase())
  );

  const handleViewClick = (data: serviceItems) => {
    setSelectedItems(data);
    setOpenViewModal(true);
  };
  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Service Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Category..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-[250px]"
            />
            {/* add button  */}
            <Button onClick={() => setIsModal(true)}>Add Services</Button>
          </div>
        </div>
        <AddServices open={isModal} onOpenChange={setIsModal} />

        {/* Tbale content herre */}
        <div className="overflow-x-auto rounded-md border bg-white">
          <Table className="w-full">
            {/* Table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">ID</TableHead>
                <TableHead>Servive Title</TableHead>
                <TableHead>Serice Description</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((serv, index) => {
                  return (
                    <TableRow key={index + 1}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {serv.serviceTitle}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {serv.serviceDescription.substring(0, 30) + "..."}
                      </TableCell>
                      <TableCell>
                        {new Date(serv.createdAt).toLocaleDateString("np")}
                      </TableCell>
                      <TableCell className="text-right flex flex-wrap justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          title="View"
                          onClick={() => handleViewClick(serv)}
                        >
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
                          onClick={() => handleServiceDelete(serv?.id)}
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
          {selectedItems && (
            <ViewModal
              open={openViewModal}
              onOpenChange={setOpenViewModal}
              data={selectedItems}
            />
          )}
        </div>
        {/* Pagination */}

        <Pagination />
      </div>
    </>
  );
}
