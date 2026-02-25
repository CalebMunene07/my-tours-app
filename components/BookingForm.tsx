"use client"; // Fixed: Necessary for interactivity like 'onClick' and 'onSubmit'

import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

// 1. Define the Validation Schema
const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  date: z.string().min(1, "Preferred date is required"),
  guests: z.string().min(1, "Number of guests is required"),
  package: z.string().min(1, "Please select a package"),
  message: z.string().max(1000).optional(),
});

type BookingData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  tourTitle: string;
  pricingTiers: string[];
}

const BookingForm = ({ tourTitle, pricingTiers }: BookingFormProps) => {
  const [form, setForm] = useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    package: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = bookingSchema.safeParse(form);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingData, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof BookingData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Please check the form for errors.");
      return;
    }

    setSubmitted(true);
    toast.success(`Booking request for ${tourTitle} submitted!`);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 bg-green-50 rounded-xl border border-green-200">
        <p className="text-[#4B5320] text-2xl font-bold mb-2">Request Submitted! 🎉</p>
        <p className="text-gray-600">We'll get back to you within 24 hours to confirm your booking.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-[#4B5320] font-bold hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  // UPDATED: Bright Theme Classes with Army Green Accents
  const inputClass = "w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#4B5320] focus:ring-1 focus:ring-[#4B5320] transition text-sm";
  const labelClass = "block text-gray-700 text-sm font-semibold mb-1.5";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className={inputClass} />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputClass} />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Phone *</label>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" className={inputClass} />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>
        <div>
          <label className={labelClass}>Preferred Date *</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} />
          {errors.date && <p className={errorClass}>{errors.date}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Guests *</label>
          <select name="guests" value={form.guests} onChange={handleChange} className={inputClass}>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={String(n)}>{n} {n === 1 ? "Guest" : "Guests"}</option>
            ))}
          </select>
          {errors.guests && <p className={errorClass}>{errors.guests}</p>}
        </div>
        <div>
          <label className={labelClass}>Package *</label>
          <select name="package" value={form.package} onChange={handleChange} className={inputClass}>
            <option value="">Select package</option>
            {pricingTiers.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.package && <p className={errorClass}>{errors.package}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Special Requests</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any special requirements..." className={inputClass} />
      </div>

      <button
        type="submit"
        className="w-full bg-[#4B5320] text-white py-4 rounded-xl font-bold tracking-wider uppercase text-sm hover:bg-[#3a411a] transition-all shadow-md"
      >
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;