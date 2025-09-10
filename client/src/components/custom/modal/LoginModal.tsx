"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md rounded-lg p-6 bg-white">
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
          </DialogHeader>

          {isLogin ? (
            // ✅ Login Form
            <form className="space-y-4 mt-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Login
              </Button>
              <p className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-orange-400 hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </form>
          ) : (
            // ✅ Signup Form
            <form className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Sign Up
              </Button>
              <p className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-orange-400 hover:underline"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
