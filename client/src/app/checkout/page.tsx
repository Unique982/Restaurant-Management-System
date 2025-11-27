"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Truck, Coffee, Utensils, ChevronRight } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import toast from "react-hot-toast";
import { fetchCart } from "@/lib/store/customer/cart/cartSlice";
import {
  clearCheckout,
  ICheckoutForm,
  orderItems,
  verifyPayment,
} from "@/lib/store/customer/checkout/checkoutSlice";
import {
  OrderType,
  PaymentMethod,
} from "@/lib/store/admin/orders/orders.types";
import { getTables } from "@/lib/store/admin/tables/tableSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { data: tablesData } = useAppSelector((state) => state.tables);
  const { user } = useAppSelector((state) => state.auth);
  const { khaltiUrl, status } = useAppSelector((state) => state.checkout);

  const [datas, setData] = useState<ICheckoutForm & { table_id?: number }>({
    name: "",
    phone: "",
    email: "",
    delivery_address: "",
    city: "",
    zip_code: "",
    payment_method: PaymentMethod.Cash,
  });

  const [orderType, setOrderType] = useState<OrderType>(OrderType.Delivery);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.Cash
  );
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(getTables());
  }, [dispatch]);

  // subtotal, delivery, total
  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const deliveryFee = orderType === OrderType.Delivery ? 100 : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData({
      ...datas,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to place order");
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    const itemsData = cartItems.map((item) => ({
      menu_item_id: item.id,
      quantity: item.quantity,
    }));

    const finalPayload = {
      ...datas,
      order_type: orderType,
      payment_method: paymentMethod,
      totalAmount: total,
      items: itemsData,
    };

    const res: any = await dispatch(orderItems(finalPayload));
  };
  const handleKhaltiPay = () => {
    if (!khaltiUrl) return;
    window.location.href = khaltiUrl;
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

        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-8"
        >
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
                    value={datas.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <Input
                    name="email"
                    type="email"
                    placeholder="uniquedeveloper@gmail.com"
                    value={datas.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <Input
                    name="phone"
                    placeholder="+977 98XXXXXXXX"
                    value={datas.phone}
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
                      key: OrderType.Delivery,
                      icon: <Truck className="w-5 h-5" />,
                      label: "Delivery",
                    },
                    // {
                    //   key: OrderType.DineIn,
                    //   icon: <Utensils className="w-5 h-5" />,
                    //   label: "Dine-In",
                    // },
                  ].map(({ key, icon, label }) => (
                    <button
                      key={key}
                      type="button"
                      // onClick={() => {
                      //   setOrderType(key);
                      //   if (key !== OrderType.DineIn)

                      // }}
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
                {orderType === OrderType.Delivery && (
                  <div className="space-y-3 mt-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">
                        Address
                      </p>
                      <Input
                        name="delivery_address"
                        placeholder="Street, House No."
                        value={datas.delivery_address}
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
                          value={datas.city}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                          ZIP Code
                        </p>
                        <Input
                          name="zip_code"
                          placeholder="44600"
                          value={datas.zip_code}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
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
                {/* ... Order Summary Content is Correct ... */}
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
                      name="payment_method"
                      checked={paymentMethod === PaymentMethod.Khalti}
                      onChange={() => setPaymentMethod(PaymentMethod.Khalti)}
                    />
                    <span>Pay with Khalti</span>
                  </label>
                  {/* <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === PaymentMethod.Cash}
                      onChange={() => setPaymentMethod(PaymentMethod.Cash)}
                    />
                    <span>Cash on Delivery</span>
                  </label> */}
                </div>

                {paymentMethod === PaymentMethod.Khalti && (
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#4C6EF5] text-white rounded-xl w-full hover:bg-[#3b5bdb] transition"
                  >
                    <img
                      src="https://blog.khalti.com/wp-content/uploads/2021/01/khalti-icon.png"
                      alt="Khalti"
                      className="w-5 h-5"
                    />
                    Pay with Khalti
                  </button>
                )}
                <Button
                  type="submit" // 💡 Submit the form for all cases
                  className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
                  onClick={() => handleSubmit}
                >
                  Place Order (Rs. {total})
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
}
