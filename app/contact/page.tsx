import BookingForm from "@/components/BookingForm";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="pt-32 pb-20 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-[#4B5320] mb-6">Plan Your Trip</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Have questions about a safari? Or want a custom-tailored itinerary?
            Fill out the form below or reach out to our office directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Contact Info */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">

                {/* Phone — two numbers */}
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-[#4B5320] shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Call Us</p>
                    <a href="tel:+61430057611" className="block text-gray-600 hover:text-[#4B5320] transition-colors">
                      +61 430 057 611
                    </a>
                    <a href="tel:+254720069550" className="block text-gray-600 hover:text-[#4B5320] transition-colors mt-0.5">
                      +254 720 069 550
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-[#4B5320] shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Email Us</p>
                    <a href="mailto:info@wikimasafari.com" className="text-gray-600 hover:text-[#4B5320] transition-colors">
                      info@wikimasafari.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-[#4B5320] shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Visit Our Office</p>
                    <p className="text-gray-600">Nairobi, Kenya<br />Safari Centre, 2nd Floor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#4B5320] rounded-3xl text-white">
              <h4 className="font-bold text-xl mb-2">Why Book with Us?</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• Certified Local Guides</li>
                <li>• 24/7 Ground Support</li>
                <li>• Custom Tailored Itineraries</li>
                <li>• Sustainable Safari Practices</li>
              </ul>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Request</h2>
              <BookingForm tourTitle="Custom Trip Inquiry" pricingTiers={["Standard","Premium","Luxury"]} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}