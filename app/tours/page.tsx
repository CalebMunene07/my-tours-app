"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toursData } from "@/data/tours";
import { CheckCircle2, Tent, Crown, Gem, Heart } from "lucide-react";
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
      description: "Romantic and surprise experiences.",
      features: [
        "Personalised Surprise Itinerary",
        "Romantic Bush Candlelit Dinner",
        "Rose Petal & Champagne Turndown",
        "Couples Spa Treatment",
        "Dedicated Romance Concierge",
        "Anniversary Cake",
        "Private Sundowner",
      ],
      romantic: true,
    },
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto bg-white">
      
      {/* TOURS */}
      <section>
        <h1 className="text-5xl font-extrabold mb-3 text-[#4B5320]">
          Our Safari Adventures
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {toursData.map((tour) => (
            <Link key={tour.slug} href={`/tours/${tour.slug}`}>
              <div className="bg-white rounded-3xl shadow">
                <Image src={tour.image} alt={tour.title} width={400} height={300} />
                <div className="p-4">
                  <h2>{tour.title}</h2>
                  <p>{tour.location}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mt-20">
        <div className="grid md:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.name} className="bg-[#4B5320] p-6 rounded-2xl text-white">
              <h3>{pkg.name}</h3>

              <ul>
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <CheckCircle2 size={14} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/contact">Inquire</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}