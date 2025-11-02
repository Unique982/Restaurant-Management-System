"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchGallery } from "@/lib/store/image/gallerySlice";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
export default function GallerySection() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.gallery);
  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);
  return (
    <>
      <section id="gallery" className="px-4 py-20 bg-white">
        <div className="container mx-auto max-w-6xl mb-12">
          {/* Top Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10">
            Gallery Section
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
          {data.slice(0, 8).map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow hover:shadow-xl transition-all durations-300"
            >
              <Image
                src={image.image}
                alt={`No Image ${index + 1}`}
                width={700}
                height={224}
                className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ width: "100%", height: "auto" }}
              />

              <div className="absolute top-4 right-4 bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {new Date(image.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <a
            href="/gallery"
            className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition"
          >
            View More
            <ArrowRight className="w-5 h-5 inline-block" />
          </a>
        </div>
      </section>
    </>
  );
}
