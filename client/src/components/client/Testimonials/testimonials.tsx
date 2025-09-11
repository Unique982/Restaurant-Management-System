import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon, Section } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ram Brd Nepal",
      image: "/sophia.jpg",
      position: "Frontend Developer",
      review:
        "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides. Their curated selection of hotels is unmatched.",
      rating: 4,
    },
    {
      name: "Hari Brd Nepal",
      image: "/david.jpg",
      position: "Food Blogger",
      review:
        "The Chicken Biryani was absolutely delicious! Perfectly spiced, aromatic, and served hot. Easily one of the best I've had.",
      rating: 5,
    },
    {
      name: "Prabin Brd Nepal",
      image: "/emily.jpg",
      position: "Traveler",
      review:
        "Tried the Margherita Pizza – thin crust, cheesy, and full of flavor. A must-try for pizza lovers!",
      rating: 4,
    },
    {
      name: "Rajesh Kumar Nepal",
      image: "/rajesh.jpg",
      position: "Food Enthusiast",
      review:
        "The Momo platter was excellent. Freshly steamed, juicy fillings with spicy chutney – reminded me of authentic taste from Nepal.",
      rating: 5,
    },
    {
      name: "Testing Brd Nepal",
      image: "/olivia.jpg",
      position: "Chef",
      review:
        "The Pasta Alfredo was creamy, rich, and satisfying. Portion size was generous and presentation was top-notch.",
      rating: 4,
    },
  ];

  return (
    <section id="services" className="px-4 py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          What Our Customer Say
        </h2>
        <p className="text-gray-600 mt-2">
          Testimonials from our happy customers
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  w-full">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
          >
            {/* Profile */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
                alt=""
                className="w-20 h-20 rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg text-gray-800">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{t.position}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex text-orange-500 mb-3">
              {Array.from({ length: 5 }, (_, idx) => (
                <svg
                  key={idx}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={idx < t.rating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 
                       1.902 0l2.036 6.29h6.607c.969 0 
                       1.371 1.24.588 1.81l-5.35 3.89 
                       2.036 6.29c.3.921-.755 1.688-1.54 
                       1.118L12 17.77l-5.35 3.89c-.784.57-1.838-.197-1.539-1.118l2.036-6.29-5.35-3.89c-.783-.57-.38-1.81.588-1.81h6.606l2.038-6.29z"
                  />
                </svg>
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-600 italic">{t.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
