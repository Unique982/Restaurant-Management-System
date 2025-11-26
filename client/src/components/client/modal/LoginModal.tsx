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
} from "@/lib/validations/auth";
import { fetchCart } from "@/lib/store/customer/cart/cartSlice";

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectUrl?: string;
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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const result: any = await dispatch(userLogin(data));
      if (result.success && result.user) {
        toast.success("Login Successfully");

        // Merge guest cart after login

        await dispatch(fetchCart());

        onOpenChange(false);

        const role = result.user.role;
        if (role === "admin") router.push("/admin/dashboard");
        else if (role === "customer") router.push("/");
      } else {
        toast.error(result?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Register
  const onSubmitSignup = async (data: registerSchemaType) => {
    setLoading(true);
    try {
      const result: any = await dispatch(userRegister(data));

      if (result.success) {
        toast.success("Register Successfully");
        setIsLogin(true);
      } else {
        toast.error(result?.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  // forget password
  const handleForgotEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result: any = await dispatch(forgetPassword(forgotEmail));
      if (result.success) {
        toast.success("OTP sent to your email");
        setForgotStep("otp");
      } else {
        toast.error(result?.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };
  // otp verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result: any = await dispatch(
        otpVerify(forgotEmail, Number(otpCode))
      );
      if (result.success) {
        toast.success("OTP verified successfully");
        setForgotStep("reset");
      } else {
        toast.error(result?.message || "Invalid OTP");
      }
    } finally {
      setLoading(false);
    }
  };
  // Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result: any = await dispatch(
        changePassord(forgotEmail, newPassword)
      );
      if (result.success) {
        toast.success("Password reset successfully");
        setForgotStep("none");
        setIsLogin(true);
      } else {
        toast.error(result?.message || "Failed to reset password");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    // Redirect user to backend Google OAuth route
    window.location.href = "http://localhost:4000/api/auth/google";
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
              disabled={loading}
              className={`w-full bg-orange-500 hover:bg-orange-600 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Processing..." : "Send Otp"}
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
              disabled={loading}
              className={`w-full bg-orange-500 hover:bg-orange-600 mt-4 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Processing..." : "Verify OTP"}
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
              disabled={loading}
              className={`w-full bg-orange-500 hover:bg-orange-600 mt-4 ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Processing..." : "Change Password"}
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
                  disabled={loading}
                  className={`w-full bg-orange-500 hover:bg-orange-600 mt-4 ${
                    loading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {loading ? "Processing..." : "Login"}
                </Button>
                {/* LOgin with */}
                <div className="flex flex-col items-center mt-2 space-y-2">
                  <div className="flex items-center w-full">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-2 text-gray-400 text-sm">or</span>
                    <hr className="flex-1 border-gray-300" />
                  </div>
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100"
                    variant="outline"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="#4285F4"
                        d="M488 261.8c0-17.8-1.6-35-4.6-51.7H249v97.9h134.6c-5.8 31-23 57.3-49 75v62.1h79.4c46.6-42.9 73.6-106.1 73.6-183.3z"
                      />
                      <path
                        fill="#34A853"
                        d="M249 512c66.8 0 122.8-22.1 163.7-59.9l-79.4-62.1c-22.1 14.8-50.4 23.5-84.3 23.5-64.7 0-119.5-43.6-139.2-102.1H30.4v64.1C71.8 463 153.2 512 249 512z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M109.8 316.4c-4.9-14.8-7.7-30.6-7.7-46.4s2.8-31.6 7.7-46.4V159.5H30.4c-15.2 29.9-23.9 63.4-23.9 99.5s8.7 69.6 23.9 99.5l79.4-64.1z"
                      />
                      <path
                        fill="#EA4335"
                        d="M249 97.7c35.9 0 68 12.3 93.2 36.4l69.8-69.8C371.9 27.4 315.9 5 249 5 153.2 5 71.8 54 30.4 159.5l79.4 64.1C129.5 141.3 184.3 97.7 249 97.7z"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </div>

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

                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-orange-500 hover:bg-orange-600 mt-4 ${
                    loading ? "cursor-not-allowed opacity-70" : ""
                  }`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {loading ? "Processing..." : "Sign Up"}
                </Button>

                <div className="flex flex-col items-center mt-2 space-y-2">
                  <div className="flex items-center w-full">
                    <hr className="flex-1 border-gray-300" />
                    <span className="px-2 text-gray-400 text-sm">or</span>
                    <hr className="flex-1 border-gray-300" />
                  </div>
                  <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-100"
                    variant="outline"
                  >
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 488 512"
                    >
                      <path
                        fill="#4285F4"
                        d="M488 261.8c0-17.8-1.6-35-4.6-51.7H249v97.9h134.6c-5.8 31-23 57.3-49 75v62.1h79.4c46.6-42.9 73.6-106.1 73.6-183.3z"
                      />
                      <path
                        fill="#34A853"
                        d="M249 512c66.8 0 122.8-22.1 163.7-59.9l-79.4-62.1c-22.1 14.8-50.4 23.5-84.3 23.5-64.7 0-119.5-43.6-139.2-102.1H30.4v64.1C71.8 463 153.2 512 249 512z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M109.8 316.4c-4.9-14.8-7.7-30.6-7.7-46.4s2.8-31.6 7.7-46.4V159.5H30.4c-15.2 29.9-23.9 63.4-23.9 99.5s8.7 69.6 23.9 99.5l79.4-64.1z"
                      />
                      <path
                        fill="#EA4335"
                        d="M249 97.7c35.9 0 68 12.3 93.2 36.4l69.8-69.8C371.9 27.4 315.9 5 249 5 153.2 5 71.8 54 30.4 159.5l79.4 64.1C129.5 141.3 184.3 97.7 249 97.7z"
                      />
                    </svg>
                    Sign up with Google
                  </Button>
                </div>
                <p className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <a
                    onClick={() => setIsLogin(true)}
                    className="text-orange-400 hover:underline"
                  >
                    Login
                  </a>
                </p>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
