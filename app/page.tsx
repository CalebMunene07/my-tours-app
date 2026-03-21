import HeroSection from "@/components/HeroSection";
import SafariSearchBar from "@/components/Safarisearchbar";
import FeaturedTours from "@/components/FeaturedTours";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Partners from "../components/Partners";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <SafariSearchBar />
      <FeaturedTours />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
      <Partners />
    </main>
  );
}