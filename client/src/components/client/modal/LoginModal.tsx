"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { userLogin, userRegister } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { ILoginData, IRegisterInput } from "@/lib/types/auth/authTypes";
import { ChangeEvent, FormEvent, useState } from "react";

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IRegisterInput>({
    username: "",
    email: "",
    password: "",
  });

  // Input data handle
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  // handle submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userRegister(data));
  };
  // login code
  const { user } = useAppSelector((store) => store.auth);
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: " ",
  });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // login submit handle
  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin(loginData));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md rounded-lg p-6 bg-white">
          <DialogHeader>
            <DialogTitle>{isLogin ? "Login" : "Sign Up"}</DialogTitle>
          </DialogHeader>

          {isLogin ? (
            // ✅ Login Form
            <form className="space-y-4 mt-4" onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleLoginChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <input
                type="password"
                name="password"
                onChange={handleLoginChange}
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
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="User Name"
                name="username"
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <input
                type="email"
                onChange={handleChange}
                placeholder="Email"
                name="email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
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
