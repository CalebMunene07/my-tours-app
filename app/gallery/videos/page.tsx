"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";

// ── Add your video files from src/assets/video/ ──
// For local MP4s use require(); for YouTube embeds use type:"youtube" + embedId
const videos: VideoItem[] = [
  {
    type: "local",
    src: require("@/assets/video/video1.mp4"),
    poster: require("@/assets/photo/photo1.jpg"),
    title: "Masai Mara Game Drive",
    description: "Lions, cheetahs and the great migration up close.",
    duration: "2:34",
  },
  {
    type: "local",
    src: require("@/assets/video/video2.mp4"),
    poster: require("@/assets/photo/photo3.jpg"),
    title: "Amboseli Elephants",
    description: "Gentle giants crossing the plains with Kilimanjaro behind.",
    duration: "1:52",
  },
  {
    type: "local",
    src: require("@/assets/video/video3.mp4"),
    poster: require("@/assets/photo/photo9.jpg"),
    title: "Lake Nakuru Flamingos",
    description: "Thousands of flamingos paint the lake pink at sunrise.",
    duration: "3:10",
  },
  {
    type: "local",
    src: require("@/assets/video/video4.mp4"),
    poster: require("@/assets/photo/photo5.jpg"),
    title: "Hot Air Balloon Safari",
    description: "A birds-eye view of the Mara from above.",
    duration: "4:02",
  },
  {
    type: "local",
    src: require("@/assets/video/video5.mp4"),
    poster: require("@/assets/photo/photo12.jpg"),
    title: "Lamu Island Retreat",
    description: "Dhow sailing, ancient streets and ocean sunsets.",
    duration: "2:18",
  },
  {
    type: "local",
    src: require("@/assets/video/video6.mp4"),
    poster: require("@/assets/photo/photo2.jpg"),
    title: "Samburu Cultural Experience",
    description: "Meeting the Samburu people and learning their traditions.",
    duration: "5:44",
  },
];

interface LocalVideoItem {
  type: "local";
  src: string;
  poster: string;
  title: string;
  description: string;
  duration: string;
}
interface YoutubeVideoItem {
  type: "youtube";
  embedId: string;
  poster?: string;
  title: string;
  description: string;
  duration: string;
}
type VideoItem = LocalVideoItem | YoutubeVideoItem;

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
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden bg-[#1a1f12] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
              onClick={() => setPlaying(i)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                {video.type === "local" && video.poster && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={typeof video.poster === "object" ? video.poster.default || video.poster.src || video.poster : video.poster} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                )}
                {video.type === "youtube" && video.poster && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"/>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-[#D4AF37] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                    <Play size={22} className="text-[#1a1f12] ml-1" fill="currentColor"/>
                  </div>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                  {video.duration}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-bold text-white text-base mb-1">{video.title}</h3>
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

      {/* ── VIDEO MODAL ── */}
      {playing !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setPlaying(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
            onClick={() => setPlaying(null)}
          >
            <X size={22} />
          </button>

          <div
            className="w-full max-w-4xl relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
              {videos[playing].type === "local" && (
                <video
                  src={(videos[playing] as LocalVideoItem).src}
                  controls
                  autoPlay
                  className="w-full h-full"
                  poster={typeof (videos[playing] as LocalVideoItem).poster === "object"
                    ? ((videos[playing] as LocalVideoItem).poster as unknown as { src: string }).src
                    : (videos[playing] as LocalVideoItem).poster}
                />
              )}
              {videos[playing].type === "youtube" && (
                <iframe
                  src={`https://www.youtube.com/embed/${(videos[playing] as YoutubeVideoItem).embedId}?autoplay=1`}
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
