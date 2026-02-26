import { StaticImageData } from "next/image";

// Image Imports - These resolve the "tourSafari is not defined" error
import tourSafari from "@/assets/tour-safari.jpg";
import tourBeach from "@/assets/tour-beach.jpg";
import tourMountain from "@/assets/tour-mountain.jpg";
import galleryLodge from "@/assets/gallery-lodge.jpg";
import galleryZebras from "@/assets/gallery-zebras.jpg";
import gallerySunset from "@/assets/gallery-sunset.jpg";
import galleryMaasai from "@/assets/gallery-maasai.jpg";
import heroSafari from "@/assets/hero-safari.jpg";

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPricing {
  tier: string;
  price: string;
  includes: string[];
}

export interface TourData {
  slug: string;
  image: string | StaticImageData; // Allows Next.js image objects
  title: string;
  duration: string;
  price: string;
  description: string;
  longDescription: string;
  location: string;
  groupSize: string;
  difficulty: string;
  gallery: (string | StaticImageData)[]; // Allows array of image objects
  itinerary: TourItineraryDay[];
  pricing: TourPricing[];
}

export const toursData: TourData[] = [
  {
    slug: "masai-mara-safari",
    image: tourSafari, // Now valid because of StaticImageData type
    title: "Masai Mara Safari",
    duration: "5 Days",
    price: "From $1,200",
    description: "Witness the Great Migration and encounter the Big Five in Kenya's most iconic wildlife reserve.",
    longDescription:
      "Embark on an unforgettable 5-day journey through the Masai Mara, home to the world-famous Great Migration. Experience close encounters with lions, elephants, leopards, buffalo, and rhinos while staying in luxury tented camps under the African stars.",
    location: "Masai Mara, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: [tourSafari, galleryZebras, gallerySunset, galleryLodge, galleryMaasai, heroSafari],
    itinerary: [
      { day: 1, title: "Arrival & Transfer", description: "Arrive in Nairobi. Meet your guide and transfer to the Masai Mara." },
      { day: 2, title: "Morning & Afternoon Game Drives", description: "Full day of game drives exploring the Mara Triangle." },
      { day: 3, title: "Great Migration & Mara River", description: "Witness the dramatic Mara River crossing (seasonal)." },
      { day: 4, title: "Balloon Safari & Night Drive", description: "Optional hot air balloon safari at dawn." },
      { day: 5, title: "Final Game Drive & Departure", description: "Early morning game drive for last wildlife sightings." },
    ],
    pricing: [
      { tier: "Standard", price: "$1,200", includes: ["Shared game drives", "Standard tented camp"] },
      { tier: "Luxury", price: "$2,400", includes: ["Private game drives", "Luxury lodge"] },
    ],
  },
  {
    slug: "diani-beach-escape",
    image: tourBeach,
    title: "Diani Beach Escape",
    duration: "7 Days",
    price: "From $950",
    description: "Relax on pristine white sand beaches along the stunning Kenyan coastline.",
    longDescription:
      "Unwind on the award-winning Diani Beach with 7 days of tropical paradise. Swim in turquoise waters and explore coral reefs.",
    location: "Diani Beach, Kenya",
    groupSize: "2–12 people",
    difficulty: "Easy",
    gallery: [tourBeach, gallerySunset, galleryLodge, heroSafari],
    itinerary: [
      { day: 1, title: "Arrival", description: "Transfer to Diani Beach resort." },
      { day: 2, title: "Snorkelling", description: "Afternoon snorkelling trip to the coral reef." },
    ],
    pricing: [
      { tier: "Standard", price: "$950", includes: ["Beach resort stay", "Breakfast"] },
    ],
  },
  {
    slug: "mount-kenya-trek",
    image: tourMountain,
    title: "Mount Kenya Trek",
    duration: "4 Days",
    price: "From $800",
    description: "Conquer Africa's second-highest peak through lush alpine meadows.",
    longDescription:
      "Challenge yourself with a 4-day trek to Point Lenana on Mount Kenya (4,985m).",
    location: "Mount Kenya National Park",
    groupSize: "4–10 people",
    difficulty: "Moderate to Challenging",
    gallery: [tourMountain, gallerySunset, galleryLodge, heroSafari],
    itinerary: [
      { day: 1, title: "Trailhead", description: "Drive to Sirimon Gate (2,650m)." },
      { day: 2, title: "Shipton's Camp", description: "Trek through moorland to 4,200m." },
    ],
    pricing: [
      { tier: "Standard", price: "$800", includes: ["Mountain guide", "Park fees"] },
    ],
  },
];
