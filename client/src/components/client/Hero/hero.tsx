"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1600",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1600",
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={images[current]}
          alt="restaurant"
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-left px-8 max-w-2xl md:ml-20">
        <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight">
          Taste the <span className="text-orange-500">Difference...</span>
        </h1>
        <p className="mt-4 text-base md:text-xl text-gray-200">
          Discover authentic flavors, crafted with love by our expert chefs, in
          a warm and welcoming atmosphere.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4">
          <Button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full">
            Explore Menu
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-full">
            Book a Table
          </Button>
        </div>

        {/* Image Select Dots */}
        <div className="mt-8 flex gap-3 justify-center md:justify-start">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                current === i ? "bg-orange-500 scale-110" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
