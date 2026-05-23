"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API = "https://wikima-backend.onrender.com";
const PRIMARY = "#07301d";

const COUNTRY_CODES = [
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+1",   flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
];

const PACKAGES = [
  { id: "standard", label: "Standard",        tagline: "Essential safari comfort",           price: "From $890 / person",   icon: "🏕️", popular: false },
  { id: "premium",  label: "Premium",          tagline: "Private vehicle & boutique camps",   price: "From $1,450 / person", icon: "⭐", popular: true  },
  { id: "luxury",   label: "Luxury",           tagline: "Ultra-luxury with zero compromises", price: "From $2,800 / person", icon: "💎", popular: false },
  { id: "romance",  label: "Romance Escape",   tagline: "Honeymoons & special occasions",     price: "From $1,800 / couple", icon: "💍", popular: false },
  { id: "custom",   label: "Custom Itinerary", tagline: "Fully tailored to your needs",       price: "Price on request",     icon: "✨", popular: false },
];

const INTERESTS = [
  "Big Five Game Drive", "Birdwatching", "Beach & Coastal", "Mountain Trekking",
  "Cultural Visits", "Photography Safari", "Walking Safari", "Night Game Drive",
  "Balloon Safari", "Fishing",
];

const BUDGETS = [
  "Under $1,000", "$1,000 – $2,500", "$2,500 – $5,000",
  "$5,000 – $10,000", "$10,000+", "Flexible / Not sure",
];

const HEAR_ABOUT = [
  "Google Search", "Social Media", "Friend / Family", "Travel Agent",
  "Blog / Article", "Repeat Client", "Other",
];

export default function EnquiryForm() {
  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:border-[#07301d] focus:ring-2 focus:ring-[#07301d]/20 transition-all placeholder:text-gray-400";
  const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5";

  const [step, setStep]           = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const [form, setForm] = useState({
    name: "", email: "", phoneLocal: "", countryCode: "+254",
    package: "", interests: [] as string[],
    destinations: "", travelDate: "", flexibility: "exact",
    adults: "2", children: "0", duration: "5",
    budget: "", hearAboutUs: "", message: "",
  });

  const set = (field: string, value: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleInterest = (item: string) => {
    const list = form.interests.includes(item)
      ? form.interests.filter(i => i !== item)
      : [...form.interests, item];
    set("interests", list);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setError("Please fill in your name and email.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // ✅ Correct endpoint — sends email to company via Resend
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:         form.name,
          email:        form.email,
          phone:        form.phoneLocal ? `${form.countryCode} ${form.phoneLocal}` : "",
          package:      form.package,
          destinations: form.destinations,
          travelDate:   form.travelDate,
          adults:       form.adults,
          children:     form.children,
          duration:     form.duration,
          budget:       form.budget,
          interests:    form.interests,
          hearAboutUs:  form.hearAboutUs,
          message:      form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send enquiry. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Confirmed screen ── */
  if (submitted) {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-16 h-16 bg-[#eef6f2] border-2 border-[#07301d] rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={28} className="text-[#07301d]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Enquiry Received!</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          We&apos;ve sent a copy to <strong className="text-gray-700">{form.email}</strong>.<br/>
          Our team will contact you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(1); }}
          className="mt-6 text-xs text-gray-400 hover:text-[#07301d] underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* Step progress */}
      <div className="flex items-center gap-2 mb-6">
        {[1, 2, 3].map((s, i) => (
          <React.Fragment key={s}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              s < step   ? "bg-[#07301d] text-white" :
              s === step ? "bg-[#07301d] text-white ring-4 ring-[#07301d]/20" :
                           "bg-gray-100 text-gray-400"
            }`}>
              {s < step ? "✓" : s}
            </div>
            {i < 2 && <div className={`flex-1 h-0.5 transition-all ${s < step ? "bg-[#07301d]" : "bg-gray-200"}`}/>}
          </React.Fragment>
        ))}
        <span className="ml-2 text-xs text-gray-400 font-medium">
          {step === 1 ? "Your Details" : step === 2 ? "Safari Preferences" : "Review & Send"}
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl mb-5">
          <AlertCircle size={14}/> {error}
        </div>
      )}

      {/* ── STEP 1: Personal Details ── */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Doe" required/>
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input className={inputCls} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@email.com" required/>
            </div>
          </div>

          <div>
            <label className={labelCls}>Phone (optional)</label>
            <div className="flex gap-2">
              <select
                value={form.countryCode}
                onChange={e => set("countryCode", e.target.value)}
                className="px-3 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:border-[#07301d] cursor-pointer"
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                ))}
              </select>
              <input
                className={`${inputCls} flex-1`}
                value={form.phoneLocal}
                onChange={e => set("phoneLocal", e.target.value)}
                placeholder="700 000 000"
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Package Interest</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PACKAGES.map(pkg => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => set("package", pkg.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    form.package === pkg.id
                      ? "border-[#07301d] bg-[#eef6f2]"
                      : "border-gray-200 bg-gray-50 hover:border-[#07301d]/40"
                  }`}
                >
                  <span className="text-xl">{pkg.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{pkg.label}{pkg.popular ? " ⭐" : ""}</p>
                    <p className="text-xs text-gray-500">{pkg.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 2: Safari Preferences ── */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className={labelCls}>Destinations / Tours of Interest</label>
            <input
              className={inputCls}
              value={form.destinations}
              onChange={e => set("destinations", e.target.value)}
              placeholder="e.g. Masai Mara, Diani Beach, Kilimanjaro…"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Preferred Travel Date</label>
              <input className={inputCls} type="date" value={form.travelDate} onChange={e => set("travelDate", e.target.value)}/>
            </div>
            <div>
              <label className={labelCls}>Duration (days)</label>
              <select className={inputCls} value={form.duration} onChange={e => set("duration", e.target.value)}>
                {[1,2,3,4,5,6,7,8,9,10,14,21].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? "day" : "days"}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Adults</label>
              <select className={inputCls} value={form.adults} onChange={e => set("adults", e.target.value)}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Children</label>
              <select className={inputCls} value={form.children} onChange={e => set("children", e.target.value)}>
                {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Budget Range</label>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map(b => (
                <button key={b} type="button" onClick={() => set("budget", b)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    form.budget === b
                      ? "bg-[#07301d] text-white border-[#07301d]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#07301d]"
                  }`}>
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Activities & Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(item => (
                <button key={item} type="button" onClick={() => toggleInterest(item)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    form.interests.includes(item)
                      ? "bg-[#07301d] text-white border-[#07301d]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#07301d]"
                  }`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: Review & Send ── */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-[#f6f9f4] border border-[#c8dfc0] rounded-2xl p-5 space-y-2 text-sm">
            {[
              { label: "Name",         val: form.name || "—" },
              { label: "Email",        val: form.email || "—" },
              { label: "Phone",        val: form.phoneLocal ? `${form.countryCode} ${form.phoneLocal}` : "—" },
              { label: "Package",      val: PACKAGES.find(p => p.id === form.package)?.label || "—" },
              { label: "Destinations", val: form.destinations || "—" },
              { label: "Travel Date",  val: form.travelDate   || "—" },
              { label: "Duration",     val: `${form.duration} days` },
              { label: "Guests",       val: `${form.adults} adults, ${form.children} children` },
              { label: "Budget",       val: form.budget || "—" },
              { label: "Interests",    val: form.interests.join(", ") || "—" },
            ].map(({ label, val }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wide shrink-0">{label}</span>
                <span className="text-gray-800 text-right">{val}</span>
              </div>
            ))}
          </div>

          <div>
            <label className={labelCls}>Additional Message (optional)</label>
            <textarea
              className={inputCls}
              rows={4}
              value={form.message}
              onChange={e => set("message", e.target.value)}
              placeholder="Any special requests, celebrations, or questions for our team…"
            />
          </div>

          <div>
            <label className={labelCls}>How did you hear about us?</label>
            <div className="flex flex-wrap gap-2">
              {HEAR_ABOUT.map(h => (
                <button key={h} type="button" onClick={() => set("hearAboutUs", h)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    form.hearAboutUs === h
                      ? "bg-[#07301d] text-white border-[#07301d]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#07301d]"
                  }`}>
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={() => {
              if (step === 1 && (!form.name || !form.email)) {
                setError("Please enter your name and email to continue.");
                return;
              }
              setError("");
              setStep(step + 1);
            }}
            className="flex-1 bg-[#07301d] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#052417] transition-colors"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-[#07301d] text-white py-3 rounded-xl text-sm font-bold hover:bg-[#052417] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin"/> Sending…</>
            ) : (
              <><Send size={14}/> Send Enquiry</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
