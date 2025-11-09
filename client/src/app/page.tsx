"use client";
import AboutSection from "@/components/client/About/about";
import BlogSection from "@/components/client/Blog/blog";
import ContactSection from "@/components/client/Contact/contact";
import Footer from "@/components/client/Footer/footer";
import GallerySection from "@/components/client/Gallery/gallery";
import HeroSection from "@/components/client/Hero/hero";
import MenuSection from "@/components/client/Menu/menu";
import Navbar from "@/components/client/Navbar/navbar";

import ReservationSection from "@/components/client/Reservation/reservation";
import ServiceSection from "@/components/client/Service/service";
import Testimonials from "@/components/client/Testimonials/testimonials";
import LoadingOverlay from "@/components/loading/loader";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch or API call
    const timer = setTimeout(() => setLoading(false), 2000); // 2 sec loading
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <LoadingOverlay loading={loading} />

      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ServiceSection />
      <GallerySection />
      <ReservationSection />
      <Testimonials />
      <BlogSection />
      <ContactSection />
      <Footer />
    </>
  );
}
