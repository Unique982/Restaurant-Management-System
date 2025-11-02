"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchServices } from "@/lib/store/services/servicesSlice";
// import { Truck, Coffee, Music, Bed, Calendar, Smile } from "lucide-react";
import { useEffect } from "react";

export default function ServiceSection() {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.services);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  return (
    <>
      <section id="services" className="px-4 py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <p className="text-gray-600 mt-2">
            Discover the wide range of services we provide to make your
            experience better
          </p>
        </div>
        {/* Section Header */}

        {/* Card section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((service) => (
            <Card key={service.id}>
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4 shadow-sm rounded-b-full hover:shadow-xl transition-shadow duration-300 justify-center">
                  {service.serviceIcon ? (
                    <img
                      src={service.serviceIcon}
                      alt={service.serviceTitle}
                      className="w-16 h-16 p-2 object-contain"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  )}
                </div>
                <CardTitle>{service.serviceTitle}</CardTitle>
                <CardDescription>{service.serviceDescription}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
