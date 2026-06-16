"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { Great_Vibes } from "next/font/google";

const vintage = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setGalleryOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setGalleryOpen(false), 200);
  };

  return (
    <header
      className={`fixed top-10 left-0 w-full z-40 transition-all duration-300 bg-[#f5f0e8] border-b border-gray-200 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo + Brand Name — horizontal side by side */}
        <Link href="/" className="flex flex-row items-center gap-3">
          <Image
            src="/logo.png"
            alt="Wikima Safari Logo"
            width={60}
            height={60}
            priority
            className="shrink-0"
          />
          <span className={`${vintage.className} text-3xl md:text-4xl leading-none`}>
            <span className="text-[#1f4d3a]">Wikima</span>{" "}
            <span className="text-[#db900e]">Safari</span>{" "}
            <span className="text-[#5c3d2e]">Expeditions</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold">

          <Link href="/" className="text-[#1f4d3a] hover:text-[#f59e0b]">
            Home
          </Link>

          <Link href="/tours" className="text-[#1f4d3a] hover:text-[#f59e0b]">
            Tours
          </Link>

          {/* Gallery Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-[#1f4d3a] hover:text-[#f59e0b]">
              Gallery <ChevronDown size={16} className={`transition-transform duration-200 ${galleryOpen ? "rotate-180" : ""}`} />
            </button>

            {galleryOpen && (
              <div className="absolute top-full mt-3 bg-white shadow-lg rounded-lg py-2 w-40 border">
                <Link href="/gallery/photos" className="block px-4 py-2 hover:bg-gray-100 text-[#1f4d3a]">
                  Photos
                </Link>
                <Link href="/gallery/videos" className="block px-4 py-2 hover:bg-gray-100 text-[#1f4d3a]">
                  Videos
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="text-[#1f4d3a] hover:text-[#f59e0b]">
            Contact
          </Link>

          <Link
            href="/booking"
            className="bg-[#1f4d3a] text-[#dd9210] px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Book Now
          </Link>

        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-[#1f4d3a]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#f5f0e8] border-t shadow-md">
          <nav className="flex flex-col p-5 gap-4 font-semibold text-[#1f4d3a]">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/tours" onClick={() => setMenuOpen(false)}>Tours</Link>

            <div>
              <button
                onClick={() => setGalleryOpen(!galleryOpen)}
                className="flex items-center justify-between w-full"
              >
                Gallery <ChevronDown size={16} className={`transition-transform duration-200 ${galleryOpen ? "rotate-180" : ""}`} />
              </button>
              {galleryOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-2">
                  <Link href="/gallery/photos" onClick={() => setMenuOpen(false)}>Photos</Link>
                  <Link href="/gallery/videos" onClick={() => setMenuOpen(false)}>Videos</Link>
                </div>
              )}
            </div>

            <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            <Link
              href="/booking"
              onClick={() => setMenuOpen(false)}
              className="bg-[#f59e0b] text-white text-center py-2 rounded-lg"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
