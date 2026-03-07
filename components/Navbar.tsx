"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png"; // Ensure this path is correct

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  const links = [
    { name: "Home", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Increased py-4 for more vertical space with the larger logo */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        
        {/* Brand Section */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative">
            <Image 
              src={logo} 
              alt="Wikima Safari Logo" 
              height={72} // Increased from 40
              className="w-auto h-16 object-contain transition-transform duration-300 group-hover:scale-105" 
              priority 
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-2xl font-bold text-[#4B5320] tracking-tight">
              WIKIMA
            </span>
            <span className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.25em] -mt-1">
              Safari Expeditions
            </span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-widest uppercase"
            >
              {l.name}
            </Link>
          ))}
          <Link
            href="/tours"
            className="bg-[#4B5320] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#3a411a] transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden text-[#4B5320] p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-8 space-y-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 hover:text-[#4B5320] transition-colors text-lg font-bold tracking-wider uppercase py-2"
            >
              {l.name}
            </Link>
          ))}
          <Link
            href="/tours"
            onClick={() => setOpen(false)}
            className="block bg-[#4B5320] text-white px-6 py-4 rounded-xl text-center font-bold tracking-widest uppercase shadow-lg"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;