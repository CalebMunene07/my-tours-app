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
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-safari-gold font-medium tracking-[0.3em] uppercase text-sm mb-3">Why Wikima</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Why Choose Us</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((r) => (
            <div key={r.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-safari-gold/20 mb-6">
                <r.icon className="w-7 h-7 text-safari-gold" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary-foreground mb-3">{r.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
