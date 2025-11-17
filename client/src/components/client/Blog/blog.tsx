"use client";
import { fectchBlogs } from "@/lib/store/admin/blog/blogSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";

export default function BlogSection() {
  const dispatch = useAppDispatch();
  const { blogData } = useAppSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fectchBlogs());
  }, [dispatch]);
  return (
    <>
      <section id="blog" className="px-4  py-20 bg-white">
        <div className="container mx-auto max-w-6xl mb-12">
          {/* Top Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-4">
            Our Blog
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Read our latest posts about recipes, food tips, and restaurant news.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
          {blogData.slice(0, 4).map((blog, index) => {
            return (
              <div
                className="bg-white rounded-xl overflow-hidden relative group shadow-sm"
                key={index}
              >
                <img
                  src={
                    blog.blogImage
                      ? typeof blog.blogImage === "string"
                        ? blog.blogImage
                        : URL.createObjectURL(blog.blogImage)
                      : "/no-image.png"
                  }
                  alt={blog.blogTitle}
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
                  <a
                    href="/blog"
                    className="flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition"
                  >
                    Read
                    <ArrowRight className="w-5 h-5 inline-block" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-6">
          <a
            href="/blog"
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
