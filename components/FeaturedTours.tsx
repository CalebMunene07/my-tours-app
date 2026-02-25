import Link from "next/link";
import Image from "next/image";
import { toursData } from "@/data/tours";

const FeaturedTours = () => {
  return (
    <section id="tours" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium tracking-[0.3em] uppercase text-sm mb-3">
            Our Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Featured Tours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {toursData.map((tour) => (
            <Link href={`/tours/${tour.slug}`} key={tour.slug} className="group block">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl mb-5 aspect-3/4 shadow-lg">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-80" />
                
                {/* Duration Badge */}
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <span className="bg-blue-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-lg">
                    {tour.duration}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {tour.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {tour.description}
                </p>
                <p className="text-blue-600 font-bold text-lg pt-2">
                  {tour.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;