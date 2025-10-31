"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Truck, Coffee, Utensils, ChevronRight } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import {
  fetchCart,
  updateCart,
  deleteCart,
} from "@/lib/store/customer/cart/cartSlice";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    tableNumber: "",
  });

  const [orderType, setOrderType] = useState<
    "delivery" | "takeaway" | "dinein"
  >("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "khalti">("cod");

  // Fetch cart on mount
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // subtotal, delivery, total
  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const deliveryFee = orderType === "delivery" ? 50 : 0;
  const total = subtotal + deliveryFee;

  // Form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Cart item quantity update
  const handleIncrease = (id: number, qty: number) =>
    dispatch(updateCart({ id, quantity: qty + 1 }));
  const handleDecrease = (id: number, qty: number) => {
    if (qty <= 1) return;
    dispatch(updateCart({ id, quantity: qty - 1 }));
  };
  const handleDelete = (id: number) => dispatch(deleteCart(id));

  // Place order
  const handlePlaceOrder = () => {
    if (!user) {
      toast.error("Please login to place order");
      router.push("/login");
      return;
    }

    const payload = { ...form, orderType, paymentMethod, cartItems, total };
    console.log("Order placed:", payload);
    toast.success("Order placed successfully!");
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <nav className="text-sm text-gray-500 flex items-center gap-2">
            <span>Cart</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span>Information</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-orange-600">Payment</span>
          </nav>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Full Name</p>
                  <Input
                    name="name"
                    placeholder="e.g. Unique Neupane"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <Input
                    name="email"
                    type="email"
                    placeholder="uniquedeveloper@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <Input
                    name="phone"
                    placeholder="+977 98XXXXXXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* ORDER TYPE */}
            <Card className="rounded-2xl shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Order Option
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      key: "delivery",
                      icon: <Truck className="w-5 h-5" />,
                      label: "Delivery",
                    },
                    {
                      key: "takeaway",
                      icon: <Coffee className="w-5 h-5" />,
                      label: "Takeaway",
                    },
                    {
                      key: "dinein",
                      icon: <Utensils className="w-5 h-5" />,
                      label: "Dine-In",
                    },
                  ].map(({ key, icon, label }) => (
                    <button
                      key={key}
                      onClick={() => setOrderType(key as any)}
                      className={`flex flex-col items-center justify-center gap-1 border rounded-xl py-3 transition-all ${
                        orderType === key
                          ? "bg-orange-600 text-white border-orange-600 shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:border-orange-400"
                      }`}
                    >
                      {icon}
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>

                {/* Conditional Fields */}
                {orderType === "delivery" && (
                  <div className="space-y-3 mt-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">
                        Address
                      </p>
                      <Input
                        name="address"
                        placeholder="Street, House No."
                        value={form.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                          City
                        </p>
                        <Input
                          name="city"
                          placeholder="Kathmandu"
                          value={form.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                          ZIP Code
                        </p>
                        <Input
                          name="zip"
                          placeholder="44600"
                          value={form.zip}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {orderType === "dinein" && (
                  <div className="space-y-1 mt-3">
                    <p className="text-sm font-medium text-gray-700">
                      Table Number
                    </p>
                    <Input
                      name="tableNumber"
                      placeholder="Enter your table number"
                      value={form.tableNumber}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <Card className="rounded-2xl shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cartItems.length === 0 && (
                  <p className="text-gray-500 text-center">
                    Your cart is empty
                  </p>
                )}
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">
                      Rs. {item.price * item.quantity}
                    </p>
                  </div>
                ))}

                <Separator />

                <div className="text-sm space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>Rs. {deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg text-gray-900">
                    <span>Total</span>
                    <span>Rs. {total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PAYMENT */}
            <Card className="rounded-2xl shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "khalti"}
                      onChange={() => setPaymentMethod("khalti")}
                    />
                    <span>Pay with Khalti</span>
                  </label>
                </div>

                {paymentMethod === "khalti" && (
                  <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#4C6EF5] text-white rounded-xl w-full hover:bg-[#3b5bdb] transition">
                    <img
                      src="https://seeklogo.com/images/K/khalti-logo-3A87E6EFC6-seeklogo.com.png"
                      alt="Khalti"
                      className="w-5 h-5"
                    />
                    Pay with Khalti
                  </button>
                )}

                <Button
                  className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
                  onClick={handlePlaceOrder}
                >
                  Place Order (Rs. {total})
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
