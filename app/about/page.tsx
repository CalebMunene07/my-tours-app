export default function AboutPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-[#4B5320] mb-8">About Wikima Safari</h1>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Founded on a passion for the African wild, Wikima Safari specializes in creating 
            personalized, unforgettable experiences across East Africa.
          </p>
          <p>
            Our team of local experts ensures that every journey is not just a trip, but a 
            deep dive into the culture, wildlife, and landscapes of Kenya.
          </p>
        </div>
        <div className="bg-[#005c0b] rounded-4xl p-8 text-white border-2 border-[#D4AF37]">
          <h4 className="font-bold text-xl text-[#D4AF37] mb-2">Our Mission</h4>
          <p className="text-sm opacity-90">To provide sustainable, luxury safari solutions that protect our heritage and empower local communities.</p>
        </div>
      </div>
    </main>
  );
}