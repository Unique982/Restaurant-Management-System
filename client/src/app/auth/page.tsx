"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/auth/authSlice";
import LoginModal from "@/components/client/modal/LoginModal";

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      const decoded = JSON.parse(atob(token.split(".")[1]));
      dispatch(
        setUser({
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
          role: decoded.role,
          token,
        })
      );
      if (decoded.role === "admin") router.push("/admin/dashboard");
      else router.push("/");

      return;
    }
  }, []);

  return <LoginModal open={open} onOpenChange={setOpen} />;
}
