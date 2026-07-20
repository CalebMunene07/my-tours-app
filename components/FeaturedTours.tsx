"use client";

import Link from "next/link";
import Image from "next/image";
import { toursData } from "@/data/tours";
import { useVisitorType, type VisitorType } from "@/lib/visitorType";

/**
 * CATEGORIES now reflect the three docx source files:
 *  1. kenya-safari      → Kenya_Safaris.docx   (private road safaris)
 *  2. budget-safari     → Budget_safaris.docx  (group joining safaris)
 *  3. fly-inn-safari    → Fly_inn_safaris.docx (fly-in + Serengeti road)
 *
 * Update the `category` field on each TourData entry in tours.ts to match.
 */

const CATEGORIES = [
  {
    key: "kenya-safari",
    label: "Kenya Safaris",
    icon: "🦁",
    description: "Private road safaris across Kenya's finest national parks & reserves",
  },
  {
    key: "budget-safari",
    label: "Budget Group Joining Safaris",
    icon: "🤝",
    description: "Join a shared group — all the wildlife, wallet-friendly prices",
  },
  {
    key: "fly-inn-safari",
    label: "Fly-Inn Safaris",
    icon: "✈️",
    description: "Skip the road — fly direct into Masai Mara or the Serengeti",
  },
];

interface TourPricingTier {
  priceUSD: string;
  priceKES: string;
}

interface Tour {
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  category: string;
  pricing?: TourPricingTier[];
}

/**
 * Resolves the price string to display for a tour given the selected
 * visitor type. Non-residents see the existing USD "From $X" price.
 * Residents see the KES rate from the tour's first pricing tier, when
 * available (falls back to the USD price if a tour has no KES rate yet).
 */
function displayPrice(tour: Tour, visitorType: VisitorType): string {
  if (visitorType === "resident" && tour.pricing?.[0]?.priceKES) {
    const kes = tour.pricing[0].priceKES.split(" ")[0].split("/")[0];
    return `From ${kes.startsWith("KSh") ? kes : `KSh ${kes}`}`;
  }
  return tour.price;
}

const TourCard = ({ tour, visitorType }: { tour: Tour; visitorType: VisitorType }) => (
  <Link href={`/tours/${tour.slug}?visitor=${visitorType}`} className="group block">
    <div className="relative overflow-hidden rounded-2xl mb-5 aspect-3/4 shadow-lg">
      <Image
        src={tour.image}
        alt={tour.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-2">
        <span className="bg-[#4B5320] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
          {tour.duration}
        </span>
        <span className="bg-white/90 text-[#4B5320] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-lg shadow-lg">
          {visitorType === "resident" ? "Resident Rate" : "Non-Resident Rate"}
        </span>
      </div>
    </div>
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4B5320] transition-colors">
        {tour.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
        {tour.description}
      </p>
      <p className="text-[#4B5320] font-bold text-lg pt-1">{displayPrice(tour, visitorType)}</p>
    </div>
  </Link>
);

/* ── Resident / Non-Resident dropdown ────────────────────────────────────── */
const VisitorTypeDropdown = () => {
  const { visitorType, setVisitorType } = useVisitorType();

  return (
    <div className="inline-flex items-center gap-2 bg-white border-2 border-[#4B5320]/20 rounded-full px-2 py-1.5 shadow-sm">
      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400 pl-2">
        Rates for
      </span>
      <select
        value={visitorType}
        onChange={(e) => setVisitorType(e.target.value as VisitorType)}
        className="bg-transparent text-[#4B5320] font-bold text-sm pr-2 py-1 focus:outline-none cursor-pointer"
        aria-label="Select Resident or Non-Resident pricing"
      >
        <option value="non-resident">Non-Resident</option>
        <option value="resident">Resident</option>
      </select>
    </div>
  );
};

const FeaturedTours = () => {
  const { visitorType } = useVisitorType();

  return (
    <section id="tours" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[#4B5320] font-medium tracking-[0.3em] uppercase text-sm mb-3">
            Our Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Tour Categories
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto leading-relaxed">
            From untamed wilderness to coastal escapes — every journey crafted for you.
          </p>
          <div className="mt-6 flex justify-center">
            <VisitorTypeDropdown />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-24">
          {CATEGORIES.map((cat) => {
            const tours = (toursData as Tour[])
              .filter((t) => t.category === cat.key)
              .slice(0, 3);

            if (tours.length === 0) return null;

            return (
              <div key={cat.key}>
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3 border-b border-gray-100 pb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl">{cat.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {cat.label}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm pl-11">{cat.description}</p>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {tours.map((tour) => (
                    <TourCard key={tour.slug} tour={tour} visitorType={visitorType} />
                  ))}
                </div>

                {/* See More Button */}
                <div className="text-center mt-12">
                  <Link
                    href={`/tours?category=${cat.key}&visitor=${visitorType}`}
                    className="inline-flex items-center gap-2 border-2 border-[#4B5320] text-[#4B5320] px-10 py-3 rounded-sm font-semibold tracking-wider uppercase text-xs hover:bg-[#4B5320] hover:text-white transition-all duration-200"
                  >
                    See More {cat.label}
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-24">
          <Link
            href={`/tours?visitor=${visitorType}`}
            className="inline-block bg-[#4B5320] text-white px-14 py-4 rounded-sm font-semibold tracking-wider uppercase text-sm hover:bg-[#3a411a] transition shadow-lg"
          >
            View All Tours
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedTours;
