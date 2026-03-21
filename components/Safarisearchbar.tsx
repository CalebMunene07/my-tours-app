"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, SlidersHorizontal, Wallet, X, ChevronDown } from "lucide-react";

// ── Destinations grouped ──────────────────────────────────────────────────────
const DESTINATION_GROUPS = [
  {
    group: "Kenya — Parks & Reserves",
    items: ["Masai Mara", "Amboseli", "Tsavo East", "Tsavo West", "Samburu",
            "Lake Nakuru", "Lake Naivasha", "Aberdare", "Ol Pejeta", "Nairobi"],
  },
  {
    group: "Kenya — Coast & Islands",
    items: ["Diani Beach", "Malindi", "Watamu", "Kilifi", "Mombasa", "Lamu"],
  },
  {
    group: "Tanzania",
    items: ["Serengeti", "Ngorongoro Crater", "Zanzibar", "Mount Kilimanjaro", "Tarangire", "Selous"],
  },
  {
    group: "Uganda & Rwanda",
    items: ["Bwindi (Gorilla Trek)", "Queen Elizabeth NP", "Lake Mburo", "Volcanoes NP"],
  },
  {
    group: "Beyond Africa",
    items: ["Dubai, UAE", "Maldives", "Bali", "Istanbul", "Paris", "Rome", "Thailand", "Egypt"],
  },
];

// ── Categories ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All Categories",
  "Bush Safaris",
  "Beach Escapes",
  "Mountain Journey & Alpine Hiking",
  "Adventure & Wildlife",
  "City Safari / Game & Park",
  "Lodge Safari & Signature Food",
  "Beyond Africa",
];

// ── Budget — both KES and USD ─────────────────────────────────────────────────
const BUDGETS = [
  { label: "Any Budget",                              value: "" },
  { label: "Budget — Under $500 / KSh 65,000",       value: "budget" },
  { label: "Mid-range — $500–$1,500 / KSh 65K–195K", value: "midrange" },
  { label: "Luxury — $1,500–$3,000 / KSh 195K–390K", value: "luxury" },
  { label: "Ultra Luxury — $3,000+ / KSh 390,000+",  value: "ultraluxury" },
];

// ── Hook: close dropdown on outside click ────────────────────────────────────
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return { open, setOpen, ref };
}

export default function SafariSearchBar() {
  const router = useRouter();
  const [query,       setQuery]       = useState("");
  const [destination, setDestination] = useState("");
  const [category,    setCategory]    = useState("");
  const [budget,      setBudget]      = useState("");

  const dest = useDropdown();
  const cat  = useDropdown();
  const budg = useDropdown();

  const handleSearch = () => {
    const p = new URLSearchParams();
    if (query)                                         p.set("q", query);
    if (destination)                                   p.set("destination", destination);
    if (category && category !== "All Categories")     p.set("category", category);
    if (budget)                                        p.set("budget", budget);
    router.push(`/tours${p.toString() ? `?${p.toString()}` : ""}`);
    dest.setOpen(false); cat.setOpen(false); budg.setOpen(false);
  };

  const clearAll = () => { setQuery(""); setDestination(""); setCategory(""); setBudget(""); };
  const hasFilters = query || destination || (category && category !== "All Categories") || budget;

  return (
    <section className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

        {/* ── Search row ── */}
        <div className="flex flex-col lg:flex-row bg-white border border-gray-200 rounded-xl overflow-visible shadow-sm">

          {/* Text input */}
          <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b lg:border-b-0 lg:border-r border-gray-200">
            <Search size={16} className="text-[#4B5320] shrink-0" />
            <input
              id="safari-search"
              name="safariSearch"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search by name, destination…"
              className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              autoComplete="off"
            />
            {query && <button onClick={() => setQuery("")} className="text-gray-300 hover:text-gray-500"><X size={14}/></button>}
          </div>

          {/* ── Destination dropdown ── */}
          <div className="relative" ref={dest.ref}>
            <button
              type="button"
              onClick={() => { dest.setOpen(!dest.open); cat.setOpen(false); budg.setOpen(false); }}
              className="w-full lg:w-52 flex items-center gap-2 px-4 py-3 border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <MapPin size={15} className="text-[#4B5320] shrink-0" />
              <span className={`text-sm flex-1 text-left truncate ${destination ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                {destination || "All Destinations"}
              </span>
              <ChevronDown size={13} className={`text-gray-400 shrink-0 transition-transform duration-200 ${dest.open ? "rotate-180" : ""}`}/>
            </button>

            {dest.open && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
                style={{ maxHeight: "280px", overflowY: "auto" }}>
                {/* Scrollbar visible */}
                <div
                  onClick={() => { setDestination(""); dest.setOpen(false); }}
                  className={`sticky top-0 px-4 py-2.5 text-sm cursor-pointer font-semibold border-b border-gray-100 z-10 ${!destination ? "bg-[#4B5320] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                  All Destinations
                </div>
                {DESTINATION_GROUPS.map(grp => (
                  <div key={grp.group}>
                    <div className="px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-400 bg-gray-50 border-b border-gray-100 sticky top-10.25 z-10">
                      {grp.group}
                    </div>
                    {grp.items.map(item => (
                      <div key={item}
                        onClick={() => { setDestination(item); dest.setOpen(false); }}
                        className={`px-5 py-2 text-sm cursor-pointer transition-colors ${destination === item ? "bg-[#4B5320] text-white font-semibold" : "text-gray-700 hover:bg-[#f0f4ea]"}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Category dropdown ── */}
          <div className="relative" ref={cat.ref}>
            <button
              type="button"
              onClick={() => { cat.setOpen(!cat.open); dest.setOpen(false); budg.setOpen(false); }}
              className="w-full lg:w-52 flex items-center gap-2 px-4 py-3 border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={15} className="text-[#4B5320] shrink-0" />
              <span className={`text-sm flex-1 text-left truncate ${category && category !== "All Categories" ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                {category || "All Categories"}
              </span>
              <ChevronDown size={13} className={`text-gray-400 shrink-0 transition-transform duration-200 ${cat.open ? "rotate-180" : ""}`}/>
            </button>

            {cat.open && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
                style={{ maxHeight: "280px", overflowY: "auto" }}>
                {CATEGORIES.map(c => (
                  <div key={c}
                    onClick={() => { setCategory(c); cat.setOpen(false); }}
                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${category === c ? "bg-[#4B5320] text-white font-semibold" : "text-gray-700 hover:bg-[#f0f4ea]"}`}>
                    {c}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Budget dropdown ── */}
          <div className="relative" ref={budg.ref}>
            <button
              type="button"
              onClick={() => { budg.setOpen(!budg.open); dest.setOpen(false); cat.setOpen(false); }}
              className="w-full lg:w-52 flex items-center gap-2 px-4 py-3 border-b lg:border-b-0 lg:border-r border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <Wallet size={15} className="text-[#4B5320] shrink-0" />
              <span className={`text-sm flex-1 text-left truncate ${budget ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                {BUDGETS.find(b => b.value === budget)?.label || "Any Budget"}
              </span>
              <ChevronDown size={13} className={`text-gray-400 shrink-0 transition-transform duration-200 ${budg.open ? "rotate-180" : ""}`}/>
            </button>

            {budg.open && (
              <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-50"
                style={{ maxHeight: "280px", overflowY: "auto" }}>
                {BUDGETS.map(b => (
                  <div key={b.value}
                    onClick={() => { setBudget(b.value); budg.setOpen(false); }}
                    className={`px-4 py-3 text-sm cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${budget === b.value ? "bg-[#4B5320] text-white font-semibold" : "text-gray-700 hover:bg-[#f0f4ea]"}`}>
                    {b.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-[#4B5320] hover:bg-[#3a411a] text-white font-bold text-sm uppercase tracking-wider px-8 py-3 transition-all duration-200 active:scale-95 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl shrink-0"
          >
            <Search size={15} />
            <span>Search</span>
          </button>
        </div>

        {/* Popular + clear */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Popular:</span>
          {["Masai Mara", "Amboseli", "Diani Beach", "Kilimanjaro", "Lamu", "Zanzibar"].map(tag => (
            <button key={tag}
              onClick={() => { setDestination(tag); router.push(`/tours?destination=${encodeURIComponent(tag)}`); }}
              className="text-xs text-[#4B5320] bg-[#f0f4ea] hover:bg-[#4B5320] hover:text-white px-3 py-1 rounded-full font-semibold transition-all duration-200">
              {tag}
            </button>
          ))}
          {hasFilters && (
            <button onClick={clearAll} className="ml-auto flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
              <X size={12}/> Clear all
            </button>
          )}
        </div>

      </div>
    </section>
  );
}