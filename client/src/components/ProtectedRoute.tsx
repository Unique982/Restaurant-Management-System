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
    if (user.role === "admin") {
      router.push("/admin/dashboard");
    } else if (user.role === "customer") {
      router.push("/customer/dashboard");
    } else {
      router.push("/"); // guest वा unknown role
    }
  }, [user, router]);

  return <>{user && allowedRoles.includes(user.role as any) && children}</>;
}
