"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
//  IMPORTANT: Photos must be in  my-tours-app/public/assets/photos/
//  Run this once in your terminal to move them:
//    mkdir -p public/assets/photos
//    mv assets/photos/* public/assets/photos/
//
//  To add more photos: drop the file in public/assets/photos/,
//  then uncomment the matching line below.
// ─────────────────────────────────────────────────────────────────
const photos = [
  { src: "/assets/photos/beach.jpg", alt: "Malindi Beach — MALINDI written in the sand" },
  { src: "/assets/photos/mountkenya.jpg", alt: "Mount Kenya reflected in a still alpine lake" },
  { src: "/assets/photos/mountkilimanjaro.jpg", alt: "Mount Kilimanjaro rising above the Amboseli plains" },
  { src: "/assets/photos/nomad diani.jpg", alt: "Nomad Beach Bar & Restaurant, Diani at twilight" },
  { src: "/assets/photos/photo5.jpeg", alt: "Leopard cub peering through acacia thorns" },
  { src: "/assets/photos/photo6.jpeg", alt: "Leopard with prey high in an acacia tree, Masai Mara" },
  { src: "/assets/photos/photo7.jpeg",  alt: "" },
  { src: "/assets/photos/photo8.jpeg",  alt: "" },
  { src: "/assets/photos/photo9.jpeg",  alt: "" },
  { src: "/assets/photos/photo10.jpeg", alt: "" },
  { src: "/assets/photos/photo11.jpeg", alt: "" },
  { src: "/assets/photos/photo12.jpeg", alt: "" },
  { src: "/assets/photos/photo13.jpeg", alt: "" },
  { src: "/assets/photos/photo14.jpeg", alt: "" },
  { src: "/assets/photos/photo15.jpeg", alt: "" },
  { src: "/assets/photos/photo16.jpeg", alt: "" },
  { src: "/assets/photos/photo17.jpeg", alt: "" },
  { src: "/assets/photos/photo18.jpeg", alt: "" },
  { src: "/assets/photos/photo19.jpeg", alt: "" },
  { src: "/assets/photos/photo20.jpeg", alt: "" },
  { src: "/assets/photos/photo21.jpeg", alt: "" },
  { src: "/assets/photos/photo22.jpeg", alt: "" },
  { src: "/assets/photos/photo23.jpeg", alt: "" },
  { src: "/assets/photos/photo24.jpeg", alt: "" },
  { src: "/assets/photos/photo25.jpeg", alt: "" },
  { src: "/assets/photos/photo26.jpeg", alt: "" },
  { src: "/assets/photos/photo27.jpeg", alt: "" },
  { src: "/assets/photos/photo28.jpeg", alt: "" },
  { src: "/assets/photos/photo29.jpeg", alt: "" },
  { src: "/assets/photos/photo30.jpeg", alt: "" },
  { src: "/assets/photos/photo31.jpeg", alt: "" },
  { src: "/assets/photos/photo32.jpeg", alt: "" },
  { src: "/assets/photos/photo33.jpeg", alt: "" },
  { src: "/assets/photos/photo34.jpeg", alt: "" },
  { src: "/assets/photos/photo35.jpeg", alt: "" },
  { src: "/assets/photos/photo36.jpeg", alt: "" },
  { src: "/assets/photos/photo37.jpeg", alt: "" },
  { src: "/assets/photos/photo38.jpeg", alt: "" },
  { src: "/assets/photos/photo39.jpeg", alt: "" },
  { src: "/assets/photos/photo40.jpeg", alt: "" },
  { src: "/assets/photos/photo41.jpeg", alt: "" },
  { src: "/assets/photos/image.png", alt: "" },
  { src: "/assets/photos/Dubai1.jpeg", alt: "" },
  { src: "/assets/photos/Dubai2.jpeg", alt: "" },
  { src: "/assets/photos/Zebra1.jpeg", alt: "" },
  { src: "/assets/photos/gazzele.jpeg", alt: "" },
  { src: "/assets/photos/logo.png", alt: "" },
  


  ];


export default function PhotoGalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox(i => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () => setLightbox(i => (i === null ? null : (i + 1) % photos.length));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft")  prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape")     setLightbox(null);
  };

  return (
    <main className="pt-32 pb-20 px-6 bg-[#f8f6f1] min-h-screen" onKeyDown={handleKey} tabIndex={-1}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
            Photo Gallery
          </span>
          <h1 className="text-5xl font-bold text-[#4B5320] mb-4">Safari Moments</h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            A visual journey through East Africa&apos;s most breathtaking wildlife and landscapes.
          </p>
          <p className="text-gray-400 text-sm mt-3">{photos.length} photos</p>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <ZoomIn size={20} className="text-[#4B5320]" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-4 py-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs font-semibold leading-snug">{photo.alt}</p>
              </div>
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="bg-black/50 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {i + 1} / {photos.length}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Want to create your own safari memories?</p>
          <a href="/tours" className="inline-block bg-[#4B5320] text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#3a4118] transition-colors shadow-md">
            Explore Tours
          </a>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-200 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10" onClick={() => setLightbox(null)}>
            <X size={22} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10" onClick={e => { e.stopPropagation(); prev(); }}>
            <ChevronLeft size={26} />
          </button>
          <div className="max-w-5xl max-h-[85vh] w-full mx-20" onClick={e => e.stopPropagation()}>
            <Image
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              sizes="90vw"
              priority
            />
            <p className="text-white/50 text-xs text-center mt-3">
              {photos[lightbox].alt}
              <span className="mx-2 opacity-40">·</span>
              {lightbox + 1} of {photos.length}
            </p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10" onClick={e => { e.stopPropagation(); next(); }}>
            <ChevronRight size={26} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 flex-wrap justify-center max-w-sm">
            {photos.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setLightbox(i); }}
                className={`rounded-full transition-all duration-200 ${i === lightbox ? "w-4 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
