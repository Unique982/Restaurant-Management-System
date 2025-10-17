"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  userLogin,
  userRegister,
  forgetPassword,
  otpVerify,
  changePassord,
} from "@/lib/store/auth/authSlice";

import {
  loginSchema,
  loginSchemaType,
  registerSchema,
  registerSchemaType,
  otpVerifySchema,
  otpVerifySchemeType,
  changePasswordSchema,
  changePasswordSchemeType,
} from "@/lib/validations/auth";

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginModal({ open, onOpenChange }: LoginProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [forgotStep, setForgotStep] = useState<
    "none" | "email" | "otp" | "reset"
  >("none");
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  // Login handle
  const onSubmitLogin = async (data: loginSchemaType) => {
    const result: any = await dispatch(userLogin(data));
    if (result.success && result.user) {
      toast.success("Login Successfully");
      onOpenChange(false);

      const role = result.user.role;
      if (role === "admin") router.push("/admin/dashboard");
      else if (role === "customer") router.push("/customer/dashboard");
      else router.push("/");
    } else {
      toast.error(result?.message || "Login failed");
    }
  };
  // Register
  const onSubmitSignup = async (data: registerSchemaType) => {
    const result: any = await dispatch(userRegister(data));
    if (result.success) {
      toast.success("Register Successfully");
      setIsLogin(true);
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };

  // forget password
  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const result: any = await dispatch(forgetPassword(forgotEmail));
    if (result.success) {
      toast.success("OTP sent to your email");
      setForgotStep("otp");
    } else {
      toast.error(result?.message || "Failed to send OTP");
    }
  };
  // otp verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const result: any = await dispatch(otpVerify(forgotEmail, Number(otpCode)));
    if (result.success) {
      toast.success("OTP verified successfully");
      setForgotStep("reset");
    } else {
      toast.error(result?.message || "Invalid OTP");
    }
  };
  // Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const result: any = await dispatch(changePassord(forgotEmail, newPassword));
    if (result.success) {
      toast.success("Password reset successfully");
      setForgotStep("none");
      setIsLogin(true);
    } else {
      toast.error(result?.message || "Failed to reset password");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">
            {forgotStep === "email" && "Forget Password"}
            {forgotStep === "otp" && "Otp"}
            {forgotStep === "reset" && "Change Password"}
            {forgotStep === "none" && (isLogin ? "Login" : "Sign Up")}
          </DialogTitle>
        </DialogHeader>

        {/* Forget pasword */}
        {forgotStep === "email" && (
          <form onSubmit={handleForgotEmail} className="space-y-3 mt-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Send OTP
            </Button>
          </form>
        )}
        {/* Otp Verfiy  */}
        {forgotStep === "otp" && (
          <form
            onSubmit={handleVerifyOtp}
            className="space-y-4 mt-4 flex flex-col items-center"
          >
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((index) => (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={otpCode[index] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    const newOtp = otpCode.split("");
                    newOtp[index] = val;
                    setOtpCode(newOtp.join(""));

                    if (val && index < 3) {
                      const nextInput = document.getElementById(
                        `otp-${index + 1}`
                      );
                      nextInput && (nextInput as HTMLInputElement).focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
                      const prevInput = document.getElementById(
                        `otp-${index - 1}`
                      );
                      prevInput && (prevInput as HTMLInputElement).focus();
                    }
                  }}
                  id={`otp-${index}`}
                  className="w-12 h-12 text-center text-xl border-2 border-orange-400 rounded-md"
                />
              ))}
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 mt-4"
            >
              Verify OTP
            </Button>
          </form>
        )}
        {/* Reset Password */}
        {forgotStep === "reset" && (
          <form onSubmit={handleResetPassword} className="space-y-3 mt-4">
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Change Password
            </Button>
          </form>
        )}

        {/* Login and singup page */}
        {forgotStep === "none" && (
          <>
            {isLogin ? (
              <form
                className="space-y-4 mt-4"
                onSubmit={handleLoginSubmit(onSubmitLogin)}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  {...loginRegister("email")}
                />
                {loginErrors.email && (
                  <span className="text-red-500 text-sm">
                    {loginErrors.email.message}
                  </span>
                )}
                <Input
                  type="password"
                  placeholder="Password"
                  {...loginRegister("password")}
                />
                {loginErrors.password && (
                  <span className="text-red-500 text-sm">
                    {loginErrors.password.message}
                  </span>
                )}
                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    className="text-orange-500 hover:underline"
                    onClick={() => setForgotStep("email")}
                  >
                    Forgot Password?
                  </button>
                </div>
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
              <form
                className="space-y-3 mt-2"
                onSubmit={handleSignupSubmit(onSubmitSignup)}
              >
                <Input
                  type="text"
                  placeholder="Username"
                  {...signupRegister("username")}
                />
                {signupErrors.username && (
                  <span className="text-red-500 text-sm">
                    {signupErrors.username.message}
                  </span>
                )}
                <Input
                  type="email"
                  placeholder="Email"
                  {...signupRegister("email")}
                />
                {signupErrors.email && (
                  <span className="text-red-500 text-sm">
                    {signupErrors.email.message}
                  </span>
                )}
                <Input
                  type="password"
                  placeholder="Password"
                  {...signupRegister("password")}
                />
                {signupErrors.password && (
                  <span className="text-red-500 text-sm">
                    {signupErrors.password.message}
                  </span>
                )}
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...signupRegister("confirmPassword")}
                />
                {signupErrors.confirmPassword && (
                  <span className="text-red-500 text-sm">
                    {signupErrors.confirmPassword.message}
                  </span>
                )}
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Sign Up
                </Button>
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Button
                    onClick={() => setIsLogin(true)}
                    className="text-orange-400 hover:underline"
                  >
                    Login
                  </Button>
                </p>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
