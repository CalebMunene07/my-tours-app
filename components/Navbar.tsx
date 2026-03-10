"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Image as ImageIcon, Video, Map as MapIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen]               = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [mobileGallery, setMobileGallery] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Close gallery dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (galleryRef.current && !galleryRef.current.contains(e.target as Node))
        setGalleryOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-4 group">
          <Image
            src={logo}
            alt="Wikima Safari Logo"
            height={72}
            className="w-auto h-16 object-contain transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-bold text-[#4B5320] tracking-tight">WIKIMA</span>
            <span className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.25em] -mt-1">Safari Expeditions</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-widest uppercase">Home</Link>

          {/* Tours with Gallery dropdown */}
          <div className="relative" ref={galleryRef}>
            <button
              onClick={() => setGalleryOpen(!galleryOpen)}
              className="flex items-center gap-1 text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-widest uppercase"
            >
              Tours <ChevronDown size={13} className={`transition-transform duration-200 ${galleryOpen ? "rotate-180" : ""}`}/>
            </button>

            {galleryOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 z-10"/>

                <div className="relative z-20 p-2">
                  <Link href="/tours" onClick={() => setGalleryOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f8f0] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-[#4B5320]/10 flex items-center justify-center group-hover:bg-[#4B5320] transition-colors">
                      <MapIcon size={14} className="text-[#4B5320] group-hover:text-white transition-colors"/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">All Tours</p>
                      <p className="text-[10px] text-gray-400">Browse safaris</p>
                    </div>
                  </Link>

                  <div className="h-px bg-gray-100 mx-3 my-1"/>

                  <Link href="/gallery/photos" onClick={() => setGalleryOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f8f0] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <ImageIcon size={14} className="text-amber-600 group-hover:text-white transition-colors"/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Photo Gallery</p>
                      <p className="text-[10px] text-gray-400">Safari photos</p>
                    </div>
                  </Link>

                  <Link href="/gallery/videos" onClick={() => setGalleryOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f8f0] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <Video size={14} className="text-blue-600 group-hover:text-white transition-colors"/>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">Video Gallery</p>
                      <p className="text-[10px] text-gray-400">Safari videos</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/about"   className="text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-widest uppercase">About</Link>
          <Link href="/contact" className="text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-widest uppercase">Contact</Link>
          <Link href="/admin"   className="text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-widest uppercase">Admin</Link>

          <Link href="/tours"
            className="bg-[#4B5320] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#3a411a] transition-all shadow-md hover:shadow-lg active:scale-95">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#4B5320] p-2 hover:bg-gray-100 rounded-lg transition-colors">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-8 space-y-2 shadow-2xl">
          <Link href="/" onClick={() => setOpen(false)} className="block text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2">Home</Link>

          {/* Mobile Tours + Gallery */}
          <div>
            <button
              onClick={() => setMobileGallery(!mobileGallery)}
              className="w-full flex items-center justify-between text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2"
            >
              Tours <ChevronDown size={16} className={`transition-transform ${mobileGallery?"rotate-180":""}`}/>
            </button>
            {mobileGallery && (
              <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#4B5320]/20 pl-4">
                <Link href="/tours" onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#4B5320] font-semibold py-2 text-sm">
                  <MapIcon size={14}/> All Tours
                </Link>
                <Link href="/gallery/photos" onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#4B5320] font-semibold py-2 text-sm">
                  <ImageIcon size={14}/> Photo Gallery
                </Link>
                <Link href="/gallery/videos" onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#4B5320] font-semibold py-2 text-sm">
                  <Video size={14}/> Video Gallery
                </Link>
              </div>
            )}
          </div>

          <Link href="/about"   onClick={() => setOpen(false)} className="block text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="block text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2">Contact</Link>
          <Link href="/admin"   onClick={() => setOpen(false)} className="block text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2">Admin</Link>

          <div className="pt-4">
            <Link href="/tours" onClick={() => setOpen(false)}
              className="block bg-[#4B5320] text-white px-6 py-4 rounded-xl text-center font-bold tracking-widest uppercase shadow-lg">
              Book Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;