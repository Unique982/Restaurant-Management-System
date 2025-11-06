"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, MessageCircle, Trash2 } from "lucide-react";
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
import { fetchContactAllUser } from "@/lib/store/contactUs/contactSlice";
import { IContactUs } from "@/lib/store/contactUs/contactSlice.type";
import ReplyModel from "./reply/reply.Modal";
import ViewModal from "./[id]/page";
export default function CategoryInfo() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((store) => store.contact);
  const [searchText, setSearchText] = useState<string>("");
  const [openReplyModal, setOpenReplyModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IContactUs | null>(null);
  useEffect(() => {
    dispatch(fetchContactAllUser());
  }, [dispatch]);
  const handleViewClick = (user: IContactUs) => {
    setSelectedUser(user);

    setOpenViewModal(true);
  };

  // search
  const filterData =
    data?.filter(
      (inquery: IContactUs) =>
        inquery.username.toLowerCase().includes(searchText.toLowerCase()) ||
        inquery.phoneNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        inquery.email.toLowerCase().includes(searchText.toLowerCase())
    ) || [];
  const handleReplyClick = (user: IContactUs) => {
    if (!user.email) return;
    setSelectedEmail(user.email);
    setSelectedUser(user);
    setOpenReplyModal(true);
  };
  return (
    <>
      <div className="space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Contact Management</h1>
          {/* sreach section here */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Input
              placeholder="Search Contact List..."
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
                <TableHead>Username</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Stauts</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {/* table body */}
            <TableBody>
              {filterData.length > 0 ? (
                filterData.map((data: IContactUs, index) => {
                  return (
                    <TableRow key={index + 1}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {data.username}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {data.email}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {data.phoneNumber}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {data.message.substring(0, 30) + "..."}
                      </TableCell>
                      <TableCell className="whitespace-normal break-words">
                        {data.isReplied ? "Replied" : "No Reply"}
                      </TableCell>
                      <TableCell>
                        {new Date(data.createdAt).toLocaleDateString("np")}
                      </TableCell>
                      <TableCell className="text-right flex flex-wrap justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          title="View"
                          onClick={() => handleViewClick(data)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          title="Reply"
                          onClick={() => handleReplyClick(data)}
                        >
                          <MessageCircle className="w-4 h-4"></MessageCircle>
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
          {selectedUser && (
            <ReplyModel
              open={openReplyModal}
              onOpenChange={setOpenReplyModal}
              email={selectedEmail}
              id={selectedUser.id}
            />
          )}

          {selectedUser && (
            <ViewModal
              open={openViewModal}
              onOpenChange={setOpenViewModal}
              data={selectedUser}
            />
          )}
        </div>
        {/* Pagination */}

        <Pagination />
      </div>
    </>
  );
}
