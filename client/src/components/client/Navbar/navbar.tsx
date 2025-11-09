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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart?.items || []);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCart());
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);

  const removeItem = (id: number) => {
    dispatch(deleteCart(id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    console.log("User logged out");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="font-semibold tracking-wide">
          🍴The 90’s Restaurant
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-orange-400">
            Home
          </Link>
          <Link href="/menu" className="hover:text-orange-400" scroll={true}>
            Menu
          </Link>
          <Link href="/about" className="hover:text-orange-400" scroll={true}>
            About
          </Link>
          <Link
            href="#services"
            className="hover:text-orange-400"
            scroll={true}
          >
            Services
          </Link>
          <Link href="/gallery" className="hover:text-orange-400" scroll={true}>
            Gallery
          </Link>
          <Link href="/blog" className="hover:text-orange-400" scroll={true}>
            Blog
          </Link>
          <Link href="#contact" className="hover:text-orange-400" scroll={true}>
            Contact
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 relative">
          {/* 🛒 Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="hover:text-orange-400 relative"
          >
            <ShoppingCart size={30} />
            {items?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </button>

          {/* 👤 User */}
          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-600 font-semibold text-white hover:bg-orange-500 transition"
              >
                {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold capitalize">
                      {user.username || user.username}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <ul>
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-orange-500 transition"
            >
              <User size={24} />
            </button>
          )}

          {/* 📱 Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-gray-900 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3">
          <Link href="/" className="block hover:text-orange-400 " scroll={true}>
            Home
          </Link>
          <Link
            href="/menu"
            className="block hover:text-orange-400"
            scroll={true}
          >
            Menu
          </Link>
          <Link
            href="/about"
            className="block hover:text-orange-400"
            scroll={true}
          >
            About
          </Link>
          <Link
            href="/services"
            className="block hover:text-orange-400"
            scroll={true}
          >
            Services
          </Link>
          <Link
            href="/blog"
            className="block hover:text-orange-400"
            scroll={true}
          >
            Blog
          </Link>
          <Link
            href="/#contact"
            className="block hover:text-orange-400"
            scroll={true}
          >
            Contact
          </Link>
          <Link
            href="#reservation"
            className="block bg-orange-500 px-4 py-2 rounded-lg font-medium text-center hover:bg-orange-600 transition"
            scroll={true}
          >
            Book Table
          </Link>
        </div>
      </div>

      {/* 🧾 Cart Drawer */}
      <Cart open={cartOpen} onOpenChange={setCartOpen} />

      {/* 🔐 Login Modal */}
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </nav>
  );
}
