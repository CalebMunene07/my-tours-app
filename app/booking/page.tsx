import BookingForm from "@/components/BookingForm";
import { MapPin, Clock, Shield } from "lucide-react";

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f1] pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-[#4B5320] bg-[#4B5320]/10 border border-[#4B5320]/20 px-3 py-1 rounded-full mb-4">
            Secure Booking
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Book Your Safari
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Complete the form below to secure your spot. A 60% deposit is charged on confirmation — the balance is due on arrival.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Trust badges — left column */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28">
            {[
              {
                icon: <Shield size={22} className="text-[#4B5320]" />,
                title: "Secure & Protected",
                desc:  "All payments processed over SSL. M-Pesa and card accepted.",
              },
              {
                icon: <Clock size={22} className="text-[#4B5320]" />,
                title: "24h Confirmation",
                desc:  "Our team confirms your booking within 24 hours of submission.",
              },
              {
                icon: <MapPin size={22} className="text-[#4B5320]" />,
                title: "Expert Local Guides",
                desc:  "Every tour led by certified Kenyan naturalists with 10+ years experience.",
              },
            ].map(card => (
              <div key={card.title} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 bg-[#4B5320]/10 rounded-xl flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-0.5">{card.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}

            {/* Deposit breakdown */}
            <div className="bg-[#4B5320] text-white rounded-2xl p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-3">Payment Structure</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/80">Deposit (now)</span>
                  <span className="font-bold">60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Balance (on arrival)</span>
                  <span className="font-bold">40%</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 text-[11px] text-white/50 leading-relaxed">
                Cancellations 30+ days before travel receive a full refund of the deposit.
              </div>
            </div>
          </div>

          {/* Booking form — right column */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
