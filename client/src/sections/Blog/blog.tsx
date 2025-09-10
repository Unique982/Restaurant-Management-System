import { ArrowRight } from "lucide-react";
const blogContent = [
  {
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
    category: "Food",
    title: " Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt cumque quas tempora quisquam qui quis laudantiu massumenda a iste atque.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
    category: "Food",
    title: " Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt cumque quas tempora quisquam qui quis laudantiu massumenda a iste atque.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
    category: "Food",
    title: " Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt cumque quas tempora quisquam qui quis laudantiu massumenda a iste atque.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
    category: "Food",
    title: " Lorem ipsum dolor sit amet.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt cumque quas tempora quisquam qui quis laudantiu massumenda a iste atque.",
  },
];

export default function BlogSection() {
  return (
    <>
      <section id="about" className="px-4  py-20 bg-white">
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
          {blogContent.map((blog, index) => {
            return (
              <div
                className="bg-white rounded-xl overflow-hidden relative group shadow-sm"
                key={index}
              >
                <img
                  src={blog.image}
                  alt="No Image"
                  className="w-full h-50 object-cover"
                />
                <div className="absolute top-4 right-4 bg-orange-700 text-white px-4 py-2 rounded-full text-xs font-semibold">
                  {blog.category}
                </div>

                <div className="p-6">
                  <p className="text-sm text-gary-500 mb-2">{blog.date}</p>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{blog.description}</p>
                  <a
                    href="/product"
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
            href="/product"
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
