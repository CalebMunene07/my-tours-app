"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { toursData } from "@/data/tours";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const tour = toursData.find((t) => t.slug === id);

  if (!tour) return (
    <div className="pt-24 text-center min-h-screen bg-white text-gray-900">
      Tour not found
    </div>
  );

  // ✅ Extract pricing tiers from tour data
  const pricingTiers = tour.pricing.map(p => p.tier);

  const highlights = [
    { title: "The Great Migration", desc: "Witness thousands of wildebeest cross the Mara River.", img:  "/thegreatmigration.jpg"},
    { title: "Luxury Camping", desc: "Experience the wild without sacrificing comfort.", img: "/gallery-lodge.jpg" },
    { title: "Sundowner Views", desc: "Golden hour drinks overlooking the vast savannah.", img: "/hero-safari.jpg" },
  ];

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <div className="h-24" />

      <div className="px-6 max-w-7xl mx-auto pb-20">
        <button 
          onClick={() => router.back()} 
          className="mb-8 flex items-center gap-2 text-[#4B5320] font-bold hover:-translate-x-1 transition-transform"
        >
          <span className="text-xl">←</span> Back to All Tours
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side: Content */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-video">
              <Image 
                src={tour.image} 
                alt={tour.title} 
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="mt-8">
              <span className="text-[#4B5320] font-bold tracking-widest uppercase text-sm">
                {tour.location} • {tour.duration}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-2 text-gray-900">
                {tour.title}
              </h1>
              
              <div className="mt-10">
                <h3 className="text-2xl font-bold border-b border-gray-100 pb-4">Overview</h3>
                <p className="mt-6 text-gray-600 leading-relaxed text-lg">
                  {tour.longDescription}
                </p>
              </div>

              {/* Highlights Section */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold mb-6">Experience Highlights</h3>
                <div className="flex flex-col md:flex-row gap-3 h-112.5 w-full">
                  {highlights.map((item, index) => (
                    <div 
                      key={index}
                      className="relative flex-1 hover:flex-3 transition-all duration-700 ease-in-out overflow-hidden rounded-2xl group cursor-pointer shadow-md"
                    >
                      <Image 
                        src={item.img} 
                        alt={item.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <h4 className="text-white text-xl font-bold mb-2 uppercase tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-white/0 group-hover:text-white transition-all duration-500 delay-100 text-sm leading-snug line-clamp-3">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Booking Form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Book This Tour</h2>
              <p className="text-gray-500 mb-6 text-sm">Secure your spot on this unforgettable journey.</p>
              
              {/* ✅ FIXED: Pass tour.title and pricingTiers so form is pre-filled and correct */}
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