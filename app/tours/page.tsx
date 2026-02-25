import Image from "next/image";
import Link from "next/link";
import { toursData } from "@/data/tours";
import { CheckCircle2, Tent, Crown, Gem } from "lucide-react"; // Added distinct icons

export default function ToursListingPage() {
  const packages = [
    {
      name: "Standard",
      icon: <Tent size={40} className="text-[#D4AF37] mb-4" />, // Distinct Icon
      color: "#005c0b",
      border: "#D4AF37",
      description: "Essential safari comfort for the conscious traveler.",
      features: ["Shared 4x4 Safari Vehicle", "Mid-range Safari Lodges", "Professional Driver/Guide", "Full Board Meals", "National Park Fees"],
    },
    {
      name: "Premium",
      icon: <Crown size={40} className="text-[#D4AF37] mb-4" />, // Distinct Icon
      color: "#005c0b",
      border: "#D4AF37",
      description: "Enhanced privacy and superior lodge selections.",
      features: ["Private 4x4 Landcruiser", "Luxury Boutique Camps", "Expert Naturalist Guide", "Flying Doctors Cover", "Airport Transfers", "Sundowner Experiences"],
    },
    {
      name: "Luxury",
      icon: <Gem size={40} className="text-[#D4AF37] mb-4" />, // Distinct Icon
      color: "#005c0b",
      border: "#D4AF37",
      description: "The ultimate bush experience with zero compromises.",
      features: ["Private Charter Flights", "Ultra-Luxury Lodges", "Private Chef & Butler", "Dedicated Photography Guide", "Premium Drinks Included", "Private Spa Treatments"],
    },
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto bg-white">
      {/* Tours Listing Section */}
      <section>
        <h1 className="text-5xl font-extrabold mb-4 text-[#4B5320]">Our Safari Adventures</h1>
        <p className="text-gray-600 mb-12 text-lg">Choose your next journey into the wild.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {toursData.map((tour) => (
            <Link key={tour.slug} href={`/tours/${tour.slug}`} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
                <div className="relative h-64 w-full">
                  <Image 
                    src={tour.image} 
                    alt={tour.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900">{tour.title}</h2>
                  <p className="text-[#4B5320] font-bold text-sm mt-1">{tour.location} • {tour.duration}</p>
                  <p className="text-gray-500 mt-4 line-clamp-2 text-sm">{tour.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-black text-gray-900">
                      ${tour.pricing[0].price}
                    </span>
                    <span className="bg-[#4B5320] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase shadow-sm">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Package Cards Section */}
      <section className="pt-16 border-t border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#4B5320] mb-4">Travel Packages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Three distinct tiers of service to ensure your safari matches your preferred level of comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className="border-[3px] rounded-[2.5rem] p-10 text-white shadow-2xl flex flex-col hover:-translate-y-2 transition-transform duration-300"
              style={{ backgroundColor: pkg.color, borderColor: pkg.border }}
            >
              {/* Render the distinct icon here */}
              <div className="mb-2">{pkg.icon}</div>
              
              <h3 className="text-3xl font-bold mb-2 text-[#D4AF37]">{pkg.name}</h3>
              <p className="text-sm opacity-80 mb-8 min-h-10">{pkg.description}</p>
              
              <ul className="space-y-4 mb-10 grow">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-tight">
                    <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0" />
                    <span className="opacity-95">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/contact"
                className="bg-[#D4AF37] w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm text-center hover:bg-white transition-colors"
                style={{ color: pkg.color }}
              >
                Inquire Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}