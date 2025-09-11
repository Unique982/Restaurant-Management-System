import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar, Clock, User, Users } from "lucide-react";

export default function ResrvationSection() {
  return (
    <>
      <section id="services" className="px-4 py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Reservation</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Book your table easily with our online reservation system and enjoy
            a delightful dining experience with your loved ones.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Info */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Reserve?
            </h3>
            <p className="text-gray-600 mb-6">
              Enjoy hassle-free dining with guaranteed seating. Perfect for
              family gatherings, special occasions, or business meetings.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-orange-600" /> Flexible Date
                Selection
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" /> Choose Your
                Preferred Time
              </li>
              <li className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" /> Book for Family or
                Group
              </li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
              Book a Table
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Reserve your spot and enjoy a delightful dining experience with
              us.
            </p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" />

                <Input type="tel" placeholder="Phone Number" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input type="date" />
                <Input type="time" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Table Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="window">Window Side</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="vip">VIP Room</SelectItem>
                    <SelectItem value="family">Family Hall</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="number" placeholder="Number of Guests" min="1" />
              </div>
              <Textarea placeholder="Additional Message" />

              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Book Now
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
