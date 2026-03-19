"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toursData } from "@/data/tours";
<<<<<<< HEAD
import { CheckCircle2, Tent, Crown, Gem, Heart } from "lucide-react";
=======
import { CheckCircle2, Tent, Crown, Gem } from "lucide-react";
import BookingForm from "@/components/BookingForm";
>>>>>>> f7033b8fe33a6e241197badc1d572276307946a7
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
      features: [
        "Shared 4×4 Safari Vehicle",
        "Mid-range Safari Lodges",
        "Professional Driver/Guide",
        "Full Board Meals",
        "National Park Fees",
      ],
    },
    {
      name: "Premium",
      icon: <Crown size={36} className="text-[#D4AF37]" />,
      price: "$1,450",
      priceNote: "per person",
      description: "Enhanced privacy and superior lodge selections.",
      features: [
        "Private 4×4 Landcruiser",
        "Luxury Boutique Camps",
        "Expert Naturalist Guide",
        "Flying Doctors Cover",
        "Airport Transfers",
        "Sundowner Experiences",
      ],
      popular: true,
    },
    {
      name: "Luxury",
      icon: <Gem size={36} className="text-[#D4AF37]" />,
      price: "$2,800",
      priceNote: "per person",
      description: "The ultimate bush experience with zero compromises.",
      features: [
        "Private Charter Flights",
        "Ultra-Luxury Lodges",
        "Private Chef & Butler",
        "Dedicated Photography Guide",
        "Premium Drinks Included",
        "Private Spa Treatments",
      ],
    },
    {
      name: "Surprise / Romantic",
      icon: <Heart size={36} className="text-[#D4AF37]" />,
      price: "From $1,800",
      priceNote: "per couple",
      description: "Birthdays, anniversaries & honeymoons — crafted to surprise and delight.",
      features: [
        "Personalised Surprise Itinerary",
        "Romantic Bush Candlelit Dinner",
        "Rose Petal & Champagne Turndown",
        "Couples Spa Treatment",
        "Dedicated Romance Concierge",
        "Anniversary / Birthday Cake on Arrival",
        "Private Sundowner at a Secret Spot",
      ],
      romantic: true,
    },
  ];

  return (
    <main
      className="pt-32 pb-20 px-6 max-w-7xl mx-auto bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── TOURS LISTING ── */}
      <section>
        <h1 className="text-5xl font-extrabold mb-3 text-[#4B5320]">
          Our Safari Adventures
        </h1>
        <p className="text-gray-500 mb-12 text-lg">
          Choose your next journey into the wild.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {toursData.map((tour) => (
            <Link key={tour.slug} href={`/tours/${tour.slug}`} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">{tour.title}</h2>
                  <p className="text-[#4B5320] font-semibold text-sm mt-1">
                    {tour.location} • {tour.duration}
                  </p>
                  <p className="text-gray-500 mt-3 line-clamp-2 text-sm leading-relaxed">
                    {tour.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-black text-gray-900">
                      {tour.pricing[0].price}
                    </span>
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
<<<<<<< HEAD
          <h2 className="text-3xl font-black text-[#4B5320] mb-8">
            Explore Safari Styles
          </h2>
=======
          <h2 className="text-3xl font-black text-[#4B5320] mb-8">Explore Safari Styles</h2>
>>>>>>> f7033b8fe33a6e241197badc1d572276307946a7
          <div className="space-y-6">
            <SafariDropdown
              title="🌿 Bush Safaris"
              items={[
                "Maasai Mara", "Amboseli", "Samburu", "Tsavo East", "Tsavo West",
<<<<<<< HEAD
                "Serengeti", "Ngorongoro Crater", "Ruaha", "Selous / Nyerere",
                "Queen Elizabeth NP",
=======
                "Serengeti", "Ngorongoro Crater", "Ruaha", "Selous / Nyerere", "Queen Elizabeth NP",
>>>>>>> f7033b8fe33a6e241197badc1d572276307946a7
              ]}
            />
            <SafariDropdown
              title="🌊 Beach Escapes"
<<<<<<< HEAD
              items={[
                "Diani", "Watamu", "Malindi", "Kilifi", "Mombasa", "Zanzibar",
                "Pemba Island", "Mafia Island", "Lamu",
              ]}
            />
            <SafariDropdown
              title="⛰ Trek & Hike Adventures"
              items={[
                "Mt Kenya", "Mt Kilimanjaro", "Mt Longonot", "Ngong Hills",
                "Mount Meru", "Rwenzori Mountains", "Mount Elgon", "Simien Mountains",
              ]}
            />
            <SafariDropdown
              title="🏛 Cultural & Heritage Tours"
              items={[
                "Maasai Village Experience", "Hadzabe Tribe Visit",
                "Stone Town Zanzibar", "Lalibela Rock Churches",
                "Ethiopian Highlands",
              ]}
            />
            <SafariDropdown
              title="🦍 Adventure & Wildlife Experiences"
              items={[
                "Gorilla Trekking", "Chimpanzee Tracking",
                "Hot Air Balloon Safari", "Great Migration Safari",
                "Night Game Drives",
              ]}
=======
              items={["Diani", "Watamu", "Malindi", "Kilifi", "Mombasa", "Zanzibar", "Pemba Island", "Mafia Island", "Lamu"]}
            />
            <SafariDropdown
              title="⛰ Trek & Hike Adventures"
              items={["Mt Kenya", "Mt Kilimanjaro", "Mt Longonot", "Ngong Hills", "Mount Meru", "Rwenzori Mountains", "Mount Elgon", "Simien Mountains"]}
            />
            <SafariDropdown
              title="🏛 Cultural & Heritage Tours"
              items={["Maasai Village Experience", "Hadzabe Tribe Visit", "Stone Town Zanzibar", "Lalibela Rock Churches", "Ethiopian Highlands"]}
            />
            <SafariDropdown
              title="🦍 Adventure & Wildlife Experiences"
              items={["Gorilla Trekking", "Chimpanzee Tracking", "Hot Air Balloon Safari", "Great Migration Safari", "Night Game Drives"]}
>>>>>>> f7033b8fe33a6e241197badc1d572276307946a7
            />
          </div>
        </div>

        {/* RIGHT: DESTINATION CRAWLER */}
        <div>
<<<<<<< HEAD
          <h2 className="text-3xl font-black text-[#4B5320] mb-8">
            Our Esteemed Destinations
          </h2>
=======
          <h2 className="text-3xl font-black text-[#4B5320] mb-8">Our Esteemed Destinations</h2>
>>>>>>> f7033b8fe33a6e241197badc1d572276307946a7
          <DestinationCrawler />
        </div>
      </section>

<<<<<<< HEAD
      {/* ── BEYOND AFRICA SECTION ── */}
=======
      {/* ── BOOKING FORM SECTION ── */}
>>>>>>> f7033b8fe33a6e241197badc1d572276307946a7
      <section className="mb-24">
        <div className="text-center mb-14">
          <p className="text-[#4B5320] font-medium tracking-[0.3em] uppercase text-xs mb-3">
            Global Escapes
          </p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Tours Beyond African Boundaries
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed text-base">
            From golden desert skylines to ancient wonders — we craft extraordinary
            journeys beyond the continent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[
            {
              destination: "Dubai, UAE",
              flag: "🇦🇪",
              tagline: "City of Gold",
              highlight: "Burj Khalifa · Desert Safari · Gold Souk",
              description: "Experience the world's most dazzling skyline by day and a magical desert camp under the stars by night. Shop the Gold Souk, dine on the 124th floor, and ride dunes at sunset — Dubai is pure spectacle.",
              duration: "5–7 Days",
              price: "From $1,400",
              gradient: "from-amber-900/80 to-yellow-700/60",
              emoji: "🏙️",
            },
            {
              destination: "Maldives",
              flag: "🇲🇻",
              tagline: "The Last Paradise",
              highlight: "Overwater Villas · Coral Reefs · Bioluminescence",
              description: "Wake up above turquoise lagoons in a private overwater villa. Snorkel pristine coral gardens, watch glowing bioluminescent shores at midnight, and indulge in spa rituals with the ocean as your backdrop.",
              duration: "6–10 Days",
              price: "From $2,200",
              gradient: "from-cyan-900/80 to-teal-600/60",
              emoji: "🌊",
            },
            {
              destination: "Istanbul, Turkey",
              flag: "🇹🇷",
              tagline: "Where Worlds Meet",
              highlight: "Hagia Sophia · Bosphorus · Grand Bazaar",
              description: "Straddle two continents in a city of spice, mosques, and history. Cruise the Bosphorus at dusk, lose yourself in the 4,000-shop Grand Bazaar, and marvel at Hagia Sophia's 1,500 years of stories.",
              duration: "5–8 Days",
              price: "From $1,100",
              gradient: "from-red-900/80 to-rose-700/60",
              emoji: "🕌",
            },
            {
              destination: "Bali, Indonesia",
              flag: "🇮🇩",
              tagline: "Island of the Gods",
              highlight: "Rice Terraces · Temples · Luxury Villas",
              description: "Immerse yourself in emerald rice terraces, centuries-old Hindu temples, and world-class wellness retreats. Watch sunrise at Mount Batur, catch waves at Seminyak, and feast on Balinese cuisine under the palms.",
              duration: "7–10 Days",
              price: "From $1,600",
              gradient: "from-green-900/80 to-emerald-700/60",
              emoji: "🌴",
            },
            {
              destination: "Paris, France",
              flag: "🇫🇷",
              tagline: "The City of Light",
              highlight: "Eiffel Tower · Louvre · French Riviera",
              description: "Stroll boulevards lined with chestnut trees, sip café crème at a pavement bistro, and stand before the Mona Lisa. Then head south for a week of lavender fields, rosé wine, and the glittering Côte d'Azur.",
              duration: "6–9 Days",
              price: "From $2,500",
              gradient: "from-slate-800/80 to-blue-700/60",
              emoji: "🗼",
            },
            {
              destination: "Egypt",
              flag: "🇪🇬",
              tagline: "Land of the Pharaohs",
              highlight: "Pyramids of Giza · Nile Cruise · Luxor",
              description: "Stand before the last surviving Wonder of the Ancient World, sail a felucca down the world's longest river at golden hour, and explore the Valley of the Kings — where pharaohs sleep for eternity.",
              duration: "7–10 Days",
              price: "From $1,300",
              gradient: "from-yellow-900/80 to-orange-700/60",
              emoji: "🏺",
            },
            {
              destination: "Thailand",
              flag: "🇹🇭",
              tagline: "The Land of Smiles",
              highlight: "Bangkok · Phi Phi Islands · Chiang Mai",
              description: "Float through Bangkok's electric street markets, island-hop the Andaman's emerald limestone cliffs, and ride an elephant through misty Chiang Mai jungle — Thailand dazzles at every turn.",
              duration: "8–12 Days",
              price: "From $1,800",
              gradient: "from-purple-900/80 to-pink-700/60",
              emoji: "🐘",
            },
            {
              destination: "Rome, Italy",
              flag: "🇮🇹",
              tagline: "The Eternal City",
              highlight: "Colosseum · Vatican · Amalfi Coast",
              description: "Toss a coin in the Trevi Fountain, walk through 2,000 years of history at the Colosseum, and savour handmade pasta in a candlelit trattoria. Extend to the clifftop Amalfi Coast for pure Mediterranean magic.",
              duration: "6–9 Days",
              price: "From $2,100",
              gradient: "from-orange-900/80 to-red-700/60",
              emoji: "🏛️",
            },
          ].map((place) => (
            <Link
              key={place.destination}
              href="/contact"
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300 aspect-3/4 flex flex-col justify-end cursor-pointer"
              style={{ background: "#1a1208" }}
            >
              {/* Background gradient — darkens more on hover for readability */}
              <div
                className={`absolute inset-0 bg-linear-to-t ${place.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
              />
              {/* Extra dark overlay on hover so description text is readable */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

              {/* Emoji backdrop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-5 transition-opacity duration-300">
                <span className="text-[8rem]">{place.emoji}</span>
              </div>

              {/* Default content — visible when NOT hovered */}
              <div className="relative z-10 p-6 group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{place.flag}</span>
                  <span className="text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                    {place.tagline}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mb-1 leading-tight">
                  {place.destination}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed mb-4">
                  {place.highlight}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#D4AF37] font-black text-base">{place.price}</p>
                    <p className="text-white/40 text-[10px]">{place.duration}</p>
                  </div>
                  <span className="bg-white/10 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-2 rounded-full">
                    Inquire
                  </span>
                </div>
              </div>

              {/* Hover content — slides up on hover */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{place.flag}</span>
                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">
                      {place.destination}
                    </h3>
                    <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase">
                      {place.tagline}
                    </span>
                  </div>
                </div>
                <p className="text-white/85 text-xs leading-relaxed mb-5">
                  {place.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#D4AF37] font-black text-sm">{place.price}</p>
                    <p className="text-white/50 text-[10px]">{place.duration}</p>
                  </div>
                  <span className="bg-[#D4AF37] text-[#1a1208] text-[10px] font-black tracking-widest uppercase px-4 py-2 rounded-full">
                    Inquire →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── RESERVE YOUR JOURNEY BANNER ── */}
      <section className="mb-24">
        <div
          className="rounded-4xl overflow-hidden border border-gray-100 shadow-lg"
          style={{ background: "linear-gradient(135deg, #f8f6f1 0%, #f2f5eb 100%)" }}
        >
          <div
            className="p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10"
            style={{ background: "linear-gradient(145deg, #1a1208 0%, #2d3a10 100%)" }}
          >
            {/* Left: text content */}
            <div className="flex-1">
              <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-[#c8a96e] border border-[#c8a96e]/40 px-3 py-1 rounded-full mb-6 w-fit">
                Reserve Your Journey
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                The Wild<br />
                <span className="text-[#D4AF37]">Awaits You</span>
              </h2>
              <div className="w-10 h-0.5 bg-[#c8a96e] mb-5" />
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
                Secure your spot on one of East Africa's most extraordinary safari
                experiences. Expert guides, exclusive access, and memories for a lifetime.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Secure Stripe & M-Pesa Payments",
                  "Instant booking confirmation via email",
                  "24/7 Ground support once you land",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/70 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

<<<<<<< HEAD
            {/* Right: Book Now CTA */}
            <div className="flex flex-col items-center gap-4 shrink-0">
              <Link
                href="/contact"
                className="px-14 py-5 rounded-2xl font-black uppercase tracking-widest text-base text-center transition-all duration-200 hover:scale-105 hover:opacity-90"
                style={{ background: "#D4AF37", color: "#1a1208" }}
              >
                Book Now
              </Link>
              <p className="text-white/40 text-xs tracking-wide text-center">
                No commitment · Free consultation
              </p>
=======
            {/* Right Column */}
            <div className="p-10 lg:p-12 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Book Your Safari</h3>
              <p className="text-gray-400 text-sm mb-8">Select your package and secure your dates.</p>
              {/* ✅ This is a demo form - update is optional but recommended for consistency */}
              <BookingForm
                tourTitle="Safari Adventure"
                pricingTiers={["Standard", "Premium", "Luxury"]}
              />
>>>>>>> f7033b8fe33a6e241197badc1d572276307946a7
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGE CARDS ── */}
      <section className="pt-16 border-t border-gray-100">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#4B5320] mb-3 block">
            Choose Your Level
          </span>
          <h2 className="text-4xl font-black text-gray-900 mb-4">Travel Packages</h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Four distinct tiers of service — from essential comfort to bespoke romantic
            escapes — ensuring your safari matches your vision perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.name}
              className="rounded-3xl overflow-hidden shadow-xl flex flex-col hover:-translate-y-2 transition-transform duration-300"
              style={{
                backgroundColor: pkg.romantic ? "#1a0a12" : "#4B5320",
                border: `3px solid ${pkg.romantic ? "#c8729a" : "#D4AF37"}`,
              }}
            >
              <div
                className="px-8 pt-8 pb-6 border-b"
                style={{ borderColor: pkg.romantic ? "rgba(200,114,154,0.2)" : "rgba(255,255,255,0.1)" }}
              >
                <div className="mb-4">
                  {pkg.romantic
                    ? <Heart size={36} className="text-[#c8729a]" />
                    : pkg.icon}
                </div>
                <h3
                  className="text-2xl font-black mb-1"
                  style={{ color: pkg.romantic ? "#c8729a" : "#D4AF37" }}
                >
                  {pkg.name}
                </h3>
                <p className="text-white/60 text-sm leading-snug mb-5">
                  {pkg.description}
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-white leading-none">
                    {pkg.price}
                  </span>
                  <span className="text-white/50 text-xs mb-1 ml-1">/ {pkg.priceNote}</span>
                </div>
                {pkg.popular && (
                  <span className="inline-block mt-3 text-[9px] font-bold tracking-[0.18em] uppercase bg-[#D4AF37] text-[#4B5320] px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                {pkg.romantic && (
                  <span className="inline-block mt-3 text-[9px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full" style={{ background: "#c8729a", color: "#fff" }}>
                    💍 Special Occasions
                  </span>
                )}
              </div>

              <div className="px-8 py-6 flex flex-col flex-1">
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/85 leading-snug"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 mt-0.5"
                        style={{ color: pkg.romantic ? "#c8729a" : "#D4AF37" }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm text-center transition-all duration-200 hover:scale-[1.02] hover:opacity-90 block"
                  style={{
                    background: pkg.romantic ? "#c8729a" : "#D4AF37",
                    color: pkg.romantic ? "#fff" : "#4B5320",
                  }}
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