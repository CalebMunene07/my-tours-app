import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/hero-safari.jpg"; 

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen min-h-150 flex items-center justify-center overflow-hidden">
      <Image
        src={heroImage}
        alt="African safari"
        fill
        className="object-cover"
        priority 
      />
      
      {/* CORRECTION: Brighter overlay (changed from black/60 to green/20 for a tinted, brighter feel) */}
      <div className="absolute inset-0 bg-linear-to-b from-green-900/20 via-transparent to-white/10" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* CORRECTION: Army Green text for the subheader */}
        <p className="text-[#4B5320] font-bold tracking-[0.3em] uppercase text-sm mb-4 drop-shadow-sm">
          Kenya & East Africa
        </p>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 drop-shadow-md">
          Discover the Wild
        </h1>
        
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed drop-shadow-sm">
          Exceptional safari experiences, luxury holidays, and unforgettable travel solutions across Kenya and East Africa.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* CORRECTION: Army Green Background (#4B5320) */}
          <Link
            href="/tours"
            className="bg-[#4B5320] text-white px-10 py-4 rounded-sm font-semibold tracking-wider uppercase text-sm hover:bg-[#3a411a] transition shadow-lg"
          >
            Explore Tours
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-10 py-4 rounded-sm font-semibold tracking-wider uppercase text-sm hover:bg-white/20 transition backdrop-blur-sm"
          >
            Plan Your Trip
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;