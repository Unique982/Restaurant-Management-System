"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link, PlusCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface menuItemsProps {
  image: string;
  title: string;
  description: string;
  price: string;
}
const menuItems: Record<string, menuItemsProps[]> = {
  Breakfast: [
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      title: "Italian Sauce Mushroom",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 240.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      title: "Salted Fried Chicken",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
      title: "Salted Fried Chicken",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
  ],
  Lunch: [
    {
      image:
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      title: "Fried Potato w/ Garlic",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 180.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      title: "Italian Sauce Mushroom",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
      title: "Salted Fried Chicken",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
  ],
  Dinner: [
    {
      image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400",
      title: "Italian Sauce Mushroom",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 240.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
      title: "Fried Potato w/ Garlic",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 180.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
      title: "Salted Fried Chicken",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
      title: "Salted Fried Chicken",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
      title: "Salted Fried Chicken",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
    {
      image:
        "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=400",
      title: "Salted Fried Chicken",
      description:
        "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
      price: "Rs: 350.50",
    },
  ],
};
type category = "All" | "Breakfast" | "Lunch" | "Dinner";
export default function MenuSection() {
  const [activeCategory, setCategoryActivity] = useState<category>("All");
  const categories: category[] = ["All", "Breakfast", "Lunch", "Dinner"];
  const activityItems =
    activeCategory === "All"
      ? Object.values(menuItems).flat()
      : menuItems[activeCategory] || [];

  return (
    <>
      <section id="services" className="px-4 py-20 bg-white">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800">Our Special Menu</h2>
          <p className="text-gray-600 mt-2">
            Testimonials from our happy customers
          </p>
        </div>
        {/* Button */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setCategoryActivity(cat)}
              className={`px-6 py-2 bg-gray-50  text-white text-1xl hover:bg-gray-100 border text-sm font-semibold transition ${
                activeCategory === cat
                  ? "border-black text-black"
                  : "border-gray-300 text-gray-800"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* menu items */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {activityItems.map((item, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 transition">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-full flex-shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="text-orange-500 font-semibold text-base mt-2">
                    {item.price}
                  </p>
                </div>
                <Button className=" mt-2 bg-orange-600 text-white text-1xl hover:bg-orange-700">
                  Add To Cart <PlusCircle className="w-10 h-10"></PlusCircle>
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <a
            href="/menu"
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
