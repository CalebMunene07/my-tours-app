import { LayoutDashboard, Users, Map, Settings, LogOut, Gem } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { label: "Total Bookings", value: "124", icon: <Users size={20}/> },
    { label: "Active Tours", value: "8", icon: <Map size={20}/> },
    { label: "Revenue (MTD)", value: "$42,500", icon: <Gem size={20}/> },
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#4B5320] text-white hidden md:flex flex-col p-6">
        <div className="mb-10">
          <h2 className="text-xl font-bold tracking-tight">Admin Panel</h2>
          <p className="text-xs opacity-60">Wikima Safari Management</p>
        </div>
        
        <nav className="space-y-2 grow">
          <a href="#" className="flex items-center gap-3 p-3 bg-white/10 rounded-lg"><LayoutDashboard size={18}/> Dashboard</a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg opacity-80"><Users size={18}/> Bookings</a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg opacity-80"><Map size={18}/> Tour Listings</a>
          <a href="#" className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg opacity-80"><Settings size={18}/> Settings</a>
        </nav>

        <button className="flex items-center gap-3 p-3 text-red-300 hover:text-red-100 mt-auto">
          <LogOut size={18}/> Logout
        </button>
      </aside>

      {/* Main Content */}
      <section className="grow p-8">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">
            Welcome back, Admin
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-[#4B5320] mb-2">{stat.icon}</div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Bookings Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Recent Booking Inquiries</h3>
          </div>
          <div className="p-12 text-center text-gray-400">
            <p>Your Django backend will populate this list with data from `http://localhost:8000/api/bookings/`</p>
          </div>
        </div>
      </section>
    </main>
  );
}