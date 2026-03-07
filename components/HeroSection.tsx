"use client"; // Required for hooks

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  // 1. List your images from the public folder here
  const images = [
    "/hero-safari.jpg", 
    "/hero-safari1.jpeg", 
    "/hero-safari2.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Setup the timer for the slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Changes every 5 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section id="home" className="relative h-screen min-h-150 flex items-center justify-center overflow-hidden">
      {/* 3. Background Image Slideshow */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`African safari view ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0} 
          />
        </div>
      ))}
      
      {/* Overlay - Stays on top of the images */}
      <div className="absolute inset-0 bg-linear-to-b from-green-900/20 via-transparent to-white/10" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
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

      {/* Optional: Slide Indicators (Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 w-8 transition-all ${i === currentIndex ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;