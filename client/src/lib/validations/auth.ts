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
export type loginSchemaType = z.infer<typeof loginSchema>;
export type registerSchemaType = z.infer<typeof registerSchema>;
