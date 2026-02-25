import HeroSection from "@/components/HeroSection";
import FeaturedTours from "@/components/FeaturedTours";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

// Note: We removed Navbar and Footer because they live in layout.tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedTours />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </main>
  );
}