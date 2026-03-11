"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────────
//  IMPORTANT: Videos must be in  my-tours-app/public/assets/videos/
//  Posters come from             my-tours-app/public/assets/photos/
//  Run this once in your terminal:
//    mkdir -p public/assets/videos
//    mv assets/videos/* public/assets/videos/
//
//  To add more: drop the file in public/assets/videos/,
//  uncomment the block below, fill in title/description/duration.
//  For YouTube: set type "youtube" and add embedId from the URL.
// ─────────────────────────────────────────────────────────────────

type VideoItem = {
  type: "local" | "youtube";
  src?: string;
  embedId?: string;
  poster: string;
  title: string;
  description: string;
  duration: string;
};

const videos: VideoItem[] = [
  {
    type: "local",
    src: "/assets/videos/video1.mp4",
    poster: "/assets/photos/photo6.jpeg",
    title: "Leopard in the Mara",
    description: "A leopard secures prey high in an acacia tree, Masai Mara.",
    duration: "0:45",
  },
  {
    type: "local",
    src: "/assets/videos/video2.mp4",
    poster: "/assets/photos/photo5.jpeg",
    title: "Leopard Cub Sighting",
    description: "Rare close-up of a leopard cub hiding in the bush.",
    duration: "0:32",
  },
  {
    type: "local",
    src: "/assets/videos/video3.mp4",
    poster: "/assets/photos/mountkilimanjaro.jpg",
    title: "Amboseli & Kilimanjaro",
    description: "Game drive with Mount Kilimanjaro on the horizon.",
    duration: "1:20",
  },
  {
    type: "local",
    src: "/assets/videos/video4.mp4",
    poster: "/assets/photos/photo4.jpg",
    title: "Diani Beach Sunset",
    description: "An evening at Nomad Beach Bar with the Indian Ocean as backdrop.",
    duration: "0:55",
  },
  {
    type: "local",
    src: "/assets/videos/video5.mp4",
    poster: "/assets/photos/gallery-maasai.jpg",
    title: "Maasai Warriors Trek",
    description: "Trekking through the alpine moorlands of Masaai.",
    duration: "2:10",
  },
  {
    type: "local",
    src: "/assets/videos/video6.mp4",
    poster: "/assets/photos/beach.jpg",
    title: "Malindi Coastline",
    description: "Crystal-clear waters and white sand beaches of Malindi.",
    duration: "1:05",
  },
  // ── Add more local videos here ──
  // {
  //   type: "local",
  //   src: "/assets/videos/video7.mp4",
  //   poster: "/assets/photos/photo7.jpg",
  //   title: "Your Title",
  //   description: "Your description.",
  //   duration: "0:00",
  // },
  // ── YouTube video example ──
  // {
  //   type: "youtube",
  //   embedId: "PASTE_YOUTUBE_VIDEO_ID_HERE",
  //   poster: "/assets/photos/photo1.jpg",
  //   title: "YouTube Video Title",
  //   description: "Your description.",
  //   duration: "3:45",
  // },
];

export default function VideoGalleryPage() {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <main className="pt-32 pb-20 px-6 bg-[#0d0f0a] min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full mb-4">
            Video Gallery
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">Safari in Motion</h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Watch the wild come alive — immersive footage from our safaris across Kenya and East Africa.
          </p>
          <p className="text-gray-600 text-sm mt-3">{videos.length} videos</p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-[#1a1f12] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
              onClick={() => setPlaying(i)}
            >
              <div className="relative aspect-video overflow-hidden bg-[#111]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.type === "youtube"
                    ? `https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`
                    : video.poster}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-[#D4AF37] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <Play size={22} className="text-[#1a1f12] ml-1" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {video.duration}
                </div>
                {video.type === "youtube" && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wide">
                    YouTube
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white text-base mb-1 leading-snug">{video.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Ready to write your own story?</p>
          <a href="/tours" className="inline-block bg-[#D4AF37] text-[#1a1f12] px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-[#c8a030] transition-colors shadow-lg">
            Book Your Safari
          </a>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {playing !== null && (
        <div className="fixed inset-0 z-200 bg-black/95 flex items-center justify-center p-4" onClick={() => setPlaying(null)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all z-10" onClick={() => setPlaying(null)}>
            <X size={22} />
          </button>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
              {videos[playing].type === "local" && (
                <video
                  src={videos[playing].src}
                  poster={videos[playing].poster}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              )}
              {videos[playing].type === "youtube" && (
                <iframe
                  src={`https://www.youtube.com/embed/${videos[playing].embedId}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              )}
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-bold text-lg">{videos[playing].title}</p>
              <p className="text-gray-400 text-sm mt-1">{videos[playing].description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}