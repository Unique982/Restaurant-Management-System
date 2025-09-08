"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white shadow-md">
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
          <Link href="/about" className="hover:text-orange-400">
            About
          </Link>
          <Link href="/services" className="hover:text-orange-400">
            Services
          </Link>
          <Link href="/contact" className="hover:text-orange-400">
            Contact
          </Link>
        </div>

        {/* Book Table Button */}
        <Link
          href="/reservation"
          className="hidden md:inline-block bg-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Book Table
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 px-4 pb-4 space-y-3">
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
      )}
    </nav>
  );
}
