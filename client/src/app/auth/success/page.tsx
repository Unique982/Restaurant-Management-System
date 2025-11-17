"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface DecodedToken {
  id: string;
  email: string;
  role: "admin" | "customer";
}

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // Decode manually
      const decoded = JSON.parse(atob(token.split(".")[1])) as DecodedToken;

      if (decoded.role === "admin") {
        router.push("/admin/dashboard");
      } else if (decoded.role === "customer") {
        router.push("/customer/dashboard");
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router]);

  return <p>Logging you in...</p>;
}
