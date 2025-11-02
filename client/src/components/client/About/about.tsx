"use client";

import { Button } from "@/components/ui/button";
import { aboutFetch } from "@/lib/store/admin/about/aboutSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { useEffect } from "react";

export default function AboutSection() {
  const dispatch = useAppDispatch();
  const { about } = useAppSelector((state) => state.about);
  useEffect(() => {
    dispatch(aboutFetch());
  }, [dispatch]);
  return (
    <>
      <section id="about" className="px-4 py-20 bg-gray-100">
        <div className="container mx-auto max-w-6xl">
          {/* Top Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10">
            About Us
          </h2>

          {/* Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={
                  about[0]?.aboutImage ||
                  "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400"
                }
                alt="About Restaurant"
                className="rounded-2xl shadow-lg w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
              />
            </div>

            {/* Sub-heading + Paragraph */}
            <div className="text-center md:text-left mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">
                {/* About Our Restaurant */}
                {about[0]?.aboutTitle || "About Our Restaurant"}
              </h3>

              {about[0]?.aboutDescription?.split("\n").map((line, idx) => (
                <p
                  key={idx}
                  className="text-gray-600 mb-4 leading-relaxed text-justify"
                >
                  {line}
                </p>
              ))}
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-6 rounded-b-lg">
                  Learn More
                </Button>

                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-3 py-6 rounded-b-lg">
                  Book a Table
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
