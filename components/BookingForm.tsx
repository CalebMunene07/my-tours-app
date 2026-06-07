"use client";

import React, { useState, useEffect, useRef } from "react";

const API = "https://wikima-backend.onrender.com";

type Package = "Standard" | "Premium" | "Luxury" | "Romance";

interface Tour {
  id: string;
  title: string;
  duration: string;
  standard_price: string;
  premium_price: string;
  luxury_price: string;
  category?: string;
}

interface BookingFormProps {
  tourTitle?: string;
  pricingTiers?: string[];
}

// ── Tour groups derived directly from tours.ts categories & titles ─────────
// Category keys match: kenya-safari, budget-safari, fly-inn-safari
const STATIC_GROUPS = [
  {
    group: "Kenya Safaris",
    emoji: "🦁",
    category: "kenya-safari",
    tours: [
      { slug: "3-day-masai-mara",          title: "3-Day Masai Mara Safari" },
      { slug: "3-day-amboseli",             title: "3-Day Amboseli Safari" },
      { slug: "4-day-mara-nakuru",          title: "4-Day Masai Mara & Lake Nakuru" },
      { slug: "4-day-northern-kenya",       title: "4-Day Northern Kenya Safari" },
      { slug: "5-day-mara-nakuru-naivasha", title: "5-Day Mara, Nakuru & Naivasha" },
      { slug: "6-day-mara-nakuru-amboseli", title: "6-Day Mara, Nakuru & Amboseli" },
      { slug: "7-day-kenya-grand-safari",   title: "7-Day Kenya Grand Safari" },
    ],
  },
  {
    group: "Budget Group Joining Safaris",
    emoji: "🤝",
    category: "budget-safari",
    tours: [
      { slug: "budget-3-day-masai-mara",             title: "3-Day Budget Masai Mara Group Safari" },
      { slug: "budget-4-day-mara-nakuru",             title: "4-Day Masai Mara & Lake Nakuru Group Safari" },
      { slug: "budget-5-day-mara-nakuru-naivasha",   title: "5-Day Mara, Nakuru & Naivasha Group Safari" },
      { slug: "budget-7-day-grand-circuit",           title: "7-Day Grand Kenya Circuit Group Safari" },
    ],
  },
  {
    group: "Fly-Inn Safaris",
    emoji: "✈️",
    category: "fly-inn-safari",
    tours: [
      { slug: "fly-inn-mara-3-day",             title: "3-Day Masai Mara Flying Safari" },
      { slug: "fly-inn-mara-4-day",             title: "4-Day Masai Mara Flying Safari" },
      { slug: "fly-inn-serengeti-3-day",        title: "3-Day Serengeti Flying Safari" },
      { slug: "fly-inn-serengeti-4-day",        title: "4-Day Serengeti Flying Safari" },
      { slug: "4-day-serengeti-ngorongoro-road", title: "4-Day Serengeti & Ngorongoro Road Safari" },
    ],
  },
];

// ── Child age ranges with pricing ─────────────────────────────────────────
const CHILD_AGE_RANGES = [
  { label: "Infant (0–2 yrs)",  value: "infant",  discount: 1.00 },
  { label: "Toddler (3–5 yrs)", value: "toddler", discount: 0.75 },
  { label: "Child (6–11 yrs)",  value: "child",   discount: 0.50 },
  { label: "Youth (12–17 yrs)", value: "youth",   discount: 0.25 },
];

// ── Country codes ───────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+1",   flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "+47",  flag: "🇳🇴", name: "Norway" },
  { code: "+41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+255", flag: "🇹🇿", name: "Tanzania" },
  { code: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "+250", flag: "🇷🇼", name: "Rwanda" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+82",  flag: "🇰🇷", name: "South Korea" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+52",  flag: "🇲🇽", name: "Mexico" },
];

const PACKAGE_ICONS: Record<Package, React.ReactNode> = {
  Standard: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Premium:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Luxury:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  Romance:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
};

const PACKAGE_DETAILS: Record<Package, { title: string; subtitle: string; price: string; features: string[]; popular?: boolean }> = {
  Standard: {
    title: "Standard",
    subtitle: "Essential safari comfort for the conscious traveler.",
    price: "$890 / per person",
    features: ["Shared 4×4 Safari Vehicle","Mid-range Safari Lodges","Professional Driver/Guide","Full Board Meals","National Park Fees"],
  },
  Premium: {
    title: "Premium",
    subtitle: "Enhanced privacy and superior lodge selections.",
    price: "$1,450 / per person",
    popular: true,
    features: ["Private 4×4 Landcruiser","Luxury Boutique Camps","Expert Naturalist Guide","Flying Doctors Cover","Airport Transfers","Sundowner Experiences"],
  },
  Luxury: {
    title: "Luxury",
    subtitle: "The ultimate bush experience with zero compromises.",
    price: "$2,800 / per person",
    features: ["Private Charter Flights","Ultra-Luxury Lodges","Private Chef & Butler","Dedicated Photography Guide","Premium Drinks Included","Private Spa Treatments"],
  },
  Romance: {
    title: "Romantic Escape",
    subtitle: "Birthdays, anniversaries & honeymoons — crafted to delight.",
    price: "From $1,800 / per couple",
    features: ["💍 Special Occasions","Personalised Surprise Itinerary","Romantic Bush Candlelit Dinner","Rose Petal & Champagne Turndown","Couples Spa Treatment","Dedicated Romance Concierge","Anniversary/Birthday Cake on Arrival","Private Sundowner at a Secret Spot"],
  },
};

/* ── PDF helper ─────────────────────────────────────────────────────────── */
function downloadBookingPDF(p: {
  reference:string; name:string; email:string; phone:string;
  tourTitle:string; date:string; adults:string; children:string;
  childAgeRange:string; pkg:Package;
  days:string; pricePerPerson:number; totalPrice:number; depositAmount:number;
}) {
  const balance = p.totalPrice - p.depositAmount;
  const depositPct = Math.round((p.depositAmount / p.totalPrice) * 100);
  const tDate = p.date ? new Date(p.date+"T00:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}) : "—";
  const today = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  const ageLabel = CHILD_AGE_RANGES.find(a => a.value === p.childAgeRange)?.label || "";
  const childrenInfo = Number(p.children) > 0
    ? `<div class="fld"><label>Children</label><p>${p.children} × ${ageLabel}</p></div>` : "";
  const childDiscount = CHILD_AGE_RANGES.find(a => a.value === p.childAgeRange)?.discount ?? 0.5;
  const childrenPrice = Number(p.children) > 0 ? p.pricePerPerson * (1 - childDiscount) * Number(p.children) : 0;
  const adultsPrice = p.pricePerPerson * Number(p.adults);
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Wikima Booking ${p.reference}</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:Georgia,serif;color:#2d3a10;padding:48px;font-size:14px;}
.hdr{display:flex;justify-content:space-between;margin-bottom:32px;padding-bottom:20px;border-bottom:2px solid #e8e0d0;}
.brand h1{font-size:20px;font-weight:bold;}.brand p{font-size:9px;color:#8a7a60;letter-spacing:3px;text-transform:uppercase;margin-top:3px;}
.ref{text-align:right;}.ref .lbl{font-size:9px;color:#8a7a60;text-transform:uppercase;letter-spacing:2px;}.ref .val{font-size:18px;font-weight:bold;color:#4B5320;font-family:monospace;margin-top:4px;}
.badge{background:#f0f5e8;border:1px solid #c8d8a0;border-radius:6px;padding:12px 18px;margin-bottom:24px;font-size:13px;}
.sec{margin-bottom:22px;}.sec-t{font-size:9px;text-transform:uppercase;letter-spacing:3px;color:#8a7a60;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e8e0d0;}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}.fld label{font-size:9px;color:#8a7a60;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:2px;}.fld p{font-size:14px;font-weight:600;}
.pay{background:#faf7f2;border:1px solid #e8e0d0;border-radius:8px;padding:16px;}.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f0ede8;font-size:13px;}.row:last-child{border-bottom:none;padding-top:10px;font-size:15px;font-weight:bold;}.row .lbl{color:#5a5040;}.row .amt{font-weight:600;}.row:last-child .amt{color:#D4AF37;}
.ftr{margin-top:36px;padding-top:18px;border-top:1px solid #e8e0d0;display:flex;justify-content:space-between;font-size:11px;color:#8a7a60;line-height:1.7;}
@media print{body{padding:24px;}@page{margin:0;size:A4;}}</style></head>
<body>
<div class="hdr"><div class="brand"><h1>WIKIMA SAFARI</h1><p>Expeditions · East Africa</p></div><div class="ref"><div class="lbl">Booking Reference</div><div class="val">${p.reference}</div></div></div>
<div class="badge">✓ Booking <strong>Confirmed</strong> — Thank you, ${p.name}. We look forward to hosting you.</div>
<div class="sec"><div class="sec-t">Guest Details</div><div class="grid">
<div class="fld"><label>Full Name</label><p>${p.name}</p></div>
<div class="fld"><label>Email</label><p>${p.email}</p></div>
${p.phone?`<div class="fld"><label>Phone</label><p>${p.phone}</p></div>`:""}
${childrenInfo}
</div></div>
<div class="sec"><div class="sec-t">Safari Details</div><div class="grid">
<div class="fld"><label>Tour</label><p>${p.tourTitle}</p></div>
<div class="fld"><label>Package</label><p>${p.pkg}</p></div>
<div class="fld"><label>Travel Date</label><p>${tDate}</p></div>
<div class="fld"><label>Duration</label><p>${p.days} days</p></div>
<div class="fld"><label>Adults</label><p>${p.adults}</p></div>
<div class="fld"><label>Price Per Adult</label><p>$${p.pricePerPerson.toLocaleString()}</p></div>
</div></div>
<div class="sec"><div class="sec-t">Payment Summary</div><div class="pay">
<div class="row"><span class="lbl">Price per adult</span><span class="amt">$${p.pricePerPerson.toLocaleString()}</span></div>
<div class="row"><span class="lbl">× ${p.adults} adult${Number(p.adults)>1?"s":""}</span><span class="amt">$${adultsPrice.toLocaleString()}</span></div>
${Number(p.children)>0?`<div class="row"><span class="lbl">${ageLabel} × ${p.children} (discounted)</span><span class="amt">$${childrenPrice.toLocaleString()}</span></div>`:""}
<div class="row"><span class="lbl">Total Amount</span><span class="amt">$${p.totalPrice.toLocaleString()}</span></div>
<div class="row"><span class="lbl">Deposit Paid (${depositPct}%)</span><span class="amt">$${p.depositAmount.toLocaleString()}</span></div>
<div class="row"><span class="lbl">Balance on Arrival</span><span class="amt">$${balance.toLocaleString()}</span></div>
</div></div>
<div class="ftr"><div>Wikima Safari Expeditions<br/>info@wikimasafari.com · +254 720 069 550<br/>wikimasafari.com</div><div style="text-align:right">Generated ${today}<br/>Official booking confirmation.</div></div>
</body></html>`;
  const win = window.open("","_blank","width=820,height=950");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 600);
}

/* ── Country Code Picker ─────────────────────────────────────────────────── */
const CountryCodePicker: React.FC<{ value: string; onChange: (code: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const filtered = COUNTRY_CODES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search));
  const selected = COUNTRY_CODES.find(c => c.code === value) || COUNTRY_CODES[0];
  return (
    <div style={{ position:"relative" }} ref={ref}>
      <button type="button" onClick={() => setOpen(!open)} style={S.ccBtn} className="bf-cc-btn">
        <span>{selected.flag}</span>
        <span style={{ fontSize:"13px", fontWeight:600, color:"#1a1a1a" }}>{selected.code}</span>
        <svg width="9" height="5" viewBox="0 0 11 6" style={{ opacity:0.5 }}><path d="M.5.5l5 5 5-5" stroke="#4B5320" strokeWidth="1.4" fill="none"/></svg>
      </button>
      {open && (
        <div style={S.ccDropdown}>
          <div style={{ padding:"8px" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search country…" style={{ ...S.input, fontSize:"12px", padding:"7px 10px" }} autoFocus/>
          </div>
          <div style={{ maxHeight:"160px", overflowY:"auto" }}>
            {filtered.map(c => (
              <div key={c.code} onMouseDown={() => { onChange(c.code); setOpen(false); setSearch(""); }} style={S.ccItem} className="bf-cc-item">
                <span>{c.flag}</span>
                <span style={{ fontSize:"12px", color:"#1a1a1a", flex:1, fontWeight:500 }}>{c.name}</span>
                <span style={{ fontSize:"11px", color:"#4B5320", fontWeight:700 }}>{c.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Grouped Tour Dropdown ───────────────────────────────────────────────── */
const TourDropdown: React.FC<{
  value: string;
  onChange: (tour: string) => void;
  apiTours: Tour[];
  loading: boolean;
}> = ({ value, onChange, apiTours, loading }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const isSearching = search.trim().length > 0;

  // Merge API tours into the correct static group by category, deduplicating by title
  const mergedGroups = STATIC_GROUPS.map(sg => {
    const apiMatches = apiTours
      .filter(t => t.category === sg.category)
      .map(t => ({ slug: t.id || t.title, title: t.title }));

    // Combine static tours with any extra API tours not already listed
    const staticTitles = new Set(sg.tours.map(t => t.title));
    const extraApiTours = apiMatches.filter(t => !staticTitles.has(t.title));

    return {
      ...sg,
      tours: [...sg.tours, ...extraApiTours],
    };
  });

  // Flat list of all tour titles for search
  const allTours = mergedGroups.flatMap(g =>
    g.tours.map(t => ({ ...t, group: g.group, emoji: g.emoji }))
  );

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      next.has(group) ? next.delete(group) : next.add(group);
      return next;
    });
  };

  const isExpanded = (group: string) => isSearching || expandedGroups.has(group);

  // When searching, show flat filtered list; otherwise show grouped
  const searchResults = isSearching
    ? allTours.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  void loading;

  return (
    <div style={{ position:"relative", marginBottom:"16px" }} ref={ref}>
      <label style={S.label}>Tour</label>
      <div style={{ position:"relative" }}>
        <input
          value={value}
          readOnly
          onClick={() => setOpen(true)}
          placeholder="Select a tour…"
          style={{ ...S.input, cursor:"pointer", color: value ? "#1a1a1a" : "#9a9590" }}
          required
        />
        <span style={S.ddChevron}>
          <svg width="11" height="6" viewBox="0 0 11 6"><path d="M.5.5l5 5 5-5" stroke="#4B5320" strokeWidth="1.4" fill="none"/></svg>
        </span>
      </div>

      {open && (
        <div style={S.groupDropdown}>
          {/* Search */}
          <div style={{ padding:"8px 10px", borderBottom:"1px solid #e8e0d0", background:"#fafaf8" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search all tours…"
              style={{ ...S.input, fontSize:"13px", padding:"8px 11px" }}
              autoFocus
              onMouseDown={e => e.stopPropagation()}
            />
          </div>

          <div style={{ maxHeight:"360px", overflowY:"auto" }}>

            {/* ── Search results (flat) ── */}
            {isSearching ? (
              searchResults.length > 0 ? (
                searchResults.map(tour => {
                  const isSelected = value === tour.title;
                  return (
                    <div key={tour.slug}
                      style={{ ...S.groupTourItem, paddingLeft:"14px", background: isSelected?"#eef4e4":"#fff", fontWeight: isSelected?700:500, borderLeft: isSelected?"3px solid #4B5320":"3px solid transparent" }}
                      className="bf-dd-item"
                      onMouseDown={() => { onChange(tour.title); setOpen(false); setSearch(""); }}
                    >
                      <span style={{ fontSize:"13px", marginRight:"6px", opacity:0.7 }}>{tour.emoji}</span>
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4B5320" strokeWidth="3" style={{ marginRight:"6px", flexShrink:0 }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                      {tour.title}
                    </div>
                  );
                })
              ) : (
                <div style={{ padding:"16px 14px", fontSize:"12px", color:"#b0a898", fontStyle:"italic", textAlign:"center" }}>
                  No tours found for &ldquo;{search}&rdquo;
                </div>
              )
            ) : (
              /* ── Grouped list ── */
              mergedGroups.map(g => (
                <div key={g.group}>
                  {/* Group header */}
                  <div
                    style={S.groupHeader}
                    onClick={() => toggleGroup(g.group)}
                    className="bf-group-header"
                  >
                    <span style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <span style={{ fontSize:"16px", lineHeight:1 }}>{g.emoji}</span>
                      <span style={S.groupTitle}>{g.group}</span>
                      <span style={{ fontSize:"10px", fontWeight:600, background:"#e8f0dc", color:"#4B5320", borderRadius:"10px", padding:"1px 8px" }}>
                        {g.tours.length}
                      </span>
                    </span>
                    <svg width="10" height="6" viewBox="0 0 11 6"
                      style={{ transition:"transform 0.2s", transform: isExpanded(g.group) ? "rotate(180deg)" : "none", opacity:0.6 }}>
                      <path d="M.5.5l5 5 5-5" stroke="#4B5320" strokeWidth="1.4" fill="none"/>
                    </svg>
                  </div>

                  {/* Tour items */}
                  {isExpanded(g.group) && (
                    <div>
                      {g.tours.map(tour => {
                        const isSelected = value === tour.title;
                        return (
                          <div key={tour.slug}
                            style={{ ...S.groupTourItem, background: isSelected?"#eef4e4":"#fff", color:"#1a1a1a", fontWeight: isSelected?700:500, borderLeft: isSelected?"3px solid #4B5320":"3px solid transparent" }}
                            className="bf-dd-item"
                            onMouseDown={() => { onChange(tour.title); setOpen(false); setSearch(""); }}
                          >
                            {isSelected && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4B5320" strokeWidth="3" style={{ marginRight:"8px", flexShrink:0 }}>
                                <polyline points="20 6 9 17 4 12"/>
                              </svg>
                            )}
                            {tour.title}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Helper: look up a tour's slug from its title ────────────────────────── */
function getTourSlug(title: string): string | undefined {
  for (const g of STATIC_GROUPS) {
    const match = g.tours.find(t => t.title === title);
    if (match) return match.slug;
  }
  return undefined;
}

/* ══════════════════════════════════════════════════════════════
   MAIN BOOKING FORM
══════════════════════════════════════════════════════════════ */
const BookingForm: React.FC<BookingFormProps> = ({ tourTitle: propTourTitle = "", pricingTiers = [] }) => {
  const [step, setStep]           = useState(1);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError]   = useState("");
  const [currentBooking, setCurrentBooking] = useState<{ id:string; reference:string; deposit_amount:number }|null>(null);
  const [mpesaStatus, setMpesaStatus]       = useState<"idle"|"waiting"|"success"|"failed">("idle");
  const [apiTours, setApiTours]   = useState<Tour[]>([]);
  const [toursLoading, setToursLoading] = useState(true);
  const [countryCode, setCountryCode]   = useState("+254");
  const [paystackRedirecting, setPaystackRedirecting] = useState(false);

  const [form, setForm] = useState({
    tourTitle: propTourTitle,
    name: "", email: "", phoneLocal: "", mpesaNumber: "",
    date: "", adults: "1", children: "0",
    childAgeRange: "child",
    days: "1", package: "Standard" as Package,
    paymentMethod: "", message: "",
  });

  // Fetch API tours — used only to merge extra tours not already in STATIC_GROUPS
  useEffect(() => {
    fetch(`${API}/api/tours`)
      .then(r => r.json())
      .then(data => { setApiTours(data.tours || []); setToursLoading(false); })
      .catch(() => setToursLoading(false));
  }, []);

  // Handle Paystack redirect-back verification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("reference") || params.get("trxref");
    if (!ref) return;
    fetch(`${API}/api/payments/paystack/verify/${ref}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === "success") {
          setSubmitted(true);
          setCurrentBooking({ id: "", reference: ref, deposit_amount: 0 });
        }
      })
      .catch(console.error);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const packages: Package[] = pricingTiers.length
    ? (pricingTiers.filter(t => ["Standard","Premium","Luxury","Romance"].includes(t)) as Package[])
    : ["Standard", "Premium", "Luxury", "Romance"];

  // Price lookup: first try API tours by title match, then fall back to defaults
  const getPricePerPerson = (pkg: Package): number => {
    const match = apiTours.find(t => t.title === form.tourTitle);
    if (match) {
      if (pkg === "Standard") return parseFloat(match.standard_price) || 890;
      if (pkg === "Premium")  return parseFloat(match.premium_price)  || 1450;
      if (pkg === "Luxury")   return parseFloat(match.luxury_price)   || 2800;
    }
    return { Standard: 890, Premium: 1450, Luxury: 2800, Romance: 1800 }[pkg];
  };

  const pricePerPerson  = getPricePerPerson(form.package);
  const adults          = Number(form.adults) || 1;
  const children        = Number(form.children) || 0;
  const ageRange        = CHILD_AGE_RANGES.find(a => a.value === form.childAgeRange) ?? CHILD_AGE_RANGES[2];
  const childDiscount   = ageRange.discount;
  const childUnitPrice  = pricePerPerson * (1 - childDiscount);
  const childrenTotal   = childUnitPrice * children;
  const totalPrice      = (pricePerPerson * adults) + childrenTotal;
  const depositAmount   = Math.ceil(totalPrice * 0.6);
  const balanceAmount   = totalPrice - depositAmount;
  const fmt             = (n: number) => `$${n.toLocaleString()}`;
  const fullPhone       = form.phoneLocal ? `${countryCode} ${form.phoneLocal}` : "";

  // The slug for the currently selected tour (used for backend)
  const selectedTourSlug = getTourSlug(form.tourTitle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) { setStep(step + 1); return; }
    setLoading(true); setApiError("");

    try {
      const bookingRes = await fetch(`${API}/api/bookings`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourTitle: form.tourTitle,
          tourSlug: selectedTourSlug,          // ← now included
          guestName: form.name,
          guestEmail: form.email,
          guestPhone: fullPhone,
          travelDate: form.date,
          adults,
          children,
          package: form.package,
          specialRequests: form.message,
          days: Number(form.days),
          totalAmount: totalPrice,
          depositAmount,
        }),
      });
      if (!bookingRes.ok) {
        const err = await bookingRes.json();
        throw new Error(err.error || "Failed to create booking");
      }
      const { booking } = await bookingRes.json();
      setCurrentBooking(booking);

      if (form.paymentMethod === "mpesa") {
        const phone = form.mpesaNumber.replace(/\s+/g, "");
        if (!phone.startsWith("254") || phone.length !== 12)
          throw new Error("Phone must be 2547XXXXXXXX (12 digits)");

        const mpesaRes = await fetch(`${API}/api/payments/mpesa/stk-push`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, amount: depositAmount, bookingRef: booking.reference, bookingId: booking.id }),
        });
        if (!mpesaRes.ok) throw new Error("Failed to initiate M-Pesa payment");
        const { checkoutRequestId } = await mpesaRes.json();
        setMpesaStatus("waiting"); setLoading(false); setStep(4);

        let attempts = 0;
        const poll = setInterval(async () => {
          attempts++;
          try {
            const s = await fetch(`${API}/api/payments/mpesa/status/${checkoutRequestId}`);
            const { status } = await s.json();
            if (status === "success") { clearInterval(poll); setMpesaStatus("success"); setSubmitted(true); }
            else if (status === "failed" || attempts >= 10) { clearInterval(poll); setMpesaStatus("failed"); }
          } catch { /* keep polling */ }
        }, 3000);

      } else if (form.paymentMethod === "card") {
        const paystackRes = await fetch(`${API}/api/payments/paystack/initialize`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: depositAmount,
            bookingId: booking.id,
            bookingRef: booking.reference,
            customerEmail: form.email,
          }),
        });
        if (!paystackRes.ok) throw new Error("Failed to initialize Paystack payment");
        const { authorizationUrl } = await paystackRes.json();
        setPaystackRedirecting(true);
        setLoading(false);
        window.location.href = authorizationUrl;
      }

    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false); setStep(1); setCurrentBooking(null);
    setMpesaStatus("idle"); setApiError(""); setCountryCode("+254");
    setPaystackRedirecting(false);
    setForm({ tourTitle: propTourTitle, name: "", email: "", phoneLocal: "", mpesaNumber: "", date: "", adults: "1", children: "0", childAgeRange: "child", days: "1", package: "Standard", paymentMethod: "", message: "" });
  };

  /* ── CONFIRMED ── */
  if (submitted) {
    return (
      <div style={S.confirmedWrap}>
        <style>{css}</style>
        <div style={S.confirmedIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B5320" strokeWidth="2.2"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p style={S.confirmedLabel}>Booking Confirmed</p>
        <h3 style={S.confirmedTitle}>You&apos;re going on safari!</h3>
        <p style={S.confirmedSub}>A confirmation has been sent to <strong style={{ color:"#4B5320" }}>{form.email}</strong>.<br/>Our team will contact you within 24 hours.</p>
        {currentBooking?.reference && (
          <div style={S.refBadge}>Booking Ref: <strong style={{ color:"#4B5320" }}>{currentBooking.reference}</strong></div>
        )}
        <button onClick={() => downloadBookingPDF({
          reference: currentBooking?.reference||"—", name: form.name, email: form.email,
          phone: fullPhone, tourTitle: form.tourTitle, date: form.date,
          adults: form.adults, children: form.children, childAgeRange: form.childAgeRange,
          pkg: form.package, days: form.days, pricePerPerson, totalPrice, depositAmount,
        })} style={S.pdfBtn} className="bf-pdf-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink:0 }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF Invoice
        </button>
        <div style={S.pillRow}>
          <span style={{ ...S.pill, ...S.pillGreen }}><CheckIcon/> Payment Received</span>
          <span style={{ ...S.pill, ...S.pillGreen }}><CheckIcon/> Booking Saved</span>
        </div>
        <button style={S.resetBtn} onClick={resetForm}>Start new booking</button>
      </div>
    );
  }

  /* ── PAYSTACK REDIRECTING ── */
  if (paystackRedirecting) {
    return (
      <div style={S.confirmedWrap}>
        <style>{css}</style>
        <div style={S.mpesaWaitIcon}><span className="bf-spinner-lg"/></div>
        <p style={S.confirmedLabel}>Redirecting to Payment</p>
        <h3 style={S.confirmedTitle}>Opening secure checkout…</h3>
        <p style={S.confirmedSub}>You&apos;re being redirected to Paystack&apos;s secure card payment page.<br/>Do not close this tab.</p>
      </div>
    );
  }

  /* ── M-PESA SCREEN ── */
  if (step === 4 && form.paymentMethod === "mpesa") {
    return (
      <div style={S.confirmedWrap}>
        <style>{css}</style>
        {mpesaStatus === "waiting" && (<>
          <div style={S.mpesaWaitIcon}><span className="bf-spinner-lg"/></div>
          <p style={S.confirmedLabel}>Waiting for Payment</p>
          <h3 style={S.confirmedTitle}>Check your phone</h3>
          <p style={S.confirmedSub}>M-Pesa prompt sent to <strong style={{ color:"#4B5320" }}>{form.mpesaNumber}</strong>.<br/>Enter your PIN to complete.</p>
          <p style={S.mpesaTimer}>Waiting up to 30 seconds…</p>
        </>)}
        {mpesaStatus === "failed" && (<>
          <div style={{ ...S.confirmedIcon, border:"2px solid #dc2626", background:"#fef2f2" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          <p style={{ ...S.confirmedLabel, color:"#dc2626" }}>Payment Failed</p>
          <h3 style={S.confirmedTitle}>Could not complete payment</h3>
          <p style={S.confirmedSub}>Ref: <strong style={{ color:"#4B5320" }}>{currentBooking?.reference}</strong>.<br/>Contact us if funds were deducted.</p>
          <button style={{ ...S.nextBtn, display:"inline-block", marginBottom:"10px" }} onClick={() => { setStep(3); setMpesaStatus("idle"); }}>Try Again</button>
        </>)}
      </div>
    );
  }

  /* ── STEPS 1–3 ── */
  return (<>
    <style>{css}</style>
    <div style={S.progress}>
      {[1,2,3].map(s => (<React.Fragment key={s}>
        <div style={{ ...S.dot, ...(s<step?S.dotDone:s===step?S.dotActive:{}) }}>
          {s<step
            ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
            : <span style={{ fontSize:"10px",fontWeight:700,color:s===step?"#fff":"#a0a09a" }}>{s}</span>}
        </div>
        {s<3 && <div style={{ ...S.line, ...(s<step?S.lineDone:{}) }}/>}
      </React.Fragment>))}
    </div>
    <p style={S.stepLabel}>{step===1?"Your Details":step===2?"Package & Payment":"Review & Confirm"}</p>

    {apiError && (
      <div style={S.errorBanner}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" style={{ flexShrink:0 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {apiError}
      </div>
    )}

    <form onSubmit={handleSubmit} style={S.form}>

      {/* ════ STEP 1 ════ */}
      {step === 1 && (
        <div className="bf-step">
          <TourDropdown
            value={form.tourTitle}
            onChange={tour => setForm({ ...form, tourTitle: tour })}
            apiTours={apiTours}
            loading={toursLoading}
          />

          <div style={S.row}>
            <Field label="Full Name"><input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" style={S.input} required/></Field>
            <Field label="Email"><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" style={S.input} required/></Field>
          </div>

          <Field label="Phone">
            <div style={{ display:"flex", gap:"8px" }}>
              <CountryCodePicker value={countryCode} onChange={setCountryCode}/>
              <input name="phoneLocal" value={form.phoneLocal} onChange={handleChange} placeholder="700 000 000" style={{ ...S.input, flex:1 }} required/>
            </div>
          </Field>

          <div style={S.row}>
            <Field label="Adults">
              <select name="adults" value={form.adults} onChange={handleChange} style={S.select} className="bf-select">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n===1?"Adult":"Adults"}</option>)}
              </select>
            </Field>
            <Field label="Children">
              <select name="children" value={form.children} onChange={handleChange} style={S.select} className="bf-select">
                {[0,1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n===1?"Child":"Children"}</option>)}
              </select>
            </Field>
          </div>

          {Number(form.children) > 0 && (
            <Field label="Child Age Range">
              <select name="childAgeRange" value={form.childAgeRange} onChange={handleChange} style={S.select} className="bf-select">
                {CHILD_AGE_RANGES.map(r => (
                  <option key={r.value} value={r.value}>
                    {r.label} — {r.discount === 1 ? "Free" : `${Math.round(r.discount * 100)}% off`}
                  </option>
                ))}
              </select>
              <p style={{ fontSize:"11px", color:"#4B5320", marginTop:"5px", fontFamily:"'DM Sans',sans-serif" }}>
                {ageRange.label}: {ageRange.discount === 1 ? "Travels free" : `${Math.round(ageRange.discount * 100)}% discount — ${fmt(childUnitPrice)} per child`}
              </p>
            </Field>
          )}

          <div style={S.row}>
            <Field label="Number of Days">
              <select name="days" value={form.days} onChange={handleChange} style={S.select} className="bf-select">
                {[1,2,3,4,5,6,7,8,9,10,14,21].map(n => <option key={n} value={n}>{n} {n===1?"Day":"Days"}</option>)}
              </select>
            </Field>
            <Field label="Travel Date"><input name="date" type="date" value={form.date} onChange={handleChange} style={S.input} required/></Field>
          </div>

          <Field label="Special Requests" optional>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Dietary needs, celebrations, accessibility…" style={S.textarea} rows={3}/>
          </Field>
        </div>
      )}

      {/* ════ STEP 2 ════ */}
      {step === 2 && (
        <div className="bf-step">
          <p style={S.secLabel}>Travel Packages</p>
          <p style={{ ...S.secHint, marginBottom:"20px" }}>Four distinct tiers of service — from essential comfort to bespoke romantic escapes.</p>
          <div style={S.pkgGrid}>
            {packages.map(pkg => {
              const isActive = form.package === pkg;
              const detail = PACKAGE_DETAILS[pkg];
              return (
                <button key={pkg} type="button" onClick={() => setForm({ ...form, package: pkg })} className="bf-pkg"
                  style={{ display:"flex", flexDirection:"column", alignItems:"stretch", gap:"12px", padding:"16px", borderRadius:"12px", cursor:"pointer", outline:"none", transition:"all 0.2s",
                    border: isActive?"2px solid #4B5320":"2px solid #e5e0d8", background: isActive?"#f0f4ea":"#faf9f7", boxShadow: isActive?"0 0 0 3px rgba(75,83,32,0.1)":"none" }}>
                  <div style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                    <span style={{ width:28, height:28, borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: isActive?"#4B5320":"#f0ede8", color: isActive?"#fff":"#9a9590" }}>
                      {PACKAGE_ICONS[pkg]}
                    </span>
                    <div style={{ flex:1, textAlign:"left" }}>
                      <p style={{ fontSize:"14px", fontWeight:700, color:"#1a1a1a", margin:"0 0 3px 0" }}>{detail.title}{detail.popular ? " ⭐" : ""}</p>
                      <p style={{ fontSize:"12px", color:"#5a5040", margin:0 }}>{detail.subtitle}</p>
                    </div>
                  </div>
                  <div style={{ paddingTop:"8px", borderTop:"1px solid rgba(75,83,32,0.1)", textAlign:"left" }}>
                    <p style={{ fontSize:"13px", fontWeight:700, color:"#4B5320", margin:"6px 0" }}>{detail.price}</p>
                    <ul style={{ margin:"8px 0 0 0", paddingLeft:"18px", fontSize:"12px", color:"#3a3530", lineHeight:"1.5" }}>
                      {detail.features.map((f, i) => <li key={i} style={{ marginBottom:"4px" }}>{f}</li>)}
                    </ul>
                  </div>
                </button>
              );
            })}
          </div>

          <div style={S.priceBreakdown}>
            <div style={S.priceRowHdr}>Price Breakdown</div>
            <div style={S.priceRow}><span style={S.priceLabel}>{PACKAGE_DETAILS[form.package].title} package</span><span style={S.priceVal}>{fmt(pricePerPerson)}/adult</span></div>
            <div style={S.priceRow}><span style={S.priceLabel}>× {adults} adult{adults>1?"s":""}</span><span style={S.priceVal}>{fmt(pricePerPerson * adults)}</span></div>
            {children > 0 && (<>
              <div style={S.priceRow}>
                <span style={S.priceLabel}>{ageRange.label} {ageRange.discount===1?"(Free)":"("+Math.round(ageRange.discount*100)+"% off)"}</span>
                <span style={S.priceVal}>{ageRange.discount===1?"Free":fmt(childUnitPrice)}/child</span>
              </div>
              <div style={S.priceRow}><span style={S.priceLabel}>× {children} child{children>1?"ren":""}</span><span style={S.priceVal}>{ageRange.discount===1?"Free":fmt(childrenTotal)}</span></div>
            </>)}
            <div style={S.priceRow}><span style={S.priceLabel}>Duration</span><span style={S.priceVal}>{form.days} day{Number(form.days)>1?"s":""}</span></div>
            <div style={S.priceDivider}/>
            <div style={S.priceRow}><span style={{ ...S.priceLabel, fontWeight:700, color:"#1a1a1a", fontSize:"13px" }}>Total Amount</span><span style={{ ...S.priceVal, fontWeight:700, color:"#4B5320", fontSize:"16px" }}>{fmt(totalPrice)}</span></div>
            <div style={S.priceRow}><span style={{ ...S.priceLabel, color:"#4B5320" }}>Deposit now (60%)</span><span style={{ ...S.priceVal, color:"#4B5320", fontWeight:600 }}>{fmt(depositAmount)}</span></div>
            <div style={S.priceRow}><span style={{ ...S.priceLabel, color:"#7a7060" }}>Balance on arrival (40%)</span><span style={{ ...S.priceVal, color:"#7a7060" }}>{fmt(balanceAmount)}</span></div>
          </div>

          <p style={S.secLabel}>Payment Method</p>
          <div style={S.payGrid}>
            {[
              { id:"mpesa", label:"M-Pesa", sub:"STK Push", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg> },
              { id:"card",  label:"Card",   sub:"Visa / Mastercard", icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
            ].map(({ id, label, sub, icon }) => {
              const isActive = form.paymentMethod === id;
              return (
                <button key={id} type="button" onClick={() => setForm({ ...form, paymentMethod: id })} className="bf-pay"
                  style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", borderRadius:"10px", cursor:"pointer", outline:"none", transition:"all 0.2s", textAlign:"left",
                    border: isActive?"1.5px solid #4B5320":"1.5px solid #e5e0d8", background: isActive?"#f0f4ea":"#faf9f7", boxShadow: isActive?"0 0 0 3px rgba(75,83,32,0.1)":"none" }}>
                  <span style={{ width:32, height:32, borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background: isActive?"#4B5320":"#f0ede8", color: isActive?"#fff":"#9a9590" }}>{icon}</span>
                  <span><span style={S.payLabel}>{label}</span><span style={S.paySub}>{sub}</span></span>
                </button>
              );
            })}
          </div>

          {form.paymentMethod === "mpesa" && (
            <div className="bf-mpesa" style={S.mpesaBox}>
              <Field label="M-Pesa Number">
                <input name="mpesaNumber" value={form.mpesaNumber} onChange={handleChange} placeholder="2547XXXXXXXX" style={S.input} required/>
              </Field>
              <p style={S.mpesaHint}>Format: 2547XXXXXXXX (no + or spaces). You&apos;ll receive an STK push.</p>
            </div>
          )}

          {form.paymentMethod === "card" && (
            <div style={{ background:"#f0f4ea", border:"1.5px solid #c8d09e", borderRadius:"10px", padding:"12px 14px", marginTop:"8px" }}>
              <p style={{ fontSize:"12px", color:"#4B5320", fontFamily:"'DM Sans',sans-serif", margin:0, lineHeight:1.6 }}>
                <strong>Secure card payment via Paystack</strong> — you&apos;ll be redirected to Paystack&apos;s hosted checkout page to complete your payment, then returned here automatically.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ════ STEP 3 ════ */}
      {step === 3 && (
        <div className="bf-step">
          <div style={S.reviewBox}>
            {[
              { label:"Tour",          val: form.tourTitle || "—" },
              { label:"Guest",         val: form.name },
              { label:"Email",         val: form.email },
              { label:"Phone",         val: fullPhone || "—" },
              { label:"Date",          val: form.date ? new Date(form.date+"T00:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}) : "—" },
              { label:"Days",          val: `${form.days} day${Number(form.days)>1?"s":""}` },
              { label:"Adults",        val: `${form.adults} ${Number(form.adults)===1?"adult":"adults"}` },
              { label:"Children",      val: Number(form.children)>0 ? `${form.children} × ${ageRange.label}` : "None" },
              { label:"Package",       val: form.package },
              { label:"Per Adult",     val: fmt(pricePerPerson) },
              { label:"Total Amount",  val: fmt(totalPrice),    bold: true },
              { label:"Deposit (60%)", val: fmt(depositAmount), highlight: true },
              { label:"Balance (40%)", val: fmt(balanceAmount) },
              { label:"Payment",       val: form.paymentMethod==="mpesa"?`M-Pesa (${form.mpesaNumber})`:form.paymentMethod==="card"?"Card via Paystack":"—" },
            ].map(({ label, val, bold, highlight }, i, arr) => (
              <div key={label} style={{ ...S.reviewRow, ...(i===arr.length-1?{ borderBottom:"none", paddingBottom:0 }:{}) }}>
                <span style={S.reviewLabel}>{label}</span>
                <span style={{ ...S.reviewVal, ...(bold?{ fontWeight:700, color:"#1a1a1a" }:{}), ...(highlight?{ fontWeight:700, color:"#4B5320" }:{}) }}>{val}</span>
              </div>
            ))}
          </div>
          <p style={S.terms}>
            By confirming you agree to Wikima Safari&apos;s booking terms. A 60% deposit of <strong>{fmt(depositAmount)}</strong> is charged upon confirmation. Balance of <strong>{fmt(balanceAmount)}</strong> is due on arrival.
            {form.paymentMethod === "card" && " You will be redirected to Paystack to complete card payment."}
          </p>
        </div>
      )}

      <div style={S.navRow}>
        {step > 1 && <button type="button" onClick={() => setStep(step-1)} style={S.backBtn} className="bf-back">← Back</button>}
        <button
          type="submit"
          disabled={loading || (step===2 && !form.paymentMethod)}
          style={{ ...S.nextBtn, ...(step===1?{ width:"100%" }:{}) }}
          className="bf-next"
        >
          {loading
            ? <span style={S.spinWrap}><span className="bf-spinner"/>{step===3?"Creating booking…":"Processing…"}</span>
            : step < 3 ? "Continue →"
            : form.paymentMethod === "mpesa" ? `Send M-Pesa Push · ${fmt(depositAmount)}`
            : `Pay by Card · ${fmt(depositAmount)}`}
        </button>
      </div>
    </form>
  </>);
};

const Field: React.FC<{ label:string; optional?:boolean; children:React.ReactNode }> = ({ label, optional, children }) => (
  <div style={{ marginBottom:"16px" }}>
    <label style={S.label}>{label}{optional && <span style={S.optTag}> (optional)</span>}</label>
    {children}
  </div>
);

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight:4 }}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const S: Record<string, React.CSSProperties> = {
  form:           { display:"flex", flexDirection:"column", gap:0 },
  progress:       { display:"flex", alignItems:"center", gap:0, marginBottom:"6px" },
  dot:            { width:26, height:26, borderRadius:"50%", background:"#f0ede8", border:"2px solid #e5e0d8", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.3s", flexShrink:0 },
  dotActive:      { background:"#4B5320", border:"2px solid #4B5320" },
  dotDone:        { background:"#4B5320", border:"2px solid #4B5320" },
  line:           { flex:1, height:2, background:"#e5e0d8", transition:"background 0.4s" },
  lineDone:       { background:"#4B5320" },
  stepLabel:      { fontSize:"11px", fontFamily:"'DM Sans',sans-serif", color:"#7a7060", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"20px", marginTop:"4px" },
  label:          { display:"block", fontSize:"11px", fontWeight:600, color:"#3a3530", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"6px", fontFamily:"'DM Sans',sans-serif" },
  optTag:         { fontWeight:400, color:"#b0aa9e", textTransform:"none", letterSpacing:0 },
  input:          { width:"100%", padding:"9px 12px", border:"1.5px solid #e5e0d8", borderRadius:"8px", fontSize:"14px", color:"#1a1a1a", background:"#faf9f7", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.2s, box-shadow 0.2s", boxSizing:"border-box" },
  select:         { width:"100%", padding:"9px 12px", border:"1.5px solid #e5e0d8", borderRadius:"8px", fontSize:"14px", color:"#1a1a1a", background:"#faf9f7", outline:"none", fontFamily:"'DM Sans',sans-serif", cursor:"pointer", appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='6'%3E%3Cpath d='M.5.5l5 5 5-5' stroke='%234B5320' stroke-width='1.4' fill='none'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 12px center", boxSizing:"border-box" },
  textarea:       { width:"100%", padding:"9px 12px", border:"1.5px solid #e5e0d8", borderRadius:"8px", fontSize:"14px", color:"#1a1a1a", background:"#faf9f7", outline:"none", fontFamily:"'DM Sans',sans-serif", resize:"none", boxSizing:"border-box" },
  row:            { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" },
  secLabel:       { fontSize:"10px", fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:"#7a7060", fontFamily:"'DM Sans',sans-serif", marginBottom:"10px", marginTop:"4px" },
  secHint:        { fontSize:"13px", color:"#3a3530", fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, marginBottom:"16px" },
  pkgGrid:        { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"8px", marginBottom:"16px" },
  priceBreakdown: { background:"#f6f8f0", border:"1.5px solid #c8d09e", borderRadius:"10px", padding:"14px 16px", marginBottom:"20px" },
  priceRowHdr:    { fontSize:"9px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#4B5320", fontFamily:"'DM Sans',sans-serif", marginBottom:"10px" },
  priceRow:       { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"4px 0" },
  priceLabel:     { fontSize:"12px", color:"#3a3530", fontFamily:"'DM Sans',sans-serif" },
  priceVal:       { fontSize:"13px", fontWeight:600, color:"#1a1a1a", fontFamily:"'DM Sans',sans-serif" },
  priceDivider:   { height:1, background:"#dde8c0", margin:"8px 0" },
  payGrid:        { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"16px" },
  payLabel:       { display:"block", fontSize:"12px", fontWeight:700, color:"#1a1a1a", fontFamily:"'DM Sans',sans-serif" },
  paySub:         { display:"block", fontSize:"10px", color:"#7a7060", fontFamily:"'DM Sans',sans-serif", marginTop:"1px" },
  mpesaBox:       { background:"#f6f8f0", border:"1.5px solid #c8d09e", borderRadius:"10px", padding:"14px 16px", marginBottom:"16px" },
  mpesaHint:      { fontSize:"11px", color:"#4B5320", fontFamily:"'DM Sans',sans-serif", marginTop:"4px", lineHeight:1.5 },
  reviewBox:      { border:"1.5px solid #e6e0d8", borderRadius:"12px", overflow:"hidden", marginBottom:"14px" },
  reviewRow:      { display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"10px 14px", borderBottom:"1px solid #f0ede8", gap:"12px" },
  reviewLabel:    { fontSize:"10px", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"#7a7060", fontFamily:"'DM Sans',sans-serif", flexShrink:0 },
  reviewVal:      { fontSize:"13px", color:"#1a1a1a", fontFamily:"'DM Sans',sans-serif", textAlign:"right", wordBreak:"break-word" },
  terms:          { fontSize:"11px", color:"#7a7060", fontFamily:"'DM Sans',sans-serif", lineHeight:1.6, marginBottom:"12px" },
  navRow:         { display:"flex", gap:"8px", marginTop:"8px" },
  backBtn:        { padding:"11px 16px", border:"1.5px solid #e5e0d8", borderRadius:"8px", background:"#fff", color:"#3a3530", fontSize:"12px", fontFamily:"'DM Sans',sans-serif", cursor:"pointer", fontWeight:600, transition:"all 0.2s", flexShrink:0 },
  nextBtn:        { flex:1, padding:"12px 20px", background:"#4B5320", color:"#fff", border:"none", borderRadius:"8px", fontSize:"12px", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", transition:"background 0.2s, transform 0.15s" },
  spinWrap:       { display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" },
  errorBanner:    { display:"flex", alignItems:"center", gap:"8px", background:"#fef2f2", border:"1.5px solid #fca5a5", borderRadius:"8px", padding:"10px 14px", marginBottom:"14px", fontSize:"12px", color:"#dc2626", fontFamily:"'DM Sans',sans-serif" },
  confirmedWrap:  { textAlign:"center", padding:"28px 16px" },
  confirmedIcon:  { width:52, height:52, borderRadius:"50%", background:"#f0f4ea", border:"2px solid #4B5320", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" },
  confirmedLabel: { fontSize:"10px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"#4B5320", fontFamily:"'DM Sans',sans-serif", marginBottom:"6px" },
  confirmedTitle: { fontSize:"22px", fontWeight:700, color:"#1a1a1a", fontFamily:"'DM Sans',sans-serif", marginBottom:"8px" },
  confirmedSub:   { fontSize:"14px", color:"#3a3530", fontFamily:"'DM Sans',sans-serif", lineHeight:1.7, marginBottom:"16px" },
  refBadge:       { display:"inline-block", background:"#f0f4ea", border:"1px solid #c8d09e", borderRadius:"8px", padding:"8px 16px", fontSize:"13px", fontFamily:"'DM Sans',sans-serif", color:"#1a1a1a", marginBottom:"16px" },
  pdfBtn:         { display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"8px", background:"#4B5320", color:"#fff", border:"none", borderRadius:"10px", padding:"12px 24px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", marginBottom:"16px", transition:"background 0.2s, transform 0.15s" },
  pillRow:        { display:"flex", gap:"8px", justifyContent:"center", marginBottom:"18px", flexWrap:"wrap" },
  pill:           { display:"inline-flex", alignItems:"center", fontSize:"11px", fontWeight:600, padding:"5px 12px", borderRadius:"20px", fontFamily:"'DM Sans',sans-serif" },
  pillGreen:      { background:"#f0f4ea", color:"#4B5320", border:"1px solid #c8d09e" },
  resetBtn:       { display:"block", margin:"0 auto", background:"transparent", border:"1.5px solid #e5e0d8", color:"#4B5320", padding:"9px 22px", borderRadius:"8px", fontSize:"12px", fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif" },
  mpesaWaitIcon:  { width:52, height:52, borderRadius:"50%", background:"#f0f4ea", border:"2px solid #4B5320", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" },
  mpesaTimer:     { fontSize:"11px", color:"#7a7060", fontFamily:"'DM Sans',sans-serif", marginTop:"8px" },
  ddChevron:      { position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" },
  ccBtn:          { display:"flex", alignItems:"center", gap:"6px", padding:"9px 10px", border:"1.5px solid #e5e0d8", borderRadius:"8px", background:"#faf9f7", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, outline:"none", transition:"border-color 0.2s" },
  ccDropdown:     { position:"absolute", top:"100%", left:0, width:"220px", background:"#fff", border:"1.5px solid #e5e0d8", borderRadius:"10px", boxShadow:"0 8px 24px rgba(0,0,0,0.12)", zIndex:200, marginTop:"4px" },
  ccItem:         { display:"flex", alignItems:"center", gap:"8px", padding:"8px 12px", cursor:"pointer", transition:"background 0.15s", borderBottom:"1px solid #f5f2ee" },
  groupDropdown:  { position:"absolute", top:"100%", left:0, right:0, background:"#fff", border:"1.5px solid #d8d0c8", borderRadius:"12px", boxShadow:"0 12px 32px rgba(0,0,0,0.14)", zIndex:100, marginTop:"4px", overflow:"hidden" },
  groupHeader:    { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:"#f4f1ec", borderBottom:"1px solid #e8e0d0", cursor:"pointer", userSelect:"none" },
  groupTitle:     { fontSize:"11px", fontWeight:700, letterSpacing:"0.07em", textTransform:"uppercase", color:"#2a2520", fontFamily:"'DM Sans',sans-serif" },
  groupTourItem:  { padding:"10px 14px 10px 20px", cursor:"pointer", borderBottom:"1px solid #f0ede8", fontSize:"13px", color:"#1a1a1a", fontFamily:"'DM Sans',sans-serif", transition:"background 0.15s", display:"flex", alignItems:"center" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  @keyframes bfFadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  @keyframes bfSpin{to{transform:rotate(360deg);}}
  @keyframes bfSpinLg{to{transform:rotate(360deg);}}
  .bf-step{animation:bfFadeUp 0.35s ease both;}
  .bf-next:hover:not(:disabled){background:#3a4118!important;transform:translateY(-1px);}
  .bf-next:disabled{opacity:0.55;cursor:not-allowed;}
  .bf-back:hover{border-color:#c8c0b8!important;background:#f5f3f0!important;}
  .bf-pkg:hover{border-color:#4B5320!important;}
  .bf-pay:hover{border-color:#4B5320!important;}
  .bf-pdf-btn:hover{background:#3a4118!important;transform:translateY(-1px);}
  .bf-select:focus,input[style]:focus,textarea[style]:focus{border-color:#4B5320!important;box-shadow:0 0 0 3px rgba(75,83,32,0.12)!important;}
  .bf-mpesa{animation:bfFadeUp 0.3s ease both;}
  .bf-spinner{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:bfSpin 0.7s linear infinite;}
  .bf-spinner-lg{display:inline-block;width:28px;height:28px;border:3px solid rgba(75,83,32,0.2);border-top-color:#4B5320;border-radius:50%;animation:bfSpinLg 0.9s linear infinite;}
  .bf-dd-item:hover{background:#f0f4ea!important;color:#1a1a1a!important;cursor:pointer;}
  .bf-dd-item:last-child{border-bottom:none!important;}
  .bf-cc-btn:hover{border-color:#4B5320!important;}
  .bf-cc-item:hover{background:#f6f8f0!important;}
  .bf-cc-item:last-child{border-bottom:none!important;}
  .bf-group-header:hover{background:#edeae4!important;}
`;

export default BookingForm;