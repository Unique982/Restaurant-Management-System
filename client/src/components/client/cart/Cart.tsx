"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
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
  const { items } = useAppSelector((state) => state.cart) || { items: [] };
  const [loading, setLoading] = useState(false);
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
  const totalPrice = (items || []).reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  // Checkout click handler
  const handleCheckout = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
      setIsLogin(false);
    } else {
      setLoading(true);

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
            {items && items.length > 0 ? (
              (items || []).map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-full"
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
            ) : (
              <p className="text-center text-gray-500 text-lg">
                Your cart is empty
              </p>
            )}

            {items && items.length > 0 && (
              <div className="flex justify-between items-center font-semibold pt-3 mt-4 border-t">
                <span>Total</span>
                <span>Rs: {totalPrice}</span>
              </div>
            )}

            {items && items.length > 0 && (
              <Button
                onClick={handleCheckout}
                type="submit"
                disabled={loading}
                className={`w-full mt-4 bg-orange-500 hover:bg-orange-600 ${
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
                {loading ? "Processing..." : "Checkout"}
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
