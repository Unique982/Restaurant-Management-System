"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import toast from "react-hot-toast";
import {
  fetchContactAllUser,
  sendReply,
} from "@/lib/store/contactUs/contactSlice";
import { useState } from "react";

interface contactReply {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  id: string | number;
}

export default function Replysend({
  open,
  onOpenChange,
  email,
  id,
}: contactReply) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState(
    "Reply from The 90's Restaurant & Bar"
  );

  // send maila
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(sendReply({ id, email, subject, message }));
    if (!id) return;
    if (result?.success) {
      toast.success("Reply sent successfully!");
      setMessage("");
      onOpenChange(false);
      dispatch(fetchContactAllUser());
    } else {
      toast.error(result.message || "Failed to send reply");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:h-auto   sm:max-w-md rounded-lg p-6 bg-white border border-gray-200 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center">
            Reply to User
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input value={email} readOnly />
          </div>

          <div className="space-y-1">
            <Label>Subject</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <Label>Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your reply..."
              rows={5}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Send Reply
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
