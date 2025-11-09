"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";

import Navbar from "@/components/client/Navbar/navbar";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/client/Footer/footer";
import { fectchBlogs } from "@/lib/store/admin/blog/blogSlice";
import Link from "next/link";

export default function GalleryPage() {
  const dispatch = useAppDispatch();
  const { blogData } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fectchBlogs());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 min-h-screen">
        <div className="bg-gradient-to-r from-green-200 to-orange-200 py-20">
          <div className="container mx-auto max-w-6xl text-center px-4">
            <h1 className="text-4xl font-bold text-black mb-4">Our Blog</h1>
            <p className="text-gray-700 text-lg">
              Read our latest posts about recipes, food tips, and restaurant
              news.
            </p>
          </div>
        </div>
        <div className="container mx-auto  px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
            {blogData.length > 0 ? (
              blogData.map((blog, index) => (
                <div
                  className="bg-white rounded-xl overflow-hidden relative group shadow-sm"
                  key={index}
                >
                  <img
                    src={blog.blogImage}
                    alt="No Image"
                    className="w-full h-50 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-700 text-white px-4 py-2 rounded-full text-xs font-semibold">
                    {blog.blogCategory}
                  </div>

                  <div className="p-6">
                    <p className="text-sm text-gary-500 mb-2">
                      {" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {blog.blogTitle.charAt(0).toUpperCase() +
                        blog.blogTitle.slice(1)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {blog.blogDescription.length > 100
                        ? blog.blogDescription.slice(0, 100) + "..."
                        : blog.blogDescription}
                    </p>
                    <Link
                      href={`/blog/${blog.id}`}
                      className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition"
                    >
                      Read
                      <ArrowRight className="w-5 h-5 inline-block" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">
                No blogs found.
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
