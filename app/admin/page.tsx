"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, Users, Map, Settings,
  LogOut, Menu, X, TrendingUp, Clock,
  CheckCircle, XCircle, AlertCircle, RefreshCw,
  DollarSign, Calendar, Mail, Phone
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
}

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  monthRevenue: number;
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

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  * { font-family: 'DM Sans', sans-serif; }
  .stat-card { transition: transform 0.2s, box-shadow 0.2s; }
  .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .row-hover:hover { background: #f8f7f3; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #d0ccc4; border-radius: 4px; }
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

  // ── AUTH STATE ──
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [authChecked, setAuthChecked]   = useState(false);
  const [loginEmail, setLoginEmail]     = useState("");
  const [loginPass, setLoginPass]       = useState("");
  const [loginError, setLoginError]     = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Check for saved token on mount
  useEffect(() => {
    const saved = localStorage.getItem("wikima_token");
    if (saved) setIsLoggedIn(true);
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
      setIsLoggedIn(true);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // ── LOGOUT ──
  const handleLogout = () => {
    localStorage.removeItem("wikima_token");
    setIsLoggedIn(false);
    setBookings([]);
    setStats(null);
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

      setStats({
        totalBookings:     all.length,
        pendingBookings:   all.filter(b => b.status === "pending").length,
        confirmedBookings: all.filter(b => b.status === "confirmed" || b.status === "paid").length,
        cancelledBookings: all.filter(b => b.status === "cancelled").length,
        totalRevenue: all
          .filter(b => b.status === "confirmed" || b.status === "paid")
          .reduce((s, b) => s + parseFloat(b.deposit_amount || "0"), 0),
        monthRevenue: all
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

  // ── UPDATE BOOKING STATUS ──
  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("wikima_token");
      const res = await fetch(`${API}/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      await fetchData();
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // ── FILTERED BOOKINGS ──
  const filtered = bookings.filter(b => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      b.guest_name.toLowerCase().includes(q) ||
      b.guest_email.toLowerCase().includes(q) ||
      b.reference.toLowerCase().includes(q) ||
      b.tour_title.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const navItems: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
    { id: "bookings",  label: "Bookings",  icon: <Users size={17} /> },
    { id: "tours",     label: "Tours",     icon: <Map size={17} /> },
    { id: "settings",  label: "Settings",  icon: <Settings size={17} /> },
  ];

  // Prevent flash before localStorage check
  if (!authChecked) return null;

  // ══════════════════════════════════════════
  //  LOGIN SCREEN
  // ══════════════════════════════════════════
  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #eef2e6 0%, #e8edda 50%, #dfe8cc 100%)" }}>
        <style>{STYLES}</style>
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: "#D4AF37" }}>
              <Map size={20} style={{ color: "#1a2208" }} />
            </div>
            <div>
              <p className="font-bold leading-tight tracking-tight" style={{ color: "#2d3a10" }}>Wikima Safari</p>
              <p className="text-[11px]" style={{ color: "#8a7a60" }}>Admin Console</p>
            </div>
          </div>

          {/* Login card */}
          <div className="rounded-2xl p-8 shadow-md" style={{ background: "#faf7f2", border: "1px solid #d4c9b0" }}>
            <h1 className="text-xl font-bold mb-1" style={{ color: "#2d3a10" }}>Sign in</h1>
            <p className="text-sm mb-6" style={{ color: "#8a7a60" }}>Admin access only</p>

            {loginError && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2.5 rounded-xl flex items-center gap-2">
                <AlertCircle size={13} className="shrink-0" /> {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#5a5040" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="admin@wikimasafari.com"
                  required
                  autoComplete="email"
                  style={{
                    background: "#f9f6f0",
                    border: "1.5px solid #c8b99a",
                    color: "#2d3a10",
                    borderRadius: "12px",
                    padding: "10px 16px",
                    fontSize: "14px",
                    width: "100%",
                    outline: "none",
                    display: "block",
                  }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "#5a5040" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  style={{
                    background: "#f9f6f0",
                    border: "1.5px solid #c8b99a",
                    color: "#2d3a10",
                    borderRadius: "12px",
                    padding: "10px 16px",
                    fontSize: "14px",
                    width: "100%",
                    outline: "none",
                    display: "block",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#4B5320] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#3a4118] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {loginLoading
                  ? <><RefreshCw size={14} className="animate-spin" /> Signing in…</>
                  : "Sign In →"}
              </button>
            </form>
          </div>

          <p className="text-center text-[11px] text-gray-400 mt-4">
            Your account role must be <span className="font-bold text-gray-600">admin</span> to access this panel.
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

      {/* ── MOBILE HEADER ── */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-[#2d3a10] text-white sticky top-0 z-50">
        <span className="font-bold text-sm tracking-wide">Wikima Admin</span>
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
              <p className="text-[10px] text-white/40">Management Console</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left
                ${activeView === item.id
                  ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
            >
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
          <button
            onClick={fetchData}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh Data
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/70 hover:text-red-300 hover:bg-white/5 transition-all"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── MAIN CONTENT ── */}
      <section className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activeView === "dashboard" ? "Dashboard" :
                 activeView === "bookings"  ? "All Bookings" :
                 activeView === "tours"     ? "Tours" : "Settings"}
              </h1>
              <p className="text-gray-400 text-sm mt-0.5">
                {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 transition-all"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              {loading ? "Loading…" : "Refresh"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle size={15} />
              {error} — Is your backend running on port 5000?
            </div>
          )}

          {/* ═══ DASHBOARD ═══ */}
          {activeView === "dashboard" && (
            <div className="space-y-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Bookings", value: loading ? "—" : stats?.totalBookings ?? 0,     icon: <Users size={18} />,     color: "text-[#4B5320]",   bg: "bg-[#4B5320]/10", sub: `${stats?.pendingBookings ?? 0} pending` },
                  { label: "Confirmed",      value: loading ? "—" : stats?.confirmedBookings ?? 0, icon: <CheckCircle size={18}/>, color: "text-emerald-600", bg: "bg-emerald-50",   sub: "paid & confirmed" },
                  { label: "Revenue (MTD)",  value: loading ? "—" : `$${(stats?.monthRevenue ?? 0).toLocaleString()}`,  icon: <DollarSign size={18}/>, color: "text-blue-600",  bg: "bg-blue-50",  sub: "deposits this month" },
                  { label: "Total Deposits", value: loading ? "—" : `$${(stats?.totalRevenue ?? 0).toLocaleString()}`,  icon: <TrendingUp size={18}/>, color: "text-amber-600", bg: "bg-amber-50", sub: "all time" },
                ].map(s => (
                  <div key={s.label} className="stat-card bg-white rounded-2xl p-5 border border-gray-100">
                    <div className={`w-9 h-9 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-3`}>
                      {s.icon}
                    </div>
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
                  <button
                    onClick={() => setActiveView("bookings")}
                    className="text-[10px] font-bold text-[#4B5320] hover:underline uppercase tracking-wider"
                  >
                    View All →
                  </button>
                </div>
                {loading ? (
                  <div className="flex items-center justify-center py-16 text-gray-400 text-sm gap-2">
                    <RefreshCw size={15} className="animate-spin" /> Loading…
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-16 text-gray-400 text-sm">No bookings yet.</div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {bookings.slice(0, 6).map(b => (
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
                          <span className="text-sm font-bold text-gray-900 hidden sm:block">
                            ${parseFloat(b.deposit_amount).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Status breakdown */}
              {stats && !loading && (
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Pending",   val: stats.pendingBookings,   color: "bg-amber-400" },
                    { label: "Confirmed", val: stats.confirmedBookings, color: "bg-emerald-500" },
                    { label: "Cancelled", val: stats.cancelledBookings, color: "bg-red-400" },
                  ].map(item => (
                    <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100">
                      <div className={`w-2 h-2 rounded-full ${item.color} mb-3`} />
                      <p className="text-xl font-bold text-gray-900">{item.val}</p>
                      <p className="text-xs text-gray-400 font-medium mb-3">{item.label}</p>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-700`}
                          style={{ width: stats.totalBookings ? `${(item.val / stats.totalBookings) * 100}%` : "0%" }}
                        />
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
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search name, email, reference, tour…"
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#4B5320] focus:ring-2 focus:ring-[#4B5320]/10"
                />
                <div className="flex gap-2 flex-wrap">
                  {(["all", "pending", "confirmed", "cancelled"] as StatusFilter[]).map(f => (
                    <button
                      key={f}
                      onClick={() => setStatusFilter(f)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-all border
                        ${statusFilter === f
                          ? "bg-[#4B5320] text-white border-[#4B5320]"
                          : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-20 text-gray-400 text-sm gap-2">
                    <RefreshCw size={15} className="animate-spin" /> Loading bookings…
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-20 text-gray-400 text-sm">No bookings found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/60">
                          {["Reference", "Guest", "Tour", "Date", "Package", "Deposit", "Status", "Actions"].map(h => (
                            <th key={h} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {filtered.map(b => (
                          <tr key={b.id} className="row-hover">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className="font-mono text-xs font-bold text-[#4B5320]">{b.reference}</span>
                            </td>
                            <td className="px-4 py-3">
                              <p className="font-semibold text-gray-900 text-xs whitespace-nowrap">{b.guest_name}</p>
                              <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                                <Mail size={9} />{b.guest_email}
                              </div>
                              {b.guest_phone && (
                                <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                  <Phone size={9} />{b.guest_phone}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-xs text-gray-700 font-medium max-w-32.5 truncate">{b.tour_title}</p>
                              <p className="text-[10px] text-gray-400">{b.guests} guest{b.guests > 1 ? "s" : ""}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Calendar size={11} />
                                {new Date(b.travel_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                              </div>
                              <p className="text-[10px] text-gray-400 mt-0.5">
                                Booked {new Date(b.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                              </p>
                            </td>
                            <td className="px-4 py-3"><PackageBadge pkg={b.package} /></td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="font-bold text-gray-900 text-xs">${parseFloat(b.deposit_amount).toLocaleString()}</p>
                              <p className="text-[10px] text-gray-400">of ${parseFloat(b.total_amount).toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                            <td className="px-4 py-3">
                              <select
                                value={b.status}
                                disabled={updatingId === b.id}
                                onChange={e => updateStatus(b.id, e.target.value)}
                                className="text-[10px] border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-600 cursor-pointer focus:outline-none focus:border-[#4B5320] disabled:opacity-50"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirm</option>
                                <option value="cancelled">Cancel</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 text-right">{filtered.length} of {bookings.length} bookings</p>
            </div>
          )}

          {/* ═══ TOURS ═══ */}
          {activeView === "tours" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Map size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-medium">Tour management coming soon.</p>
              <p className="text-gray-400 text-xs mt-1">Tours are currently managed via the database.</p>
            </div>
          )}

          {/* ═══ SETTINGS ═══ */}
          {activeView === "settings" && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-6 max-w-lg">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Backend API</h3>
                <p className="text-xs text-gray-400 mb-3">Connected endpoint for all data.</p>
                <div className="bg-gray-50 rounded-xl px-4 py-3 font-mono text-xs text-[#4B5320] border border-gray-200 break-all">
                  {API}/api
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Session</h3>
                <p className="text-xs text-gray-400 mb-3">You are signed in as admin.</p>
                <div className="bg-gray-50 rounded-xl px-4 py-3 font-mono text-[10px] text-gray-400 border border-gray-200 break-all">
                  {(localStorage.getItem("wikima_token") || "").substring(0, 60)}…
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-4 flex items-center gap-2 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                >
                  <LogOut size={13} /> Sign out & clear session
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}