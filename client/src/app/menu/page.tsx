"use client";

import Footer from "@/components/client/Footer/footer";
import Navbar from "@/components/client/Navbar/navbar";
import MenuList from "@/components/menu/menuList";

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-bold text-center mb-10">Our Menu</h1>
          <MenuList />
        </div>
      </div>

      <Footer />
    </>
  );
}
