"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addContactUs } from "@/lib/store/contactUs/contactSlice";
import { IContactUsPost } from "@/lib/store/contactUs/contactSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Phone, Mail, MapPin, Clock, Link } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
export default function ContactSection() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.contact);
  const [contact, setContactData] = useState<IContactUsPost>({
    username: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContactData({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(addContactUs(contact));
    if (result.success) {
      toast.success("Message sent successfully!");
      setContactData({ username: "", email: "", phoneNumber: "", message: "" });
    } else {
      toast.error(result.message || "Failed to send message!");
    }
  };
  return (
    <>
      <section id="services" className="px-4 py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-center text-gray-600 mb-8">
            Get in touch with us for reservations, inquiries, or just to say hi!{" "}
            <br />
            We are always ready to serve you delicious meals and a wonderful
            experience.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-sm flex flex-col gap-8">
            <h3 className="text-2xl font-semibold">Restaurant Info...</h3>
            <ul className="space-y-3 text-black">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-900" />
                Kathmandu Nepal
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-900" />
                +977-9864728224
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-900" />
                uniqueneupane153@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-900" /> Sun - Fri : 09:00 AM
                - 11:00 PM
              </li>
            </ul>
            <div className="w-full h-64 rounded overflow-hidden shadow mt-2">
              <iframe
                title="Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.123456789!2d85.3239!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190f0b123456%3A0xabcdef123456789!2sKathmandu!5e0!3m2!1sen!2snp!4v1690000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="lg:w-1/2 bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold mb-4">Send a Message..</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Label>Username:</Label>
              <Input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your username"
                onChange={handleChange}
                name="username"
                value={contact.username}
              />
              <Label>Email:</Label>
              <Input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
                name="email"
                value={contact.email}
                onChange={handleChange}
              />
              <Label>Phone No:</Label>
              <Input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={contact.phoneNumber}
                onChange={handleChange}
              />
              <Label>Message</Label>
              <Textarea
                className="w-full p-3 border border-gray-300 rounded h-32 focus:outline-none focus:ring-2 focus:ring-organe-500"
                placeholder="Write message..."
                name="message"
                value={contact.message}
                onChange={handleChange}
              ></Textarea>
              <Button
                className="bg-orange-700 text-white  px-6 py-3 rounded hover:bg-orange-600 transition-colors duration-300"
                type="submit"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
