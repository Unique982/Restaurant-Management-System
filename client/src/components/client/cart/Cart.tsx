"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  qty: number;
  price: number;
};

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  removeItem: (id: number) => void;
}

export default function CartDrawer({
  open,
  onOpenChange,
  cartItems,
  removeItem,
}: CartDrawerProps) {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full py-2 px-10 sm:w-96 max-w-full sm:max-w-sm"
      >
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 text-2xl">
              Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>
                  {item.name} x{item.qty}
                </span>
                <div className="flex items-center gap-2">
                  <span>${item.price * item.qty}</span>
                  <Trash2
                    size={16}
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))
          )}
          {cartItems.length > 0 && (
            <div className="flex justify-between items-center font-semibold pt-3 mt-4 border-t">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
          )}
          {cartItems.length > 0 && (
            <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-6">
              Checkout
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
