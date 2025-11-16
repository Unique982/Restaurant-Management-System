"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: ("admin" | "customer")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user } = useAppSelector((store) => store.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user?.role) {
      router.push("/"); // redirect guest
    } else if (!allowedRoles.includes(user.role as any)) {
      // redirect to their dashboard if role mismatch
      router.push(
        user.role === "admin" ? "/admin/dashboard" : "/customer/dashboard"
      );
    }
  }, [user, router]);

  return <>{user && allowedRoles.includes(user.role as any) && children}</>;
}
