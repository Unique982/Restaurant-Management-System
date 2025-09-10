import { ArrowRight } from "lucide-react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",

    date: "2082/05/23",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
  },
  {
    src: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=400&q=80",
    date: "2082/05/23",
  },
];
export default function GallerySection() {
  return (
    <>
      <section id="about" className="px-4 py-20 bg-white">
        <div className="container mx-auto max-w-6xl mb-12">
          {/* Top Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-10">
            Gallery Section
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:grid-cols-4">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow hover:shadow-xl transition-all durations-300"
              >
                <img
                  src={image.src}
                  alt={`No Image${index + 1}`}
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-4 right-4 bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.date}
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
