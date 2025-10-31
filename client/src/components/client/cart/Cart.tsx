"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  deleteCart,
  fetchCart,
  updateCart,
} from "@/lib/store/customer/cart/cartSlice";
import { useRouter } from "next/navigation";
import { cartItems } from "@/lib/store/customer/cart/cartSlice.type";
import LoginModal from "../modal/LoginModal";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);

  // Login modal state
  const [isLogin, setIsLogin] = useState(true);

  // Fetch cart when drawer opens
  useEffect(() => {
    if (open) dispatch(fetchCart());
  }, [open, dispatch]);

  // Increase quantity
  const handleIncrease = (item: cartItems) => {
    dispatch(updateCart({ id: item.id, quantity: item.quantity + 1 }));
  };

  // Decrease quantity
  const handleDecrease = (item: cartItems) => {
    if (item.quantity <= 1) return;
    dispatch(updateCart({ id: item.id, quantity: item.quantity - 1 }));
  };

  // Delete item
  const handleDelete = (item: cartItems) => {
    dispatch(deleteCart(item.id));
  };

  // Total price calculation
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Checkout click handler
  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
    } else {
      router.push("/checkout");
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-full sm:w-96 py-4 px-6">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>

          <div className="mt-4 space-y-3">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                Your cart is empty
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 ml-2">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Rs: {item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => handleDecrease(item)}>
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button size="sm" onClick={() => handleIncrease(item)}>
                      +
                    </Button>
                    <span className="ml-2">
                      Rs: {item.price * item.quantity}
                    </span>
                    <Trash2
                      className="ml-2 cursor-pointer"
                      onClick={() => handleDelete(item)}
                    />
                  </div>
                </div>
              ))
            )}

            {items.length > 0 && (
              <div className="flex justify-between items-center font-semibold pt-3 mt-4 border-t">
                <span>Total</span>
                <span>Rs: {totalPrice}</span>
              </div>
            )}

            {items.length > 0 && (
              <Button
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
                onClick={handleCheckout} // token check + redirect
              >
                Checkout
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Login modal */}
      <LoginModal
        open={!isLogin}
        onOpenChange={(state) => setIsLogin(!state)}
      />
    </>
  );
}
