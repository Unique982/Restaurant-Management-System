"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { aboutFetch } from "@/lib/store/admin/about/aboutSlice";
import { useParams } from "next/navigation";
import Navbar from "@/components/client/Navbar/navbar";
import Footer from "@/components/client/Footer/footer";

export default function AboutDetails() {
  const dispatch = useAppDispatch();
  const { about, status } = useAppSelector((state) => state.about);

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  useEffect(() => {
    if (id) dispatch(aboutFetch());
  }, [dispatch, id]);

  const singleAbout = about && about.length > 0 ? about[0] : null;

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-12 text-center md:text-left text-gray-900">
            {singleAbout?.aboutTitle}
          </h1>

          <div className="text-lg md:text-xl text-justify text-gray-700 mb-8">
            <p>
              {(singleAbout?.aboutDescription?.split(" ") || [])
                .slice(0, 200)
                .join(" ")}
              ...
            </p>
          </div>

          <div className="mb-8">
            <img
              src={
                about[0].aboutImage ||
                "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400"
              }
              alt="About Restaurant"
              className="rounded-2xl shadow-lg w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover"
            />
          </div>

          <div className="text-lg md:text-xl text-justify text-gray-700">
            <p>
              {(singleAbout?.aboutDescription?.split(" ") || [])
                .slice(200)
                .join(" ")}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
