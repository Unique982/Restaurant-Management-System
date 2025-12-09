"use client";

import React from "react";
import { toast, Toast } from "react-hot-toast";

interface ConfirmDeleteToastProps<T> {
  message?: string;
  onConfirm: () => Promise<T>;
}

export const openConfirmDeleteToast = <T,>({
  message,
  onConfirm,
}: ConfirmDeleteToastProps<T>) => {
  toast.custom(
    (t: Toast) => (
      <div className="flex flex-col gap-2 p-4 bg-white rounded shadow-lg min-w-[300px]">
        <span className="text-gray-800 font-medium">
          {message || "Are you sure you want to delete this image?"}
        </span>
        <div className="flex gap-2 justify-end">
          <button
            className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const result: any = await onConfirm();
                if (result?.success) toast.success("Deleted successfully");
                else toast.error(result?.message || "Failed to delete");
              } catch (err: any) {
                toast.error(err?.message || "Something went wrong");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ),
    { duration: Infinity } // Keeps toast open until user interacts
  );
};
