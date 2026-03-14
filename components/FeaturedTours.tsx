import Link from "next/link";
import Image from "next/image";
import { toursData } from "@/data/tours";

/**
 * Add a `category` field to each tour in your toursData array.
 * Valid values: "bush-safari" | "beach-escape" | "mountain-journey" |
 *               "adventure-wildlife" | "city-safari" | "lodge-safari"
 */

const CATEGORIES = [
  {
    key: "bush-safari",
    label: "Bush Safaris",
    icon: "🦁",
    description: "Immerse yourself in the untamed African bush",
  },
  {
    key: "beach-escape",
    label: "Beach Escapes",
    icon: "🏖️",
    description: "Sun, sea and serenity along Kenya's coastline",
  },
  {
    key: "mountain-journey",
    label: "Mountain Journeys & Guided Alpine Hiking",
    icon: "🏔️",
    description: "Conquer peaks and trek through highland landscapes",
  },
  {
    key: "adventure-wildlife",
    label: "Adventure & Wildlife",
    icon: "🐘",
    description: "Thrilling encounters with Africa's iconic wildlife",
  },
  {
    key: "city-safari",
    label: "City Safari / Game & Park",
    icon: "🏙️",
    description: "Urban adventures and day trips to nearby reserves",
  },
  {
    key: "lodge-safari",
    label: "Lodge Safari & Signature Food",
    icon: "🍽️",
    description: "Luxury lodges paired with unforgettable culinary experiences",
  },
];

interface Tour {
  slug: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  category: string;
}

const TourCard = ({ tour }: { tour: Tour }) => (
  <Link href={`/tours/${tour.slug}`} className="group block">
    {/* Image */}
    <div className="relative overflow-hidden rounded-2xl mb-5 aspect-3/4 shadow-lg">
      <Image
        src={tour.image}
        alt={tour.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-5 left-5 right-5 z-10">
        <span className="bg-[#4B5320] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
          {tour.duration}
        </span>
      </div>
    </div>
    {/* Text */}
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4B5320] transition-colors">
        {tour.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
        {tour.description}
      </p>
      <p className="text-[#4B5320] font-bold text-lg pt-1">{tour.price}</p>
    </div>
  </Link>
);

const FeaturedTours = () => {
  return (
    <section id="tours" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-[#4B5320] font-medium tracking-[0.3em] uppercase text-sm mb-3">
            Our Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Tour Categories
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-xl mx-auto leading-relaxed">
            From untamed wilderness to coastal escapes — every journey crafted for you.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-24">
          {CATEGORIES.map((cat) => {
            const tours = (toursData as Tour[])
              .filter((t) => t.category === cat.key)
              .slice(0, 3);

            if (tours.length === 0) return null;

            return (
              <div key={cat.key}>
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3 border-b border-gray-100 pb-5">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-3xl">{cat.icon}</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {cat.label}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm pl-11">{cat.description}</p>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {tours.map((tour) => (
                    <TourCard key={tour.slug} tour={tour} />
                  ))}
                </div>

                {/* See More Button */}
                <div className="text-center mt-12">
                  <Link
                    href={`/tours?category=${cat.key}`}
                    className="inline-flex items-center gap-2 border-2 border-[#4B5320] text-[#4B5320] px-10 py-3 rounded-sm font-semibold tracking-wider uppercase text-xs hover:bg-[#4B5320] hover:text-white transition-all duration-200"
                  >
                    See More {cat.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-24">
          <Link
            href="/tours"
            className="inline-block bg-[#4B5320] text-white px-14 py-4 rounded-sm font-semibold tracking-wider uppercase text-sm hover:bg-[#3a411a] transition shadow-lg"
          >
            View All Tours
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedTours;