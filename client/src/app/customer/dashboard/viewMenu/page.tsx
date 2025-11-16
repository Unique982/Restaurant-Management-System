// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { PlusCircle } from "lucide-react";
// import toast from "react-hot-toast";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { addCart, setItems } from "@/lib/store/customer/cart/cartSlice";
// import { cartItems } from "@/lib/store/customer/cart/cartSlice.type";

// interface MenuItem {
//   id: string | number;
//   name: string;
//   price: number;
//   image_url: string;
//   categoryName: string;
// }

// export default function QuickMenu() {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.auth.user);
//   const menuItems: MenuItem[] = useAppSelector(
//     (state) => state.menuItems.menuDatas
//   );

//   const [specialRequest, setSpecialRequest] = useState<string>("");

//   useEffect(() => {
//     // Fetch menu items from backend if needed
//   }, []);

//   const handleAddToCart = (item: MenuItem) => {
//     const cartItem: cartItems = {
//       id: item.id,
//       name: item.name,
//       price: parseFloat(item.price),
//       quantity: 1,
//       image: item.image_url,
//       cart_id: item.id,
//       menu_item_id: item.id,
//       special_request: specialRequest || "",
//     };

//     if (!user) {
//       const guestCart: cartItems[] = JSON.parse(
//         localStorage.getItem("guest_cart") || "[]"
//       );

//       const existsIndex = guestCart.findIndex(
//         (i) => i.menu_item_id === item.id
//       );

//       if (existsIndex >= 0) guestCart[existsIndex].quantity += 1;
//       else guestCart.push(cartItem);

//       localStorage.setItem("guest_cart", JSON.stringify(guestCart));
//       dispatch(setItems(guestCart));
//       toast.success("Item added to cart");
//       return;
//     }

//     dispatch(addCart(cartItem));
//     toast.success("Item added to cart");
//     setSpecialRequest(""); // Reset special request after adding
//   };

//   return (
//     <div className="bg-gray-50 p-6 rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-4">Quick Menu</h2>

//       {/* Special Request Input */}
//       <div className="mb-4">
//         <label className="block mb-2 font-medium">Special Request:</label>
//         <input
//           type="text"
//           placeholder="e.g., Less spicy, extra cheese"
//           value={specialRequest}
//           onChange={(e) => setSpecialRequest(e.target.value)}
//           className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
//         />
//       </div>

//       {/* Menu Items */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {menuItems.slice(0, 6).map((item) => (
//           <div
//             key={item.id}
//             className="bg-white rounded-lg shadow-md overflow-hidden"
//           >
//             <img
//               src={item.image_url}
//               alt={item.name}
//               className="w-full h-36 object-cover"
//             />
//             <div className="p-3">
//               <h3 className="text-lg font-semibold">{item.name}</h3>
//               <p className="text-gray-500 text-sm">{item.categoryName}</p>
//               <p className="text-orange-600 font-bold">${item.price}</p>

//               <Button
//                 onClick={() => handleAddToCart(item)}
//                 className="w-full mt-2 flex items-center justify-center gap-2 bg-orange-500 text-white hover:bg-orange-600"
//               >
//                 Add to Cart <PlusCircle className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Shortcut to Full Menu Page */}
//       <div className="mt-4 text-center">
//         <Button
//           onClick={() => (window.location.href = "/menu")}
//           className="bg-gray-500 text-white hover:bg-gray-600"
//         >
//           View Full Menu
//         </Button>
//       </div>
//     </div>
//   );
// }
