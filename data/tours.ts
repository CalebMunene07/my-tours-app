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
  image: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  longDescription: string;
  location: string;
  groupSize: string;
  difficulty: string;
  gallery: string[];
  itinerary: TourItineraryDay[];
  pricing: TourPricing[];
}

export const toursData: TourData[] = [
  {
    slug: "masai-mara-safari",
    image: tourSafari,
    title: "Masai Mara Safari",
    duration: "5 Days",
    price: "From $1,200",
    description: "Witness the Great Migration and encounter the Big Five in Kenya's most iconic wildlife reserve.",
    longDescription:
      "Embark on an unforgettable 5-day journey through the Masai Mara, home to the world-famous Great Migration. Experience close encounters with lions, elephants, leopards, buffalo, and rhinos while staying in luxury tented camps under the African stars. This tour includes guided game drives, cultural visits to Maasai villages, and breathtaking sundowner experiences on the savanna.",
    location: "Masai Mara, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: [tourSafari, galleryZebras, gallerySunset, galleryLodge, galleryMaasai, heroSafari],
    itinerary: [
      { day: 1, title: "Arrival & Transfer", description: "Arrive in Nairobi. Meet your guide and transfer to the Masai Mara by road or scenic flight. Evening welcome dinner at the lodge." },
      { day: 2, title: "Morning & Afternoon Game Drives", description: "Full day of game drives exploring the Mara Triangle. Spot the Big Five and enjoy a bush picnic lunch. Sundowner drinks at sunset." },
      { day: 3, title: "Great Migration & Mara River", description: "Witness the dramatic Mara River crossing (seasonal). Visit a hippo pool and explore the riverine forest. Afternoon cultural visit to a Maasai village." },
      { day: 4, title: "Balloon Safari & Night Drive", description: "Optional hot air balloon safari at dawn. Morning at leisure. Afternoon game drive focusing on predators. Night drive experience with spotlight." },
      { day: 5, title: "Final Game Drive & Departure", description: "Early morning game drive for last wildlife sightings. Brunch at the lodge. Transfer back to Nairobi for departure." },
    ],
    pricing: [
      { tier: "Standard", price: "$1,200", includes: ["Shared game drives", "Standard tented camp", "All meals", "Park fees", "Nairobi transfers"] },
      { tier: "Luxury", price: "$2,400", includes: ["Private game drives", "Luxury lodge accommodation", "All meals & drinks", "Park fees", "Scenic flight transfers", "Balloon safari"] },
      { tier: "Premium", price: "$3,800", includes: ["Private 4x4 with guide", "Exclusive private camp", "Gourmet dining & premium drinks", "All fees", "Charter flights", "Balloon safari", "Spa treatments"] },
    ],
  },
  {
    slug: "diani-beach-escape",
    image: tourBeach,
    title: "Diani Beach Escape",
    duration: "7 Days",
    price: "From $950",
    description: "Relax on pristine white sand beaches along the stunning Kenyan coastline of the Indian Ocean.",
    longDescription:
      "Unwind on the award-winning Diani Beach with 7 days of tropical paradise. Swim in turquoise waters, explore coral reefs, and savour fresh coastal cuisine. This beach getaway includes snorkelling trips, dolphin watching, and visits to the nearby Shimba Hills National Reserve for a taste of wildlife amidst your coastal retreat.",
    location: "Diani Beach, Kenya",
    groupSize: "2–12 people",
    difficulty: "Easy",
    gallery: [tourBeach, gallerySunset, galleryLodge, heroSafari],
    itinerary: [
      { day: 1, title: "Arrival & Beach Check-in", description: "Arrive in Mombasa. Transfer to Diani Beach resort. Welcome cocktail and beach orientation." },
      { day: 2, title: "Beach Day & Snorkelling", description: "Morning at leisure. Afternoon snorkelling trip to the coral reef. Sunset beach dinner." },
      { day: 3, title: "Dolphin Watching", description: "Early morning boat trip to spot bottlenose dolphins. Afternoon spa and relaxation." },
      { day: 4, title: "Shimba Hills Excursion", description: "Day trip to Shimba Hills National Reserve. Spot elephants and the rare sable antelope. Waterfall hike." },
      { day: 5, title: "Water Sports Day", description: "Choose from kayaking, paddleboarding, kite surfing, or deep-sea fishing. Evening bonfire." },
      { day: 6, title: "Old Town & Culture", description: "Visit historic Mombasa Old Town. Explore Fort Jesus and local markets. Swahili cooking class." },
      { day: 7, title: "Farewell & Departure", description: "Final morning swim. Brunch at the resort. Transfer to Mombasa airport." },
    ],
    pricing: [
      { tier: "Standard", price: "$950", includes: ["Beach resort stay", "Daily breakfast", "Snorkelling trip", "Airport transfers"] },
      { tier: "Luxury", price: "$1,800", includes: ["5-star beach villa", "All meals", "All water activities", "Shimba Hills trip", "Airport transfers", "Spa package"] },
      { tier: "Premium", price: "$3,200", includes: ["Private beachfront villa", "All-inclusive dining & drinks", "Private boat charters", "All excursions", "Personal concierge", "VIP transfers"] },
    ],
  },
  {
    slug: "mount-kenya-trek",
    image: tourMountain,
    title: "Mount Kenya Trek",
    duration: "4 Days",
    price: "From $800",
    description: "Conquer Africa's second-highest peak through lush alpine meadows and dramatic glacial valleys.",
    longDescription:
      "Challenge yourself with a 4-day trek to Point Lenana on Mount Kenya (4,985m). Trek through bamboo forests, moorlands, and alpine zones with stunning views of glacial peaks. This guided expedition includes experienced mountain guides, porters, and all camping equipment for a safe and memorable summit experience.",
    location: "Mount Kenya National Park",
    groupSize: "4–10 people",
    difficulty: "Moderate to Challenging",
    gallery: [tourMountain, gallerySunset, galleryLodge, heroSafari],
    itinerary: [
      { day: 1, title: "Trailhead to Old Moses Camp", description: "Drive to Sirimon Gate (2,650m). Begin trek through montane forest. Arrive at Old Moses Camp (3,300m). Acclimatization walk." },
      { day: 2, title: "Old Moses to Shipton's Camp", description: "Trek through moorland with giant lobelias and groundsels. Arrive at Shipton's Camp (4,200m). Afternoon acclimatization hike." },
      { day: 3, title: "Summit Day – Point Lenana", description: "Start at 3am for the summit push. Reach Point Lenana (4,985m) at sunrise. Descend to Mackinder's Camp (4,200m)." },
      { day: 4, title: "Descent & Departure", description: "Descend through the Chogoria route with waterfalls and lakes. Transfer back to Nairobi. Celebration dinner." },
    ],
    pricing: [
      { tier: "Standard", price: "$800", includes: ["Mountain guide & porters", "Camping equipment", "All meals on trek", "Park fees", "Nairobi transfers"] },
      { tier: "Luxury", price: "$1,500", includes: ["Private guide", "Premium camping gear", "Gourmet trail meals", "Park fees", "Private transfers", "Pre-trek hotel night"] },
      { tier: "Premium", price: "$2,500", includes: ["Private expedition leader", "Ultra-light premium gear", "Chef & gourmet meals", "All fees", "Helicopter transfer option", "2-night hotel stay", "Medical support"] },
    ],
  },
];
