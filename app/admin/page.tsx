"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, Users, Map, Settings,
  LogOut, Menu, X, TrendingUp, Clock,
  CheckCircle, XCircle, AlertCircle, RefreshCw,
  DollarSign, Calendar, Mail, Phone, Trash2, Eye, EyeOff, BarChart2
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ── TYPES ──
interface Booking {
  id: string;
  reference: string;
  tour_title: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  travel_date: string;
  guests: number;
  package: string;
  total_amount: string;
  deposit_amount: string;
  status: string;
  created_at: string;
  // NOTE: backend needs to persist & return these two fields (sent by the
  // booking form as `visitorType` and `referredBy`) for this to populate.
  visitor_type?: "resident" | "non-resident";
  referred_by?: string | null; // the referral code (booking reference) of whoever referred this guest
}

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  monthRevenue: number;
}

interface TourStat {
  title: string;
  count: number;
  revenue: number;
  packages: Record<string, number>;
}

type ActiveView = "dashboard" | "bookings" | "tours" | "settings";
type StatusFilter = "all" | "pending" | "confirmed" | "cancelled";

// ── STATUS BADGE ──
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    pending:   { color: "bg-amber-50 text-amber-700 border-amber-200",       icon: <Clock size={11} />,        label: "Pending"   },
    confirmed: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <CheckCircle size={11} />,  label: "Confirmed" },
    cancelled: { color: "bg-red-50 text-red-600 border-red-200",             icon: <XCircle size={11} />,      label: "Cancelled" },
    paid:      { color: "bg-blue-50 text-blue-700 border-blue-200",          icon: <CheckCircle size={11} />,  label: "Paid"      },
    deleted:   { color: "bg-gray-100 text-gray-400 border-gray-200",         icon: <Trash2 size={11} />,       label: "Deleted"   },
  };
  const s = map[status] ?? { color: "bg-gray-50 text-gray-600 border-gray-200", icon: <AlertCircle size={11} />, label: status };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${s.color}`}>
      {s.icon}{s.label}
    </span>
  );
};

// ── PACKAGE BADGE ──
const PackageBadge = ({ pkg }: { pkg: string }) => {
  const map: Record<string, string> = {
    Standard: "bg-slate-100 text-slate-600",
    Premium:  "bg-[#4B5320]/10 text-[#4B5320]",
    Luxury:   "bg-amber-50 text-amber-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${map[pkg] ?? "bg-gray-100 text-gray-600"}`}>
      {pkg}
    </span>
  );
};

// ── VISITOR TYPE BADGE ──
const VisitorTypeBadge = ({ type }: { type?: "resident" | "non-resident" }) => {
  if (!type) return <span className="text-[10px] text-gray-300 italic">—</span>;
  const isResident = type === "resident";
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
      isResident ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
    }`}>
      {isResident ? "Resident" : "Non-Resident"}
    </span>
  );
};

// ── REFERRED BY BADGE ──
const ReferredByBadge = ({ code }: { code?: string | null }) => {
  if (!code) return <span className="text-[10px] text-gray-300 italic">Direct</span>;
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-md">
      via {code}
    </span>
  );
};

// ── TOUR CHART (enhanced) ──
const TourChart = ({ bookings }: { bookings: Booking[] }) => {
  const active = bookings.filter(b => b.status !== "deleted");
  const stats: Record<string, TourStat> = {};
  active.forEach(b => {
    if (!stats[b.tour_title]) stats[b.tour_title] = { title: b.tour_title, count: 0, revenue: 0, packages: {} };
    stats[b.tour_title].count++;
    stats[b.tour_title].revenue += parseFloat(b.deposit_amount || "0");
    stats[b.tour_title].packages[b.package] = (stats[b.tour_title].packages[b.package] || 0) + 1;
  });
  const sorted = Object.values(stats).sort((a, b) => b.count - a.count);
  const max = sorted[0]?.count || 1;
  const totalBookings = active.length || 1;

  const BAR_COLORS = ["#4B5320","#5e6a28","#728430","#D4AF37","#C8963E","#b07a30"];
  const PKG_COLORS: Record<string, string> = {
    Standard: "#94a3b8", Premium: "#4B5320", Luxury: "#D4AF37",
  };

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-300">
        <BarChart2 size={40} className="mb-3" />
        <p className="text-sm text-gray-400">No booking data yet.</p>
        <p className="text-xs text-gray-300 mt-1">Tour rankings will appear once bookings come in.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {/* Column headers */}
      <div className="flex items-center gap-3 pb-2 mb-1 border-b border-gray-100">
        <span className="text-[9px] font-bold text-gray-300 w-4 shrink-0">#</span>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider w-40 shrink-0">Tour</span>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex-1">Popularity</span>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider w-16 text-right shrink-0">Share</span>
      </div>

      {sorted.map((t, i) => {
        const pct = Math.round((t.count / totalBookings) * 100);
        const barPct = (t.count / max) * 100;
        const topPkg = Object.entries(t.packages).sort((a,b)=>b[1]-a[1])[0];
        return (
          <div key={t.title} className="group">
            <div className="flex items-center gap-3 py-2.5">
              {/* Rank */}
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold
                ${i===0?"bg-[#D4AF37] text-white":i===1?"bg-gray-400 text-white":i===2?"bg-orange-400 text-white":"bg-gray-100 text-gray-400"}`}>
                {i+1}
              </div>
              {/* Tour name + top package */}
              <div className="w-40 shrink-0">
                <p className="text-xs font-semibold text-gray-800 truncate leading-tight" title={t.title}>{t.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {topPkg && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                      style={{ background: PKG_COLORS[topPkg[0]] + "20", color: PKG_COLORS[topPkg[0]] }}>
                      {topPkg[0]}
                    </span>
                  )}
                  <span className="text-[9px] text-gray-400">${t.revenue.toLocaleString()}</span>
                </div>
              </div>
              {/* Bar */}
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-7 bg-gray-100 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg flex items-center px-3 transition-all duration-700 ease-out"
                    style={{
                      width: `${barPct}%`,
                      background: `linear-gradient(90deg, ${BAR_COLORS[i % BAR_COLORS.length]}, ${BAR_COLORS[i % BAR_COLORS.length]}cc)`,
                      minWidth: t.count > 0 ? "40px" : "0px",
                    }}
                  >
                    <span className="text-white text-[10px] font-bold whitespace-nowrap">
                      {t.count} {t.count === 1 ? "booking" : "bookings"}
                    </span>
                  </div>
                </div>
              </div>
              {/* Share % */}
              <div className="w-16 shrink-0 text-right">
                <span className="text-xs font-bold text-gray-600">{pct}%</span>
                <p className="text-[9px] text-gray-300">{t.count}/{totalBookings}</p>
              </div>
            </div>
            {/* Package breakdown dots */}
            {Object.keys(t.packages).length > 1 && (
              <div className="flex items-center gap-2 pb-2 pl-7 ml-0">
                {Object.entries(t.packages).map(([pkg, cnt]) => (
                  <div key={pkg} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: PKG_COLORS[pkg] || "#888" }}/>
                    <span className="text-[9px] text-gray-400">{pkg} ×{cnt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Legend */}
      <div className="pt-4 mt-2 border-t border-gray-50 flex items-center gap-4 flex-wrap">
        {Object.entries(PKG_COLORS).map(([pkg, color]) => (
          <div key={pkg} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: color }}/>
            <span className="text-[10px] text-gray-400">{pkg}</span>
          </div>
        ))}
        <span className="text-[10px] text-gray-300 ml-auto">{active.length} total active bookings</span>
      </div>
    </div>
  );
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  * { font-family: 'DM Sans', sans-serif; }
  .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
  .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .row-hover:hover { background: #f8f7f3; }
  .row-deleted { opacity: 0.4; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #d0ccc4; border-radius: 4px; }
  .welcome-glow { animation: welcomePulse 3s ease-in-out infinite; }
  @keyframes welcomePulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
`;

// ══════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════
export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [activeView, setActiveView]     = useState<ActiveView>("dashboard");
  const [bookings, setBookings]         = useState<Booking[]>([]);
  const [stats, setStats]               = useState<Stats | null>(null);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch]             = useState("");
  const [updatingId, setUpdatingId]     = useState<string | null>(null);
  const [showDeleted, setShowDeleted]   = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // ── AUTH STATE ──
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [authChecked, setAuthChecked]   = useState(false);
  const [loginEmail, setLoginEmail]     = useState("");
  const [loginPass, setLoginPass]       = useState("");
  const [loginError, setLoginError]     = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [staffName, setStaffName]       = useState("");
  const [staffEmail, setStaffEmail]     = useState("");
  const [showWelcome, setShowWelcome]   = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wikima_token");
    const name  = localStorage.getItem("wikima_staff_name");
    const email = localStorage.getItem("wikima_staff_email");
    if (saved) {
      setIsLoggedIn(true);
      setStaffName(name || "Staff");
      setStaffEmail(email || "");
    }
    setAuthChecked(true);
  }, []);

  // ── LOGIN ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      if (data.user?.role !== "admin") throw new Error("Access denied — admin role required");

      localStorage.setItem("wikima_token", data.token);

      // Get first name from full name or email
      const fullName = data.user?.name || "";
      const firstName = fullName.trim()
        ? fullName.trim().split(" ")[0]
        : loginEmail.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim().split(" ")[0];

      localStorage.setItem("wikima_staff_name", firstName);
      localStorage.setItem("wikima_staff_email", loginEmail);
      setStaffName(firstName);
      setStaffEmail(loginEmail);
      setIsLoggedIn(true);
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 4000);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // ── LOGOUT ──
  const handleLogout = () => {
    localStorage.removeItem("wikima_token");
    localStorage.removeItem("wikima_staff_name");
    localStorage.removeItem("wikima_staff_email");
    setIsLoggedIn(false);
    setBookings([]);
    setStats(null);
    setStaffName("");
    setStaffEmail("");
  };

  // ── FETCH DATA ──
  const fetchData = useCallback(async () => {
    const savedToken = localStorage.getItem("wikima_token");
    if (!savedToken) return;
    setLoading(true);
    setError("");
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${savedToken}`,
      };

      const res = await fetch(`${API}/api/bookings`, { headers });
      if (res.status === 401) { handleLogout(); return; }
      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      const all: Booking[] = data.bookings || [];
      setBookings(all);

      const now = new Date();
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const active = all.filter(b => b.status !== "deleted");

      setStats({
        totalBookings:     active.length,
        pendingBookings:   active.filter(b => b.status === "pending").length,
        confirmedBookings: active.filter(b => b.status === "confirmed" || b.status === "paid").length,
        cancelledBookings: active.filter(b => b.status === "cancelled").length,
        totalRevenue: active
          .filter(b => b.status === "confirmed" || b.status === "paid")
          .reduce((s, b) => s + parseFloat(b.deposit_amount || "0"), 0),
        monthRevenue: active
          .filter(b => new Date(b.created_at) >= monthStart && (b.status === "confirmed" || b.status === "paid"))
          .reduce((s, b) => s + parseFloat(b.deposit_amount || "0"), 0),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn, fetchData]);

  // ── UPDATE STATUS ──
  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("wikima_token");
      const res = await fetch(`${API}/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchData();
    } catch { alert("Failed to update status."); }
    finally { setUpdatingId(null); }
  };

  // ── SOFT DELETE ──
  const deleteBooking = async (id: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("wikima_token");
      const res = await fetch(`${API}/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ status: "deleted" }),
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchData();
    } catch { alert("Failed to delete booking."); }
    finally { setUpdatingId(null); setDeleteConfirm(null); }
  };

  // ── FILTERED BOOKINGS ──
  const filtered = bookings.filter(b => {
    if (!showDeleted && b.status === "deleted") return false;
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      b.guest_name.toLowerCase().includes(q) ||
      b.guest_email.toLowerCase().includes(q) ||
      b.reference.toLowerCase().includes(q) ||
      b.tour_title.toLowerCase().includes(q) ||
      (b.referred_by || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
    { id: "bookings",  label: "Bookings",  icon: <Users size={17} /> },
    { id: "tours",     label: "Tours",     icon: <Map size={17} /> },
    { id: "settings",  label: "Settings",  icon: <Settings size={17} /> },
  ];

  if (!authChecked) return null;

  // ══════════════════════════════════════════
  //  LOGIN SCREEN
  // ══════════════════════════════════════════
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "linear-gradient(135deg, #eef2e6 0%, #e8edda 50%, #dfe8cc 100%)" }}>
        <style>{STYLES}</style>
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: "#D4AF37" }}>
              <Map size={20} style={{ color: "#1a2208" }} />
            </div>
            <div>
              <p className="font-bold leading-tight tracking-tight" style={{ color: "#2d3a10" }}>Wikima Safari</p>
              <p className="text-[11px]" style={{ color: "#8a7a60" }}>Staff Console</p>
            </div>
          </div>

          <div className="rounded-2xl p-8 shadow-md" style={{ background: "#faf7f2", border: "1px solid #d4c9b0" }}>
            <h1 className="text-xl font-bold mb-1" style={{ color: "#2d3a10" }}>Sign in</h1>
            <p className="text-sm mb-6" style={{ color: "#8a7a60" }}>Staff access only</p>

            {loginError && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl flex items-center gap-2">
                <AlertCircle size={13} className="shrink-0" /> {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#5a5040" }}>Email</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder="staff@wikimasafari.com" required autoComplete="email"
                  style={{ background:"#f9f6f0", border:"1.5px solid #c8b99a", color:"#2d3a10", borderRadius:"12px", padding:"10px 16px", fontSize:"14px", width:"100%", outline:"none", display:"block" }}/>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#5a5040" }}>Password</label>
                <input type="password" value={loginPass} onChange={e => setLoginPass(e.target.value)}
                  placeholder="Enter your password" required autoComplete="current-password"
                  style={{ background:"#f9f6f0", border:"1.5px solid #c8b99a", color:"#2d3a10", borderRadius:"12px", padding:"10px 16px", fontSize:"14px", width:"100%", outline:"none", display:"block" }}/>
              </div>
              <button type="submit" disabled={loginLoading}
                className="w-full bg-[#4B5320] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#3a4118] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
                {loginLoading ? <><RefreshCw size={14} className="animate-spin" /> Signing in…</> : "Sign In →"}
              </button>
            </form>
          </div>
          <p className="text-center text-[11px] text-gray-400 mt-4">
            Your account role must be <span className="font-bold text-gray-600">staff</span> to access this panel.
          </p>
        </div>
      </main>
    );
  }

  // ══════════════════════════════════════════
  //  MAIN DASHBOARD
  // ══════════════════════════════════════════
  return (
    <main className="min-h-screen bg-[#f5f4f0] flex flex-col md:flex-row">
      <style>{STYLES}</style>

      {/* ── WELCOME TOAST ── */}
      {showWelcome && (
        <div className="fixed top-5 right-5 z-100 bg-[#1a2208] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1a2208] font-bold text-sm">
            {staffName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs text-white/50 leading-none mb-0.5">Welcome back,</p>
            <p className="font-bold text-[#D4AF37] text-sm capitalize">{staffName} 👋</p>
          </div>
        </div>
      )}

      {/* ── MOBILE HEADER ── */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-[#2d3a10] text-white sticky top-0 z-50">
        <span className="font-bold text-sm tracking-wide">Wikima Staff</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── SIDEBAR ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-60 bg-[#1a2208] text-white flex flex-col transition-transform duration-300
        md:relative md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#D4AF37] flex items-center justify-center">
              <Map size={14} className="text-[#1a2208]" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">Wikima Safari</p>
              <p className="text-[10px] text-white/40">Staff Console</p>
            </div>
          </div>
        </div>

        {/* Staff welcome banner */}
        <div className="px-4 py-4 border-b border-white/5">
          <div className="bg-white/5 rounded-xl px-3 py-2.5 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1a2208] text-sm font-extrabold shrink-0">
              {staffName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-white/40 leading-none mb-0.5">Welcome,</p>
              <p className="text-sm font-bold text-[#D4AF37] leading-tight capitalize truncate">{staffName}</p>
              <p className="text-[9px] text-white/30 truncate">{staffEmail}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                ${activeView === item.id ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}>
              {item.icon}
              {item.label}
              {item.id === "bookings" && stats && stats.pendingBookings > 0 && (
                <span className="ml-auto bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {stats.pendingBookings}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 pt-4 space-y-1 border-t border-white/10">
          <button onClick={fetchData} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh Data
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/70 hover:text-red-300 hover:bg-white/5 transition-all">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── MAIN CONTENT ── */}
      <section className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeView === "dashboard" ? `Welcome, ${staffName}` :
                 activeView === "bookings"  ? "All Bookings" :
                 activeView === "tours"     ? "Tour Performance" : "Settings"}
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">
                {new Date().toLocaleDateString("en-GB", { weekday:"long", day:"numeric", month:"long", year:"numeric" })}
              </p>
            </div>
            <button onClick={fetchData}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition-all">
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              {loading ? "Loading…" : "Refresh"}
            </button>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          {/* ═══ DASHBOARD ═══ */}
          {activeView === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label:"Total Bookings", value: loading?"—":stats?.totalBookings??0,   icon:<Users size={18}/>,       color:"text-[#4B5320]",   bg:"bg-[#4B5320]/10", sub:`${stats?.pendingBookings??0} pending` },
                  { label:"Confirmed",      value: loading?"—":stats?.confirmedBookings??0,icon:<CheckCircle size={18}/>, color:"text-emerald-600", bg:"bg-emerald-50",   sub:"paid & confirmed" },
                  { label:"Revenue (MTD)",  value: loading?"—":`$${(stats?.monthRevenue??0).toLocaleString()}`, icon:<DollarSign size={18}/>, color:"text-blue-600", bg:"bg-blue-50", sub:"deposits this month" },
                  { label:"Total Deposits", value: loading?"—":`$${(stats?.totalRevenue??0).toLocaleString()}`, icon:<TrendingUp size={18}/>, color:"text-amber-600", bg:"bg-amber-50", sub:"all time" },
                ].map(s => (
                  <div key={s.label} className="stat-card bg-white rounded-2xl p-5 border border-gray-100">
                    <div className={`w-9 h-9 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
                    <p className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</p>
                    <p className="text-xs font-semibold text-gray-500">{s.label}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Recent bookings */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <h2 className="font-bold text-gray-900 text-sm">Recent Bookings</h2>
                  <button onClick={() => setActiveView("bookings")} className="text-[10px] font-bold text-[#4B5320] hover:underline uppercase tracking-wider">View All →</button>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-16 text-gray-400 text-sm gap-2"><RefreshCw size={15} className="animate-spin"/> Loading…</div>
                ) : bookings.filter(b=>b.status!=="deleted").length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm">No bookings yet.</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {bookings.filter(b=>b.status!=="deleted").slice(0,6).map(b => (
                      <div key={b.id} className="flex items-center justify-between px-6 py-3.5 row-hover">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#4B5320]/10 flex items-center justify-center text-[#4B5320] text-xs font-bold shrink-0">
                            {b.guest_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{b.guest_name}</p>
                            <p className="text-[10px] text-gray-400">{b.reference} · {b.tour_title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <PackageBadge pkg={b.package} />
                          <StatusBadge status={b.status} />
                          <span className="text-sm font-bold text-gray-900 hidden sm:block">${parseFloat(b.deposit_amount).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {stats && !loading && (
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label:"Pending",   val:stats.pendingBookings,   color:"bg-amber-400" },
                    { label:"Confirmed", val:stats.confirmedBookings, color:"bg-emerald-500" },
                    { label:"Cancelled", val:stats.cancelledBookings, color:"bg-red-400" },
                  ].map(item => (
                    <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                      <div className={`w-2 h-2 rounded-full ${item.color} mb-3`}/>
                      <p className="text-xl font-bold text-gray-900">{item.val}</p>
                      <p className="text-xs text-gray-400 font-medium mb-3">{item.label}</p>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full transition-all duration-700`}
                          style={{ width: stats.totalBookings ? `${(item.val/stats.totalBookings)*100}%` : "0%" }}/>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ BOOKINGS ═══ */}
          {activeView === "bookings" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search name, email, reference, tour…"
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4B5320] focus:ring-2 focus:ring-[#4B5320]/10"/>
                <div className="flex gap-2 flex-wrap items-center">
                  {(["all","pending","confirmed","cancelled"] as StatusFilter[]).map(f => (
                    <button key={f} onClick={() => setStatusFilter(f)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all border
                        ${statusFilter===f ? "bg-[#4B5320] text-white border-[#4B5320]" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
                      {f}
                    </button>
                  ))}
                  <button onClick={() => setShowDeleted(!showDeleted)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border
                      ${showDeleted ? "bg-gray-700 text-white border-gray-700" : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"}`}>
                    {showDeleted ? <Eye size={11}/> : <EyeOff size={11}/>}
                    {showDeleted ? "Hide History" : "Show Deleted History"}
                  </button>
                </div>
              </div>

              {showDeleted && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2">
                  <Eye size={13}/> Showing deleted bookings — these are kept for history only and cannot be re-activated.
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-20 text-gray-400 text-sm gap-2"><RefreshCw size={15} className="animate-spin"/> Loading bookings…</div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 text-sm">No bookings found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/60">
                          {["Reference","Guest","Tour","Date","Package","Visitor","Referred By","Deposit","Status","Actions"].map(h => (
                            <th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filtered.map(b => (
                          <tr key={b.id} className={`row-hover ${b.status==="deleted"?"row-deleted":""}`}>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`font-mono text-xs font-bold ${b.status==="deleted"?"text-gray-300 line-through":"text-[#4B5320]"}`}>{b.reference}</span>
                              {b.status === "deleted" && <span className="block text-[9px] text-gray-300 italic">archived</span>}
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-semibold text-gray-900 text-xs whitespace-nowrap">{b.guest_name}</p>
                              <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5"><Mail size={9}/>{b.guest_email}</div>
                              {b.guest_phone && <div className="flex items-center gap-1 text-[10px] text-gray-400"><Phone size={9}/>{b.guest_phone}</div>}
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-xs text-gray-700 font-medium max-w-32.5 truncate">{b.tour_title}</p>
                              <p className="text-[10px] text-gray-400">{b.guests} guest{b.guests>1?"s":""}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Calendar size={11}/>
                                {new Date(b.travel_date).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"})}
                              </div>
                              <p className="text-[10px] text-gray-400 mt-0.5">Booked {new Date(b.created_at).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</p>
                            </td>
                            <td className="px-4 py-3"><PackageBadge pkg={b.package}/></td>
                            <td className="px-4 py-3"><VisitorTypeBadge type={b.visitor_type}/></td>
                            <td className="px-4 py-3"><ReferredByBadge code={b.referred_by}/></td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="font-bold text-gray-900 text-xs">${parseFloat(b.deposit_amount).toLocaleString()}</p>
                              <p className="text-[10px] text-gray-400">of ${parseFloat(b.total_amount).toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-3"><StatusBadge status={b.status}/></td>
                            <td className="px-4 py-3">
                              {b.status === "deleted" ? (
                                <span className="text-[10px] text-gray-300 italic">history only</span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <select value={b.status} disabled={updatingId===b.id}
                                    onChange={e => updateStatus(b.id, e.target.value)}
                                    className="text-[10px] border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-600 cursor-pointer focus:outline-none focus:border-[#4B5320] disabled:opacity-50">
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirm</option>
                                    <option value="cancelled">Cancel</option>
                                  </select>
                                  {deleteConfirm === b.id ? (
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => deleteBooking(b.id)} disabled={updatingId===b.id}
                                        className="text-[10px] bg-red-500 text-white px-2 py-1 rounded-lg font-bold hover:bg-red-600 transition-colors disabled:opacity-50">
                                        Yes
                                      </button>
                                      <button onClick={() => setDeleteConfirm(null)}
                                        className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                        No
                                      </button>
                                    </div>
                                  ) : (
                                    <button onClick={() => setDeleteConfirm(b.id)} title="Delete (keeps history)"
                                      className="w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors">
                                      <Trash2 size={12}/>
                                    </button>
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <span>{filtered.filter(b=>b.status==="deleted").length > 0 ? `${filtered.filter(b=>b.status==="deleted").length} deleted entries in view` : "No deleted entries shown"}</span>
                <span>{filtered.filter(b=>b.status!=="deleted").length} active · {bookings.length} total</span>
              </div>
            </div>
          )}

          {/* ═══ TOURS CHART ═══ */}
          {activeView === "tours" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart2 size={17} className="text-[#4B5320]"/>
                      <h2 className="font-bold text-gray-900 text-sm">Tour Popularity Chart</h2>
                    </div>
                    <p className="text-xs text-gray-400">Most booked to least — based on active bookings</p>
                  </div>
                  <button onClick={fetchData} className="text-[10px] font-bold text-[#4B5320] hover:underline flex items-center gap-1">
                    <RefreshCw size={10} className={loading?"animate-spin":""}/> Refresh
                  </button>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-12 text-gray-400 text-sm gap-2">
                      <RefreshCw size={15} className="animate-spin"/> Loading…
                    </div>
                  ) : (
                    <TourChart bookings={bookings}/>
                  )}
                </div>
              </div>

              {/* Tour summary cards */}
              {!loading && (() => {
                const active = bookings.filter(b => b.status !== "deleted");
                const counts: Record<string, { count: number; revenue: number }> = {};
                active.forEach(b => {
                  if (!counts[b.tour_title]) counts[b.tour_title] = { count: 0, revenue: 0 };
                  counts[b.tour_title].count++;
                  counts[b.tour_title].revenue += parseFloat(b.deposit_amount || "0");
                });
                const sorted = Object.entries(counts).sort((a,b) => b[1].count - a[1].count);
                if (sorted.length === 0) return null;
                return (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {sorted.map(([title, data], i) => (
                      <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 stat-card">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                            ${i===0?"bg-[#D4AF37]/20 text-[#D4AF37]":i===1?"bg-gray-200 text-gray-500":i===2?"bg-orange-100 text-orange-500":"bg-gray-100 text-gray-300"}`}>
                            #{i+1}
                          </span>
                          <span className="text-[10px] font-bold text-[#4B5320] bg-[#4B5320]/10 px-2 py-0.5 rounded-full">
                            {data.count} booking{data.count!==1?"s":""}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-800 leading-tight mb-1">{title}</p>
                        <p className="text-[10px] text-gray-400">${data.revenue.toLocaleString()} in deposits</p>
                        <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                          <div className="h-full bg-[#4B5320] rounded-full transition-all duration-700"
                            style={{ width:`${(data.count/(sorted[0][1].count||1))*100}%` }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ═══ SETTINGS ═══ */}
          {activeView === "settings" && (
            <div className="space-y-5 max-w-lg">

              {/* Staff info card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-1">Staff Member</h3>
                <p className="text-xs text-gray-400 mb-4">Currently signed in to this session</p>
                <div className="flex items-center gap-3 bg-[#f6f8f0] rounded-xl px-4 py-3 border border-[#c8d09e]">
                  <div className="w-10 h-10 rounded-full bg-[#4B5320] flex items-center justify-center text-white font-bold text-base">
                    {staffName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-[#2d3a10] capitalize text-sm">{staffName}</p>
                    <p className="text-[11px] text-[#7a8550]">{staffEmail}</p>
                    <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider bg-[#4B5320]/10 text-[#4B5320] px-2 py-0.5 rounded-full">
                      Staff · Wikima Safari
                    </span>
                  </div>
                </div>
              </div>

             

              {/* Sign out */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-1">Session</h3>
                <p className="text-xs text-gray-400 mb-4">End your current staff session.</p>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl border border-red-100">
                  <LogOut size={13}/> Sign out · {staffName}
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-end justify-center sm:items-center p-4"
          onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4 mx-auto">
              <Trash2 size={18} className="text-red-500"/>
            </div>
            <h3 className="text-center font-bold text-gray-900 mb-1">Delete this booking?</h3>
            <p className="text-center text-xs text-gray-400 mb-2">
              The booking will be <strong>archived</strong> — removed from active view but kept in history.
            </p>
            <p className="text-center text-[10px] text-gray-300 mb-6">Use "Show Deleted History" in bookings to view archived records.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => deleteBooking(deleteConfirm)} disabled={!!updatingId}
                className="flex-1 bg-red-500 text-white font-bold text-sm py-2.5 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-60">
                {updatingId ? "Archiving…" : "Archive Booking"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
