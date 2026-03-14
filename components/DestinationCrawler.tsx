"use client";

import { useState } from "react";

type Destination = {
  country: string;
  desc: string;
  flagCode: string;
};

const destinations: Destination[] = [
  {
    country: "Kenya",
    flagCode: "ke",
    desc: "Golden savannahs stretch endlessly beneath vast skies where the Great Migration thunders across the plains and ancient cultures thrive beside wild beauty.",
  },
  {
    country: "Tanzania",
    flagCode: "tz",
    desc: "Endless Serengeti horizons where lions roam freely and dawn paints the plains with whispers of adventure.",
  },
  {
    country: "Uganda",
    flagCode: "ug",
    desc: "The Pearl of Africa where misty jungles guard mountain gorillas and emerald landscapes breathe life into every journey.",
  },
  {
    country: "Rwanda",
    flagCode: "rw",
    desc: "A land of a thousand emerald hills where quiet valleys, rare wildlife, and resilient spirit shape a breathtaking nation.",
  },
  {
    country: "Ethiopia",
    flagCode: "et",
    desc: "Ancient kingdoms carved into stone, highland churches touching the clouds, and traditions older than time itself.",
  },
  {
    country: "South Africa",
    flagCode: "za",
    desc: "Where dramatic coastlines meet untamed wilderness and vibrant cities pulse with culture and life.",
  },
  {
    country: "Namibia",
    flagCode: "na",
    desc: "A surreal desert kingdom of towering red dunes, ghostly shipwrecks, and star-lit nights that feel infinite.",
  },
  {
    country: "Botswana",
    flagCode: "bw",
    desc: "A pristine sanctuary where the Okavango Delta spreads life across the desert and elephants roam in majestic silence.",
  },
  {
    country: "Zambia",
    flagCode: "zm",
    desc: "Home of Victoria Falls — the Smoke That Thunders — where untamed rivers and wildlife stir the soul.",
  },
  {
    country: "Morocco",
    flagCode: "ma",
    desc: "A gateway between Africa and Arabia where desert winds carry the scent of spices through ancient souks.",
  },
  {
    country: "Egypt",
    flagCode: "eg",
    desc: "Where the timeless Nile flows past monumental pyramids and every grain of sand echoes with history.",
  },
];

export default function DestinationCrawler() {

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % destinations.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  const destination = destinations[index];

  return (
    <div className="relative border rounded-3xl p-10 bg-white shadow-lg text-center max-w-xl mx-auto">

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#4B5320] text-white rounded-full hover:scale-110 transition"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#4B5320] text-white rounded-full hover:scale-110 transition"
      >
        →
      </button>

      {/* Flag */}
      <div className="flex justify-center mb-6">
        <img
          src={`https://flagcdn.com/w160/${destination.flagCode}.png`}
          alt={`${destination.country} flag`}
          className="w-24 h-24 object-cover rounded-xl shadow-md border"
        />
      </div>

      {/* Country */}
      <h3 className="text-3xl font-black text-[#4B5320] mb-3">
        {destination.country}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
        {destination.desc}
      </p>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {destinations.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-[#4B5320]" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

    </div>
  );
}