"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import LoginModal from "@/components/client/modal/LoginModal";
import Cart from "@/components/client/cart/Cart";
import { deleteCart, fetchCart } from "@/lib/store/customer/cart/cartSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const dispatch = useAppDispatch();

  // ✅ Get cart items from Redux
  const { items } = useAppSelector((state) => state.cart);

  // ✅ Fetch cart when Navbar mounts (or use socket in future)
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // ✅ Remove item handler
  const removeItem = (id: number) => {
    dispatch(deleteCart(id));
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          🍴 Restaurant
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-orange-400">
            Home
          </Link>
          <Link href="/menu" className="hover:text-orange-400">
            Menu
          </Link>
          <Link href="#" className="hover:text-orange-400">
            About
          </Link>
          <Link href="#" className="hover:text-orange-400">
            Services
          </Link>
          <Link href="/#contact" className="hover:text-orange-400">
            Contact
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="hover:text-orange-400 relative"
          >
            <ShoppingCart size={30} />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </button>

          {/* Login Modal Trigger */}
          <button
            onClick={() => setLoginOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-500 transition"
          >
            <User size={24} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-gray-900 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3">
          <Link href="/" className="block hover:text-orange-400">
            Home
          </Link>
          <Link href="/menu" className="block hover:text-orange-400">
            Menu
          </Link>
          <Link href="/about" className="block hover:text-orange-400">
            About
          </Link>
          <Link href="/services" className="block hover:text-orange-400">
            Services
          </Link>
          <Link href="/contact" className="block hover:text-orange-400">
            Contact
          </Link>
          <Link
            href="/reservation"
            className="block bg-orange-500 px-4 py-2 rounded-lg font-medium text-center hover:bg-orange-600 transition"
          >
            Book Table
          </Link>
        </div>
      </div>

      {/* Cart Drawer */}
      <Cart
        open={cartOpen}
        onOpenChange={setCartOpen}
        // cartItems={items.map((item) => ({
        //   id: item.id,
        //   name: item.name,
        //   price: item.price,
        //   qty: item.quantity,
        //   image: item.image,
        // }))}
        // removeItem={removeItem}
      />

      {/* Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </nav>
  );
}
