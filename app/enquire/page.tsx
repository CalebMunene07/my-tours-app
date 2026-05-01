import EnquiryForm from "@/components/EnquiryForm";
import { MessageSquare, Compass, HeartHandshake } from "lucide-react";

export default function EnquirePage() {
  return (
    <main className="min-h-screen bg-[#141d08] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/30 px-3 py-1 rounded-full mb-4">
            Package Enquiry
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Craft Your Dream Safari
          </h1>

          <p className="text-[#edf3f5] text-lg leading-relaxed">
            Not ready to book? Tell us what you have in mind — our specialists will design a tailored itinerary for you. No commitment required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Why enquire */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            {[
              {
                icon: <Compass size={22} className="text-[#D4AF37]" />,
                title: "Custom Itineraries",
                desc: "We design routes around your interests, budget, and travel dates — no cookie-cutter tours.",
              },
              {
                icon: <MessageSquare size={22} className="text-[#D4AF37]" />,
                title: "Expert Advice",
                desc: "Our team has first-hand knowledge of every destination we offer. We'll tell you exactly what to expect.",
              },
              {
                icon: <HeartHandshake size={22} className="text-[#D4AF37]" />,
                title: "No Pressure",
                desc: "An enquiry is free and non-binding. We'll send you a detailed quote with no obligation to book.",
              },
            ].map(card => (
              <div key={card.title} className="flex items-start gap-4 bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center shrink-0">
                  {card.icon}
                </div>

                <div>
                  <p className="font-bold text-white text-sm mb-0.5">
                    {card.title}
                  </p>

                  <p className="text-xs text-[#edf3f5] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Packages teaser */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#edf3f5] mb-3">
                Available Packages
              </p>

              {[
                { emoji: "🏕️", label: "Standard", price: "From $890/pp" },
                { emoji: "⭐", label: "Premium", price: "From $1,450/pp" },
                { emoji: "💎", label: "Luxury", price: "From $2,800/pp" },
                { emoji: "💍", label: "Romance Escape", price: "From $1,800/couple" },
                { emoji: "✨", label: "Custom", price: "Price on request" },
              ].map(p => (
                <div
                  key={p.label}
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{p.emoji}</span>
                    <span className="text-sm text-[#edf3f5] font-medium">
                      {p.label}
                    </span>
                  </div>

                  <span className="text-xs text-[#edf3f5]">
                    {p.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry form */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">

              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Tell Us About Your Trip
              </h2>

              <p className="text-sm text-gray-600 mb-7">
                We'll get back to you with a personalised itinerary within 24 hours.
              </p>

              <EnquiryForm />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}