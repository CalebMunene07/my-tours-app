"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { value: "500+", label: "Safaris Completed" },
  { value: "12", label: "Years of Expertise" },
  { value: "4.9★", label: "Average Rating" },
  { value: "38+", label: "Countries Represented" },
];
const TEAM = [
  {
    role: "Directors",
    members: [
      { name: "David Mwangi", title: "Managing Director", img: "/team/director1.jpg" },
      { name: "Grace Njeri", title: "Operations Director", img: "/team/director2.jpg" },
    ],
  },
  {
    role: "Tour Experts",
    members: [
      { name: "Samuel Otieno", title: "Senior Safari Planner", img: "/team/expert1.jpg" },
      { name: "Lydia Wanjiku", title: "Luxury Travel Specialist", img: "/team/expert2.jpg" },
    ],
  },
  {
    role: "Consultants",
    members: [
      { name: "Peter Kariuki", title: "Travel Consultant", img: "/team/consult1.jpg" },
      { name: "Emily Achieng", title: "Destination Consultant", img: "/team/consult2.jpg" },
      { name: "Joseph Mutua", title: "Safari Consultant", img: "/team/consult3.jpg" },
    ],
  },
  {
    role: "Guides",
    members: [
      { name: "Daniel Lemayian", title: "Senior Safari Guide", img: "/team/guide1.jpg" },
      { name: "James Ole Nkai", title: "Wildlife Tracker", img: "/team/guide2.jpg" },
      { name: "Paul Kiprono", title: "Bush Guide", img: "/team/guide3.jpg" },
    ],
  },
];
const VALUES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Conservation First",
    body: "Every safari we run funds anti-poaching patrols, community conservancies, and habitat restoration across East Africa.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "Local Expertise",
    body: "Our guides are born and raised in the landscapes they lead — carrying decades of ancestral knowledge of animal behaviour and terrain.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Radically Personal",
    body: "No two journeys are the same. We craft bespoke itineraries around your pace, interests, and the quiet moments that stay with you forever.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.setProperty("--py", `${window.scrollY * 0.35}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#0d1a0e", color: "#f5f0e8", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

        .about-hero { position:relative; min-height:92vh; display:flex; align-items:center; overflow:hidden; }
        .about-hero-bg {
          position:absolute; inset:0;
          background:
            radial-gradient(ellipse 80% 60% at 60% 30%, rgba(75,83,32,0.45) 0%, transparent 65%),
            radial-gradient(ellipse 50% 80% at 20% 70%, rgba(10,40,12,0.8) 0%, transparent 60%),
            url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1800&q=80') center/cover no-repeat;
          transform: translateY(var(--py, 0));
          transition: transform 0.05s linear;
        }
        .about-hero-bg::after {
          content:''; position:absolute; inset:0;
          background: linear-gradient(to bottom, rgba(13,26,14,0.15) 0%, rgba(13,26,14,0.7) 80%, #0d1a0e 100%);
        }
        .about-hero-content { position:relative; z-index:2; padding: 160px 6vw 100px; max-width:1100px; }
        .eyebrow { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.28em; text-transform:uppercase; color:#D4AF37; margin-bottom:22px; display:flex; align-items:center; gap:12px; }
        .eyebrow::after { content:''; flex:0 0 40px; height:1px; background:#D4AF37; opacity:0.6; }
        .hero-headline { font-size:clamp(44px,6.5vw,86px); font-weight:300; line-height:1.05; letter-spacing:-0.02em; color:#f5f0e8; margin:0 0 10px; }
        .hero-headline em { font-style:italic; color:#D4AF37; }
        .hero-tagline { font-family:'DM Sans',sans-serif; font-size:clamp(14px,1.6vw,18px); font-weight:300; color:rgba(245,240,232,0.72); line-height:1.75; max-width:520px; margin:24px 0 0; }

        .stats-band { background:#111e12; border-top:1px solid rgba(212,175,55,0.18); border-bottom:1px solid rgba(212,175,55,0.18); padding:36px 6vw; display:grid; grid-template-columns:repeat(4,1fr); gap:0; }
        @media(max-width:680px){ .stats-band{ grid-template-columns:1fr 1fr; } }
        .stat-item { text-align:center; padding:12px 8px; border-right:1px solid rgba(212,175,55,0.12); }
        .stat-item:last-child { border-right:none; }
        .stat-val { font-size:clamp(28px,3.5vw,40px); font-weight:600; color:#D4AF37; letter-spacing:-0.02em; line-height:1.1; }
        .stat-lbl { font-family:'DM Sans',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.14em; text-transform:uppercase; color:rgba(245,240,232,0.5); margin-top:6px; }

        .section { padding: 90px 6vw; max-width:1100px; margin:0 auto; }
        .section-label { font-family:'DM Sans',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.28em; text-transform:uppercase; color:#D4AF37; margin-bottom:16px; }
        .section-title { font-size:clamp(30px,3.8vw,50px); font-weight:300; line-height:1.15; letter-spacing:-0.02em; color:#f5f0e8; margin:0 0 24px; }
        .section-title em { font-style:italic; color:#a8be72; }
        .section-body { font-family:'DM Sans',sans-serif; font-size:15px; font-weight:300; color:rgba(245,240,232,0.65); line-height:1.85; max-width:560px; }

        .vision-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
        @media(max-width:760px){ .vision-grid{ grid-template-columns:1fr; gap:40px; } }
        .vision-card { background:linear-gradient(135deg, #1a2e1c 0%, #111e12 100%); border:1px solid rgba(212,175,55,0.22); border-radius:20px; padding:36px 32px; position:relative; overflow:hidden; }
        .vision-card::before { content:''; position:absolute; top:-40px; right:-40px; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%); pointer-events:none; }
        .vision-card h4 { font-size:13px; font-family:'DM Sans',sans-serif; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:#D4AF37; margin:0 0 14px; }
        .vision-card p { font-family:'DM Sans',sans-serif; font-size:14px; color:rgba(245,240,232,0.72); line-height:1.8; margin:0; }
        .vision-quote { font-size:clamp(20px,2.8vw,32px); font-weight:300; font-style:italic; line-height:1.4; color:#f5f0e8; border-left:2px solid #D4AF37; padding-left:28px; }
        .vision-quote strong { color:#D4AF37; font-style:normal; font-weight:600; }

        .values-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:48px; }
        @media(max-width:760px){ .values-grid{ grid-template-columns:1fr; } }
        .value-card { background:linear-gradient(160deg, #182419 0%, #0f1a10 100%); border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:32px 28px; transition:border-color 0.3s, transform 0.3s; }
        .value-card:hover { border-color:rgba(212,175,55,0.35); transform:translateY(-4px); }
        .value-icon { width:44px; height:44px; border-radius:12px; background:rgba(75,83,32,0.35); border:1px solid rgba(75,83,32,0.5); display:flex; align-items:center; justify-content:center; color:#a8be72; margin-bottom:20px; }
        .value-title { font-size:17px; font-weight:600; color:#f5f0e8; margin:0 0 12px; letter-spacing:-0.01em; }
        .value-body { font-family:'DM Sans',sans-serif; font-size:13px; color:rgba(245,240,232,0.55); line-height:1.8; margin:0; }

        .team-band { background:#111e12; border-top:1px solid rgba(212,175,55,0.12); border-bottom:1px solid rgba(212,175,55,0.12); padding:70px 6vw; text-align:center; }
        .team-tagline { font-size:clamp(22px,3.5vw,44px); font-weight:300; font-style:italic; color:#f5f0e8; max-width:760px; margin:0 auto 20px; line-height:1.35; }
        .team-tagline strong { color:#D4AF37; font-style:normal; font-weight:600; }
        .team-sub { font-family:'DM Sans',sans-serif; font-size:14px; color:rgba(245,240,232,0.5); max-width:480px; margin:0 auto; line-height:1.75; }

        .team-section {
          padding: 100px 6vw;
          max-width: 1400px;
          margin: 0 auto;
        }

        .team-row {
          margin-top: 60px;
        }

        .team-role-title {
          font-size: 26px;
          font-weight: 300;
          margin-bottom: 24px;
          color: #D4AF37;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px 30px;
          justify-items: center;
        }

        .team-card {
          width: 100%;
          max-width: 220px;
          text-align: center;
        }

        .team-photo-wrap {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 0 auto 14px;
        }

        .team-photo {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(212, 175, 55, 0.4);
          transition: transform .35s ease, box-shadow .35s ease;
        }

        .team-photo-wrap::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.25);
        }

        .team-card:hover .team-photo {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.25);
        }

        .team-name {
          font-size: 16px;
          color: #f5f0e8;
          margin: 8px 0 4px;
        }

        .team-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: rgba(245, 240, 232, 0.55);
          margin: 0;
        }

        @media (max-width: 640px) {
          .team-grid {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 30px 15px;
          }
          
          .team-photo-wrap {
            width: 120px;
            height: 120px;
          }
          
          .team-photo {
            width: 120px;
            height: 120px;
          }
          
          .team-name {
            font-size: 14px;
          }
        }

        .cta-section { padding:100px 6vw; text-align:center; }
        .cta-inner { background:linear-gradient(135deg, rgba(75,83,32,0.28) 0%, rgba(13,26,14,0.6) 100%); border:1px solid rgba(212,175,55,0.25); border-radius:28px; padding:64px 48px; max-width:760px; margin:0 auto; position:relative; overflow:hidden; }
        .cta-inner::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 80% 80% at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 65%); pointer-events:none; }
        .cta-title { font-size:clamp(28px,3.8vw,46px); font-weight:300; color:#f5f0e8; margin:0 0 16px; line-height:1.2; }
        .cta-title em { font-style:italic; color:#D4AF37; }
        .cta-sub { font-family:'DM Sans',sans-serif; font-size:14px; color:rgba(245,240,232,0.6); line-height:1.8; margin:0 0 36px; }
        .cta-btn { display:inline-flex; align-items:center; gap:10px; background:#D4AF37; color:#0d1a0e; padding:14px 32px; border-radius:50px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; border:none; cursor:pointer; transition:background 0.2s, transform 0.2s, box-shadow 0.2s; }
        .cta-btn:hover { background:#e8c84a; transform:translateY(-2px); box-shadow:0 8px 32px rgba(212,175,55,0.35); }
      `}</style>

      {/* ── HERO ── */}
      <div className="about-hero" ref={heroRef}>
        <div className="about-hero-bg"/>
        <div className="about-hero-content">
          <p className="eyebrow">Est. 2012 · Nairobi, Kenya</p>
          <h1 className="hero-headline">
            Where the wild<br/>
            calls you <em>home.</em>
          </h1>
          <p className="hero-tagline">
            Wikima Safari crafts deeply personal journeys into East Africa's most breathtaking wild places —
            where every dawn is a discovery, and no two expeditions are alike.
          </p>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="stats-band">
        {STATS.map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-val">{s.value}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── VISION ── */}
      <section style={{ padding: "90px 6vw", maxWidth:"1100px", margin:"0 auto" }}>
        <p className="section-label">Our Vision</p>
        <div className="vision-grid">
          <div>
            <h2 className="section-title">
              Not a tour operator.<br/>
              <em>A passage into Africa.</em>
            </h2>
            <p className="section-body">
              We believe a safari should change you. Slow down, look closely, breathe deep —
              Wikima exists to make those unrepeatable moments possible for every guest who walks into the wild with us.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <div className="vision-card">
              <h4>Our Mission</h4>
              <p>To provide sustainable, luxury safari experiences that protect our natural heritage and actively empower the local communities who are its guardians.</p>
            </div>
            <blockquote className="vision-quote" style={{ margin:0 }}>
              "The <strong>wild</strong> does not belong to us —<br/>
              we belong to <strong>it.</strong>"
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "20px 6vw 90px", maxWidth:"1100px", margin:"0 auto" }}>
        <p className="section-label">What Drives Us</p>
        <h2 className="section-title" style={{ maxWidth:"540px" }}>
          Three principles.<br/><em>One unbreakable promise.</em>
        </h2>
        <div className="values-grid">
          {VALUES.map(v => (
            <div key={v.title} className="value-card">
              <div className="value-icon">{v.icon}</div>
              <h3 className="value-title">{v.title}</h3>
              <p className="value-body">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM TAGLINE BAND ── */}
      <div className="team-band">
        <p className="team-tagline">
          "Born from the <strong>savanna.</strong> Built for the <strong>curious.</strong>"
        </p>
        <p className="team-sub">
          Our guides have tracked leopards at dusk and read storm clouds over the Mara.
          They don't just know the bush — they're part of it.
        </p>
      </div>

      {/* ── MEET THE TEAM ── */}
      <section className="team-section">
        <p className="section-label">Our People</p>
        <h2 className="section-title">
          Meet the <em>Team</em>
        </h2>

        {TEAM.map(group => (
          <div key={group.role} className="team-row">
            <h3 className="team-role-title">{group.role}</h3>
            
            <div className="team-grid">
              {group.members.map(member => (
                <div key={member.name} className="team-card">
                  <div className="team-photo-wrap">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="team-photo"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/160x160?text=Team+Member';
                      }}
                    />
                  </div>
                  <h4 className="team-name">{member.name}</h4>
                  <p className="team-title">{member.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <p className="section-label" style={{ marginBottom:"12px" }}>Ready to Begin</p>
          <h2 className="cta-title">
            Your <em>wildest</em> chapter<br/>starts here.
          </h2>
          <p className="cta-sub">
            Browse our curated safari expeditions and let us build something extraordinary around you.
          </p>
          <a href="/tours" className="cta-btn">
            Explore Our Safaris
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}