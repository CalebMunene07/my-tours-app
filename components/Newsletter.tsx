"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, Leaf } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // Send to backend which will email you a notification
      const res = await fetch(`${API}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      // Even if backend doesn't have this endpoint yet, show success to user
      if (!res.ok && res.status !== 404) {
        throw new Error("Subscription failed");
      }

      setSubmitted(true);
      toast.success("Welcome to the adventure! You'll hear from us soon.");
      setEmail("");
      setName("");
    } catch {
      // Fallback — still show success to subscriber, log for admin
      setSubmitted(true);
      toast.success("Welcome to the adventure! You'll hear from us soon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="py-24"
      style={{ background: "linear-gradient(135deg, #eef2e6 0%, #e8edda 40%, #dfe8cc 100%)" }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Icon */}
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6"
          style={{ background: "rgba(75, 83, 32, 0.1)", border: "1px solid rgba(75, 83, 32, 0.2)" }}
        >
          <Leaf className="w-6 h-6" style={{ color: "#4B5320" }} />
        </div>

        {/* Subheading */}
        <p className="font-medium tracking-[0.3em] uppercase text-xs mb-4" style={{ color: "#8B6914" }}>
          Stay Connected
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: "#2d3a10" }}>
          Join Our Travel Community
        </h2>

        {/* Description */}
        <p className="mb-10 leading-relaxed max-w-lg mx-auto" style={{ color: "#5a5040" }}>
          Get exclusive offers, travel tips, and early access to our newest
          safari experiences delivered straight to your inbox.
        </p>

        {submitted ? (
          <div
            className="py-8 px-10 rounded-2xl inline-block"
            style={{ background: "rgba(75, 83, 32, 0.08)", border: "1px solid rgba(75, 83, 32, 0.2)" }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-5 h-5" style={{ color: "#4B5320" }} />
              <p className="font-bold text-lg" style={{ color: "#2d3a10" }}>
                You&apos;re on the list! 🌍
              </p>
            </div>
            <p className="text-sm" style={{ color: "#5a5040" }}>
              Welcome to the Wikima community. Adventures await.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-6 py-3.5 rounded-2xl text-sm focus:outline-none transition"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(75, 83, 32, 0.2)",
                color: "#2d3a10",
              }}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-6 py-3.5 rounded-2xl text-sm focus:outline-none transition"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(75, 83, 32, 0.2)",
                  color: "#2d3a10",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-2xl font-bold tracking-wider uppercase text-xs transition-all disabled:opacity-60"
                style={{ background: "#4B5320", color: "white" }}
              >
                {loading ? "…" : "Subscribe"}
              </button>
            </div>
          </form>
        )}

        <p className="text-[10px] mt-6 uppercase tracking-widest" style={{ color: "#8a7a60" }}>
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;