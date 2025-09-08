import MenuSection from "@/components/custom/Menu/menu";
import Navbar from "@/components/custom/Navbar/navbar";
import ServicesSection from "@/components/custom/Service/service";
import Testimonials from "@/components/custom/Testimonials/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <ServicesSection />
      <MenuSection />
      <Testimonials />
    </>
  );
}
