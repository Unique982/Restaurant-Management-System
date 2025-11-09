"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cartItems } from "@/lib/store/customer/cart/cartSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addCart } from "@/lib/store/customer/cart/cartSlice";
import toast from "react-hot-toast";

interface MenuDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}

export default function MenuDetailsModal({
  open,
  onOpenChange,
  data,
}: MenuDetailsModalProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleAddToCart = () => {
    if (!data) return;
    const cartItem: cartItems = {
      id: data.id,
      name: data.name,
      price: parseFloat(data.price),
      quantity: 1,
      image: data.image_url,
      cart_id: data.cart_id,
      menu_item_id: data.id,
    };

    if (!user) {
      const guestCart: cartItems[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
      );
      const existsIndex = guestCart.findIndex(
        (i) => i.menu_item_id === data.id
      );
      if (existsIndex >= 0) guestCart[existsIndex].quantity += 1;
      else guestCart.push(cartItem);

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
      toast.success("Item added to cart");
      return;
    }

    dispatch(addCart(cartItem));
    toast.success("Item added to cart");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-lg sm:max-w-md md:max-w-lg rounded-lg p-4 sm:p-6 bg-white border border-gray-200 shadow-lg overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-semibold text-center">
            {data?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <img
            src={data?.image_url}
            alt={data?.name}
            className="w-full h-48 sm:h-64 object-cover rounded-md"
          />
          <p className="text-gray-600 font-medium">
            Category: {data?.categoryName}
          </p>
          <p className="text-orange-600 font-bold text-lg">
            Price: ${data?.price}
          </p>
          <p className="text-gray-700">{data?.description}</p>
          <p className="text-gray-500">Ingredients: {data?.ingredients}</p>

          <Button
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Button
            variant="outline"
            className="w-full mt-2 py-2 rounded-lg"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
