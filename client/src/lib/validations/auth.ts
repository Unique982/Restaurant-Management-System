import { email, regex, z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email").trim(),
  password: z.string().trim(),
});
export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .regex(/^[a-zA-Z]*$/, { message: "Username must contain only latter! " })
      .trim(),
    email: z.string().email("Please enter a valid email").trim(),
    password: z
      .string()
      .trim()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message:
          "Password must contain uppercase, lowercase, number, and special character ",
      }),

    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgetSchema = z.object({
  email: z.string().email("Please enter valid email!"),
});
export const otpVerifySchema = z.object({
  otp: z
    .string()
    .nonempty("OTP is required")
    .regex(/^\d+$/, "OTP must be a number")
    .transform((val) => Number(val)),
});

export const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type loginSchemaType = z.infer<typeof loginSchema>;
export type registerSchemaType = z.infer<typeof registerSchema>;
export type fogetSchemeType = z.infer<typeof forgetSchema>;
export type otpVerifySchemeType = z.infer<typeof otpVerifySchema>;
export type changePasswordSchemeType = z.infer<typeof changePasswordSchema>;
