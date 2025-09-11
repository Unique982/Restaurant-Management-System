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
