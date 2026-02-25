"use client";
import { use } from "react";
import { useRouter } from "next/navigation";
import { toursData } from "@/data/tours";
import Image from "next/image";
import BookingForm from "@/components/BookingForm"; // Make sure this import exists!

export default function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const tour = toursData.find((t) => t.slug === id);

  if (!tour) return <div className="pt-24 text-center">Tour not found</div>;

  const pricingTiers = tour.pricing.map(p => p.tier);

  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <button onClick={() => router.back()} className="mb-6 text-[#4B5320] font-bold hover:underline">
        ← Back to All Tours
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Content */}
        <div className="lg:col-span-7">
          <Image 
            src={tour.image} 
            alt={tour.title} 
            width={800} 
            height={500} 
            className="rounded-3xl object-cover w-full aspect-video shadow-lg" 
          />
          <h1 className="text-4xl font-extrabold mt-8 text-gray-900">{tour.title}</h1>
          <p className="text-[#4B5320] font-semibold mt-2">{tour.location} • {tour.duration}</p>
          
          <div className="mt-8 prose prose-slate">
            <h3 className="text-2xl font-bold">Overview</h3>
            <p className="mt-4 text-gray-600 leading-relaxed">{tour.longDescription}</p>
          </div>
        </div>

        {/* Right Side: Booking Form (The missing piece!) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Book This Tour</h2>
            {/* THIS IS THE FORM THAT WAS MISSING */}
            <BookingForm 
              tourTitle={tour.title} 
              pricingTiers={pricingTiers} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}