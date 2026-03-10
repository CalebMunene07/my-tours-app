// ─────────────────────────────────────────────────────────────────
//  All images now reference public/assets/ as plain URL strings.
//  Move your image files to:  my-tours-app/public/assets/
//
//  Required files:
//    public/assets/tour-safari.jpg
//    public/assets/tour-beach.jpg
//    public/assets/tour-mountain.jpg
//    public/assets/gallery-lodge.jpg
//    public/assets/gallery-zebras.jpg
//    public/assets/gallery-sunset.jpg
//    public/assets/gallery-maasai.jpg
//    public/assets/hero-safari.jpg
// ─────────────────────────────────────────────────────────────────

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
    image: "/assets/tour-safari.jpg",
    title: "Masai Mara Safari",
    duration: "5 Days",
    price: "From $1,200",
    description: "Witness the Great Migration and encounter the Big Five in Kenya's most iconic wildlife reserve.",
    longDescription:
      "Embark on an unforgettable 5-day journey through the Masai Mara, home to the world-famous Great Migration. Experience close encounters with lions, elephants, leopards, buffalo, and rhinos while staying in luxury tented camps under the African stars.",
    location: "Masai Mara, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: [
      "/assets/tour-safari.jpg",
      "/assets/gallery-zebras.jpg",
      "/assets/gallery-sunset.jpg",
      "/assets/gallery-lodge.jpg",
      "/assets/gallery-maasai.jpg",
      "/assets/hero-safari.jpg",
    ],
    itinerary: [
      { day: 1, title: "Arrival & Transfer",               description: "Arrive in Nairobi. Meet your guide and transfer to the Masai Mara." },
      { day: 2, title: "Morning & Afternoon Game Drives",  description: "Full day of game drives exploring the Mara Triangle." },
      { day: 3, title: "Great Migration & Mara River",     description: "Witness the dramatic Mara River crossing (seasonal)." },
      { day: 4, title: "Balloon Safari & Night Drive",     description: "Optional hot air balloon safari at dawn." },
      { day: 5, title: "Final Game Drive & Departure",     description: "Early morning game drive for last wildlife sightings." },
    ],
    pricing: [
      { tier: "Standard", price: "$1,200", includes: ["Shared game drives", "Standard tented camp"] },
      { tier: "Luxury",   price: "$2,400", includes: ["Private game drives", "Luxury lodge"] },
    ],
  },
  {
    slug: "malindi-beach-escape",
    image: "/assets/tour-beach.jpg",
    title: "Malindi Beach Escape",
    duration: "7 Days",
    price: "From $950",
    description: "Relax on pristine white sand beaches along the stunning Kenyan coastline.",
    longDescription:
      "Unwind on the award-winning Malindi Beach with 7 days of tropical paradise. Swim in turquoise waters and explore coral reefs.",
    location: "Malindi Beach, Kenya",
    groupSize: "2–12 people",
    difficulty: "Easy",
    gallery: [
      "/assets/tour-beach.jpg",
      "/assets/gallery-sunset.jpg",
      "/assets/gallery-lodge.jpg",
      "/assets/hero-safari.jpg",
    ],
    itinerary: [
      { day: 1, title: "Arrival",      description: "Transfer to Diani Beach resort." },
      { day: 2, title: "Snorkelling",  description: "Afternoon snorkelling trip to the coral reef." },
    ],
    pricing: [
      { tier: "Standard", price: "$950", includes: ["Beach resort stay", "Breakfast"] },
    ],
  },
  {
    slug: "mount-kenya-trek",
    image: "/assets/tour-mountain.jpg",
    title: "Mount Kenya Trek",
    duration: "4 Days",
    price: "From $800",
    description: "Conquer Africa's second-highest peak through lush alpine meadows.",
    longDescription:
      "Challenge yourself with a 4-day trek to Point Lenana on Mount Kenya (4,985m).",
    location: "Mount Kenya National Park",
    groupSize: "4–10 people",
    difficulty: "Moderate to Challenging",
    gallery: [
      "/assets/tour-mountain.jpg",
      "/assets/gallery-sunset.jpg",
      "/assets/gallery-lodge.jpg",
      "/assets/hero-safari.jpg",
    ],
    itinerary: [
      { day: 1, title: "Trailhead",       description: "Drive to Sirimon Gate (2,650m)." },
      { day: 2, title: "Shipton's Camp",  description: "Trek through moorland to 4,200m." },
    ],
    pricing: [
      { tier: "Standard", price: "$800", includes: ["Mountain guide", "Park fees"] },
    ],
  },
];
