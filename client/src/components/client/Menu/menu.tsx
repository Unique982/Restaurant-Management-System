"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  addCart,
  setItems,
  updateItems,
} from "@/lib/store/customer/cart/cartSlice";
import { getMenuItem } from "@/lib/store/admin/menuItems/menuItemSlice";
import { getCategory } from "@/lib/store/customer/category/categorySlice";
import { setStatus } from "@/lib/store/auth/authSlice";
import { Status } from "@/lib/types/type";
import toast from "react-hot-toast";
import { cartItems } from "@/lib/store/customer/cart/cartSlice.type";

type CategoryType = "All" | string;

export default function MenuSection() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const menuItems = useAppSelector((state) => state.menuItems.menuDatas);
  // const categories = useAppSelector((state) => state.category.data);
  const categories = useAppSelector((state) => state.categoryList.data);

  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");

  // Fetch categories and menu items on mount
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getMenuItem());
  }, [dispatch]);

  // Filter menu items based on active category
  const filteredMenu =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.categoryName === activeCategory);

  // Add item to cart
  const handleAddToCart = (item: any) => {
    const cartItem: cartItems = {
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1,
      image: item.image_url,
      cart_id: item.cart_id,
      menu_item_id: item.id,
    };

    // ✅ If user is NOT logged in → use localStorage (guest cart)
    if (!user) {
      const guestCart: cartItems[] = JSON.parse(
        localStorage.getItem("guest_cart") || "[]"
      );

      // check if item already exists
      const existsIndex = guestCart.findIndex(
        (i) => i.menu_item_id === item.id
      );

      if (existsIndex >= 0) {
        guestCart[existsIndex].quantity += 1;
      } else {
        guestCart.push(cartItem);
      }

      // save updated cart
      localStorage.setItem("guest_cart", JSON.stringify(guestCart));

      // update redux state
      dispatch(setItems(guestCart));
      dispatch(setStatus(Status.SUCCESS));
      toast.success("Item added to cart");
      return;
    }

    // ✅ If user IS logged in → save to DB & update redux
    dispatch(addCart(cartItem));
    toast.success("Item added to your cart");
  };

  return (
    <section id="menu" className="px-4 py-20 bg-white">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800">Our Special Menu</h2>
        <p className="text-gray-600 mt-2">Check out our categories!</p>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button
          onClick={() => setActiveCategory("All")}
          className={`px-6 py-2 bg-gray-50  text-white text-1xl hover:bg-gray-100 border text-sm font-semibold transition ${
            activeCategory === "All"
              ? "border-black text-black"
              : "border-gray-300 text-gray-800"
          }`}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setActiveCategory(cat.categoryName)}
            className={`px-6 py-2 bg-gray-50  text-white text-1xl hover:bg-gray-100 border text-sm font-semibold transition ${
              activeCategory === cat.categoryName
                ? "border-black text-black"
                : "border-gray-300 text-gray-800"
            }`}
          >
            {cat.categoryName}
          </Button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-4 border rounded-md transition"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-full flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="text-orange-500 font-semibold text-base mt-2">
                    Rs: {item.price}
                  </p>
                </div>
                <Button
                  className="mt-2 bg-orange-600 text-white hover:bg-orange-700 flex items-center gap-2"
                  onClick={() => handleAddToCart(item)}
                >
                  Add To Cart <PlusCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No items available in this category.
          </p>
        )}
      </div>

      {/* View More */}
      <div className="flex justify-center mt-6">
        <a
          href="/menu"
          className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition"
        >
          View More <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
