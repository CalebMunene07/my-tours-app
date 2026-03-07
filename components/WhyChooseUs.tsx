import { Shield, Users, MapPin, Star } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Expert Guides",
    description: "Our certified guides bring decades of experience and deep knowledge of East African wildlife and culture.",
  },
  {
    icon: MapPin,
    title: "Curated Routes",
    description: "Handpicked itineraries designed to showcase the most breathtaking and exclusive destinations.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description: "Intimate group sizes ensure personalized attention and minimal environmental impact.",
  },
  {
    icon: Star,
    title: "Premium Service",
    description: "From luxury lodges to gourmet bush dining, every detail is crafted for an extraordinary experience.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24" style={{ background: "linear-gradient(135deg, #f5f0e8 0%, #ede8dc 50%, #e8e0d0 100%)" }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-medium tracking-[0.3em] uppercase text-sm mb-3" style={{ color: "#8B6914" }}>
            Why Wikima
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "#2d3a10" }}>
            Why Choose Us
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((r) => (
            <div key={r.title} className="text-center group">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(212, 175, 55, 0.15)", border: "1px solid rgba(212, 175, 55, 0.3)" }}
              >
                <r.icon className="w-7 h-7" style={{ color: "#D4AF37" }} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3" style={{ color: "#2d3a10" }}>
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5a5040" }}>
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;