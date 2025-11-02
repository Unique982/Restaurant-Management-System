import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Link,
} from "lucide-react";

const QuickLinks = ["Home", "Menu", "Services", "Events", "Gallery"];
const services = [
  "Food Deliver",
  "Restaurant & Dining",
  "Event Catering",
  "Online Reservations",
  "Private Parties",
];

export default function Footer() {
  return (
    <>
      <footer className="relative bg-white text-gray-200 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
          {/* contain about section */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">
              About The 90’s Restaurant & Bar
            </h2>
            <p className="mb-4 leading-relaxed opacity-90 text-black">
              Step back in time and relive the golden era at The 90’s Restaurant
              & Bar — where nostalgia meets flavor. We blend the vibrant spirit
              of the 90s with modern dining to create an unforgettable
              experience. From delicious dishes crafted with passion to
              refreshing drinks served with style, every moment here is a
              celebration of good food, great music, and timeless vibes. Come
              for the taste. Stay for the memories. ✨
            </p>
            {/* socauil link */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-10 h-10 bg-green-800 flex items-center justify-center rounded-full text-white hover:bg-green-700 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-800 flex items-center justify-center rounded-full text-white hover:bg-green-700 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-800 flex items-center justify-center rounded-full text-white hover:bg-green-700 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-green-800 flex items-center justify-center rounded-full text-white hover:bg-green-700 transition"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Quick */}
          <div>
            <h3 className="text-xl text-black mb-6 border-b-3 border-amber-400 pb-2">
              Quick Links
            </h3>
            {/* Links */}
            <ul className="space-y-4 text-black">
              {QuickLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center gap-2 opacity-90 hover:opacity-100 hover:translate-x-1 transition"
                    >
                      <ChevronRight className="w-4 h-4  text-gray-900 " />
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Our Service */}
          <div>
            <h3 className="text-xl text-black mb-6 border-b-3 border-amber-400 pb-2">
              Our Services
            </h3>
            <ul className="space-y-4 text-black">
              {services.map((service, index) => {
                return (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center gap-2 hover:opacity-90 hover:translate-x-1 transition"
                    >
                      <ChevronRight className="w-4 h-4  text-gray-900 " />
                      {service}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Contact Us  */}
          <div>
            <h3 className="text-xl text-black mb-6 border-b-3 border-amber-400 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4 text-black">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-900" />
                Kathmandu Nepal
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-900" />
                +977-9864728224
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-900" />
                uniqueneupane153@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-900" /> Sun - Fri : 09:00 AM
                - 11:00 PM
              </li>
            </ul>
          </div>
        </div>
        {/* Footer copy buttom */}
        <div className="mt-10 pt-4 text-center text-gray-500">
          ©{new Date().getFullYear()}
          <a> Unique Neupane</a>.All rights reserved
        </div>
      </footer>
    </>
  );
}
