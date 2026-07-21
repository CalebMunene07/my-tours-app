// ─────────────────────────────────────────────────────────────────────────────
// REPLACE the entire toursData array in /data/tours.ts with this content.
//
// Category keys:
//   "kenya-safari"    → Kenya_Safaris.docx   (7 private road safaris)
//   "budget-safari"   → Budget_safaris.docx  (4 group joining safaris)
//   "fly-inn-safari"  → Fly_inn_safaris.docx (4 fly-in + 1 Serengeti road)
// ─────────────────────────────────────────────────────────────────────────────

export interface TourItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPricing {
  tier: string;
  priceUSD: string;
  priceKES: string;
  includes: string[];
}

export interface TourData {
  tags: string[] | undefined;
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

  // ── KENYA SAFARIS (Kenya_Safaris.docx) ──────────────────────────────────────

  {
    slug: "3-day-masai-mara",
    category: "kenya-safari",
    image: "/assets/tour-safari.jpg",
    title: "3-Day Masai Mara Safari",
    duration: "3 Days",
    price: "From $795",
    description: "Kenya's premier game reserve in 3 days — Big Cats, Big Five, and the Great Rift Valley in your own private vehicle.",
    longDescription: "Depart Nairobi at 8am for a scenic drive down into the Great Rift Valley and on to Masai Mara. Stop at the Rift Valley viewpoint, arrive for lunch, then enjoy two private game drives daily at Keekorok Lodge or similar. Flexible schedules for families and honeymooners.",
    location: "Masai Mara, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-safari.jpg", "/assets/gallery-zebras.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Masai Mara", description: "8am departure. Scenic drive via Great Rift Valley viewpoint (~5.5hrs). Arrive for lunch, afternoon game drive 3:30–6:30pm. Dinner & overnight at Keekorok Lodge or similar." },
      { day: 2, title: "Full Day Masai Mara", description: "Morning game drive 6:15–9am before breakfast, afternoon drive 3:30–6:30pm. Option for full-day picnic drive. Spot Lion, Leopard, Cheetah, Rhino, Elephant and Wildebeest." },
      { day: 3, title: "Masai Mara → Nairobi", description: "Relaxed breakfast and check-out. Depart by 10am (park rules). Arrive Nairobi ~2:30pm — hotel or airport drop-off." },
    ],
    pricing: [
      { tier: "22 Dec – 03 Jan 2026", priceUSD: "$1,145 (2–3 pax) / $995 (4–5) / $930 (6)", priceKES: "KSh 148,000 (2–3 pax) / 128,000 (4–5) / 120,000 (6)", includes: ["Full board accommodation", "Private safari vehicle with roof hatch & UHF radio", "3 private game drives", "Certified English-speaking driver-guide", "All park entry fees", "Fuel & driver allowances", "24hr backup support"] },
      { tier: "04 Jan – 31 Mar 2026", priceUSD: "$910 (2–3 pax) / $790 (4–5) / $725 (6)", priceKES: "KSh 117,000 (2–3 pax) / 102,000 (4–5) / 94,000 (6)", includes: ["Full board accommodation", "Private safari vehicle with roof hatch & UHF radio", "3 private game drives", "Certified English-speaking driver-guide", "All park entry fees", "Fuel & driver allowances", "24hr backup support"] },
      { tier: "01 Apr – 30 Jun 2026", priceUSD: "$795 (2–3 pax) / $685 (4–5) / $640 (6)", priceKES: "KSh 103,000 (2–3 pax) / 88,000 (4–5) / 83,000 (6)", includes: ["Full board accommodation", "Private safari vehicle with roof hatch & UHF radio", "3 private game drives", "Certified English-speaking driver-guide", "All park entry fees", "Fuel & driver allowances", "24hr backup support"] },
      { tier: "01 Jul – 31 Oct 2026", priceUSD: "$1,435 (2–3 pax) / $1,275 (4–5) / $1,190 (6)", priceKES: "KSh 185,000 (2–3 pax) / 165,000 (4–5) / 154,000 (6)", includes: ["Full board accommodation", "Private safari vehicle with roof hatch & UHF radio", "3 private game drives", "Certified English-speaking driver-guide", "All park entry fees", "Fuel & driver allowances", "24hr backup support"] },
    ],
    tags: ["private", "road"],
  },

  {
    slug: "3-day-amboseli",
    category: "kenya-safari",
    image: "/assets/amboseeli.jpg",
    title: "3-Day Amboseli Safari",
    duration: "3 Days",
    price: "From $795",
    description: "Watch elephant herds roam beneath the magnificent Mount Kilimanjaro in Amboseli National Park.",
    longDescription: "Drive to Amboseli at the foot of Kilimanjaro for 3 days of prolific elephant sightings, stunning mountain backdrops, and relaxed lodge life at Amboseli Serena Lodge or Ol Tukai Lodge.",
    location: "Amboseli, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/amboseeli.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-zebras.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Amboseli", description: "Depart Nairobi for Amboseli, arrive in time for lunch. Afternoon game drive 3:30–6:30pm. Dinner & overnight at Amboseli Serena Lodge or Ol Tukai Lodge." },
      { day: 2, title: "Full Day Amboseli", description: "Early morning game drive before breakfast. Relax by the pool mid-morning. Lunch then afternoon game drive through elephant-rich plains beneath Kilimanjaro." },
      { day: 3, title: "Amboseli → Nairobi", description: "Early morning game drive then breakfast. Depart for Nairobi, arrive by lunchtime. Airport or hotel drop-off." },
    ],
    pricing: [
      { tier: "22 Dec – 02 Jan 2026", priceUSD: "$945 (2–3 pax) / $795 (4–5) / $745 (6)", priceKES: "KSh 122,000 (2–3 pax) / 103,000 (4–5) / 96,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "4 private game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "03 Jan – 31 Mar 2026", priceUSD: "$865 (2–3 pax) / $790 (4–5) / $695 (6)", priceKES: "KSh 112,000 (2–3 pax) / 102,000 (4–5) / 90,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "4 private game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "01 Apr – 31 May 2026", priceUSD: "$795 (2–3 pax) / $675 (4–5) / $630 (6)", priceKES: "KSh 103,000 (2–3 pax) / 87,000 (4–5) / 81,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "4 private game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "15 Jun – 31 Oct 2026", priceUSD: "$985 (2–3 pax) / $840 (4–5) / $765 (6)", priceKES: "KSh 127,000 (2–3 pax) / 108,000 (4–5) / 99,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "4 private game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
    ],
    tags: ["private", "road"],
  },

  {
    slug: "4-day-mara-nakuru",
    category: "kenya-safari",
    image: "/assets/lakenakuru1.jpg",
    title: "4-Day Masai Mara & Lake Nakuru",
    duration: "4 Days",
    price: "From $1,035",
    description: "Two of Kenya's greatest parks in one circuit — big game in the Mara and flamingo-pink shores of Lake Nakuru.",
    longDescription: "Two nights in the Mara for big-cat sightings and Mara river action, followed by Lake Nakuru National Park — a flamingo and rhino sanctuary with stunning cliff viewpoints overlooking the lake.",
    location: "Masai Mara & Lake Nakuru, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/lakenakuru1.jpg", "/assets/tour-safari.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Masai Mara", description: "Arrive JKIA, meet guide, depart for Masai Mara via Rift Valley viewpoint. Lunch at lodge, afternoon game drive. Dinner & overnight at Keekorok Lodge." },
      { day: 2, title: "Full Day Masai Mara", description: "Full day game drives exploring the Mara — big cats, Mara river, wildebeest. Option for all-day picnic drive. Overnight Keekorok Lodge." },
      { day: 3, title: "Masai Mara → Lake Nakuru", description: "Breakfast then depart for Lake Nakuru National Park. Arrive for lunch. Afternoon game drive including cliff viewpoint over the lake. Overnight Flamingo Hill Camp." },
      { day: 4, title: "Lake Nakuru → Nairobi", description: "Morning game drive then relaxed breakfast. Depart for Nairobi via Rift Valley escarpment. Arrive lunchtime. Airport transfer." },
    ],
    pricing: [
      { tier: "16 Dec – 02 Jan 2026", priceUSD: "$1,495 (2–3 pax) / $1,320 (4–5) / $1,240 (6)", priceKES: "KSh 193,000 (2–3 pax) / 171,000 (4–5) / 160,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "03 Jan – 31 Mar 2026", priceUSD: "$1,180 (2–3 pax) / $960 (4–5) / $895 (6)", priceKES: "KSh 152,000 (2–3 pax) / 124,000 (4–5) / 116,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "01 Apr – 15 Jun 2026", priceUSD: "$1,035 (2–3 pax) / $875 (4–5) / $820 (6)", priceKES: "KSh 134,000 (2–3 pax) / 113,000 (4–5) / 106,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "15 Jun – 30 Sep 2026", priceUSD: "$1,745 (2–3 pax) / $1,540 (4–5) / $1,485 (6)", priceKES: "KSh 225,000 (2–3 pax) / 199,000 (4–5) / 192,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
    ],
    tags: ["private", "road"],
  },

  {
    slug: "4-day-northern-kenya",
    category: "kenya-safari",
    image: "/assets/samburu buffalo.jpg",
    title: "4-Day Northern Kenya Safari",
    duration: "4 Days",
    price: "From $1,025",
    description: "Semi-arid Samburu Game Reserve and the misty Aberdare highlands — Kenya's unique northern species and forest wildlife in one trip.",
    longDescription: "Two nights at Samburu Sopa Lodge to spot reticulated giraffe, Grevy's zebra, and Beisa oryx along the Ewaso Nyiro River, followed by a night at The Ark Lodge inside Aberdare National Park for nocturnal forest animal sightings.",
    location: "Samburu & Aberdare, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/samburu buffalo.jpg", "/assets/abardare.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Samburu", description: "Depart 8am, stop at Equator Crossing. Arrive Samburu for lunch. Afternoon game drive 3:30–6:30pm. Overnight Samburu Sopa Lodge." },
      { day: 2, title: "Full Day Samburu", description: "Morning and afternoon game drives. Spot the Samburu Special Five — unique northern species not found elsewhere in Kenya." },
      { day: 3, title: "Samburu → Aberdare", description: "Early morning game drive and breakfast. Drive to Aberdare Country Club for lunch, then transfer to The Ark Lodge inside the national park. Watch forest animals from the viewing deck all evening." },
      { day: 4, title: "Aberdare → Nairobi", description: "Morning game drive and breakfast. Depart by 10am, arrive Nairobi ~3pm. Airport or hotel drop-off." },
    ],
    pricing: [
      { tier: "03 Jan – 31 Mar 2026", priceUSD: "$1,095 (2–3 pax) / $895 (4–5) / $825 (6)", priceKES: "KSh 141,000 (2–3 pax) / 116,000 (4–5) / 107,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "01 Apr – 31 May 2026", priceUSD: "$1,025 (2–3 pax) / $815 (4–5) / $770 (6)", priceKES: "KSh 132,000 (2–3 pax) / 105,000 (4–5) / 99,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "01 Jul – 30 Sep 2026", priceUSD: "$1,145 (2–3 pax) / $980 (4–5) / $895 (6)", priceKES: "KSh 148,000 (2–3 pax) / 127,000 (4–5) / 116,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
      { tier: "22 Dec – 02 Jan 2027", priceUSD: "$1,145 (2–3 pax) / $980 (4–5) / $895 (6)", priceKES: "KSh 148,000 (2–3 pax) / 127,000 (4–5) / 116,000 (6)", includes: ["Full board accommodation", "Private safari microbus with roof hatch", "6 safari game drives", "English-speaking driver-guide", "All park entry fees", "24hr backup support"] },
    ],
    tags: ["private", "road"],
  },

  {
    slug: "5-day-mara-nakuru-naivasha",
    category: "kenya-safari",
    image: "/assets/tour-safari.jpg",
    title: "5-Day Mara, Nakuru & Naivasha",
    duration: "5 Days",
    price: "From $1,690",
    description: "Kenya's three most iconic parks in one grand road safari — Masai Mara, Lake Nakuru, and the scenic shores of Lake Naivasha.",
    longDescription: "Two nights in Masai Mara for big game, one night at Lake Naivasha for hippo boat safaris and birdlife, and one night at Lake Nakuru for flamingos and rhinos — finishing with an optional Hell's Gate cycling excursion.",
    location: "Masai Mara, Nakuru & Naivasha, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-safari.jpg", "/assets/lakenakuru1.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Masai Mara", description: "8am departure via Rift Valley viewpoint. Arrive Masai Mara for lunch. Afternoon game drive 3:30–6:30pm. Overnight Mara Sopa Lodge." },
      { day: 2, title: "Full Day Masai Mara", description: "Morning game drive 6:30–9am, afternoon drive after lunch. Spot lions, cheetahs, leopards, elephants, and the Mara river crossing." },
      { day: 3, title: "Masai Mara → Lake Naivasha", description: "Short morning game drive then drive to Lake Naivasha. Arrive for lunch. Optional 1hr boat safari on the lake (extra cost). Overnight Lake Naivasha Country Club." },
      { day: 4, title: "Lake Naivasha → Lake Nakuru", description: "Relaxed breakfast, depart to Lake Nakuru by 9am. Afternoon game drive: flamingos, white & black rhinos, lions, leopards. Overnight Flamingo Hill Tented Camp or Sarova Lion Hill Lodge." },
      { day: 5, title: "Lake Nakuru → Nairobi", description: "Early morning game drive 6:30am. Breakfast and check-out. Drive back to Nairobi via Rift Valley escarpment. Airport drop-off." },
    ],
    pricing: [
      { tier: "01 Jul – 30 Sep 2026", priceUSD: "$1,965 (2–3 pax) / $1,695 (4–5) / $1,620 (6)", priceKES: "KSh 254,000 (2–3 pax) / 219,000 (4–5) / 209,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
      { tier: "01 Oct – 31 Oct 2026", priceUSD: "$1,920 (2–3 pax) / $1,665 (4–5) / $1,600 (6)", priceKES: "KSh 248,000 (2–3 pax) / 215,000 (4–5) / 207,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
      { tier: "01 Nov – 15 Dec 2026", priceUSD: "$1,690 (2–3 pax) / $1,460 (4–5) / $1,380 (6)", priceKES: "KSh 218,000 (2–3 pax) / 189,000 (4–5) / 178,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
      { tier: "16 Dec – 02 Jan 2027", priceUSD: "$1,965 (2–3 pax) / $1,695 (4–5) / $1,420 (6)", priceKES: "KSh 254,000 (2–3 pax) / 219,000 (4–5) / 183,000 (6)", includes: ["Full board accommodation", "Private safari microbus", "6 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
    ],
    tags: ["private", "road"],
  },

  {
    slug: "6-day-mara-nakuru-amboseli",
    category: "kenya-safari",
    image: "/assets/amboseeli.jpg",
    title: "6-Day Mara, Nakuru & Amboseli",
    duration: "6 Days",
    price: "From $1,995",
    description: "Kenya's ultimate three-park circuit — Amboseli elephants, Nakuru flamingos, and two nights in the Masai Mara.",
    longDescription: "Starting at Amboseli beneath Kilimanjaro, through flamingo-pink Lake Nakuru, and finishing with two full days in Masai Mara — this 6-day circuit covers the very best of Kenya's wildlife with 10 game drives.",
    location: "Amboseli, Lake Nakuru & Masai Mara, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/amboseeli.jpg", "/assets/lakenakuru1.jpg", "/assets/tour-safari.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Amboseli", description: "Drive to Amboseli National Park at the foot of Kilimanjaro. Arrive for lunch, afternoon game drive — elephants, big game, and mountain views. Overnight Amboseli Serena Lodge." },
      { day: 2, title: "Full Day Amboseli", description: "Early morning game drive then relaxed breakfast. Afternoon game drive. Stunning Kilimanjaro backdrops all day." },
      { day: 3, title: "Amboseli → Lake Nakuru", description: "After breakfast depart for Lake Nakuru, famous for millions of pink flamingoes. Arrive for lunch, evening game drive. Overnight Flamingo Hill Tented Camp." },
      { day: 4, title: "Lake Nakuru → Masai Mara", description: "Early morning game drive and breakfast. Drive to Masai Mara, arrive before lunch. Afternoon game drive over the famous rolling plains." },
      { day: 5, title: "Full Day Masai Mara", description: "Full day game drives. Morning and afternoon drives. Spot the Big Cats, Mara river crossing, and vast herds of wildebeest." },
      { day: 6, title: "Masai Mara → Nairobi", description: "Early morning game drive then breakfast. Depart by 10am, arrive Nairobi mid-afternoon. Airport transfer." },
    ],
    pricing: [
      { tier: "01 Jun – 30 Sep 2026", priceUSD: "$2,395 (2–3 pax) / $2,145 (4–5) / $2,095 (6)", priceKES: "KSh 309,000 (2–3 pax) / 277,000 (4–5) / 271,000 (6)", includes: ["Full board accommodation in lodges/camps", "Private safari van with roof hatch & UHF radio", "10 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
      { tier: "01 Oct – 31 Oct 2026", priceUSD: "$2,145 (2–3 pax) / $1,945 (4–5) / $1,840 (6)", priceKES: "KSh 277,000 (2–3 pax) / 251,000 (4–5) / 238,000 (6)", includes: ["Full board accommodation in lodges/camps", "Private safari van with roof hatch & UHF radio", "10 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
      { tier: "01 Nov – 15 Dec 2026", priceUSD: "$1,995 (2–3 pax) / $1,850 (4–5) / $1,740 (6)", priceKES: "KSh 258,000 (2–3 pax) / 239,000 (4–5) / 225,000 (6)", includes: ["Full board accommodation in lodges/camps", "Private safari van with roof hatch & UHF radio", "10 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
      { tier: "16 Dec – 02 Jan 2027", priceUSD: "$2,395 (2–3 pax) / $2,230 (4–5) / $2,095 (6)", priceKES: "KSh 309,000 (2–3 pax) / 288,000 (4–5) / 271,000 (6)", includes: ["Full board accommodation in lodges/camps", "Private safari van with roof hatch & UHF radio", "10 safari game drives", "Driver-guide experienced in game spotting", "All park entry fees", "Fuel & driver allowances"] },
    ],
    tags: ["private", "road"],
  },

  {
    slug: "7-day-kenya-grand-safari",
    category: "kenya-safari",
    image: "/assets/olepajeta.png",
    title: "7-Day Kenya Grand Safari",
    duration: "7 Days",
    price: "From $1,180",
    description: "Ol Pejeta Conservancy, Lake Nakuru, Lake Naivasha, and Masai Mara — Kenya's finest wildlife in one spectacular week.",
    longDescription: "Start at Ol Pejeta Conservancy — home to Kenya's last northern white rhinos and a chimpanzee sanctuary — then Lake Nakuru, Lake Naivasha, and finish with two magical nights in Masai Mara. Seven days, four ecosystems, unforgettable wildlife.",
    location: "Ol Pejeta, Nakuru, Naivasha & Masai Mara, Kenya",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/olepajeta.png", "/assets/lakenakuru1.jpg", "/assets/tour-safari.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Ol Pejeta", description: "8am departure to Sweetwaters Tented Camp, Ol Pejeta Conservancy. Arrive late morning, lunch, then 3pm game drive inside the conservancy. Overnight Serena Sweetwaters Tented Camp." },
      { day: 2, title: "Full Day Ol Pejeta", description: "Morning and afternoon game drives including a visit to the Chimpanzee Sanctuary. Spot northern white rhinos, lions, leopards, cheetahs, and the Big Five." },
      { day: 3, title: "Ol Pejeta → Lake Nakuru", description: "Breakfast then drive to Lake Nakuru, a bird & rhino sanctuary. Arrive for lunch, late afternoon game drive with cliff viewpoint over the flamingo-pink lake." },
      { day: 4, title: "Lake Nakuru → Lake Naivasha", description: "Morning game drive and breakfast. Drive to Lake Naivasha for lunch. Optional 1hr boat safari (extra cost) to see hippos and prolific birdlife." },
      { day: 5, title: "Lake Naivasha → Masai Mara", description: "Breakfast then drive to Masai Mara. Arrive for lunch at Basecamp Masai Mara. Afternoon game drive exploring the vast wildlife reserve." },
      { day: 6, title: "Full Day Masai Mara", description: "Morning and afternoon game drives. Track lion, leopard, cheetah, elephant, and wildebeest. Option for all-day picnic drive at no extra cost." },
      { day: 7, title: "Masai Mara → Nairobi", description: "Final morning game drive and breakfast. Depart Masai Mara, arrive Nairobi by mid-afternoon. Airport or hotel drop-off." },
    ],
    pricing: [
      { tier: "03 Jan – 31 Mar 2026", priceUSD: "$1,095 (2–3 pax) / $895 (4–5) / $825 (6)", priceKES: "KSh 141,000 (2–3 pax) / 116,000 (4–5) / 107,000 (6)", includes: ["Full board in lodges & camps", "Bed & breakfast in Nairobi", "Private safari microbus", "All game drives", "Certified driver-guide", "All park & conservancy entry fees", "24hr backup support"] },
      { tier: "01 Apr – 30 Sep 2026", priceUSD: "$1,180 (2–3 pax) / $960 (4–5) / $895 (6)", priceKES: "KSh 152,000 (2–3 pax) / 124,000 (4–5) / 116,000 (6)", includes: ["Full board in lodges & camps", "Bed & breakfast in Nairobi", "Private safari microbus", "All game drives", "Certified driver-guide", "All park & conservancy entry fees", "24hr backup support"] },
      { tier: "01 Oct – 21 Dec 2026", priceUSD: "$1,095 (2–3 pax) / $895 (4–5) / $825 (6)", priceKES: "KSh 141,000 (2–3 pax) / 116,000 (4–5) / 107,000 (6)", includes: ["Full board in lodges & camps", "Bed & breakfast in Nairobi", "Private safari microbus", "All game drives", "Certified driver-guide", "All park & conservancy entry fees", "24hr backup support"] },
    ],
    tags: ["private", "road"],
  },

  // ── BUDGET GROUP JOINING SAFARIS (Budget_safaris.docx) ──────────────────────

  {
    slug: "budget-3-day-masai-mara",
    category: "budget-safari",
    image: "/assets/tour-safari.jpg",
    title: "3-Day Budget Masai Mara Group Safari",
    duration: "3 Days",
    price: "From $453",
    description: "Join a shared group in a luxury land cruiser for the Masai Mara — unlimited game drives, full board meals, at unbeatable shared prices.",
    longDescription: "Meet your group at the airport or hotel and drive to the world-famous Masai Mara. Full day game viewing, picnic lunch at the hippo pool, and the option of a Maasai village visit — all in a comfortable land cruiser with a professional driver-guide.",
    location: "Masai Mara, Kenya",
    groupSize: "Group joining",
    difficulty: "Easy",
    gallery: ["/assets/tour-safari.jpg", "/assets/gallery-zebras.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Masai Mara", description: "Meet at JKIA or hotel, drive via Rift Valley to Masai Mara. Arrive for late lunch, evening game drive until 6pm. Dinner & overnight at Sankale Camp or similar." },
      { day: 2, title: "Full Day Masai Mara", description: "Full day game viewing with picnic lunch at the hippo pool. Watch hippos, crocodiles, lions, cheetahs, and wildebeest on the famous Mara plains. All meals at camp." },
      { day: 3, title: "Masai Mara → Nairobi", description: "Early morning breakfast, optional Maasai village visit. Depart for Nairobi, arrive ~3pm. Hotel or airport drop-off." },
    ],
    pricing: [
      { tier: "Jan 1 – Jun 30 2026 (Single room)", priceUSD: "$456", priceKES: "KSh 59,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury safari land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jan 1 – Jun 30 2026 (Sharing)", priceUSD: "$453", priceKES: "KSh 58,500", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury safari land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Single room)", priceUSD: "$700", priceKES: "KSh 90,500", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury safari land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Sharing)", priceUSD: "$690", priceKES: "KSh 89,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury safari land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
    ],
    tags: ["group", "budget", "shared"],
  },

  {
    slug: "budget-4-day-mara-nakuru",
    category: "budget-safari",
    image: "/assets/lakenakuru1.jpg",
    title: "4-Day Masai Mara & Lake Nakuru Group Safari",
    duration: "4 Days",
    price: "From $655",
    description: "A classic group circuit — Mara game drives and Nakuru's flamingos, rhinos and leopards, in a shared luxury land cruiser.",
    longDescription: "Join a group for this classic Kenya circuit. Two nights at Masai Mara exploring the rolling plains and Mara river, then Lake Nakuru for flamingos, both black and white rhinos, Columbus monkeys, and a stop at Lake Naivasha Crescent Island boat ride on the way.",
    location: "Masai Mara & Lake Nakuru, Kenya",
    groupSize: "Group joining",
    difficulty: "Easy",
    gallery: ["/assets/lakenakuru1.jpg", "/assets/tour-safari.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Masai Mara", description: "7:30am pickup, drive via Rift Valley viewpoint, arrive for lunch. Evening game drive on the famous Mara plains. Dinner & overnight Mara Lenchada Tented Camp." },
      { day: 2, title: "Full Day Masai Mara", description: "Full day game viewing with picnic lunch. Mara river — hippos, crocodiles, big cats, elephants. Optional Maasai village visit." },
      { day: 3, title: "Masai Mara → Lake Nakuru", description: "Breakfast, optional Maasai village visit, optional Naivasha Crescent Island boat ride on the way. Arrive Nakuru in the evening. Overnight Buraha Zenoni Resort." },
      { day: 4, title: "Lake Nakuru → Nairobi", description: "Morning game drive: flamingos, rhinos (~350 bird species), leopards, giraffes. Picnic lunch en-route to Nairobi. Airport or hotel drop-off." },
    ],
    pricing: [
      { tier: "Jan 1 – Jun 30 2026 (Single room)", priceUSD: "$656", priceKES: "KSh 85,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jan 1 – Jun 30 2026 (Sharing)", priceUSD: "$655", priceKES: "KSh 84,500", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Single room)", priceUSD: "$891", priceKES: "KSh 115,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Sharing)", priceUSD: "$890", priceKES: "KSh 115,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
    ],
    tags: ["group", "budget", "shared"],
  },

  {
    slug: "budget-5-day-mara-nakuru-naivasha",
    category: "budget-safari",
    image: "/assets/hell'sgate.jpg",
    title: "5-Day Mara, Nakuru & Naivasha Group Safari",
    duration: "5 Days",
    price: "From $778",
    description: "Five days of Kenya's greatest hits — Masai Mara game drives, Nakuru flamingos, Naivasha boat ride, and Hell's Gate cycling.",
    longDescription: "A comprehensive 5-day group safari. Masai Mara's big cats, Lake Nakuru's rhinos and flamingos, Lake Naivasha's hippo boat safaris, and a unique cycling excursion through Hell's Gate gorge — all at shared group rates in a luxury land cruiser.",
    location: "Masai Mara, Lake Nakuru & Lake Naivasha, Kenya",
    groupSize: "Group joining",
    difficulty: "Easy",
    gallery: ["/assets/hell'sgate.jpg", "/assets/lakenakuru1.jpg", "/assets/tour-safari.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Masai Mara", description: "7:30am pickup, drive to Masai Mara via Rift Valley viewpoint. Late lunch, evening game drive. Overnight Lenchada Camp." },
      { day: 2, title: "Full Day Masai Mara", description: "Full day at the Masai Mara — Mara river, hippo pool picnic lunch, big cats, and plains game." },
      { day: 3, title: "Masai Mara → Lake Nakuru", description: "Breakfast, optional Maasai village, optional Naivasha Crescent Island boat ride, then on to Nakuru. Overnight Buraha Zenoni Resort." },
      { day: 4, title: "Lake Nakuru → Lake Naivasha", description: "Morning Nakuru game drive: flamingos, rhinos, Columbus monkeys, leopards, giraffes. Afternoon boat ride at Lake Naivasha. Overnight Hotel Chambai Safari." },
      { day: 5, title: "Lake Naivasha → Nairobi", description: "Morning cycling safari at Hell's Gate National Park, visit Geothermal Power Plant and Hot Springs. Picnic lunch, depart to Nairobi arriving ~3pm." },
    ],
    pricing: [
      { tier: "Jan 1 – Jun 30 2026 (Single room)", priceUSD: "$839", priceKES: "KSh 108,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jan 1 – Jun 30 2026 (Sharing)", priceUSD: "$778", priceKES: "KSh 100,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Single room)", priceUSD: "$1,021", priceKES: "KSh 132,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Sharing)", priceUSD: "$991", priceKES: "KSh 128,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
    ],
    tags: ["group", "budget", "shared"],
  },

  {
    slug: "budget-7-day-grand-circuit",
    category: "budget-safari",
    image: "/assets/amboseeli.jpg",
    title: "7-Day Grand Kenya Circuit Group Safari",
    duration: "7 Days",
    price: "From $1,120",
    description: "The ultimate budget Kenya circuit — Masai Mara, Lake Nakuru, Lake Naivasha, and Amboseli with Kilimanjaro views, shared group rates.",
    longDescription: "Seven days covering Kenya's four greatest parks. Big cats at the Mara, flamingos and rhinos at Nakuru, hippo boat safaris on Naivasha, Hell's Gate cycling, and elephant herds beneath Kilimanjaro in Amboseli — all at unbeatable group prices.",
    location: "Masai Mara, Nakuru, Naivasha & Amboseli, Kenya",
    groupSize: "Group joining",
    difficulty: "Easy",
    gallery: ["/assets/amboseeli.jpg", "/assets/tour-safari.jpg", "/assets/lakenakuru1.jpg"],
    itinerary: [
      { day: 1, title: "Nairobi → Masai Mara", description: "Depart for Masai Mara via Rift Valley viewpoint. Arrive for lunch, afternoon game drive. Overnight Lenchada Tourist Camp." },
      { day: 2, title: "Full Day Masai Mara", description: "Full day game viewing with picnic lunch at the hippo pool. Big cats, Mara river, and endless plains game." },
      { day: 3, title: "Masai Mara → Lake Nakuru", description: "Optional Maasai village visit then drive to Nakuru with picnic lunch. Overnight Buraha Zenoni Hotel & Resort." },
      { day: 4, title: "Lake Nakuru → Lake Naivasha", description: "Nakuru morning game drive: flamingos, rhinos, Columbus monkeys. Afternoon 1hr included boat ride at Lake Naivasha. Overnight Hotel Chambai Safari." },
      { day: 5, title: "Lake Naivasha → Amboseli", description: "Hell's Gate National Park cycling, Geothermal Power Plant visit. Picnic lunch, drive to Amboseli. Optional evening game drive." },
      { day: 6, title: "Full Day Amboseli", description: "Full day game drives beneath Kilimanjaro — elephants, hippos, swampy grounds, antelopes, and birds." },
      { day: 7, title: "Amboseli → Nairobi", description: "Morning game drive then breakfast. Depart for Nairobi with picnic lunch. Late afternoon airport or hotel drop-off." },
    ],
    pricing: [
      { tier: "Jan 1 – Jun 30 2026 (Single room)", priceUSD: "$1,125", priceKES: "KSh 145,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jan 1 – Jun 30 2026 (Sharing)", priceUSD: "$1,120", priceKES: "KSh 145,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Single room)", priceUSD: "$1,255", priceKES: "KSh 162,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
      { tier: "Jul 1 – Dec 31 2026 (Sharing)", priceUSD: "$1,344", priceKES: "KSh 174,000", includes: ["Park fees (non-residents)", "Unlimited game drives", "All accommodation", "Professional driver/guide", "Luxury land cruiser", "Full board meals", "Drinking water", "All taxes/VAT"] },
    ],
    tags: ["group", "budget", "shared"],
  },

  // ── FLY-INN SAFARIS (Fly_inn_safaris.docx) ──────────────────────────────────

  {
    slug: "fly-inn-mara-3-day",
    category: "fly-inn-safari",
    image: "/assets/tour-safari.jpg",
    title: "3-Day Masai Mara Flying Safari",
    duration: "3 Days",
    price: "From $1,290",
    description: "Fly direct from Wilson Airport into Masai Mara in under an hour — land straight into luxury lodge life with private game drives at Mara Serena Lodge.",
    longDescription: "Transfer from your Nairobi hotel to Wilson Airport, board your ~1hr flight and land directly in the Mara. Enjoy 3 private game drives at the award-winning Mara Serena Lodge, including a complimentary hippo pool breakfast — all on full board.",
    location: "Masai Mara, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/tour-safari.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Fly Nairobi → Masai Mara", description: "Transfer to Wilson Airport (1hr reporting). ~1hr flight to Masai Mara. Lodge 4x4 transfer, lunch, and late afternoon game drive 3:30pm. Dinner & overnight Mara Serena Lodge." },
      { day: 2, title: "Full Day Masai Mara", description: "Early 6:15am game drive then relaxed breakfast. Morning at leisure — pool, nature walk, or Maasai village visit (extra cost). Afternoon game drive. Lodge entertainment and dinner." },
      { day: 3, title: "Fly Back to Nairobi", description: "Relaxed breakfast and checkout. Transfer to airstrip, ~1hr return flight to Wilson Airport. Driver-guide meets you for hotel or JKIA transfer." },
    ],
    pricing: [
      { tier: "22 Dec – 02 Jan 2026", priceUSD: "$1,845", priceKES: "KSh 238,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Mara Serena Lodge", "3 game drives in lodge 4x4 vehicles", "Professional English-speaking driver-guide", "Complimentary hippo pool breakfast", "2 airstrip transfers in Masai Mara", "2 private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "03 Jan – 31 Mar 2026", priceUSD: "$1,465", priceKES: "KSh 189,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Mara Serena Lodge", "3 game drives in lodge 4x4 vehicles", "Professional English-speaking driver-guide", "Complimentary hippo pool breakfast", "2 airstrip transfers in Masai Mara", "2 private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "01 Apr – 31 May 2026", priceUSD: "$1,290", priceKES: "KSh 167,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Mara Serena Lodge", "3 game drives in lodge 4x4 vehicles", "Professional English-speaking driver-guide", "Complimentary hippo pool breakfast", "2 airstrip transfers in Masai Mara", "2 private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "15 Jun – 30 Sep 2026", priceUSD: "$1,765", priceKES: "KSh 228,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Mara Serena Lodge", "3 game drives in lodge 4x4 vehicles", "Professional English-speaking driver-guide", "Complimentary hippo pool breakfast", "2 airstrip transfers in Masai Mara", "2 private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "01 Nov – 21 Dec 2026", priceUSD: "$1,365", priceKES: "KSh 176,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Mara Serena Lodge", "3 game drives in lodge 4x4 vehicles", "Professional English-speaking driver-guide", "Complimentary hippo pool breakfast", "2 airstrip transfers in Masai Mara", "2 private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
    ],
    tags: ["fly-in", "luxury", "private"],
  },

  {
    slug: "fly-inn-mara-4-day",
    category: "fly-inn-safari",
    image: "/assets/lodge1.jpg",
    title: "4-Day Masai Mara Flying Safari",
    duration: "4 Days",
    price: "From $1,575",
    description: "Fly in and spend 3 full days exploring the Masai Mara at the iconic Keekorok Lodge — Kenya's oldest and most celebrated camp.",
    longDescription: "Four days at Keekorok Lodge, the oldest lodge inside Masai Mara. Four game drives in lodge 4x4 vehicles, a flexible schedule, and optional Maasai village visit. Fly from Wilson Airport and return refreshed — no long road journey needed.",
    location: "Masai Mara, Kenya",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/lodge1.jpg", "/assets/tour-safari.jpg", "/assets/gallery-sunset.jpg"],
    itinerary: [
      { day: 1, title: "Fly Nairobi → Masai Mara", description: "Transfer to Wilson Airport, 9:15am flight (~1hr). Lodge 4x4 transfer, lunch, first afternoon game drive. Overnight Keekorok Lodge." },
      { day: 2, title: "Full Day Masai Mara", description: "Two game drives — 6:15am before breakfast and 3:30pm after lunch. Private flexible schedule. Dinner & overnight Keekorok Lodge." },
      { day: 3, title: "Full Day Masai Mara", description: "Morning game drive then optional Maasai village visit. Afternoon game drive. Evening at leisure." },
      { day: 4, title: "Fly Back to Nairobi", description: "Relaxed breakfast and checkout. Transfer to airstrip for 10:30am flight to Nairobi. Transfer to hotel or JKIA." },
    ],
    pricing: [
      { tier: "23 Dec – 02 Jan 2026", priceUSD: "$1,865", priceKES: "KSh 241,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Keekorok Lodge (3 nights)", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Airstrip transfers in Masai Mara", "Private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "03 Jan – 31 Mar 2026", priceUSD: "$1,695", priceKES: "KSh 219,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Keekorok Lodge (3 nights)", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Airstrip transfers in Masai Mara", "Private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "01 Apr – 30 May 2026", priceUSD: "$1,575", priceKES: "KSh 203,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Keekorok Lodge (3 nights)", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Airstrip transfers in Masai Mara", "Private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "15 Jun – 30 Sep 2026", priceUSD: "$2,285", priceKES: "KSh 295,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Keekorok Lodge (3 nights)", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Airstrip transfers in Masai Mara", "Private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
      { tier: "01 Nov – 21 Dec 2026", priceUSD: "$1,635", priceKES: "KSh 211,000", includes: ["Return flights Nairobi–Mara–Nairobi (all taxes)", "Full board at Keekorok Lodge (3 nights)", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Airstrip transfers in Masai Mara", "Private Nairobi transfers ex Wilson Airport", "24hr backup support"] },
    ],
    tags: ["fly-in", "luxury", "private"],
  },

  {
    slug: "fly-inn-serengeti-3-day",
    category: "fly-inn-safari",
    image: "/assets/kilimanjaro.jpg",
    title: "3-Day Serengeti Flying Safari",
    duration: "3 Days",
    price: "From $1,470",
    description: "Fly from Arusha straight into the Serengeti and spend 3 days tracking Tanzania's iconic wildlife at Serengeti Serena Lodge.",
    longDescription: "Board a ~1hr flight from Arusha Airport directly into Serengeti National Park. Four game drives in the lodge's 4x4 vehicles, a complimentary pool, and optional Maasai village visit. Return to Arusha refreshed — baggage limited to 15kg in soft bags.",
    location: "Serengeti, Tanzania",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/kilimanjaro.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Fly Arusha → Serengeti", description: "Transfer to Arusha Airport (1hr reporting, 15kg soft bag limit). ~1hr flight to Serengeti airstrip. Lodge 4x4 transfer, lunch, and afternoon game drive 3:30pm. Overnight Serengeti Serena Lodge." },
      { day: 2, title: "Full Day Serengeti", description: "Early 6:15am game drive, relaxed breakfast, morning at leisure. Afternoon game drive. Optional Maasai village visit at extra cost." },
      { day: 3, title: "Fly Back to Arusha", description: "Early morning game drive before breakfast. Checkout, transfer to airstrip, ~1hr return flight to Arusha. Transfer to hotel or international airport." },
    ],
    pricing: [
      { tier: "22 Dec – 01 Jan 2026", priceUSD: "$1,975", priceKES: "KSh 255,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Serena Lodge", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "2 airstrip transfers in Serengeti", "24hr backup support"] },
      { tier: "01 Feb – 28 Feb 2026", priceUSD: "$2,195", priceKES: "KSh 284,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Serena Lodge", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "2 airstrip transfers in Serengeti", "24hr backup support"] },
      { tier: "01 Apr – 31 May 2026", priceUSD: "$1,470", priceKES: "KSh 190,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Serena Lodge", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "2 airstrip transfers in Serengeti", "24hr backup support"] },
      { tier: "01 Jun – 31 Oct 2026", priceUSD: "$2,195", priceKES: "KSh 284,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Serena Lodge", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "2 airstrip transfers in Serengeti", "24hr backup support"] },
      { tier: "01 Nov – 21 Dec 2026", priceUSD: "$1,670", priceKES: "KSh 216,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Serena Lodge", "4 game drives in lodge 4x4 vehicles", "Professional driver-guide", "2 airstrip transfers in Serengeti", "24hr backup support"] },
    ],
    tags: ["fly-in", "tanzania", "luxury"],
  },

  {
    slug: "fly-inn-serengeti-4-day",
    category: "fly-inn-safari",
    image: "/assets/Tsavo.jpg",
    title: "4-Day Serengeti Flying Safari",
    duration: "4 Days",
    price: "From $2,295",
    description: "Three full days inside the Serengeti at the premier Serengeti Explorer by Elewana — 6 game drives, selected drinks, and complimentary laundry.",
    longDescription: "Fly from Arusha into the Serengeti and stay at the Serengeti Explorer by Elewana (or Four Seasons Safari Lodge). Enjoy 6 game drives across the vast savannah — the Great Migration, lion prides, cheetahs, and leopards. Selected drinks and laundry service included.",
    location: "Serengeti, Tanzania",
    groupSize: "2–8 people",
    difficulty: "Easy",
    gallery: ["/assets/Tsavo.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Fly Arusha → Serengeti", description: "9:15am flight from Arusha. Lodge 4x4 transfer, lunch, and first afternoon game drive. Overnight Serengeti Explorer by Elewana (or Four Seasons Safari Lodge)." },
      { day: 2, title: "Full Day Serengeti", description: "Two game drives — 6:15am and 3:30pm. Track the Big Five, cheetahs, and the Great Migration." },
      { day: 3, title: "Full Day Serengeti", description: "Morning game drive, optional Maasai village visit (extra cost), afternoon game drive deep into the park." },
      { day: 4, title: "Fly Back to Arusha", description: "Breakfast, checkout, 10:30am flight to Arusha. Transfer to hotel or international airport." },
    ],
    pricing: [
      { tier: "21 Dec – 10 Jan 2026", priceUSD: "$3,120", priceKES: "KSh 403,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Explorer by Elewana (3 nights)", "6 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Selected drinks (soft drinks, house wines, local spirits, teas & coffees)", "Complimentary laundry service", "2 airstrip transfers in Serengeti", "24hr backup support"] },
      { tier: "01 Apr – 31 May 2026", priceUSD: "$2,295", priceKES: "KSh 296,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Explorer by Elewana (3 nights)", "6 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Selected drinks (soft drinks, house wines, local spirits, teas & coffees)", "Complimentary laundry service", "2 airstrip transfers in Serengeti", "24hr backup support"] },
      { tier: "01 Jun – 31 Oct 2026", priceUSD: "$3,165", priceKES: "KSh 409,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Explorer by Elewana (3 nights)", "6 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Selected drinks (soft drinks, house wines, local spirits, teas & coffees)", "Complimentary laundry service", "2 airstrip transfers in Serengeti", "24hr backup support"] },
      { tier: "01 Nov – 20 Dec 2026", priceUSD: "$2,640", priceKES: "KSh 341,000", includes: ["Return flights Arusha–Serengeti–Arusha (all taxes)", "Full board at Serengeti Explorer by Elewana (3 nights)", "6 game drives in lodge 4x4 vehicles", "Professional driver-guide", "Selected drinks (soft drinks, house wines, local spirits, teas & coffees)", "Complimentary laundry service", "2 airstrip transfers in Serengeti", "24hr backup support"] },
    ],
    tags: ["fly-in", "tanzania", "luxury", "premium"],
  },

  {
    slug: "4-day-serengeti-ngorongoro-road",
    category: "fly-inn-safari",
    image: "/assets/kilimanjaro.jpg",
    title: "4-Day Serengeti & Ngorongoro Road Safari",
    duration: "4 Days",
    price: "From $1,945",
    description: "Drive from Arusha to the Serengeti then descend into the world's largest intact caldera — Ngorongoro Crater — for a full-day game drive.",
    longDescription: "A private road safari from Arusha combining Serengeti National Park's endless plains with a full-day drive into the UNESCO-protected Ngorongoro Crater. Five game drives total, including a scenic game drive en-route between parks, in your own private 4x4 Land Cruiser.",
    location: "Serengeti & Ngorongoro, Tanzania",
    groupSize: "2–6 people",
    difficulty: "Easy",
    gallery: ["/assets/kilimanjaro.jpg", "/assets/gallery-sunset.jpg", "/assets/gallery-lodge.jpg"],
    itinerary: [
      { day: 1, title: "Arusha → Serengeti", description: "8–8:30am departure from Arusha hotel. Drive to Serengeti National Park, arrive for lunch. Afternoon game drive 3:30pm. Overnight Serengeti Serena Lodge." },
      { day: 2, title: "Full Day Serengeti", description: "Morning game drive 6:15am and afternoon game drive. Track lions, leopards, cheetahs and vast wildebeest herds. Optional Maasai village visit or hot air balloon (extra cost)." },
      { day: 3, title: "Serengeti → Ngorongoro", description: "Relaxed breakfast and checkout. Scenic game drive en-route to Ngorongoro Crater. Arrive Ngorongoro Serena Lodge for lunch. Afternoon at leisure on the crater rim." },
      { day: 4, title: "Ngorongoro Crater → Arusha", description: "Early breakfast, collect packed lunch boxes. Descend into Ngorongoro Crater for a full-day game drive. Picnic lunch at the hippo pool. Ascend and drive to Arusha, arriving ~4:30pm." },
    ],
    pricing: [
      { tier: "01 Jan – 31 Jan 2026", priceUSD: "$2,150 (2–3 pax) / $1,790 (4–5) / $1,595 (6)", priceKES: "KSh 278,000 (2–3 pax) / 231,000 (4–5) / 206,000 (6)", includes: ["Full board accommodation in both lodges", "Exclusive 4x4 Land Cruiser with roof hatch & UHF radio", "5 private game drives incl. Ngorongoro Crater descent", "Certified English-speaking driver-guide", "All park & concession entry fees", "Fuel & driver allowances", "24hr backup support"] },
      { tier: "01 Apr – 31 May 2026", priceUSD: "$1,945 (2–3 pax) / $1,520 (4–5) / $1,385 (6)", priceKES: "KSh 251,000 (2–3 pax) / 196,000 (4–5) / 179,000 (6)", includes: ["Full board accommodation in both lodges", "Exclusive 4x4 Land Cruiser with roof hatch & UHF radio", "5 private game drives incl. Ngorongoro Crater descent", "Certified English-speaking driver-guide", "All park & concession entry fees", "Fuel & driver allowances", "24hr backup support"] },
      { tier: "01 Jun – 31 Oct 2026", priceUSD: "$2,725 (2–3 pax) / $2,285 (4–5) / $2,160 (6)", priceKES: "KSh 352,000 (2–3 pax) / 295,000 (4–5) / 279,000 (6)", includes: ["Full board accommodation in both lodges", "Exclusive 4x4 Land Cruiser with roof hatch & UHF radio", "5 private game drives incl. Ngorongoro Crater descent", "Certified English-speaking driver-guide", "All park & concession entry fees", "Fuel & driver allowances", "24hr backup support"] },
      { tier: "01 Nov – 21 Dec 2026", priceUSD: "$2,270 (2–3 pax) / $1,880 (4–5) / $1,675 (6)", priceKES: "KSh 293,000 (2–3 pax) / 243,000 (4–5) / 216,000 (6)", includes: ["Full board accommodation in both lodges", "Exclusive 4x4 Land Cruiser with roof hatch & UHF radio", "5 private game drives incl. Ngorongoro Crater descent", "Certified English-speaking driver-guide", "All park & concession entry fees", "Fuel & driver allowances", "24hr backup support"] },
    ],
    tags: ["private", "road", "tanzania"],
  },

];
