"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Image as ImageIcon, Video, Map as MapIcon, TreePine, Waves, Mountain, Compass, Building, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TOUR_CATEGORIES = [
  { label: "Bush Safaris",                  icon: <TreePine size={15}/>,       href: "/tours?category=bush-safari",        desc: "Masai Mara, Amboseli, Tsavo & more" },
  { label: "Beach Escapes",                 icon: <Waves size={15}/>,           href: "/tours?category=beach-escape",       desc: "Diani, Malindi, Lamu & Zanzibar" },
  { label: "Mountain & Alpine Hiking",      icon: <Mountain size={15}/>,        href: "/tours?category=mountain-journey",   desc: "Mt Kenya, Kilimanjaro, Aberdare" },
  { label: "Adventure & Wildlife",          icon: <Compass size={15}/>,         href: "/tours?category=adventure-wildlife", desc: "Samburu, Ol Pejeta, Lake Nakuru" },
  { label: "City Safari / Game & Park",     icon: <Building size={15}/>,        href: "/tours?category=city-safari",        desc: "Nairobi Park, Hell's Gate & more" },
  { label: "Lodge Safari & Signature Food", icon: <UtensilsCrossed size={15}/>, href: "/tours?category=lodge-safari",       desc: "Luxury lodges & bush dining" },
];

const navCls = "relative text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-widest uppercase group pb-1";
const bar    = "absolute bottom-0 left-0 h-[2px] w-0 bg-[#4B5320] group-hover:w-full transition-all duration-300";

export default function Navbar() {
  const [open,          setOpen]          = useState(false);
  const [toursOpen,     setToursOpen]     = useState(false);
  const [galleryOpen,   setGalleryOpen]   = useState(false);
  const [mobileTours,   setMobileTours]   = useState(false);
  const [mobileGallery, setMobileGallery] = useState(false);

  const toursRef   = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (toursRef.current   && !toursRef.current.contains(e.target as Node))   setToursOpen(false);
      if (galleryRef.current && !galleryRef.current.contains(e.target as Node)) setGalleryOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <>
      {/* Spacer = TopBar 36px + Navbar ~72px */}
      <div className="h-27" />

      {/* Navbar sits below the 36px TopBar */}
      <nav className="fixed left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" style={{ top: "36px" }}>
        <div className="container mx-auto flex items-center justify-between py-4 px-6">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-4 group">
            <Image src="/assets/logo.png" alt="Wikima Safari Logo" width={72} height={72}
              className="w-auto h-16 object-contain transition-transform duration-300 group-hover:scale-105" priority />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-2xl font-bold text-[#4B5320] tracking-tight">WIKIMA</span>
              <span className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.25em] -mt-1">Safari Expeditions</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={navCls}>Home<span className={bar}/></Link>

            {/* Tours mega dropdown */}
            <div className="relative" ref={toursRef}>
              <button onClick={() => { setToursOpen(v => !v); setGalleryOpen(false); }}
                className={`${navCls} flex items-center gap-1`}>
                Tours
                <ChevronDown size={13} className={`transition-transform duration-200 ${toursOpen ? "rotate-180" : ""}`}/>
                <span className={bar}/>
              </button>
              {toursOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 z-10"/>
                  <div className="relative z-20 p-2">
                    <Link href="/tours" onClick={() => setToursOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f8f0] transition-colors group mb-1">
                      <div className="w-8 h-8 rounded-lg bg-[#4B5320]/10 flex items-center justify-center group-hover:bg-[#4B5320] transition-colors">
                        <MapIcon size={14} className="text-[#4B5320] group-hover:text-white transition-colors"/>
                      </div>
                      <div><p className="text-xs font-bold text-gray-800">All Tours</p><p className="text-[10px] text-gray-400">Browse all safari experiences</p></div>
                    </Link>
                    <div className="h-px bg-gray-100 mx-3 my-1"/>
                    {TOUR_CATEGORIES.map(cat => (
                      <Link key={cat.label} href={cat.href} onClick={() => setToursOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[#f6f8f0] transition-colors group">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#4B5320] transition-colors shrink-0">
                          <span className="text-[#4B5320] group-hover:text-white transition-colors">{cat.icon}</span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{cat.label}</p>
                          <p className="text-[10px] text-gray-400">{cat.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gallery dropdown */}
            <div className="relative" ref={galleryRef}>
              <button onClick={() => { setGalleryOpen(v => !v); setToursOpen(false); }}
                className={`${navCls} flex items-center gap-1`}>
                Gallery
                <ChevronDown size={13} className={`transition-transform duration-200 ${galleryOpen ? "rotate-180" : ""}`}/>
                <span className={bar}/>
              </button>
              {galleryOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100 z-10"/>
                  <div className="relative z-20 p-2">
                    <Link href="/gallery/photos" onClick={() => setGalleryOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f8f0] transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                        <ImageIcon size={14} className="text-amber-600 group-hover:text-white transition-colors"/>
                      </div>
                      <div><p className="text-xs font-bold text-gray-800">Photo Gallery</p><p className="text-[10px] text-gray-400">Safari photography</p></div>
                    </Link>
                    <Link href="/gallery/videos" onClick={() => setGalleryOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#f6f8f0] transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <Video size={14} className="text-blue-600 group-hover:text-white transition-colors"/>
                      </div>
                      <div><p className="text-xs font-bold text-gray-800">Video Gallery</p><p className="text-[10px] text-gray-400">Safari videos</p></div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about"   className={navCls}>About<span className={bar}/></Link>
            <Link href="/contact" className={navCls}>Contact<span className={bar}/></Link>
            <Link href="/admin"   className={navCls}>Admin<span className={bar}/></Link>

            <Link href="/tours"
              className="bg-[#4B5320] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#3a411a] transition-all shadow-md hover:shadow-lg active:scale-95">
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(v => !v)} className="md:hidden text-[#4B5320] p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {open ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-8 space-y-2 shadow-2xl">
            <Link href="/" onClick={() => setOpen(false)} className="block text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2">Home</Link>

            <div>
              <button onClick={() => setMobileTours(v => !v)}
                className="w-full flex items-center justify-between text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2">
                Tours <ChevronDown size={16} className={`transition-transform ${mobileTours ? "rotate-180" : ""}`}/>
              </button>
              {mobileTours && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#4B5320]/20 pl-4">
                  <Link href="/tours" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-600 hover:text-[#4B5320] font-semibold py-2 text-sm"><MapIcon size={14}/> All Tours</Link>
                  {TOUR_CATEGORIES.map(cat => (
                    <Link key={cat.label} href={cat.href} onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#4B5320] font-semibold py-2 text-sm">
                      {cat.icon} {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button onClick={() => setMobileGallery(v => !v)}
                className="w-full flex items-center justify-between text-gray-700 hover:text-[#4B5320] text-lg font-bold tracking-wider uppercase py-2">
                Gallery <ChevronDown size={16} className={`transition-transform ${mobileGallery ? "rotate-180" : ""}`}/>
              </button>
              {mobileGallery && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-[#4B5320]/20 pl-4">
                  <Link href="/gallery/photos" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-600 hover:text-[#4B5320] font-semibold py-2 text-sm"><ImageIcon size={14}/> Photo Gallery</Link>
                  <Link href="/gallery/videos" onClick={() => setOpen(false)} className="flex items-center gap-2 text-gray-600 hover:text-[#4B5320] font-semibold py-2 text-sm"><Video size={14}/> Video Gallery</Link>
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
    </>
  );
}