"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sgrPackages } from "@/data/sgrPackages";
import { useVisitorType } from "@/lib/visitorType";

export default function SgrPackagesPage() {
  const { setVisitorType } = useVisitorType();
  const [openHotel, setOpenHotel] = useState<string | null>(null);

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <div className="h-24" />

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 text-center">
        <span className="inline-block bg-[#4B5320]/10 text-[#4B5320] text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          🇰🇪 Resident Rates Only — Priced in KES
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          SGR Beach Packages
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-relaxed">
          Take the Standard Gauge Railway from Nairobi straight to the coast, then unwind at one of
          our partner beach resorts. Rates below are per-person-sharing (PPS) for Kenyan and East
          African residents. Contact us for group rates or to build a custom SGR + stay package.
        </p>
        <Link
          href="/booking"
          onClick={() => setVisitorType("resident")}
          className="inline-block mt-6 bg-[#4B5320] text-white px-8 py-3 rounded-sm font-semibold tracking-wider uppercase text-xs hover:bg-[#3a411a] transition shadow-lg"
        >
          Enquire About a Package
        </Link>
      </div>

      {/* Regions */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-20">
        {sgrPackages.map((region) => (
          <section key={region.key} id={region.key}>
            <div className="relative rounded-3xl overflow-hidden mb-8 aspect-21/9 shadow-lg">
              <Image src={region.image} alt={region.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">{region.title}</h2>
                <p className="text-white/80 text-sm mt-1">{region.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {region.hotels.map((hotel) => {
                const hotelId = `${region.key}-${hotel.name}`;
                const isOpen = openHotel === hotelId;
                return (
                  <div
                    key={hotelId}
                    className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenHotel(isOpen ? null : hotelId)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{hotel.name}</p>
                        <p className="text-[11px] font-bold tracking-widest uppercase text-[#4B5320] mt-0.5">
                          {hotel.mealPlan}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-right">
                          <span className="block text-[10px] text-gray-400 uppercase tracking-wide">From</span>
                          <span className="block font-black text-[#4B5320]">
                            {hotel.rates[0].ppsRateKES}
                          </span>
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 py-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-[10px] font-bold tracking-widest uppercase text-gray-400 border-b border-gray-100">
                              <th className="text-left pb-2 font-bold">Validity</th>
                              <th className="text-right pb-2 font-bold">PPS Rate</th>
                              <th className="text-right pb-2 font-bold">Min Nights (Xmas)</th>
                              <th className="pb-2"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {hotel.rates.map((r, i) => {
                              const rateNumeric = r.ppsRateKES.replace(/[^0-9.]/g, "");
                              const bookingHref =
                                `/booking?sgrHotel=${encodeURIComponent(hotel.name)}` +
                                `&sgrRegion=${encodeURIComponent(region.key)}` +
                                `&sgrRegionLabel=${encodeURIComponent(region.title)}` +
                                `&sgrMealPlan=${encodeURIComponent(hotel.mealPlan)}` +
                                `&sgrValidity=${encodeURIComponent(r.validity)}` +
                                `&sgrRateKES=${encodeURIComponent(rateNumeric)}` +
                                `&visitor=resident`;
                              return (
                                <tr key={i} className="border-b border-gray-50 last:border-0">
                                  <td className="py-2 text-gray-700">{r.validity}</td>
                                  <td className="py-2 text-right font-bold text-[#4B5320]">{r.ppsRateKES}</td>
                                  <td className="py-2 text-right text-gray-400">{r.minNightsChristmas ?? "—"}</td>
                                  <td className="py-2 pl-3 text-right">
                                    <Link
                                      href={bookingHref}
                                      onClick={() => setVisitorType("resident")}
                                      className="inline-block bg-[#4B5320] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md hover:bg-[#3a411a] transition-colors whitespace-nowrap"
                                    >
                                      Book
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
