"use client";

import Footer from "@/components/client/Footer/footer";
import Navbar from "@/components/client/Navbar/navbar";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fectchBlogs } from "@/lib/store/admin/blog/blogSlice";

export default function BlogDetails() {
  const dispatch = useAppDispatch();
  const { blogData } = useAppSelector((store) => store.blog);
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [singleBlog, setSingleBlog] = useState<(typeof blogData)[0] | null>(
    null
  );

  useEffect(() => {
    if (id) {
      dispatch(fectchBlogs()); // fetch all blogs (or create separate fetchSingleBlog)
    }
  }, [dispatch, id]);

  // Select single blog from array
  useEffect(() => {
    if (blogData.length > 0 && id) {
      const found = blogData.find((b) => b.id.toString() === id.toString());
      setSingleBlog(found || null);
    }
  }, [blogData, id]);

  if (!singleBlog) return <p className="text-center py-20">Loading...</p>;

  const shortDescription = singleBlog.blogDescription
    .split(" ")
    .slice(0, 200)
    .join(" ");
  const longDescription = singleBlog.blogDescription
    .split(" ")
    .slice(200)
    .join(" ");

  return (
    <>
      <Navbar />
      <section className="min-h-screen py-16 bg-gradient-to-b from-gray-100 to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-left">
            <a
              href="/blog"
              className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-gray-700"
            >
              ← Back to Blog
            </a>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold mb-6 text-center text-gray-900">
            {singleBlog.blogTitle}
          </h1>

          {/* Short Description */}
          <p className="text-xl sm:text-xl md:text-xl text-gray-700 mb-4 text-justify font-medium">
            {shortDescription}...
          </p>

          {/* Meta */}
          <div className="flex flex-col sm:flex-row justify-center text-gray-500 text-sm sm:text-base font-semibold mb-6 gap-3">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-orange-100">
              {singleBlog.blogCategory}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-orange-100">
              Date: {new Date(singleBlog.createdAt).toLocaleDateString()}
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-orange-100">
              Author: The 90's Restaurant
            </span>
          </div>

          {/* Blog Image */}
          <div className="mb-10">
            <img
              src={singleBlog.blogImage}
              alt={singleBlog.blogTitle}
              className="rounded-3xl shadow-2xl w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover border-4 border-gray-200"
            />
          </div>

          {/* Long Description */}
          <div className="text-xl sm:text-xl md:text-xl text-gray-700 text-justify font-medium leading-relaxed">
            {longDescription}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
