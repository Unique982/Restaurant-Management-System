"use client";

import Footer from "@/components/client/Footer/footer";
import Navbar from "@/components/client/Navbar/navbar";
import { Button } from "@/components/ui/button";

import { getMenuItem } from "@/lib/store/admin/menuItems/menuItemSlice";
import { setStatus } from "@/lib/store/auth/authSlice";
import { addCart, setItems } from "@/lib/store/customer/cart/cartSlice";
import { cartItems } from "@/lib/store/customer/cart/cartSlice.type";
import { getCategory } from "@/lib/store/customer/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Status } from "@/lib/types/type";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuDetailsModal from "./details/page";
type CategoryType = "All" | string;

export default function MenuPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const menuItems = useAppSelector((state) => state.menuItems.menuDatas);
  // const categories = useAppSelector((state) => state.category.data);
  const categories = useAppSelector((state) => state.categoryList.data);

  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getMenuItem());
  }, [dispatch]);

  // const filteredMenus = menuItems
  //   .filter(
  //     (item) => selectedCategory === "All" || item.category === selectedCategory
  //   )
  //   .filter((item) => item.price <= maxPrice);
  // Filter menu items based on active category
  const filteredMenu = menuItems
    .filter(
      (item) => activeCategory === "All" || item.categoryName === activeCategory
    )
    .filter((item) =>
      maxPrice !== undefined ? Number(item.price) <= maxPrice : true
    );

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

    dispatch(addCart(cartItem));
    toast.success("Item added to your cart");
  };
  console.log(filteredMenu);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-bold text-center mb-10">Our Menu</h1>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-72 bg-white rounded-xl shadow p-6 flex-shrink-0  top-6 ">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <ul className="space-y-3">
                {[{ categoryName: "All", id: 0 }, ...categories].map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat.categoryName)}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                        activeCategory === cat.categoryName
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                      }`}
                    >
                      {cat.categoryName}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Price Filter */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Max Price: NRs:{maxPrice || 0}
                </label>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={maxPrice || 0}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </aside>

            {/* Menu List */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {" "}
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => (
                  <div
                    key={item?.id}
                    className="bg-white rounded-xl shadow overflow-hidden"
                  >
                    <img
                      src={item?.image_url}
                      alt={item?.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{item.categoryName}</p>
                      <p className="text-orange-600 font-bold">${item.price}</p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add To Cart <PlusCircle className="w-5 h-5 ml-1" />
                        </Button>
                        <Button
                          className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsModalOpen(true);
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-500">
                  No items available in this category.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      {selectedItem && (
        <MenuDetailsModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          data={selectedItem}
        />
      )}
      <Footer />
    </>
  );
}
