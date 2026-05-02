"use client";

// app/tours/[id]/TourDetailClient.tsx
// ── CLIENT COMPONENT — all interactivity lives here ──────────────────────────

import { useRouter } from "next/navigation";
import { toursData } from "@/data/tours";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { CheckCircle2, MapPin, Clock, Users, BarChart2 } from "lucide-react";

export default function TourDetailClient({ id }: { id: string }) {
  const router = useRouter();

  const tour = toursData.find((t) => t.slug === id);

  if (!tour) return (
    <div className="pt-24 text-center min-h-screen bg-white text-gray-900">
      Tour not found
    </div>
  );

  const pricingTiers = tour.pricing.map((p) => p.tier);

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <div className="h-24" />

      <div className="px-6 max-w-7xl mx-auto pb-24">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-[#4B5320] font-bold hover:-translate-x-1 transition-transform"
        >
          <span className="text-xl">←</span> Back to All Tours
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* ── LEFT: Content ── */}
          <div className="lg:col-span-7 space-y-14">

            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-video">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Title & Meta */}
            <div>
              <span className="text-[#4B5320] font-bold tracking-widest uppercase text-sm">
                {tour.location} • {tour.duration}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-2 text-gray-900">
                {tour.title}
              </h1>

              {/* Quick stats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: <MapPin size={16} />,    label: "Location",   val: tour.location },
                  { icon: <Clock size={16} />,     label: "Duration",   val: tour.duration },
                  { icon: <Users size={16} />,     label: "Group Size", val: tour.groupSize },
                  { icon: <BarChart2 size={16} />, label: "Difficulty", val: tour.difficulty },
                ].map(({ icon, label, val }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 text-[#4B5320] mb-1">
                      {icon}
                      <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div>
              <h3 className="text-2xl font-bold border-b border-gray-100 pb-4">Overview</h3>
              <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                {tour.longDescription}
              </p>
            </div>

            {/* Gallery */}
            {tour.gallery && tour.gallery.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold border-b border-gray-100 pb-4 mb-6">Photo Gallery</h3>
                <div className="grid grid-cols-2 gap-3">
                  {tour.gallery.map((img, i) => (
                    <div
                      key={i}
                      className={`relative overflow-hidden rounded-2xl shadow-md ${
                        i === 0 ? "col-span-2 aspect-video" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${tour.title} gallery ${i + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold border-b border-gray-100 pb-4 mb-6">Day-by-Day Itinerary</h3>
                <div className="space-y-4">
                  {tour.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-full bg-[#4B5320] text-white flex flex-col items-center justify-center text-xs font-bold leading-tight">
                        <span className="text-[9px] opacity-70 uppercase tracking-wide">Day</span>
                        <span className="text-base leading-none">{day.day}</span>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <h4 className="font-bold text-gray-900 mb-1">{day.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing */}
            {tour.pricing && tour.pricing.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold border-b border-gray-100 pb-4 mb-6">Pricing Packages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tour.pricing.map((pkg) => (
                    <div
                      key={pkg.tier}
                      className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="bg-[#4B5320] px-6 py-4">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-0.5">
                          {pkg.tier} Package
                        </p>
                        <p className="text-white font-bold text-lg">{tour.title}</p>
                        <p className="text-white/50 text-xs">{tour.duration}</p>
                      </div>

                      <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">
                          Starting From
                        </p>
                      </div>

                      <div className="px-6 py-5 grid grid-cols-2 gap-4 border-b border-gray-100">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-base">🇰🇪</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                              Residents (KES)
                            </span>
                          </div>
                          <p className="text-2xl font-black text-[#4B5320]">{pkg.priceKES}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-base">🌍</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                              International (USD)
                            </span>
                          </div>
                          <p className="text-2xl font-black text-gray-900">{pkg.priceUSD}</p>
                        </div>
                      </div>

                      <div className="px-6 py-5">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-3">
                          Includes
                        </p>
                        <ul className="space-y-2">
                          {pkg.includes.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle2 size={14} className="text-[#4B5320] shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT: Booking Form ── */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100">
              <h2 className="text-2xl font-bold mb-1 text-gray-900">Book This Tour</h2>
              <p className="text-gray-400 mb-6 text-sm">Secure your spot on this unforgettable journey.</p>
              <BookingForm
                tourTitle={tour.title}
                pricingTiers={pricingTiers}
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
