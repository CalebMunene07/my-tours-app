"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from "lucide-react";
import { toast } from "sonner";

// TikTok SVG icon (not in lucide-react)
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
);

// WhatsApp SVG icon
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks for subscribing to our safari updates!");
    setEmail("");
  };

  return (
    <>
      {/* ── Floating WhatsApp Button ── */}
      <a
        href="https://wa.me/254720069550?text=Hi%20Wikima%20Safari!%20I%27d%20like%20to%20enquire%20about%20a%20safari."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-100 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-300/50 group"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon size={22} />
        <span className="text-xs font-bold tracking-wide">Chat with us</span>
      </a>

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
              {/* Social Icons */}
              <div className="flex items-center gap-3 flex-wrap">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="text-[#4B5320] hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                  className="text-[#4B5320] hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="text-[#4B5320] hover:text-[#1DA1F2] transition-colors" aria-label="Twitter / X">
                  <Twitter size={20} />
                </a>
                {/* TikTok */}
                <a href="https://tiktok.com/@wikimasafari" target="_blank" rel="noopener noreferrer"
                  className="text-[#4B5320] hover:text-black transition-colors" aria-label="TikTok">
                  <TikTokIcon size={20} />
                </a>
                {/* YouTube */}
                <a href="https://youtube.com/@wikimasafari" target="_blank" rel="noopener noreferrer"
                  className="text-[#4B5320] hover:text-[#FF0000] transition-colors" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
                {/* WhatsApp inline */}
                <a href="https://wa.me/254720069550" target="_blank" rel="noopener noreferrer"
                  className="text-[#4B5320] hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                  <WhatsAppIcon size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="/"              className="hover:text-[#4B5320] transition">Home</Link></li>
                <li><Link href="/tours"         className="hover:text-[#4B5320] transition">Our Tours</Link></li>
                <li><Link href="/gallery/photos" className="hover:text-[#4B5320] transition">Photo Gallery</Link></li>
                <li><Link href="/gallery/videos" className="hover:text-[#4B5320] transition">Video Gallery</Link></li>
                <li><Link href="/about"         className="hover:text-[#4B5320] transition">About Us</Link></li>
                <li><Link href="/contact"       className="hover:text-[#4B5320] transition">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-[#4B5320] mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a href="tel:+254720069550" className="hover:text-[#4B5320] transition">+254 720 069 550 🇰🇪</a>
                    <a href="tel:+61430057611"  className="hover:text-[#4B5320] transition">+61 430 057 611 🇦🇺</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#4B5320] shrink-0" />
                  <a href="mailto:info@wikimasafari.com" className="hover:text-[#4B5320] transition">info@wikimasafari.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#4B5320] shrink-0" />
                  <span>Nairobi, Kenya</span>
                </li>
                {/* WhatsApp CTA */}
                <li>
                  <a
                    href="https://wa.me/254720069550?text=Hi%20Wikima%20Safari!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1a9e4f] font-bold text-xs px-4 py-2 rounded-full transition-colors mt-1"
                  >
                    <WhatsAppIcon size={14} /> Chat on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Newsletter</h4>
              <p className="text-sm text-gray-600 mb-4">Subscribe for safari updates and offers.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <p>© {currentYear} Wikima Safari. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://tiktok.com/@wikimasafari" target="_blank" rel="noopener noreferrer"
                className="hover:text-black transition-colors flex items-center gap-1">
                <TikTokIcon size={13}/> TikTok
              </a>
              <a href="https://youtube.com/@wikimasafari" target="_blank" rel="noopener noreferrer"
                className="hover:text-[#FF0000] transition-colors flex items-center gap-1">
                <Youtube size={13}/> YouTube
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;