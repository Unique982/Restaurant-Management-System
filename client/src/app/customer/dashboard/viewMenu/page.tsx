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
// src/app/notifications/page.tsx
"use client";

import Link from "next/link";
import {
  ChevronLeft,
  Bell,
  Settings,
  Search,
  Filter,
  BarChart,
  Ticket,
  MessageSquare,
  Users,
} from "lucide-react";

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  type: string;
  time: string;
  status: "read" | "unread";
}

const notifications: Notification[] = [
  {
    id: "1",
    icon: <Ticket size={18} className="text-blue-500" />,
    title: "New Ticket Assigned",
    description: "You have been assigned to ticket #1234 - Website Redesign",
    type: "Ticket",
    time: "5 minutes ago",
    status: "unread",
  },
  {
    id: "2",
    icon: <MessageSquare size={18} className="text-green-500" />,
    title: "New Message",
    description:
      "Sarah Johnson sent you a message in the Website Redesign project",
    type: "Message",
    time: "1 hour ago",
    status: "unread",
  },
  {
    id: "3",
    icon: <Users size={18} className="text-purple-500" />,
    title: "Team Update",
    description: "New team member John Smith has joined the project",
    type: "Team",
    time: "2 hours ago",
    status: "read",
  },
  {
    id: "4",
    icon: <Ticket size={18} className="text-blue-500" />,
    title: "Ticket Status Update",
    description: "Ticket #1235 - Bug Fix has been marked as completed",
    type: "Ticket",
    time: "3 hours ago",
    status: "read",
  },
  {
    id: "5",
    icon: <MessageSquare size={18} className="text-green-500" />,
    title: "New Message",
    description: "Michael Brown mentioned you in a comment on ticket #1236",
    type: "Message",
    time: "5 hours ago",
    status: "read",
  },
  {
    id: "6",
    icon: <Users size={18} className="text-purple-500" />,
    title: "Team Update",
    description: "Project deadline has been updated to June 15, 2024",
    type: "Team",
    time: "1 day ago",
    status: "read",
  },
  {
    id: "7",
    icon: <Ticket size={18} className="text-blue-500" />,
    title: "New Ticket Created",
    description: "A new ticket has been created: #1237 - API Integration",
    type: "Ticket",
    time: "1 day ago",
    status: "read",
  },
  {
    id: "8",
    icon: <MessageSquare size={18} className="text-green-500" />,
    title: "New Message",
    description:
      "Emily Davis shared a document in the Website Redesign project",
    type: "Message",
    time: "2 days ago",
    status: "read",
  },
];

export default function NotificationsPage() {
  const markAllRead = () => {
    notifications.forEach((n) => (n.status = "read"));
  };
  return (
    <div className="bg-white  rounded-xl  w-full max-w-8xl p-6 sm:p-8">
      <div className="flex items-center justify-between  pb-4 mb-6">
        <Link
          href="/dashboard"
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h1>
        <p className="text-gray-600 text-sm">
          Stay updated with your latest activities and messages
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            onClick={markAllRead}
          >
            <Bell size={16} className="mr-1" />
            Mark All as Read
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Notification
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {notifications.map((notification) => (
            <tr
              key={notification.id}
              className={notification.status === "unread" ? "bg-blue-50" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-3 bg-gray-200">
                    <Bell size={18} className="text-gray-700" />
                    {notification.status === "unread" && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-1 ring-white"></span>
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-sm font-medium ${
                        notification.status === "unread"
                          ? "text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      {notification.description}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {notification.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
