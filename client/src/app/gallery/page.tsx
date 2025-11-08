"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { fetchGallery } from "@/lib/store/image/gallerySlice";
import Navbar from "@/components/client/Navbar/navbar";
import Footer from "@/components/client/Footer/footer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function GalleryPage() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.gallery);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);
  const handleDownload = (url: string, id: number | string) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Gallery_${id}.jpg`;
        link.click();
      });
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen">
        {/* Banner */}
        <div className="bg-gradient-to-r from-green-200 to-orange-200 py-20">
          <div className="container mx-auto max-w-6xl text-center px-4">
            <h1 className="text-4xl font-bold text-black mb-4">Our Gallery</h1>
            <p className="text-gray-700 text-lg">
              Explore our collection of images. Click on any image to view in
              full size and download.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="container mx-auto  px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* increased gap for better spacing */}
            {data.map((img) => (
              <div
                key={img.id}
                className="relative overflow-hidden rounded-lg  duration-300 cursor-pointer"
              >
                <img
                  src={img.image}
                  alt={`Gallery ${img.id}`}
                  className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300" // height same
                  onClick={() => setSelectedImage(img.image)}
                />

                <button
                  className="absolute top-2 right-2 bg-orange-600 text-white px-4 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(img.image, img.id);
                  }}
                >
                  <Download className="w-4 h-5" />
                </button>
                <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {new Date(img.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Full View"
              className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
            />
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
