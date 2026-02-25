"use client"; // Required for the Subscribe button to work

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner"; // Assuming you want a nice notification

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Add logic here to send email to your backend
    toast.success("Thanks for subscribing to our safari updates!");
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-2xl font-bold text-[#4B5320] tracking-wide">
              Wikima<span className="text-amber-600"> Safari</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Exceptional safari experiences and luxury travel solutions across Kenya and East Africa.
            </p>
            <div className="flex gap-4">
              <Facebook size={20} className="text-[#4B5320] cursor-pointer hover:text-amber-600 transition" />
              <Instagram size={20} className="text-[#4B5320] cursor-pointer hover:text-amber-600 transition" />
              <Twitter size={20} className="text-[#4B5320] cursor-pointer hover:text-amber-600 transition" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-[#4B5320] transition">Home</Link></li>
              <li><Link href="/tours" className="hover:text-[#4B5320] transition">Our Tours</Link></li>
              <li><Link href="/about" className="hover:text-[#4B5320] transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#4B5320] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#4B5320]" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#4B5320]" />
                <span>info@wikimasafari.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-[#4B5320]" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">Subscribe for safari updates.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email" 
                className="px-4 py-2 rounded-sm border border-gray-200 text-sm focus:outline-none focus:border-[#4B5320] text-gray-900"
              />
              <button 
                type="submit"
                className="bg-[#4B5320] text-white py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-[#3a411a] transition cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-500">
          <p>© {currentYear} Wikima Safari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;