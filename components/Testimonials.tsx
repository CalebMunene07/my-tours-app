import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "London, UK",
    text: "An absolutely life-changing experience. The Masai Mara safari exceeded every expectation. Explorer's guides were phenomenal!",
    rating: 5,
  },
  {
    name: "James Odhiambo",
    location: "Nairobi, Kenya",
    text: "I've lived in Kenya my whole life and Explorer showed me places I never knew existed. Their attention to detail is unmatched.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    location: "Toronto, Canada",
    text: "From the beach escape to the safari, everything was seamlessly organized. We'll definitely be coming back for the mountain trek!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-medium tracking-[0.3em] uppercase text-xs mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.name} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-4 h-4 fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-8 italic">
                &ldquo;{t.text}&ldquo;
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;