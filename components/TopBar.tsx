"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Phone, Mail, MapPin, ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English",    flag: "🇬🇧" },
  { code: "sw", label: "Kiswahili",  flag: "🇰🇪" },
  { code: "de", label: "Deutsch",    flag: "🇩🇪" },
  { code: "fr", label: "Français",   flag: "🇫🇷" },
  { code: "es", label: "Español",    flag: "🇪🇸" },
  { code: "it", label: "Italiano",   flag: "🇮🇹" },
  { code: "pt", label: "Português",  flag: "🇵🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "ru", label: "Русский",    flag: "🇷🇺" },
  { code: "zh", label: "中文",        flag: "🇨🇳" },
  { code: "ja", label: "日本語",      flag: "🇯🇵" },
  { code: "ko", label: "한국어",      flag: "🇰🇷" },
  { code: "ar", label: "العربية",    flag: "🇸🇦" },
  { code: "hi", label: "हिन्दी",     flag: "🇮🇳" },
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

// Fire the hidden GT combo select
function fireTranslate(code: string) {
  const sel = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!sel) return false;
  sel.value = code;
  sel.dispatchEvent(new Event("change"));
  return true;
}

// Poll until the GT select exists, then fire
function waitAndTranslate(code: string, ms = 200, retries = 25) {
  let n = 0;
  const t = setInterval(() => {
    n++;
    if (fireTranslate(code) || n >= retries) clearInterval(t);
  }, ms);
}

export default function TopBar() {
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
  const [open, setOpen]             = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // ── Mount GT widget once ──────────────────────────────────────────────────
  useEffect(() => {
    // Restore saved language label
    const saved = localStorage.getItem("wikima_lang");
    if (saved) {
      const found = LANGUAGES.find(l => l.code === saved);
      if (found) setActiveLang(found);
    }

    // Outside-click handler
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);

    // Create hidden GT mount point outside React tree
    if (!document.getElementById("gt_widget_mount")) {
      const div = document.createElement("div");
      div.id = "gt_widget_mount";
      div.style.cssText = "display:none;position:absolute;top:-9999px;left:-9999px;";
      document.body.appendChild(div);
    }

    // GT init callback
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false, layout: 0 },
          "gt_widget_mount"
        );
      } catch (_) { /**/ }

      // Re-apply saved lang after widget is ready
      const code = localStorage.getItem("wikima_lang");
      if (code && code !== "en") {
        waitAndTranslate(code);
      }
    };

    // Load GT script once
    if (!document.getElementById("gt-script")) {
      const s = document.createElement("script");
      s.id    = "gt-script";
      s.src   = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      s.onerror = () => { /* silently ignore */ };
      document.body.appendChild(s);
    }

    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const handleSelect = useCallback((lang: typeof LANGUAGES[0]) => {
    setActiveLang(lang);
    setOpen(false);
    localStorage.setItem("wikima_lang", lang.code);

    if (lang.code === "en") {
      // Restore to English — clear GT and reload
      try {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      } catch (_) { /**/ }
      window.location.reload();
    } else {
      // Try immediately; if widget not ready yet, poll
      if (!fireTranslate(lang.code)) {
        waitAndTranslate(lang.code);
      }
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-60 bg-[#1a1f0e] text-white/80 text-xs border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-9">

        {/* Left */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center gap-1.5">
            <MapPin size={11} className="text-[#D4AF37]" />
            <span>Nairobi, Kenya</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Phone size={11} className="text-[#D4AF37]" />
            <a href="tel:+254720069550" className="hover:text-white transition-colors">+254 720 069 550</a>
          </div>
          <div className="hidden lg:flex items-center gap-1.5">
            <Mail size={11} className="text-[#D4AF37]" />
            <a href="mailto:info@wikimasafari.com" className="hover:text-white transition-colors">info@wikimasafari.com</a>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Social icons */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
            <a href="https://wa.me/254720069550" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-white transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.859L.057 23.99l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.647-.51-5.158-1.399l-.371-.22-3.844 1.008 1.025-3.74-.242-.386A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            </a>
          </div>

          <div className="w-px h-4 bg-white/20 hidden sm:block" />

          {/* Language switcher */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(v => !v)}
              className="flex items-center gap-1.5 hover:text-white transition-colors py-1"
              aria-label="Change language"
            >
              <span className="text-sm leading-none">{activeLang.flag}</span>
              <span className="font-bold uppercase tracking-wider">{activeLang.code.toUpperCase()}</span>
              <ChevronDown size={10} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute top-full right-0 mt-1 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-64 overflow-y-auto">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      activeLang.code === lang.code
                        ? "bg-[#4B5320] text-white font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                    {activeLang.code === lang.code && <span className="ml-auto text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}