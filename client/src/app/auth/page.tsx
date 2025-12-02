"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/auth/authSlice";
import LoginModal from "@/components/client/modal/LoginModal";

function AuthContent() {
  const router = useRouter();
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!params) return;
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      const parts = token.split(".");
      if (parts.length === 3) {
        try {
          const decoded = JSON.parse(atob(parts[1]));

          dispatch(
            setUser({
              id: decoded.id,
              email: decoded.email,
              username: decoded.username,
              role: decoded.role,
              token,
            })
          );

          setOpen(false);

          if (decoded.role === "admin") router.replace("/admin/dashboard");
          else router.replace("/");
        } catch (e) {
          console.error("Failed to decode or parse token:", e);
          setOpen(true);
        }
      }
      return;
    }
  }, [params, dispatch, router]);

  // Render the LoginModal
  return <LoginModal open={open} onOpenChange={setOpen} />;
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen text-lg text-gray-700">
          Loading authentication state...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
