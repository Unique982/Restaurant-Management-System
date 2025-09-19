import { availableMemory } from "process";
import { z } from "zod";

// category schema
export const categorySchema = z.object({
  categoryName: z
    .string()
    .trim()
    .min(1, "Enter categoryName")
    .max(50, "Category name must be at most 50 characters"),
  categoryDescription: z
    .string()
    .trim()
    .min(30, "Description must be at least 30 characters")
    .max(500, "Description must be at most 500 characters"),
});

export type categorySchemaType = z.infer<typeof categorySchema>;

// menu

export const menuItemsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product name is required")
    .max(100, "Product name must be at most 100 characters"),

  description: z
    .string()
    .trim()
    .min(30, "Description must be at least 30 characters")
    .max(100, "Description must be at most 500 characters"),

  price: z
    .string()
    .trim()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must be a valid number"),

  categoryId: z.string().trim().min(1, "Please select a category"),
  image_url: z.string().trim(),
  type: z.string().trim(),
  availability: z.string().trim(),
  ingredients: z.string().trim(),
});

export type menuItemsSchemaTypes = z.infer<typeof menuItemsSchema>;
