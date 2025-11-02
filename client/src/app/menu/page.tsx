// "use client";

// import { useEffect, useState } from "react";
// import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
// import Navbar from "@/components/client/Navbar/navbar";
// import { getMenuItem } from "@/lib/store/admin/menuItems/menuItemSlice";

// export default function MenuPage() {
//   const dispatch = useAppDispatch();
//   const { menuDatas } = useAppSelector((state) => state.menuItems);

//   // Filters
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [minPrice, setMinPrice] = useState<number>(0);
//   const [maxPrice, setMaxPrice] = useState<number>(100);

//   useEffect(() => {
//     dispatch(getMenuItem());
//   }, [dispatch]);

//   // // Filter logic
//   // const filteredMenu = menuDatas.filter((item) => {
//   //   const matchCategory = selectedCategory
//   //     ? item.category === selectedCategory
//   //     : true;
//   //   const matchPrice = item.price >= minPrice && item.price <= maxPrice;
//   //   return matchCategory && matchPrice;
//   // });

//   return (
//     <>
//       <Navbar />

//       {/* Hero / Banner */}
//       <section className="relative h-80 w-full bg-orange-100 flex items-center justify-center text-center px-4">
//         <div>
//           <h1 className="text-4xl sm:text-5xl font-bold text-orange-700 mb-2">
//             Our Menu
//           </h1>
//           <p className="text-lg sm:text-xl text-gray-700">
//             Explore our delicious selection of dishes, from starters to
//             desserts.
//           </p>
//         </div>
//       </section>

//       {/* Main Section with Sidebar */}
//       <section className="bg-gray-50 py-12">
//         <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <aside className="w-full lg:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               Filter Menu
//             </h2>

//             {/* Category Filter */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
//               <ul className="space-y-2">
//                 {["All", "Starters", "Main Course", "Desserts", "Drinks"].map(
//                   (cat) => (
//                     <li key={cat}>
//                       <button
//                         className={`w-full text-left px-3 py-2 rounded transition ${
//                           selectedCategory === cat ||
//                           (cat === "All" && !selectedCategory)
//                             ? "bg-orange-600 text-white"
//                             : "hover:bg-orange-100 text-gray-700"
//                         }`}
//                         onClick={() =>
//                           setSelectedCategory(cat === "All" ? null : cat)
//                         }
//                       >
//                         {cat}
//                       </button>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>

//             {/* Price Filter */}
//             <div>
//               <h3 className="font-semibold text-gray-700 mb-2">
//                 Price Range ($)
//               </h3>
//               <div className="flex items-center gap-3">
//                 <input
//                   type="number"
//                   value={minPrice}
//                   onChange={(e) => setMinPrice(Number(e.target.value))}
//                   className="w-1/2 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="Min"
//                 />
//                 <input
//                   type="number"
//                   value={maxPrice}
//                   onChange={(e) => setMaxPrice(Number(e.target.value))}
//                   className="w-1/2 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   placeholder="Max"
//                 />
//               </div>
//             </div>
//           </aside>

//           {/* Menu Items */}
//           <div className="w-full lg:w-3/4">

//               <p className="text-center text-gray-500 text-lg">
//                 No menu items found for selected filters.
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

//                   <div
//                     key={item.id}
//                     className="bg-white rounded-lg shadow hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
//                   >
//                     <img
//                       src={item.image_url}
//                       alt={item.name}
//                       className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
//                     />
//                     <div className="p-4">
//                       <h3 className="text-lg font-semibold text-gray-800">
//                         {item.name}
//                       </h3>
//                       <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                         {item.description}
//                       </p>
//                       <p className="text-orange-600 font-bold mt-2">
//                         ${item.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
