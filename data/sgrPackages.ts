// data/sgrPackages.ts
//
// SGR (Standard Gauge Railway) beach hotel packages — Kenyan/East African
// RESIDENT-ONLY rates, priced per-person-sharing (PPS) in KES. Sourced from:
//   MALINDI_WATAMU_SGR_PACKAGES.docx
//   SOUTHCOAST_PACKAGES.docx
//   NORTH_COAST_SGR_PACKAGES.docx
//
// Meal plan codes: AL = All Inclusive, HB = Half Board, BB = Bed & Breakfast

export interface SgrRateTier {
  validity: string;
  ppsRateKES: string;
  minNightsChristmas?: string;
}

export interface SgrHotel {
  name: string;
  mealPlan: string;
  rates: SgrRateTier[];
}

export interface SgrRegion {
  key: string;
  title: string;
  subtitle: string;
  image: string;
  hotels: SgrHotel[];
}

export const sgrPackages: SgrRegion[] = [
  {
    key: "malindi-watamu",
    title: "Malindi & Watamu SGR Packages",
    subtitle: "Turquoise lagoons and marine parks on Kenya's north coast",
    image: "/assets/tour-beach.jpg",
    hotels: [
      {
        name: "Turtle Bay Resort",
        mealPlan: "All Inclusive",
        rates: [
          { validity: "21st Jul – 19th Dec", ppsRateKES: "KES 34,000" },
          { validity: "20th – 23rd Dec", ppsRateKES: "KES 13,500" },
          { validity: "23rd Dec – 2nd Jan", ppsRateKES: "KES 58,900", minNightsChristmas: "3 Nights" },
        ],
      },
      {
        name: "Temple Point",
        mealPlan: "Half Board",
        rates: [
          { validity: "Jan – 19th Dec", ppsRateKES: "KES 40,700" },
          { validity: "20th Dec – 10th Jan", ppsRateKES: "KES 94,700", minNightsChristmas: "4 Nights" },
        ],
      },
      {
        name: "The One Watamu",
        mealPlan: "Half Board",
        rates: [
          { validity: "1st Apr – 21st Dec", ppsRateKES: "KES 21,000" },
          { validity: "22nd Dec – 1st Jan", ppsRateKES: "KES 77,000", minNightsChristmas: "4 Nights" },
        ],
      },
      {
        name: "Medina Palms",
        mealPlan: "Bed & Breakfast",
        rates: [
          { validity: "Apr – 31st Jul", ppsRateKES: "KES 33,600" },
          { validity: "Aug", ppsRateKES: "KES 44,000" },
          { validity: "1st – 19th Dec", ppsRateKES: "KES 34,000" },
          { validity: "20th – 26th Dec", ppsRateKES: "KES 43,700" },
          { validity: "27th Dec – 5th Jan", ppsRateKES: "KES 99,800", minNightsChristmas: "3 Nights" },
        ],
      },
    ],
  },
  {
    key: "north-coast",
    title: "North Coast SGR Packages",
    subtitle: "Bamburi, Nyali and Shanzu's finest beachfront resorts",
    image: "/assets/tour-beach.jpg",
    hotels: [
      {
        name: "Milele Beach Hotel",
        mealPlan: "Half Board",
        rates: [
          { validity: "Jan – 21st Dec", ppsRateKES: "KES 19,000" },
          { validity: "22nd Dec – Jan 2027", ppsRateKES: "KES 28,000", minNightsChristmas: "2 Nights" },
        ],
      },
      {
        name: "Plaza Beach Resort",
        mealPlan: "Half Board",
        rates: [{ validity: "4th – 22nd Dec", ppsRateKES: "KES 21,500" }],
      },
      {
        name: "Mombasa Continental Resort",
        mealPlan: "Half Board",
        rates: [{ validity: "Jan – 22nd Dec", ppsRateKES: "KES 38,025" }],
      },
      {
        name: "Travellers Beach Resort",
        mealPlan: "Half Board",
        rates: [
          { validity: "1st Jul – 31st Aug", ppsRateKES: "KES 35,900" },
          { validity: "1st Sept – 31st Oct", ppsRateKES: "KES 34,100" },
          { validity: "1st Nov – 22nd Dec", ppsRateKES: "KES 38,000" },
          { validity: "23rd Dec", ppsRateKES: "KES 128,800", minNightsChristmas: "4 Nights" },
        ],
      },
      {
        name: "Bamburi Beach Resort",
        mealPlan: "All Inclusive",
        rates: [
          { validity: "1st Jul – 30th Nov", ppsRateKES: "KES 50,000" },
          { validity: "1st – 22nd Dec", ppsRateKES: "KES 50,000" },
          { validity: "23rd Dec – 3rd Jan", ppsRateKES: "KES 144,000", minNightsChristmas: "4 Nights" },
        ],
      },
      {
        name: "Voyager Beach Resort",
        mealPlan: "All Inclusive",
        rates: [
          { validity: "Jul", ppsRateKES: "KES 28,700" },
          { validity: "Aug", ppsRateKES: "KES 39,900" },
          { validity: "Sept – 30th Oct", ppsRateKES: "KES 38,400" },
          { validity: "Nov", ppsRateKES: "KES 39,900" },
          { validity: "1st – 22nd Dec", ppsRateKES: "KES 41,400" },
          { validity: "23rd Dec – 3rd Jan", ppsRateKES: "KES 149,300", minNightsChristmas: "5 Nights" },
        ],
      },
      {
        name: "Flamingo Beach Resort",
        mealPlan: "All Inclusive",
        rates: [
          { validity: "Jul", ppsRateKES: "KES 36,450" },
          { validity: "Aug", ppsRateKES: "KES 43,800" },
          { validity: "Sept – 30th Nov", ppsRateKES: "KES 39,600" },
          { validity: "Dec – 19th Dec", ppsRateKES: "KES 43,800" },
          { validity: "23rd Dec – 2nd Jan", ppsRateKES: "KES 174,000", minNightsChristmas: "5 Nights" },
        ],
      },
      {
        name: "Pride Inn Paradise Beach Resort",
        mealPlan: "Half Board",
        rates: [
          { validity: "Jul", ppsRateKES: "KES 38,000" },
          { validity: "Aug – 19th Dec", ppsRateKES: "KES 42,000" },
          { validity: "23rd Dec – 2nd Jan", ppsRateKES: "KES 203,500", minNightsChristmas: "5 Nights" },
        ],
      },
      {
        name: "Serena Beach Resort",
        mealPlan: "Half Board",
        rates: [{ validity: "Jul – 22nd Dec", ppsRateKES: "KES 39,000" }],
      },
      {
        name: "Sarova Whitesands Beach Resort",
        mealPlan: "Half Board",
        rates: [{ validity: "Jan – 22nd Dec", ppsRateKES: "KES 38,500" }],
      },
    ],
  },
  {
    key: "south-coast",
    title: "South Coast SGR Packages",
    subtitle: "Diani and beyond — white sands south of the Likoni ferry",
    image: "/assets/diani.jpg",
    hotels: [
      {
        name: "Papillon Lagoon Reef Hotel",
        mealPlan: "All Inclusive",
        rates: [{ validity: "Jul – 21st Dec", ppsRateKES: "KES 31,500" }],
      },
      {
        name: "Kaskazi Beach Hotel",
        mealPlan: "Half Board",
        rates: [
          { validity: "Jul – 31st Aug", ppsRateKES: "KES 28,500" },
          { validity: "Sept – 30th Nov", ppsRateKES: "KES 26,000" },
          { validity: "1st – 22nd Dec", ppsRateKES: "KES 28,000" },
          { validity: "22nd Dec – 3rd Jan", ppsRateKES: "KES 79,000", minNightsChristmas: "4 Nights" },
        ],
      },
      {
        name: "Diamonds Leisure Beach Resort",
        mealPlan: "All Inclusive",
        rates: [{ validity: "Jul – 23rd Dec", ppsRateKES: "KES 43,960" }],
      },
      {
        name: "Diani Reef Beach Resort",
        mealPlan: "Half Board",
        rates: [
          { validity: "Jul – 21st Dec", ppsRateKES: "KES 31,000" },
          { validity: "22nd Dec – 2nd Jan", ppsRateKES: "KES 59,000", minNightsChristmas: "3 Nights" },
        ],
      },
      {
        name: "Diani Sea Lodge",
        mealPlan: "—",
        rates: [
          { validity: "Jul – 30th Sept", ppsRateKES: "KES 31,000" },
          { validity: "Oct – 20th Dec", ppsRateKES: "KES 33,600" },
          { validity: "21st Dec – 2nd Jan", ppsRateKES: "KES 110,000", minNightsChristmas: "5 Nights" },
        ],
      },
      {
        name: "Diani Sea Resort",
        mealPlan: "All Inclusive",
        rates: [
          { validity: "Jul – 30th Sept", ppsRateKES: "KES 31,800" },
          { validity: "Oct – 20th Dec", ppsRateKES: "KES 34,800" },
          { validity: "21st Dec – 2nd Jan", ppsRateKES: "KES 111,500", minNightsChristmas: "5 Nights" },
        ],
      },
      {
        name: "Leopard Beach Resort",
        mealPlan: "Half Board",
        rates: [
          { validity: "Jul – 31st Aug", ppsRateKES: "KES 36,000" },
          { validity: "Sept – 22nd Dec", ppsRateKES: "KES 34,000" },
        ],
      },
      {
        name: "Southern Palm Beach Resort",
        mealPlan: "All Inclusive",
        rates: [
          { validity: "Jul – 31st Aug", ppsRateKES: "KES 54,500" },
          { validity: "Sept – 30th Nov", ppsRateKES: "KES 49,000" },
        ],
      },
      {
        name: "Baobab Beach Resort",
        mealPlan: "All Inclusive",
        rates: [
          { validity: "Jul – 31st Aug", ppsRateKES: "KES 43,600" },
          { validity: "Sept – 31st Oct", ppsRateKES: "KES 37,700" },
          { validity: "1st – 30th Nov", ppsRateKES: "KES 39,000" },
          { validity: "1st – 21st Dec", ppsRateKES: "KES 43,600" },
          { validity: "22nd Dec – 2nd Jan", ppsRateKES: "KES 156,000", minNightsChristmas: "5 Nights" },
        ],
      },
      {
        name: "Swahili Beach Resort",
        mealPlan: "Half Board",
        rates: [
          { validity: "Jul – 31st Aug", ppsRateKES: "KES 49,100" },
          { validity: "Sept", ppsRateKES: "KES 47,000" },
          { validity: "Oct", ppsRateKES: "KES 50,000" },
          { validity: "Nov – 22nd Dec", ppsRateKES: "KES 47,000" },
          { validity: "23rd Dec – 3rd Jan", ppsRateKES: "KES 128,000", minNightsChristmas: "5 Nights" },
        ],
      },
    ],
  },
];
