// app/cart/page.tsx

"use client";
import React, { useState } from "react";
import { Minus, Plus, Star, X } from "lucide-react"; // Heart is removed

// =========================================================================
// 1. MOCK DATA DEFINITIONS (Combined)
// =========================================================================

interface CartItemType {
  id: number;
  name: string;
  color: string;
  size: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
}

interface RecommendationType {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  imageUrl: string;
}

const initialCartData: CartItemType[] = [
  {
    id: 101,
    name: "Great product name goes here",
    color: "Silver",
    size: "Large",
    unitPrice: 40.0,
    quantity: 2,
    imageUrl: "https://via.placeholder.com/60/D3D3D3/000000?text=P1",
  },
  {
    id: 102,
    name: "Great product name goes here",
    color: "Silver",
    size: "Large",
    unitPrice: 40.0,
    quantity: 2,
    imageUrl: "https://via.placeholder.com/60/D3D3D3/000000?text=P2",
  },
  {
    id: 103,
    name: "Innovative gadget title here",
    color: "Black",
    size: "Medium",
    unitPrice: 35.0,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/60/4B0082/FFFFFF?text=P3",
  },
  {
    id: 104,
    name: "Stylish accessory name",
    color: "Gold",
    size: "Small",
    unitPrice: 45.0,
    quantity: 3,
    imageUrl: "https://via.placeholder.com/60/FFD700/000000?text=P4",
  },
  {
    id: 105,
    name: "Cutting-edge device title",
    color: "Blue",
    size: "Extra Large",
    unitPrice: 287.99,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/60/A52A2A/FFFFFF?text=P5",
  },
];

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

// =========================================================================
// 2. MAIN CART PAGE
// =========================================================================

const CartPage: React.FC = () => {
  // --- STATE FOR DYNAMIC CART ITEMS ---
  const [cartItems, setCartItems] = useState(initialCartData);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // --- CART CALCULATION LOGIC ---
  const totalItemsPrice = cartItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryCost = 25.0;
  const tax = 14.0;
  const mockDiscount = isCouponApplied ? 60.0 : 0.0;
  const total = totalItemsPrice + deliveryCost + tax - mockDiscount;

  // --- HANDLERS (Simulated) ---
  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleRemoveAll = () => {
    setCartItems([]);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE60") {
      setIsCouponApplied(true);
    } else {
      setIsCouponApplied(false);
      alert("Invalid coupon code!");
    }
  };

  // =========================================================================
  // 3. INTERNAL COMPONENTS (Definitions nested here)
  // =========================================================================

  // --- CartItem Component (Wishlist removed, X icon handles removal) ---
  const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
    const itemTotal = item.unitPrice * item.quantity;
    const pricePerItem = item.unitPrice.toFixed(2);

    return (
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 border-b border-gray-200 gap-4 w-full">
        {/* LEFT: Image + Name */}
        <div className="flex items-start sm:flex-grow w-full sm:pr-4">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg mr-4 border border-gray-100"
          />

          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-gray-800 leading-tight">
              {item.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Price:{" "}
              <span className="font-medium text-gray-700">
                Rs. {pricePerItem}
              </span>{" "}
              / per item
            </p>
          </div>
        </div>

        {/* RIGHT: Qty + Remove */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-9">
            <input
              type="number"
              value={item.quantity}
              readOnly
              className="w-12 text-center text-sm font-medium bg-transparent border-none focus:ring-0"
            />

            <div className="flex flex-col border-l border-gray-300">
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                className="w-7 h-4.5 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Plus size={13} className="text-gray-700" />
              </button>

              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                disabled={item.quantity === 1}
                className="w-7 h-4.5 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40 transition"
              >
                <Minus size={13} className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => handleRemoveItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  };

  // --- OrderSummary Component (Shadow removed) ---
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
      // Removed shadow-lg
      <div className="sticky top-8 bg-white p-6 rounded-xl border border-gray-100">
        {/* Promocode Input */}
        <div
          className="flex flex-col sm:flex-row items-stretch sm:items-center 
                  space-y-2 sm:space-y-0 sm:space-x-4 
                  pb-4 border-b border-gray-200 mb-4"
        >
          <input
            type="text"
            placeholder="Promocode"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md text-sm 
                 focus:ring-blue-500 focus:border-blue-500"
          />

          <button
            onClick={handleApplyCoupon}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md 
                 hover:bg-gray-200 transition text-sm w-full sm:w-auto"
          >
            Apply
          </button>
        </div>

        {/* Summary Details */}
        <div className="space-y-1">
          <DetailRow
            label={`${totalItemsCount} Items`}
            value={`$${totalItemsPrice.toFixed(2)}`}
          />
          <DetailRow
            label="Delivery cost"
            value={`$${deliveryCost.toFixed(2)}`}
          />
          <DetailRow label="Tax" value={`$${tax.toFixed(2)}`} />
          <DetailRow
            label="Discount"
            value={`- $${mockDiscount.toFixed(2)}`}
            isDiscount={true}
          />
        </div>

        {/* Total Section */}
        <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-4">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-xl font-bold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>

        {/* Checkout */}
        <button className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2">
          <span>Checkout</span>
          <span className="text-xl">&rarr;</span>
        </button>

        {/* Delivery Message */}
        <p className="mt-4 text-center text-xs text-green-600">
          Delivered by{" "}
          <span className="font-semibold">Morning, Friday, May 20</span>
        </p>
      </div>
    );
  };

  // --- RecommendationCard Component (Shadow removed) ---
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
        {/* Wishlist button removed or adjusted for flat design */}
        {/* <button className="absolute top-2 right-2 p-1 bg-white rounded-full text-gray-400 hover:text-red-500 transition">
            <Heart size={16} /> 
        </button> */}
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h4 className="text-sm font-medium text-gray-800 truncate">
          {item.name}
        </h4>

        {/* Rating */}
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
          <span>{item.rating.toFixed(1)}</span>
          <span className="ml-1 text-gray-400">
            ({item.reviewCount} reviews)
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className=" block w-full text-sm py-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-md hover:bg-blue-100 transition mt-3">
          Add to cart
        </button>
      </div>
    </div>
  );

  // --- Recommendations Container ---
  const Recommendations: React.FC = () => (
    <div className="mt-12 pt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Customer also bought these
      </h2>

      {/* Responsive Grid for Recommendations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockRecommendations.map((item) => (
          <RecommendationCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );

  // =========================================================================
  // 4. FINAL PAGE LAYOUT (Rendering the components)
  // =========================================================================
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* --- TOP SECTION: Cart and Summary (Two-Column Layout, fully responsive) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Cart List (Takes 2/3 space on large screens) */}
          <section className="lg:col-span-2">
            {/* Removed shadow-lg */}
            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Your cart
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {cartItems.length} Products in Your Cart
              </p>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
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

          {/* RIGHT COLUMN: Order Summary (Takes 1/3 space on large screens) */}
          <aside className="lg:col-span-1">
            <OrderSummary />
          </aside>
        </div>

        {/* --- BOTTOM SECTION: Recommendations (Full Width) --- */}
        <section>
          <Recommendations />
        </section>
      </div>
    </main>
  );
};

export default CartPage;
