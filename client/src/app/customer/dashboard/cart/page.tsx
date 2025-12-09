"use client";
import React, { useEffect, useState } from "react";
import { Minus, Plus, Star, X } from "lucide-react";
import {
  deleteCart,
  fetchCart,
  updateCart,
} from "@/lib/store/customer/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { cartItems } from "@/lib/store/customer/cart/cartSlice.type";

interface RecommendationType {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl: string;
}

const mockRecommendations: RecommendationType[] = [
  {
    id: 201,
    name: "John Varvatos Star USA Contrast",
    rating: 4.5,
    reviewCount: 110,
    price: 32.0,
    imageUrl: "https://via.placeholder.com/300/F0F0F0/000000?text=R1",
  },
  {
    id: 202,
    name: "John Varvatos Star USA Contrast",
    rating: 4.5,
    reviewCount: 110,
    price: 32.0,
    imageUrl: "https://via.placeholder.com/300/B0C4DE/000000?text=R2",
  },
  {
    id: 203,
    name: "John Varvatos Star USA Contrast",
    rating: 4.5,
    reviewCount: 110,
    price: 32.0,
    imageUrl: "https://via.placeholder.com/300/FFA07A/000000?text=R3",
  },
  {
    id: 204,
    name: "John Varvatos Star USA Contrast",
    rating: 4.5,
    reviewCount: 110,
    price: 32.0,
    imageUrl: "https://via.placeholder.com/300/E6E6FA/000000?text=R4",
  },
];

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart) || { items: [] };
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Fetch cart on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

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

  // Remove all
  const handleRemoveAll = () => {
    items.forEach((item) => dispatch(deleteCart(item.id)));
  };

  // Total calculation
  const totalPrice = (items || []).reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCost = 25;
  const tax = 14;
  const mockDiscount = 0;
  const total = totalPrice + deliveryCost + tax - mockDiscount;

  // Checkout
  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) setIsLogin(false);
    else router.push("/checkout");
  };

  // --- Cart Item Component ---
  const CartItem: React.FC<{ item: cartItems }> = ({ item }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 border-b border-gray-200 gap-4 w-full">
      <div className="flex items-start sm:flex-grow w-full sm:pr-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg mr-4 border border-gray-100"
        />
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-gray-800 leading-tight">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Price:{" "}
            <span className="font-medium text-gray-700">Rs. {item.price}</span>{" "}
            / per item
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-9">
          <input
            type="number"
            value={item.quantity}
            readOnly
            className="w-12 text-center text-sm font-medium bg-transparent border-none focus:ring-0"
          />
          <div className="flex flex-col border-l border-gray-300">
            <button
              onClick={() => handleIncrease(item)}
              className="w-7 h-4.5 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Plus size={13} className="text-gray-700" />
            </button>
            <button
              onClick={() => handleDecrease(item)}
              disabled={item.quantity === 1}
              className="w-7 h-4.5 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition"
            >
              <Minus size={13} className="text-gray-700" />
            </button>
          </div>
        </div>

        <button
          onClick={() => handleDelete(item)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );

  // --- Order Summary Component ---
  const OrderSummary: React.FC = () => {
    const DetailRow: React.FC<{
      label: string;
      value: string;
      isDiscount?: boolean;
    }> = ({ label, value, isDiscount = false }) => (
      <div className="flex justify-between text-sm py-1">
        <span className="text-gray-500">{label}:</span>
        <span
          className={`font-medium ${
            isDiscount ? "text-red-500" : "text-gray-800"
          }`}
        >
          {value}
        </span>
      </div>
    );

    return (
      <div className="sticky top-8 bg-white p-6 rounded-xl border border-gray-100">
        <div className="space-y-1">
          <DetailRow
            label={`${totalItemsCount} Items`}
            value={`$${totalPrice.toFixed(2)}`}
          />
          <DetailRow
            label="Delivery cost"
            value={`$${deliveryCost.toFixed(2)}`}
          />
          <DetailRow label="Tax" value={`$${tax.toFixed(2)}`} />
          <DetailRow
            label="Discount"
            value={`- $${mockDiscount.toFixed(2)}`}
            isDiscount
          />
        </div>

        <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
        >
          <span>Checkout</span>
          <span className="text-xl">&rarr;</span>
        </button>

        <p className="mt-4 text-center text-xs text-green-600">
          Delivered by{" "}
          <span className="font-semibold">Morning, Friday, May 20</span>
        </p>
      </div>
    );
  };

  // --- Recommendation Component ---
  const RecommendationCard: React.FC<{ item: RecommendationType }> = ({
    item,
  }) => (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 transition duration-200 flex flex-col h-full">
      <div className="relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h4 className="text-sm font-medium text-gray-800 truncate">
          {item.name}
        </h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
          <span>{item.rating.toFixed(1)}</span>
          <span className="ml-1 text-gray-400">
            ({item.reviewCount} reviews)
          </span>
        </div>
        <button className=" block w-full text-sm py-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-md hover:bg-blue-100 transition mt-3">
          Add to cart
        </button>
      </div>
    </div>
  );

  const Recommendations: React.FC = () => (
    <div className="mt-12 pt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Customer also bought these
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockRecommendations.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Your cart
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {items.length} Products in Your Cart
              </p>
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <button
                onClick={handleRemoveAll}
                className="mt-4 text-sm text-gray-500 hover:text-red-500 transition"
              >
                Remove all from cart
              </button>
            </div>
          </section>
          <aside className="lg:col-span-1">
            <OrderSummary />
          </aside>
        </div>
        <section>
          <Recommendations />
        </section>
      </div>
    </main>
  );
};

export default CartPage;
