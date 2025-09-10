import AboutSection from "@/sections/About/about";
import BlogSection from "@/sections/Blog/blog";
import ContactSection from "@/sections/Contact/contact";
import Footer from "@/sections/Footer/footer";
import GallerySection from "@/sections/Gallery/gallery";
import HeroSection from "@/sections/Hero/hero";
import MenuSection from "@/sections/Menu/menu";
import Navbar from "@/sections/Navbar/navbar";
import ReservationSection from "@/sections/Reservation/reservation";
import ServiceSection from "@/sections/Service/service";
import Testimonials from "@/sections/Testimonials/testimonials";
import { Contact } from "lucide-react";

export default function Home() {
  return (
    <>
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
