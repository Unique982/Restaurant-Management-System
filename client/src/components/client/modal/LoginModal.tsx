"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { userLogin, userRegister } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ILoginData, IRegisterInput } from "@/lib/types/auth/authTypes";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  loginSchema,
  loginSchemaType,
  registerSchema,
  registerSchemaType,
} from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import toast, { useToaster } from "react-hot-toast";

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    formState: { errors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
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
  const { user, status } = useAppSelector((store) => store.auth);
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });
  const onSignupSubmit = async (data: registerSchemaType) => {
    const result: any = await dispatch(userRegister(data));
    if (result.success) {
      toast.success("Register Successfully");
      setIsLogin(true);
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };

  const onSubmit = async (data: loginSchemaType) => {
    const result: any = await dispatch(userLogin(data));

    if (result.success && result.user) {
      toast.success("Login Successfully");
      onOpenChange(false);

      // ✅ Role-based redirect
      const role = result.user.role;

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "customer") {
        router.push("/customer/dashboard");
      } else {
        router.push("/"); // fallback
      }
    } else {
      toast.error(result?.message || "Login failed");
    }
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
            <form
              className="space-y-4 mt-4"
              onSubmit={handleLoginSubmit(onSubmit)}
            >
              <Input
                type="email"
                placeholder="Email"
                {...loginRegister("email")}
                className="w-full px-3 py-2  rounded-md border border-gray-300 text-black"
              />
              {loginErrors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {loginErrors.email.message}
                </span>
              )}
              <Input
                type="password"
                {...loginRegister("password")}
                placeholder="Password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              {loginErrors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {loginErrors.password.message}
                </span>
              )}
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
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
            <form
              className="space-y-3 mt-2"
              onSubmit={handleSignupSubmit(onSignupSubmit)}
            >
              <Input
                type="text"
                placeholder="User Name"
                {...signupRegister("username")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              {signupErrors.username && (
                <span className="text-red-500 text-sm mt-2 mb-2 block">
                  {signupErrors.username.message}
                </span>
              )}
              <Input
                type="email"
                {...signupRegister("email")}
                placeholder="Email"
                name="email"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              {signupErrors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {signupErrors.email.message}
                </span>
              )}
              <Input
                type="password"
                {...signupRegister("password")}
                placeholder="Password"
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />
              {signupErrors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {signupErrors.password.message}
                </span>
              )}
              <Input
                type="password"
                placeholder="Confirm Password"
                {...signupRegister("confirmPassword")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-black"
              />{" "}
              {signupErrors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1 block">
                  {signupErrors.confirmPassword.message}
                </span>
              )}
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Sign Up
              </Button>
              <p className="text-center text-sm text-gray-400">
                Already have an account?
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
