import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Truck, Coffee, Music, Bed, Calendar, Smile } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Quick and reliable food delivery to your doorstep.",
    icon: Truck,
    iconColor: "text-gray-800",
    iconSize: "w-16 h-16",
  },
  {
    id: 2,
    title: "Quality Coffee",
    description: "Enjoy freshly brewed coffee with every meal.",
    icon: Coffee,
    iconColor: "text-gray-800",
    iconSize: "w-16 h-16",
  },
  {
    id: 3,
    title: "Live Music",
    description: "Experience live music every weekend at our restaurant.",
    icon: Music,
    iconColor: "text-gray-800",
    iconSize: "w-16 h-16",
  },
  {
    id: 4,
    title: "Comfortable Rooms",
    description: "Stay overnight in our cozy and clean rooms.",
    icon: Bed,
    iconColor: "text-gray-800",
    iconSize: "w-16 h-16",
  },
  {
    id: 5,
    title: "Table Booking",
    description: "Easily book your favorite table online in advance.",
    icon: Calendar,
    iconColor: "text-gray-800",
    iconSize: "w-16 h-16",
  },
  {
    id: 6,
    title: "Customer Satisfaction",
    description: "Our team ensures every guest is happy and satisfied.",
    icon: Smile,
    iconColor: "text-gray-800",
    iconSize: "w-16 h-16",
  },
];
export default function ServiceSection() {
  return (
    <>
      <section id="services" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 mt-2">
            Testimonials from our happy customers
          </p>
        </div>
        {/* Section Header */}

        {/* Card section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id}>
                <CardHeader className="flex flex-col items-center ">
                  <div className="mb-4 shadow-sm rounded-b-full  hover:shadow-xl transition-shadow duration-300 justify-center">
                    <Icon
                      className={`p-2 ${service.iconColor} ${service.iconSize}`}
                    />
                  </div>
                  <CardTitle>Fast Deliver</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
