export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPricing {
  tier: string;
  priceUSD: string;       // International price in USD
  priceKES: string;       // Resident price in KES
  includes: string[];
}

export interface TourData {
  tags: any;
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
  category: string;
}

export const toursData: TourData[] = [

  // ── BUSH SAFARIS ──────────────────────────────────────────────────────────
  {
    slug: "masai-mara-safari",
    category: "bush-safari",
    image: "/assets/tour-safari.jpg",
    title: "Masai Mara Safari",
    duration: "5 Days",
    price: "From $1,200",
    description: "Witness the Great Migration and encounter the Big Five in Kenya's most iconic wildlife reserve.",
    longDescription: "Embark on an unforgettable 5-day journey through the Masai Mara, home to the world-famous Great Migration.",
    location: "Masai Mara, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-safari.jpg", "/assets/gallery-zebras.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Arrival & Transfer", description: "Arrive in Nairobi. Meet your guide and transfer to the Masai Mara." },
      { day: 2, title: "Morning & Afternoon Game Drives", description: "Full day of game drives exploring the Mara Triangle." },
      { day: 3, title: "Great Migration & Mara River", description: "Witness the dramatic Mara River crossing (seasonal)." },
      { day: 4, title: "Balloon Safari & Night Drive", description: "Optional hot air balloon safari at dawn." },
      { day: 5, title: "Final Game Drive & Departure", description: "Early morning game drive for last wildlife sightings." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$1,200", priceKES: "KSh 155,000", includes: ["Shared game drives", "Standard tented camp", "Full board meals", "Park fees"] },
      { tier: "Premium", priceUSD: "$1,800", priceKES: "KSh 233,000", includes: ["Private 4×4 Landcruiser", "Luxury Boutique Camps", "Expert Naturalist Guide", "Sundowner Experiences"] },
      { tier: "Luxury", priceUSD: "$2,400", priceKES: "KSh 310,000", includes: ["Private game drives", "Luxury lodge", "All meals & drinks", "Charter transfer"] },
      { tier: "Romance", priceUSD: "$1,800", priceKES: "Custom pricing", includes: ["Personalised Romantic Itinerary", "Candlelit Bush Dinner", "Couples Spa Treatment", "Romantic Sundowner"] },
    ],
    tags: undefined
  },
  {
    slug: "amboseli-bush-safari",
    category: "bush-safari",
    image: "/assets/amboseeli.jpg",
    title: "Amboseli Bush Safari",
    duration: "3 Days",
    price: "From $750",
    description: "Watch elephants roam against the backdrop of Mount Kilimanjaro in Amboseli National Park.",
    longDescription: "A 3-day safari in Amboseli offering unrivalled views of Kilimanjaro and large elephant herds.",
    location: "Amboseli, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/amboseeli.jpg", "/assets/gallery-zebras.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Drive to Amboseli", description: "Depart Nairobi early and arrive in time for an afternoon game drive." },
      { day: 2, title: "Full Day Game Drive", description: "Spend the full day exploring elephant-rich plains." },
      { day: 3, title: "Morning Drive & Return", description: "Final game drive then transfer back to Nairobi." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$750", priceKES: "KSh 97,000", includes: ["Park fees", "Accommodation", "Meals", "Game drives"] },
    ],
    tags: undefined
  },
  {
    slug: "tsavo-wilderness-safari",
    category: "bush-safari",
    image: "/assets/Tsavo.jpg",
    title: "Tsavo Wilderness Safari",
    duration: "4 Days",
    price: "From $900",
    description: "Explore Kenya's largest national park, home to red elephants, lions, and vast open savannah.",
    longDescription: "A raw and wild 4-day adventure across Tsavo East and West — Kenya's biggest wildlife ecosystem.",
    location: "Tsavo, Kenya",
    groupSize: "2–10 people",
    difficulty: "Easy",
    gallery: ["/assets/Tsavo.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Arrival Tsavo West", description: "Drive to Tsavo West, afternoon game drive." },
      { day: 2, title: "Mzima Springs", description: "Visit Mzima Springs and hippo pools." },
      { day: 3, title: "Tsavo East", description: "Transfer to Tsavo East, game drives on red-dust plains." },
      { day: 4, title: "Departure", description: "Morning drive then return to Nairobi or Mombasa." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$900", priceKES: "KSh 116,000", includes: ["Game drives", "Accommodation", "Meals", "Park fees"] },
    ],
    tags: undefined
  },

  // ── BEACH ESCAPES ─────────────────────────────────────────────────────────
  {
    slug: "malindi-beach-escape",
    category: "beach-escape",
    image: "/assets/tour-beach.jpg",
    title: "Malindi Beach Escape",
    duration: "7 Days",
    price: "From $950",
    description: "Relax on pristine white sand beaches along the stunning Kenyan coastline.",
    longDescription: "Unwind on the award-winning Malindi Beach with 7 days of tropical paradise.",
    location: "Malindi, Kenya",
    groupSize: "2–12 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-beach.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Arrival", description: "Transfer to beach resort and check-in." },
      { day: 2, title: "Snorkelling", description: "Afternoon snorkelling trip to the coral reef." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$950", priceKES: "KSh 123,000", includes: ["Beach resort stay", "Breakfast daily", "Snorkelling trip"] },
    ],
    tags: undefined
  },
  {
    slug: "diani-beach-retreat",
    category: "beach-escape",
    image: "/assets/diani.jpg",
    title: "Diani Beach Retreat",
    duration: "5 Days",
    price: "From $850",
    description: "White coral sands, turquoise waters, and vibrant marine life on Kenya's south coast.",
    longDescription: "5 days of pure coastal bliss on Diani Beach — one of Africa's top-rated beaches.",
    location: "Diani, Kenya",
    groupSize: "2–10 people",
    difficulty: "Easy",
    gallery: ["/assets/diani.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Arrival Diani", description: "Fly or drive to Diani, settle into resort." },
      { day: 2, title: "Water Sports Day", description: "Kite surfing, snorkelling, and dolphin cruise." },
      { day: 3, title: "Shimba Hills Day Trip", description: "Visit nearby Shimba Hills reserve." },
      { day: 4, title: "Leisure Day", description: "Relax or explore local Swahili markets." },
      { day: 5, title: "Departure", description: "Checkout and transfer to Mombasa airport." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$850", priceKES: "KSh 110,000", includes: ["Resort stay", "Breakfast", "Day trip", "Water sports"] },
    ],
    tags: undefined
  },
  {
    slug: "lamu-island-escape",
    category: "beach-escape",
    image: "/assets/lamu.jpg",
    title: "Lamu Island Escape",
    duration: "4 Days",
    price: "From $1,100",
    description: "Step back in time on Lamu's ancient Swahili island — no cars, just dhows and cobblestone streets.",
    longDescription: "A UNESCO World Heritage island with centuries-old architecture, pristine beaches, and authentic culture.",
    location: "Lamu, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/lamu.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Fly to Lamu", description: "Morning flight from Nairobi, dhow transfer to island." },
      { day: 2, title: "Lamu Town Walk", description: "Explore the old town, Fort and museums." },
      { day: 3, title: "Shela Beach & Dhow Cruise", description: "Full day on Shela beach, sunset dhow." },
      { day: 4, title: "Departure", description: "Morning at leisure then fly back." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$1,100", priceKES: "KSh 142,000", includes: ["Flights", "Boutique stay", "Guided town walk", "Dhow cruise"] },
    ],
    tags: undefined
  },

  // ── MOUNTAIN JOURNEYS & ALPINE HIKING ────────────────────────────────────
  {
    slug: "mount-kenya-trek",
    category: "mountain-journey",
    image: "/assets/tour-mountain.jpg",
    title: "Mount Kenya Trek",
    duration: "4 Days",
    price: "From $800",
    description: "Conquer Africa's second-highest peak through lush alpine meadows.",
    longDescription: "Challenge yourself with a 4-day trek to Point Lenana on Mount Kenya (4,985m).",
    location: "Mount Kenya National Park",
    groupSize: "4–10 people",
    difficulty: "Moderate to Challenging",
    gallery: ["/assets/tour-mountain.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Trailhead", description: "Drive to Sirimon Gate (2,650m)." },
      { day: 2, title: "Shipton's Camp", description: "Trek through moorland to 4,200m." },
      { day: 3, title: "Point Lenana Summit", description: "Pre-dawn summit push to 4,985m." },
      { day: 4, title: "Descent & Departure", description: "Descend via Chogoria route." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$800", priceKES: "KSh 103,000", includes: ["Mountain guide", "Park fees", "Camping", "Meals on trail"] },
    ],
    tags: undefined
  },
  {
    slug: "aberdare-highland-hike",
    category: "mountain-journey",
    image: "/assets/abardare.jpg",
    title: "Aberdare Highland Hike",
    duration: "3 Days",
    price: "From $620",
    description: "Trek through misty moorlands, bamboo forests, and dramatic waterfalls in the Aberdare Range.",
    longDescription: "A scenic 3-day hike through the Aberdares — Kenya's most underrated highland wilderness.",
    location: "Aberdare National Park, Kenya",
    groupSize: "4–10 people",
    difficulty: "Moderate",
    gallery: ["/assets/abardare.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Karura Gate Entry", description: "Enter the park and hike to the moorland." },
      { day: 2, title: "Waterfalls & Ridges", description: "Full-day hike past Karura Falls and high ridges." },
      { day: 3, title: "Descent & Exit", description: "Morning hike back to gate, return to Nairobi." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$620", priceKES: "KSh 80,000", includes: ["Guide", "Park fees", "Camping gear", "Meals"] },
    ],
    tags: undefined
  },
  {
    slug: "kilimanjaro-expedition",
    category: "mountain-journey",
    image: "/assets/kilimanjaro.jpg",
    title: "Kilimanjaro Expedition",
    duration: "7 Days",
    price: "From $2,200",
    description: "Summit Africa's highest peak via the scenic Lemosho route with expert guides.",
    longDescription: "A 7-day guided climb of Kilimanjaro (5,895m) — the roof of Africa — via the Lemosho route.",
    location: "Kilimanjaro, Tanzania",
    groupSize: "4–12 people",
    difficulty: "Challenging",
    gallery: ["/assets/kilimanjaro.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Arrive Moshi", description: "Briefing and equipment check." },
      { day: 2, title: "Londorossi Gate", description: "Enter Lemosho route, hike to Big Tree Camp." },
      { day: 3, title: "Shira Plateau", description: "Cross spectacular Shira plateau." },
      { day: 4, title: "Lava Tower", description: "Acclimatisation hike to Lava Tower (4,630m)." },
      { day: 5, title: "Barranco Wall", description: "Iconic Barranco Wall scramble." },
      { day: 6, title: "Barafu Camp", description: "Rest day at high camp before summit." },
      { day: 7, title: "Summit & Descent", description: "Midnight summit push, descend to gate." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$2,200", priceKES: "KSh 285,000", includes: ["Guide", "Porters", "Park fees", "Accommodation", "Meals"] },
      { tier: "Premium", priceUSD: "$3,100", priceKES: "KSh 400,000", includes: ["Private guide", "Porter team", "Park fees", "Superior camps", "All meals"] },
      { tier: "Luxury", priceUSD: "$4,500", priceKES: "KSh 583,000", includes: ["Expert mountain guide", "Premium porters", "Luxury camps", "Gourmet meals", "Photography support"] },
      { tier: "Romance", priceUSD: "$3,200", priceKES: "Custom pricing", includes: ["Couples summit experience", "Romantic high-altitude dinner", "Private guide", "Couple photography session"] },
    ],
    tags: undefined
  },

  // ── ADVENTURE & WILDLIFE ──────────────────────────────────────────────────
  {
    slug: "samburu-wildlife-adventure",
    category: "adventure-wildlife",
    image: "/assets/samburu buffalo.jpg",
    title: "Samburu Wildlife Adventure",
    duration: "3 Days",
    price: "From $780",
    description: "Discover rare northern species — reticulated giraffe, Grevy's zebra, Beisa oryx and buffalo.",
    longDescription: "A 3-day adventure in Samburu Reserve, home to Kenya's unique northern wildlife species.",
    location: "Samburu, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/samburu buffalo.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Fly to Samburu", description: "Morning flight, afternoon game drive." },
      { day: 2, title: "Full Day Exploration", description: "Game drives along Ewaso Nyiro River." },
      { day: 3, title: "Morning Drive & Return", description: "Final game drive, fly back to Nairobi." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$780", priceKES: "KSh 101,000", includes: ["Flights", "Lodge", "Game drives", "Full board"] },
    ],
    tags: undefined
  },
  {
    slug: "ol-pejeta-rhino-trek",
    category: "adventure-wildlife",
    image: "/assets/olepajeta.png",
    title: "Ol Pejeta Rhino Trek",
    duration: "2 Days",
    price: "From $550",
    description: "Walk among the world's last northern white rhinos at the famous Ol Pejeta Conservancy.",
    longDescription: "A unique 2-day walking experience at Ol Pejeta — Africa's best rhino sanctuary.",
    location: "Ol Pejeta, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/olepajeta.png", "/assets/gallery-zebras.jpg"],
    itinerary: [
      { day: 1, title: "Arrive Ol Pejeta", description: "Afternoon game drive focusing on rhinos and lions." },
      { day: 2, title: "Walking Safari", description: "Guided walking safari, chimpanzee sanctuary visit." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$550", priceKES: "KSh 71,000", includes: ["Conservation fees", "Lodge", "Guide", "Meals"] },
    ],
    tags: undefined
  },
  {
    slug: "lake-nakuru-flamingo-safari",
    category: "adventure-wildlife",
    image: "/assets/lakenakuru1.jpg",
    title: "Lake Nakuru Flamingo Safari",
    duration: "2 Days",
    price: "From $480",
    description: "Witness millions of flamingos turning Lake Nakuru pink in this iconic Rift Valley spectacle.",
    longDescription: "A 2-day safari to Lake Nakuru, famous for its flamingos, white rhinos, and Rift Valley scenery.",
    location: "Lake Nakuru, Kenya",
    groupSize: "2–10 people",
    difficulty: "Easy",
    gallery: ["/assets/lakenakuru1.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Drive to Nakuru", description: "Arrive and explore the lake shores." },
      { day: 2, title: "Full Park Game Drive", description: "Full circuit game drive, return to Nairobi." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$480", priceKES: "KSh 62,000", includes: ["Park fees", "Hotel", "Game drive", "Breakfast"] },
    ],
    tags: undefined
  },

  // ── CITY SAFARI / GAME & PARK ─────────────────────────────────────────────
  {
    slug: "nairobi-national-park-day",
    category: "city-safari",
    image: "/assets/nairobipark.jpg",
    title: "Nairobi National Park Day Trip",
    duration: "1 Day",
    price: "From $150",
    description: "Safari within city limits — spot lions and giraffes with Nairobi's skyline in the background.",
    longDescription: "The world's only national park inside a capital city. A half or full day game drive just minutes from the CBD.",
    location: "Nairobi, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-safari.jpg", "/assets/gallery-zebras.jpg"],
    itinerary: [
      { day: 1, title: "Full Day Game Drive", description: "Depart hotel, spend full day in the park, return by evening." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$150", priceKES: "KSh 18,000", includes: ["Park fees", "Guide", "Vehicle", "Bottled water"] },
    ],
    tags: undefined
  },
  {
    slug: "giraffe-centre-elephant-orphanage",
    category: "city-safari",
    image: "/assets/giraffe.jpg",
    title: "Giraffe Centre & Elephant Orphanage",
    duration: "1 Day",
    price: "From $120",
    description: "Hand-feed Rothschild giraffes and watch baby elephants play at the David Sheldrick sanctuary.",
    longDescription: "A family-favourite Nairobi day combining the Giraffe Centre and DSWT Elephant Orphanage.",
    location: "Nairobi, Kenya",
    groupSize: "2–15 people",
    difficulty: "Easy",
    gallery: ["/assets/giraffe.jpg", "/assets/gallery-maasai.jpg"],
    itinerary: [
      { day: 1, title: "City Wildlife Experience", description: "Morning at Giraffe Centre, afternoon at Elephant Orphanage." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$120", priceKES: "KSh 15,500", includes: ["Entry fees", "Transport", "Guide", "Bottled water"] },
    ],
    tags: undefined
  },
  {
    slug: "hell-s-gate-cycling-safari",
    category: "city-safari",
    image: "/assets/hell'sgate.jpg",
    title: "Hell's Gate Cycling Safari",
    duration: "1 Day",
    price: "From $180",
    description: "Cycle through dramatic gorges alongside zebras and buffalo at Hell's Gate National Park.",
    longDescription: "A unique cycling safari at Hell's Gate — one of Kenya's only parks where you cycle freely among wildlife.",
    location: "Hell's Gate, Naivasha, Kenya",
    groupSize: "2–12 people",
    difficulty: "Moderate",
    gallery: ["/assets/hell'sgate.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Drive & Cycle", description: "Drive from Nairobi to Naivasha, cycle through the park, gorge walk." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$180", priceKES: "KSh 23,000", includes: ["Bike hire", "Park fees", "Guide", "Gorge walk"] },
    ],
    tags: undefined
  },

  // ── LODGE SAFARI & SIGNATURE FOOD ─────────────────────────────────────────
  {
    slug: "mara-luxury-lodge-safari",
    category: "lodge-safari",
    image: "/assets/lodge1.jpg",
    title: "Mara Luxury Lodge Safari",
    duration: "4 Days",
    price: "From $2,800",
    description: "Stay in award-winning lodges inside the Mara reserve with gourmet bush dining experiences.",
    longDescription: "A 4-day ultra-luxury Mara experience with private game drives, spa treatments, and signature cuisine.",
    location: "Masai Mara, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/lodge1.jpg", "/assets/tour-safari.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Fly-in to Mara", description: "Charter flight, champagne welcome, sunset drive." },
      { day: 2, title: "Private Game Drives", description: "Full day private vehicle with expert guide." },
      { day: 3, title: "Bush Dinner & Spa", description: "Sundowner, bush dinner under the stars, spa afternoon." },
      { day: 4, title: "Morning Drive & Departure", description: "Last game drive, fly back to Nairobi." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$1,800", priceKES: "KSh 233,000", includes: ["Flights", "Lodge", "Game drives", "Meals", "Park fees"] },
      { tier: "Premium", priceUSD: "$2,200", priceKES: "KSh 285,000", includes: ["Flights", "Boutique lodge", "Private vehicle", "Expert guide", "All meals"] },
      { tier: "Luxury", priceUSD: "$2,800", priceKES: "KSh 362,000", includes: ["Charter flights", "Luxury lodge", "All meals & drinks", "Spa treatment", "Private game drives"] },
      { tier: "Romance", priceUSD: "$2,400", priceKES: "Custom pricing", includes: ["Romantic bush dinner", "Champagne & rose petals", "Couples spa package", "Private sundowner location", "Anniversary celebration"] },
    ],
    tags: undefined
  },
  {
    slug: "laikipia-ranch-gourmet-safari",
    category: "lodge-safari",
    image: "/assets/lakipia.jpg",
    title: "Laikipia Ranch Gourmet Safari",
    duration: "3 Days",
    price: "From $1,900",
    description: "Exclusive ranch safari with farm-to-table meals, night game drives, and conservation walks.",
    longDescription: "Discover Laikipia's private conservancies with world-class food, night drives, and walking safaris.",
    location: "Laikipia, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/lakipia.jpg", "/assets/tour-safari.jpg"],
    itinerary: [
      { day: 1, title: "Arrive Laikipia", description: "Fly-in, welcome dinner at the ranch." },
      { day: 2, title: "Walking & Night Drive", description: "Morning walking safari, afternoon rest, night game drive." },
      { day: 3, title: "Gourmet Breakfast & Departure", description: "Bush breakfast, fly back to Nairobi." },
    ],
    pricing: [
      { tier: "Luxury", priceUSD: "$1,900", priceKES: "KSh 245,000", includes: ["Flights", "Full board", "Night drives", "Conservation fees", "Walking safari"] },
    ],
    tags: undefined
  },
  {
    slug: "amboseli-lodge-kilimanjaro-views",
    category: "lodge-safari",
    image: "/assets/amboselilodge.jpg",
    title: "Amboseli Lodge & Kilimanjaro Views",
    duration: "3 Days",
    price: "From $1,400",
    description: "Dine with views of Kilimanjaro while elephants roam outside your lodge at sunset.",
    longDescription: "A 3-day luxury lodge stay in Amboseli combining superb wildlife, Maasai cultural dinners, and mountain vistas.",
    location: "Amboseli, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/amboselilodge.jpg", "/assets/tour-safari.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Arrive Amboseli", description: "Drive or fly in, afternoon game drive." },
      { day: 2, title: "Full Day Safari & Cultural Dinner", description: "Game drives, Maasai village visit, signature dinner." },
      { day: 3, title: "Morning Drive & Departure", description: "Final dawn game drive, depart after brunch." },
    ],
    pricing: [
      { tier: "Luxury", priceUSD: "$1,400", priceKES: "KSh 181,000", includes: ["Lodge", "All meals", "Game drives", "Cultural visit", "Maasai dinner"] },
    ],
    tags: undefined
  },

  // ── INTERNATIONAL ADVENTURES ──────────────────────────────────────────────
  
  {
    slug: "maldives-paradise",
    category: "international-adventure",
    image: "/assets/photos/maldives.jpg",
    title: "Maldives: The Last Paradise",
    duration: "6–10 Days",
    price: "From $2,200",
    description: "Wake up above turquoise lagoons in a private overwater villa and experience pure tropical bliss.",
    longDescription: "Experience overwater villas, pristine coral reefs, bioluminescent shores, and world-class spa in the Maldives.",
    location: "Maldives",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-beach.jpg", "/assets/photos/maldives.jpg"],
    itinerary: [
      { day: 1, title: "Arrive Malé", description: "Arrive in Malé, speedboat transfer to resort island." },
      { day: 2, title: "Overwater Villa Living", description: "Settle into luxury overwater villa, sunset dolphin cruise." },
      { day: 3, title: "Snorkelling Adventure", description: "Explore pristine coral gardens, encounter tropical fish." },
      { day: 4, title: "Island Hopping", description: "Visit local islands, experience island culture." },
      { day: 5, title: "Water Activities", description: "Diving, windsurfing, kayaking, or relaxation." },
      { day: 6, title: "Spa & Wellness", description: "Full-day spa treatments, yoga session, meditation." },
      { day: 7, title: "Bioluminescence Night", description: "Midnight boat ride to witness glowing shores." },
      { day: 8, title: "Leisure Day", description: "Free time for additional activities or beach time." },
      { day: 9, title: "Final Water Activities", description: "Last snorkelling or water sports adventure." },
      { day: 10, title: "Departure", description: "Transfer to airport, depart paradise." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$2,200", priceKES: "KSh 285,000", includes: ["Overwater villa", "All meals", "Snorkelling trips", "Island tour", "Spa session", "Transfers"] },
      { tier: "Luxury", priceUSD: "$3,800", priceKES: "KSh 492,000", includes: ["Premier villa", "Gourmet meals", "Private dive trips", "Spa daily", "Water sports unlimited", "Helicopter transfer"] },
    ],
    tags: undefined
  },
  
  {
    slug: "egypt-land-of-pharaohs",
    category: "international-adventure",
    image: "/assets/photos/egypt.jpg",
    title: "Egypt: Land of the Pharaohs",
    duration: "7–10 Days",
    price: "From $1,300",
    description: "Stand before the last surviving Wonder of the Ancient World and sail the Nile at golden hour.",
    longDescription: "Explore Egypt's ancient wonders: the Pyramids of Giza, Nile cruises, Valley of the Kings, and Luxor temples.",
    location: "Cairo, Luxor & Aswan, Egypt",
    groupSize: "6–14 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-safari.jpg", "/assets/photos/egypt.jpg"],
    itinerary: [
      { day: 1, title: "Arrive Cairo", description: "Arrive in Cairo, hotel check-in, orientation." },
      { day: 2, title: "Pyramids of Giza", description: "Visit the last surviving Wonder of the Ancient World." },
      { day: 3, title: "Egyptian Museum", description: "Explore treasures of Tutankhamun and ancient Egypt." },
      { day: 4, title: "Fly to Luxor", description: "Fly to Luxor, explore Karnak and Luxor temples." },
      { day: 5, title: "Valley of the Kings", description: "Visit tombs of pharaohs in the Valley of the Kings." },
      { day: 6, title: "Nile Cruise Begins", description: "Board luxury Nile cruise ship, dinner onboard." },
      { day: 7, title: "Nile Sailing", description: "Relax on the Nile, sail to Aswan at golden hour." },
      { day: 8, title: "Aswan Exploration", description: "Visit Philae Temple, Nubian villages, local markets." },
      { day: 9, title: "Final Nile Evening", description: "Sunset felucca ride, traditional dinner on the Nile." },
      { day: 10, title: "Departure", description: "Transfer to airport, depart with memories." },
    ],
    pricing: [
      { tier: "Standard", priceUSD: "$1,300", priceKES: "KSh 168,000", includes: ["Hotels", "Nile cruise", "Breakfasts", "Guided tours", "Entry fees", "Transfers"] },
      { tier: "Premium", priceUSD: "$2,100", priceKES: "KSh 272,000", includes: ["Luxury hotels", "Luxury cruise", "All meals", "Private guide", "Hot air balloon option", "VIP access"] },
    ],
    tags: undefined
  },
 ];

