"use client";

import Image from "next/image";

const PARTNERS = [
  { name: "Kenya Tourism Board",    logo: "/assets/Kenya_Tourist_Board_logo.jpeg" },
  { name: "Magical Kenya",          logo: "/assets/magicalkenya.jpg" },
  { name: "TripAdvisor",            logo: "/assets/tripadvisor.jpg" },
  { name: "Kenya Wildlife Service", logo: "/assets/kws.jpg" },
  { name: "Booking.com",            logo: "/assets/booking.jpg" },
  { name: "Kenya Airways",          logo: "/assets/kenyaairway.jpg" },
  { name: "Card",                   logo: "/assets/card.jpg" },
  { name: "M-Pesa",                 logo: "/assets/mpesa.jpg" },
  // ⚠️ Rename the file in /public/assets/ — remove the leading space:
  // FROM: " Visa and Mastercard Logo.jpeg"
  // TO:   "visa-mastercard.jpeg"
  { name: "Visa & Mastercard",      logo: "/assets/visa-mastercard.jpg" },
];

// Duplicate for seamless infinite scroll
const ALL = [...PARTNERS, ...PARTNERS];

export default function Partners() {
  return (
    <section className="py-10 bg-gray-50 border-t border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4B5320]">
          Trusted Partners &amp; Affiliates
        </p>
      </div>

      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f9fafb, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }}
        />

        {/* width: max-content is required for the crawl animation to work */}
        <div className="flex items-center gap-12 crawl" style={{ width: "max-content" }}>
          {ALL.map((partner, i) => (
            <div
              key={`${partner.name}-${i}`}
              className="shrink-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-all duration-300"
              style={{ height: 48, minWidth: 120 }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={140}
                height={58}
                className="object-contain w-auto h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}