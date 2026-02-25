"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  // Added About and Admin to the navigation list
  const links = [
    { name: "Home", href: "/" },
    { name: "Tours", href: "/tours" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    // Updated to Bright Theme (bg-white/90) with a light border
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Brand - Updated to Army Green */}
        <Link href="/" className="font-display text-xl font-bold text-[#4B5320] tracking-wide">
          Wikima<span className="text-amber-600"> Safari</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="text-gray-600 hover:text-[#4B5320] transition-colors text-xs font-bold tracking-wider uppercase"
            >
              {l.name}
            </Link>
          ))}
          {/* Book Now Button - Now a functional Link targeting Tours */}
          <Link
            href="/tours"
            className="bg-[#4B5320] text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase hover:bg-[#3a411a] transition shadow-md"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle - Updated to Army Green */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#4B5320]">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-6 space-y-4 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-gray-600 hover:text-[#4B5320] transition-colors text-sm font-bold tracking-wider uppercase py-3 border-b border-gray-50"
            >
              {l.name}
            </Link>
          ))}
          <Link
            href="/tours"
            onClick={() => setOpen(false)}
            className="block bg-[#4B5320] text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase text-center shadow-md"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;