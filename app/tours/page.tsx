"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toursData } from "@/data/tours";
import { CheckCircle2, Plane, Users, ChevronDown, ChevronUp } from "lucide-react";
import SafariDropdown from "@/components/SafariDropdown";
import DestinationCrawler from "@/components/DestinationCrawler";

// ── Seasonal pricing tables for fly-inn safaris ───────────────────────────────
const FLY_INN_TABLES = [
  {
    slug: "fly-inn-mara-3-day",
    title: "3-Day Masai Mara Flying Safari",
    flag: "🇰🇪",
    departure: "Wilson Airport, Nairobi",
    lodge: "Mara Serena Lodge",
    note: "Mara park entry fee USD 200–400/adult payable on arrival. 15kg soft bag limit.",
    seasons: [
      { label: "22 Dec – 02 Jan 2026", price: "$1,845" },
      { label: "03 Jan – 31 Mar 2026", price: "$1,465" },
      { label: "01 Apr – 31 May 2026", price: "$1,290" },
      { label: "01 Jun – 15 Jun 2026", price: "$1,465" },
      { label: "15 Jun – 30 Sep 2026", price: "$1,765" },
      { label: "01 Oct – 31 Oct 2026", price: "$1,755" },
      { label: "01 Nov – 21 Dec 2026", price: "$1,365" },
    ],
  },
  {
    slug: "fly-inn-mara-4-day",
    title: "4-Day Masai Mara Flying Safari",
    flag: "🇰🇪",
    departure: "Wilson Airport, Nairobi",
    lodge: "Keekorok Lodge",
    note: "Mara park entry fee USD 200–400/adult payable on arrival. 15kg soft bag limit.",
    seasons: [
      { label: "23 Dec – 02 Jan 2026", price: "$1,865" },
      { label: "03 Jan – 31 Mar 2026", price: "$1,695" },
      { label: "01 Apr – 30 May 2026", price: "$1,575" },
      { label: "01 Jun – 15 Jun 2026", price: "$1,695" },
      { label: "15 Jun – 30 Sep 2026", price: "$2,285" },
      { label: "01 Oct – 31 Oct 2026", price: "$1,655" },
      { label: "01 Nov – 21 Dec 2026", price: "$1,635" },
    ],
  },
  {
    slug: "fly-inn-serengeti-3-day",
    title: "3-Day Serengeti Flying Safari",
    flag: "🇹🇿",
    departure: "Arusha Airport, Tanzania",
    lodge: "Serengeti Serena Lodge",
    note: "Serengeti park & concession fees USD 300/2 nights payable on check-in. 15kg soft bag limit.",
    seasons: [
      { label: "22 Dec – 01 Jan 2026", price: "$1,975" },
      { label: "03 Jan – 31 Jan 2026", price: "$1,670" },
      { label: "01 Feb – 28 Feb 2026", price: "$2,195" },
      { label: "01 Mar – 31 Mar 2026", price: "$1,690" },
      { label: "01 Apr – 31 May 2026", price: "$1,470" },
      { label: "01 Jun – 31 Oct 2026", price: "$2,195" },
      { label: "01 Nov – 21 Dec 2026", price: "$1,670" },
    ],
  },
  {
    slug: "fly-inn-serengeti-4-day",
    title: "4-Day Serengeti Flying Safari",
    flag: "🇹🇿",
    departure: "Arusha Airport, Tanzania",
    lodge: "Serengeti Explorer by Elewana",
    note: "Serengeti park & concession fees USD 450/3 nights payable on check-in. 15kg soft bag limit.",
    seasons: [
      { label: "21 Dec – 10 Jan 2026", price: "$3,120" },
      { label: "01 Jan – Feb 2026",     price: "$2,865" },
      { label: "01 Mar – 31 Mar 2026",  price: "$2,485" },
      { label: "01 Apr – 31 May 2026",  price: "$2,295" },
      { label: "01 Jun – 31 Oct 2026",  price: "$3,165" },
      { label: "01 Nov – 20 Dec 2026",  price: "$2,640" },
    ],
  },
];

// ── Kenya Safaris seasonal pricing ───────────────────────────────────────────
const KENYA_PRICE_TABLES = [
  {
    slug: "3-day-masai-mara",
    title: "3-Day Masai Mara",
    seasons: [
      { label: "22 Dec – 03 Jan 2026", "2-3 pax": "$1,145", "4-5 pax": "$995",   "6 pax": "$930"   },
      { label: "04 Jan – 31 Mar 2026", "2-3 pax": "$910",   "4-5 pax": "$790",   "6 pax": "$725"   },
      { label: "01 Apr – 30 Jun 2026", "2-3 pax": "$795",   "4-5 pax": "$685",   "6 pax": "$640"   },
      { label: "01 Jul – 31 Oct 2026", "2-3 pax": "$1,435", "4-5 pax": "$1,275", "6 pax": "$1,190" },
    ],
  },
  {
    slug: "3-day-amboseli",
    title: "3-Day Amboseli",
    seasons: [
      { label: "22 Dec – 02 Jan 2026", "2-3 pax": "$945",   "4-5 pax": "$795", "6 pax": "$745" },
      { label: "03 Jan – 31 Mar 2026", "2-3 pax": "$865",   "4-5 pax": "$790", "6 pax": "$695" },
      { label: "01 Apr – 31 May 2026", "2-3 pax": "$795",   "4-5 pax": "$675", "6 pax": "$630" },
      { label: "15 Jun – 31 Oct 2026", "2-3 pax": "$985",   "4-5 pax": "$840", "6 pax": "$765" },
    ],
  },
  {
    slug: "4-day-mara-nakuru",
    title: "4-Day Mara & Nakuru",
    seasons: [
      { label: "16 Dec – 02 Jan 2026", "2-3 pax": "$1,495", "4-5 pax": "$1,320", "6 pax": "$1,240" },
      { label: "03 Jan – 31 Mar 2026", "2-3 pax": "$1,180", "4-5 pax": "$960",   "6 pax": "$895"   },
      { label: "01 Apr – 15 Jun 2026", "2-3 pax": "$1,035", "4-5 pax": "$875",   "6 pax": "$820"   },
      { label: "15 Jun – 30 Sep 2026", "2-3 pax": "$1,745", "4-5 pax": "$1,540", "6 pax": "$1,485" },
    ],
  },
  {
    slug: "4-day-northern-kenya",
    title: "4-Day Northern Kenya",
    seasons: [
      { label: "03 Jan – 31 Mar 2026", "2-3 pax": "$1,095", "4-5 pax": "$895", "6 pax": "$825" },
      { label: "01 Apr – 31 May 2026", "2-3 pax": "$1,025", "4-5 pax": "$815", "6 pax": "$770" },
      { label: "01 Jul – 30 Sep 2026", "2-3 pax": "$1,145", "4-5 pax": "$980", "6 pax": "$895" },
      { label: "22 Dec – 02 Jan 2027", "2-3 pax": "$1,145", "4-5 pax": "$980", "6 pax": "$895" },
    ],
  },
  {
    slug: "5-day-mara-nakuru-naivasha",
    title: "5-Day Mara, Nakuru & Naivasha",
    seasons: [
      { label: "01 Jul – 30 Sep 2026", "2-3 pax": "$1,965", "4-5 pax": "$1,695", "6 pax": "$1,620" },
      { label: "01 Oct – 31 Oct 2026", "2-3 pax": "$1,920", "4-5 pax": "$1,665", "6 pax": "$1,600" },
      { label: "01 Nov – 15 Dec 2026", "2-3 pax": "$1,690", "4-5 pax": "$1,460", "6 pax": "$1,380" },
      { label: "16 Dec – 02 Jan 2027", "2-3 pax": "$1,965", "4-5 pax": "$1,695", "6 pax": "$1,420" },
    ],
  },
  {
    slug: "6-day-mara-nakuru-amboseli",
    title: "6-Day Mara, Nakuru & Amboseli",
    seasons: [
      { label: "01 Jun – 30 Sep 2026", "2-3 pax": "$2,395", "4-5 pax": "$2,145", "6 pax": "$2,095" },
      { label: "01 Oct – 31 Oct 2026", "2-3 pax": "$2,145", "4-5 pax": "$1,945", "6 pax": "$1,840" },
      { label: "01 Nov – 15 Dec 2026", "2-3 pax": "$1,995", "4-5 pax": "$1,850", "6 pax": "$1,740" },
      { label: "16 Dec – 02 Jan 2027", "2-3 pax": "$2,395", "4-5 pax": "$2,230", "6 pax": "$2,095" },
    ],
  },
  {
    slug: "7-day-kenya-grand-safari",
    title: "7-Day Grand Kenya Safari",
    seasons: [
      { label: "03 Jan – 31 Mar 2026", "2-3 pax": "$1,095", "4-5 pax": "$895", "6 pax": "$825" },
      { label: "01 Apr – 30 Sep 2026", "2-3 pax": "$1,180", "4-5 pax": "$960", "6 pax": "$895" },
      { label: "01 Oct – 21 Dec 2026", "2-3 pax": "$1,095", "4-5 pax": "$895", "6 pax": "$825" },
    ],
  },
];

// ── Budget group pricing ──────────────────────────────────────────────────────
const BUDGET_TABLES = [
  {
    slug: "budget-3-day-masai-mara",
    title: "3-Day Masai Mara Group Safari",
    route: "Nairobi → Masai Mara → Nairobi",
    seasons: [
      { label: "Jan 1 – Jun 30 2026", single: "$456", sharing: "$453" },
      { label: "Jul 1 – Dec 31 2026", single: "$700", sharing: "$690" },
    ],
  },
  {
    slug: "budget-4-day-mara-nakuru",
    title: "4-Day Masai Mara & Lake Nakuru",
    route: "Nairobi → Mara → Nakuru → Nairobi",
    seasons: [
      { label: "Jan 1 – Jun 30 2026", single: "$656", sharing: "$655" },
      { label: "Jul 1 – Dec 31 2026", single: "$891", sharing: "$890" },
    ],
  },
  {
    slug: "budget-5-day-mara-nakuru-naivasha",
    title: "5-Day Mara, Nakuru & Naivasha",
    route: "Nairobi → Mara → Nakuru → Naivasha → Nairobi",
    seasons: [
      { label: "Jan 1 – Jun 30 2026", single: "$839", sharing: "$778" },
      { label: "Jul 1 – Dec 31 2026", single: "$1,021", sharing: "$991" },
    ],
  },
  {
    slug: "budget-7-day-grand-circuit",
    title: "7-Day Grand Kenya Circuit",
    route: "Nairobi → Mara → Nakuru → Naivasha → Amboseli → Nairobi",
    seasons: [
      { label: "Jan 1 – Jun 30 2026", single: "$1,125", sharing: "$1,120" },
      { label: "Jul 1 – Dec 31 2026", single: "$1,255", sharing: "$1,344" },
    ],
  },
];

// ── Reusable Tour Card ────────────────────────────────────────────────────────
const TourCard = ({ tour }: { tour: (typeof toursData)[0] }) => (
  <Link href={`/tours/${tour.slug}`} className="group">
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
            {tour.pricing[0].priceUSD.split(" ")[0]}
          </span>
          <span className="bg-[#4B5320] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
            View Details
          </span>
        </div>
      </div>
    </div>
  </Link>
);

// ── Section Header ────────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-3xl">{icon}</span>
      <h2 className="text-3xl font-black text-[#4B5320]">{title}</h2>
    </div>
    <p className="text-gray-500 text-base leading-relaxed max-w-2xl pl-12">{description}</p>
  </div>
);

export default function ToursListingPage() {
  const [expandedFlyInn, setExpandedFlyInn] = useState<string | null>(null);
  const [expandedKenya, setExpandedKenya] = useState<string | null>(null);

  const kenyaTours   = toursData.filter((t) => t.category === "kenya-safari");
  const budgetTours  = toursData.filter((t) => t.category === "budget-safari");
  const flyInnTours  = toursData.filter((t) => t.category === "fly-inn-safari");

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <h1 className="text-5xl font-extrabold mb-3 text-[#4B5320]">Our Safari Adventures</h1>
      <p className="text-gray-500 mb-16 text-lg">Choose your next journey into the wild.</p>

      {/* ── 1. KENYA SAFARIS ─────────────────────────────────────────────────── */}
      <section className="mb-28">
        <SectionHeader
          icon="🦁"
          title="Kenya Safaris"
          description="Private road safaris across Kenya's finest national parks and reserves — your own vehicle, your own pace, certified expert guide included."
        />

        {/* Tour cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {kenyaTours.map((tour) => <TourCard key={tour.slug} tour={tour} />)}
        </div>

        {/* Pricing tables — collapsible per safari */}
        <div className="rounded-3xl border border-gray-200 overflow-hidden">
          <div className="bg-[#4B5320] px-8 py-5 flex items-center justify-between">
            <div>
              <p className="text-white font-black text-lg">Full Seasonal Pricing</p>
              <p className="text-white/60 text-xs">Rates per person sharing · USD · Private vehicle</p>
            </div>
            <div className="text-white/40 text-xs hidden sm:block">Click a safari to expand</div>
          </div>

          {KENYA_PRICE_TABLES.map((safari, i) => (
            <div key={safari.slug} className={i > 0 ? "border-t border-gray-100" : ""}>
              <button
                className="w-full flex items-center justify-between px-8 py-4 hover:bg-gray-50 transition text-left"
                onClick={() => setExpandedKenya(expandedKenya === safari.slug ? null : safari.slug)}
              >
                <div className="flex items-center gap-3">
                  <Link href={`/tours/${safari.slug}`} onClick={(e) => e.stopPropagation()} className="text-[#4B5320] font-bold hover:underline text-sm">{safari.title}</Link>
                </div>
                {expandedKenya === safari.slug
                  ? <ChevronUp size={16} className="text-gray-400" />
                  : <ChevronDown size={16} className="text-gray-400" />}
              </button>

              {expandedKenya === safari.slug && (
                <div className="px-8 pb-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-2 text-xs font-bold uppercase tracking-wider text-gray-400">Travel Dates</th>
                        <th className="text-right py-2 text-xs font-bold uppercase tracking-wider text-gray-400">2–3 pax</th>
                        <th className="text-right py-2 text-xs font-bold uppercase tracking-wider text-gray-400">4–5 pax</th>
                        <th className="text-right py-2 text-xs font-bold uppercase tracking-wider text-gray-400">6 pax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {safari.seasons.map((s) => (
                        <tr key={s.label} className="border-b border-gray-50 last:border-0">
                          <td className="py-2 text-gray-600">{s.label}</td>
                          <td className="py-2 text-right font-black text-[#4B5320]">{s["2-3 pax"]}</td>
                          <td className="py-2 text-right font-bold text-gray-700">{s["4-5 pax"]}</td>
                          <td className="py-2 text-right font-bold text-gray-700">{s["6 pax"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Inclusions note */}
        <div className="mt-6 rounded-2xl bg-[#f8f6f1] border border-[#e8e0d0] px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {["Full board accommodation", "Private safari microbus (roof hatch & UHF radio)", "All game drives", "Certified English-speaking driver-guide", "All park entry fees", "Fuel & driver allowances", "24hr backup support"].map((i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={13} className="text-[#4B5320] shrink-0" />
                {i}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            <span className="font-semibold text-gray-500">Not included:</span> International flights & visas · Tips & personal expenses · Credit card surcharge 5–7% or bank transfer fee USD 50
          </p>
        </div>
      </section>

      {/* ── 2. BUDGET GROUP JOINING SAFARIS ──────────────────────────────────── */}
      <section className="mb-28">
        <SectionHeader
          icon="🤝"
          title="Budget Group Joining Safaris"
          description="Travel with a shared group in a luxury land cruiser — all the wildlife, all the memories, at wallet-friendly per-person prices. Rates vary by season and room type."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {budgetTours.map((tour) => <TourCard key={tour.slug} tour={tour} />)}
        </div>

        {/* Budget pricing table */}
        <div className="rounded-3xl border border-gray-200 overflow-hidden">
          <div className="bg-[#4B5320] px-8 py-5">
            <p className="text-white font-black text-lg">Group Joining Rates</p>
            <p className="text-white/60 text-xs">Per person · USD · Rates vary Jan–Jun vs Jul–Dec 2026</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-8 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Safari</th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 hidden sm:table-cell">Route</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Jan–Jun</th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Jul–Dec</th>
                  <th className="text-right px-8 py-3 text-xs font-bold uppercase tracking-wider text-gray-400">Single Supp.</th>
                </tr>
              </thead>
              <tbody>
                {BUDGET_TABLES.map((safari, i) => (
                  <tr key={safari.slug} className={`border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}>
                    <td className="px-8 py-4">
                      <Link href={`/tours/${safari.slug}`} className="text-[#4B5320] font-bold hover:underline text-sm">{safari.title}</Link>
                    </td>
                    <td className="px-4 py-4 text-gray-500 text-xs hidden sm:table-cell">{safari.route}</td>
                    <td className="px-4 py-4 text-right font-black text-[#4B5320]">{safari.seasons[0].sharing}</td>
                    <td className="px-4 py-4 text-right font-bold text-gray-700">{safari.seasons[1]?.sharing ?? "—"}</td>
                    <td className="px-8 py-4 text-right text-gray-500 text-xs">{safari.seasons[0].single}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Budget inclusions */}
        <div className="mt-6 rounded-2xl bg-[#f8f6f1] border border-[#e8e0d0] px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury safari land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"].map((i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={13} className="text-[#4B5320] shrink-0" />
                {i}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            <span className="font-semibold text-gray-500">Not included:</span> International flights & visas · Tips & personal expenses · Credit card surcharge 5–7% or bank transfer fee USD 50
          </p>
        </div>
      </section>

      {/* ── 3. FLY-INN SAFARIS ───────────────────────────────────────────────── */}
      <section className="mb-28">
        <SectionHeader
          icon="✈️"
          title="Fly-Inn Safaris"
          description="Skip the road — fly direct into Masai Mara or the Serengeti in under an hour. Land straight into luxury lodge life with expert game drives. Rates per adult sharing, all flight taxes included."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {flyInnTours.map((tour) => <TourCard key={tour.slug} tour={tour} />)}
        </div>

        {/* Fly-inn pricing cards with collapsible tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {FLY_INN_TABLES.map((safari) => (
            <div key={safari.slug} className="rounded-3xl border border-gray-200 overflow-hidden">
              {/* Card header */}
              <div className="bg-gradient-to-br from-[#1a1208] to-[#2d3a10] px-6 py-5">
                <div className="flex items-center gap-2 mb-2">
                  <Plane size={13} className="text-[#D4AF37]" />
                  <span className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase">
                    {safari.flag} {safari.departure}
                  </span>
                </div>
                <h3 className="text-white font-black text-lg mb-1">{safari.title}</h3>
                <p className="text-white/50 text-xs">🏨 {safari.lodge}</p>
              </div>

              {/* Seasonal rates */}
              <div className="px-6 py-5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">Rates Per Adult Sharing (USD)</p>
                <div className="space-y-2 mb-4">
                  {safari.seasons.map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                      <span className="text-xs text-gray-600">{s.label}</span>
                      <span className="text-sm font-black text-[#4B5320]">{s.price}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 italic mb-4">{safari.note}</p>
                <Link
                  href={`/tours/${safari.slug}`}
                  className="block w-full text-center py-3 rounded-xl bg-[#4B5320] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#3a411a] transition"
                >
                  View Itinerary & Book
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Fly-inn inclusions / exclusions */}
        <div className="rounded-2xl bg-[#f0f4e8] border border-[#d0dbb8] px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-[#4B5320] mb-3">Included in All Fly-Inn Safaris</p>
              <ul className="space-y-2">
                {["Return flights incl. all taxes", "Full board lodge accommodation", "Game drives in lodge 4x4 vehicles", "Professional English-speaking driver-guide", "Airstrip transfers at destination", "24-hour backup support"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={13} className="text-[#4B5320] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">Not Included</p>
              <ul className="space-y-1 text-sm text-gray-500">
                <li>• International flights & visa costs</li>
                <li>• Masai Mara park entry fee USD 200–400 per adult (payable on arrival)</li>
                <li>• Serengeti park & concession fees USD 300–450 (payable on check-in)</li>
                <li>• Tips, drinks, laundry & personal costs</li>
                <li>• Optional activities (village visits, nature walks, balloon rides)</li>
                <li>• Credit card surcharge 5–7% or bank transfer fee USD 50</li>
              </ul>
              <p className="mt-3 text-xs text-gray-400 italic">✈️ Baggage limit: 15kg per person in soft/duffel bags</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SAFARI STYLES & DESTINATIONS ─────────────────────────────────────── */}
      <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-black text-[#4B5320] mb-8">Explore Safari Styles</h2>
          <div className="space-y-6">
            <SafariDropdown title="🦁 Kenya Safaris (Private)" items={["3-Day Masai Mara", "3-Day Amboseli", "4-Day Mara & Nakuru", "4-Day Northern Kenya", "5-Day Mara, Nakuru & Naivasha", "6-Day Mara, Nakuru & Amboseli", "7-Day Grand Kenya Safari"]} />
            <SafariDropdown title="🤝 Budget Group Joining Safaris" items={["3-Day Masai Mara Group", "4-Day Mara & Nakuru Group", "5-Day Mara, Nakuru & Naivasha Group", "7-Day Grand Kenya Circuit Group"]} />
            <SafariDropdown title="✈️ Fly-Inn Safaris (Kenya)" items={["3-Day Masai Mara Flying Safari", "4-Day Masai Mara Flying Safari"]} />
            <SafariDropdown title="✈️ Fly-Inn Safaris (Tanzania)" items={["3-Day Serengeti Flying Safari", "4-Day Serengeti Flying Safari", "4-Day Serengeti & Ngorongoro Road Safari"]} />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#4B5320] mb-8">Our Esteemed Destinations</h2>
          <DestinationCrawler />
        </div>
      </section>

      {/* ── RESERVE YOUR JOURNEY BANNER ─────────────────────────────────────── */}
      <section className="mb-16">
        <div className="rounded-4xl overflow-hidden border border-gray-100 shadow-lg">
          <div className="p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10"
            style={{ background: "linear-gradient(145deg, #1a1208 0%, #2d3a10 100%)" }}>
            <div className="flex-1">
              <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase text-[#c8a96e] border border-[#c8a96e]/40 px-3 py-1 rounded-full mb-6 w-fit">
                Reserve Your Journey
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                The Wild<br /><span className="text-[#D4AF37]">Awaits You</span>
              </h2>
              <div className="w-10 h-0.5 bg-[#c8a96e] mb-5" />
              <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
                Secure your spot on one of East Africa's most extraordinary safari experiences.
                Expert guides, exclusive access, and memories for a lifetime.
              </p>
              <div className="flex flex-col gap-3">
                {["Secure Stripe & M-Pesa Payments", "Instant booking confirmation via email", "24/7 Ground support once you land"].map(text => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                    <span className="text-white/70 text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 shrink-0">
              <Link href="/contact"
                className="px-14 py-5 rounded-2xl font-black uppercase tracking-widest text-base text-center transition-all duration-200 hover:scale-105 hover:opacity-90"
                style={{ background: "#D4AF37", color: "#1a1208" }}>
                Book Now
              </Link>
              <p className="text-white/40 text-xs tracking-wide text-center">No commitment · Free consultation</p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
