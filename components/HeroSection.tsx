"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const TYPING_PHRASES = [
  "Discover the Wild",
  "Explore East Africa",
  "Live the Safari Dream",
  "Find Your Adventure",
];

const TypingText = () => {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const current = TYPING_PHRASES[phraseIndex];

    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
          timeoutRef.current = setTimeout(tick, 80);
        } else {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
          timeoutRef.current = setTimeout(tick, 45);
        } else {
          setIsDeleting(false);
          setPhraseIndex((i) => (i + 1) % TYPING_PHRASES.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? 45 : 80);
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-0.5 h-[1em] bg-white align-middle ml-0.5 animate-blink" />
    </span>
  );
};

const HeroSection = () => {
  const images = [
    "/hero-safari.jpg",
    "/hero-safari1.jpeg",
    "/hero-safari2.jpeg",
    "/abardare.jpg",
    "/lakipia.jpg",
    "/olepajeta.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.75s step-end infinite;
        }
      `}</style>

      <section
        id="home"
        className="relative h-screen min-h-150 overflow-hidden"
      >
        {/* Background Image Slideshow */}
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-green-900/20 via-transparent to-black/30" />

        {/* TOP — Kenya & East Africa label */}
        <div className="absolute top-6 left-0 right-0 z-10 text-center">
          <p className="text-[#a3b86c] font-bold tracking-[0.3em] uppercase text-xs drop-shadow-sm">
            Kenya &amp; East Africa
          </p>
        </div>

        {/* CENTER — Typing heading */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1 className="font-mono text-xl md:text-2xl font-semibold text-white leading-tight drop-shadow-md tracking-wide min-h-8 text-center px-6">
            <TypingText />
          </h1>
        </div>

        {/* BOTTOM — Buttons + subtext */}
        <div className="absolute bottom-16 left-0 right-0 z-10 text-center px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
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
          <p className="text-white/70 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed tracking-wide drop-shadow-sm">
            Exceptional safari experiences, luxury holidays, and unforgettable
            travel solutions across Kenya and East Africa.
          </p>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-8 transition-all ${
                i === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;
