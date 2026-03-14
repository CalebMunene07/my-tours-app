"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toursData } from "@/data/tours";
import { CheckCircle2, Tent, Crown, Gem } from "lucide-react";
import BookingForm from "@/components/BookingForm";

import SafariDropdown from "@/components/SafariDropdown";
import DestinationCrawler from "@/components/DestinationCrawler";


export default function ToursListingPage() {
  const packages = [
    {
      name: "Standard",
      icon: <Tent size={36} className="text-[#D4AF37]" />,
      price: "$890",
      priceNote: "per person",
      description: "Essential safari comfort for the conscious traveler.",
      features: ["Shared 4×4 Safari Vehicle", "Mid-range Safari Lodges", "Professional Driver/Guide", "Full Board Meals", "National Park Fees"],
    },
    {
      name: "Premium",
      icon: <Crown size={36} className="text-[#D4AF37]" />,
      price: "$1,450",
      priceNote: "per person",
      description: "Enhanced privacy and superior lodge selections.",
      features: ["Private 4×4 Landcruiser", "Luxury Boutique Camps", "Expert Naturalist Guide", "Flying Doctors Cover", "Airport Transfers", "Sundowner Experiences"],
    },
    {
      name: "Luxury",
      icon: <Gem size={36} className="text-[#D4AF37]" />,
      price: "$2,800",
      priceNote: "per person",
      description: "The ultimate bush experience with zero compromises.",
      features: ["Private Charter Flights", "Ultra-Luxury Lodges", "Private Chef & Butler", "Dedicated Photography Guide", "Premium Drinks Included", "Private Spa Treatments"],
    },
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── TOURS LISTING ── */}
      <section>
        <h1 className="text-5xl font-extrabold mb-3 text-[#4B5320]">Our Safari Adventures</h1>
        <p className="text-gray-500 mb-12 text-lg">Choose your next journey into the wild.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {toursData.map((tour) => (
            <Link key={tour.slug} href={`/tours/${tour.slug}`} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image src={tour.image} alt={tour.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">{tour.title}</h2>
                  <p className="text-[#4B5320] font-semibold text-sm mt-1">{tour.location} • {tour.duration}</p>
                  <p className="text-gray-500 mt-3 line-clamp-2 text-sm leading-relaxed">{tour.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-black text-gray-900">{tour.pricing[0].price}</span>
                    <span className="bg-[#4B5320] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EAST AFRICA EXPERIENCE SECTION ── */}
<section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">

  {/* LEFT: SAFARI STYLES */}
  <div>
    <h2 className="text-3xl font-black text-[#4B5320] mb-8">
      Explore Safari Styles
    </h2>

    <div className="space-y-6">

      <SafariDropdown
        title="🌿 Bush Safaris"
        items={[
          "Maasai Mara",
          "Amboseli",
          "Samburu",
          "Tsavo East",
          "Tsavo West",
          "Serengeti",
          "Ngorongoro Crater",
          "Ruaha",
          "Selous / Nyerere",
          "Queen Elizabeth NP",
        ]}
      />

      <SafariDropdown
        title="🌊 Beach Escapes"
        items={[
          "Diani",
          "Watamu",
          "Malindi",
          "Kilifi",
          "Mombasa",
          "Zanzibar",
          "Pemba Island",
          "Mafia Island",
          "Lamu",
        ]}
      />

      <SafariDropdown
        title="⛰ Trek & Hike Adventures"
        items={[
          "Mt Kenya",
          "Mt Kilimanjaro",
          "Mt Longonot",
          "Ngong Hills",
          "Mount Meru",
          "Rwenzori Mountains",
          "Mount Elgon",
          "Simien Mountains",
        ]}
      />

      <SafariDropdown
        title="🏛 Cultural & Heritage Tours"
        items={[
          "Maasai Village Experience",
          "Hadzabe Tribe Visit",
          "Stone Town Zanzibar",
          "Lalibela Rock Churches",
          "Ethiopian Highlands",
        ]}
      />

      <SafariDropdown
        title="🦍 Adventure & Wildlife Experiences"
        items={[
          "Gorilla Trekking",
          "Chimpanzee Tracking",
          "Hot Air Balloon Safari",
          "Great Migration Safari",
          "Night Game Drives",
        ]}
      />

    </div>
  </div>

  {/* RIGHT: DESTINATION CRAWLER */}
  <div>
    <h2 className="text-3xl font-black text-[#4B5320] mb-8">
      Our Esteemed Destinations
    </h2>

    <DestinationCrawler />
  </div>

</section>

           {/* ── BOOKING FORM SECTION ── */}
      <section className="mb-24">
        <div className="rounded-4xl overflow-hidden border border-gray-100 shadow-lg"
          style={{ background: "linear-gradient(135deg, #f8f6f1 0%, #f2f5eb 100%)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left Column */}
            <div className="p-10 lg:p-14 flex flex-col justify-center"
              style={{ background: "linear-gradient(145deg, #1a1208 0%, #2d3a10 100%)" }}>
              <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-[#c8a96e] border border-[#c8a96e]/40 px-3 py-1 rounded-full mb-6 w-fit">
                Reserve Your Journey
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                The Wild<br />
                <span className="text-[#D4AF37]">Awaits You</span>
              </h2>
              <div className="w-10 h-0.5 bg-[#c8a96e] mb-5" />
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-sm">
                Secure your spot on one of East Africa's most extraordinary safari experiences.
                Expert guides, exclusive access, and memories for a lifetime.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Secure Stripe & M-Pesa Payments",
                  "Instant booking confirmation via email",
                  "24/7 Ground support once you land",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#D4AF37]" />
                    <span className="text-white/70 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="p-10 lg:p-12 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Book Your Safari</h3>
              <p className="text-gray-400 text-sm mb-8">Select your package and secure your dates.</p>
              <BookingForm
                tourTitle="Safari Adventure"
                pricingTiers={["Standard", "Premium", "Luxury"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGE CARDS ── */}
      <section className="pt-16 border-t border-gray-100">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#4B5320] mb-3 block">Choose Your Level</span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Travel Packages</h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Three distinct tiers of service to ensure your safari matches your preferred level of comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.name}
              className="rounded-3xl overflow-hidden shadow-xl flex flex-col hover:-translate-y-2 transition-transform duration-300"
              style={{ backgroundColor: "#4B5320", border: "3px solid #D4AF37" }}
            >
              <div className="px-8 pt-8 pb-6 border-b border-white/10">
                <div className="mb-4">{pkg.icon}</div>
                <h3 className="text-2xl font-black text-[#D4AF37] mb-1">{pkg.name}</h3>
                <p className="text-white/60 text-sm leading-snug mb-5">{pkg.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white leading-none">{pkg.price}</span>
                  <span className="text-white/50 text-xs mb-1 ml-1">/ {pkg.priceNote}</span>
                </div>
                {idx === 1 && (
                  <span className="inline-block mt-3 text-[9px] font-bold tracking-[0.18em] uppercase bg-[#D4AF37] text-[#4B5320] px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
              </div>
              <div className="px-8 py-6 flex flex-col flex-1">
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/85 leading-snug">
                      <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-center transition-all duration-200 hover:scale-[1.02] hover:opacity-90 block"
                  style={{ background: "#D4AF37", color: "#4B5320" }}
                >
                  Inquire Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}