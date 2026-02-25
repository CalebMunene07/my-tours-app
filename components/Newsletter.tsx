"use client";

import { useState } from "react";
import { toast } from "sonner"; // Using the library we installed earlier

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      toast.success("Welcome to the adventure! Check your inbox soon.");
      setEmail("");
    }
  };

  return (
    <section id="newsletter" className="py-24 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Subheading */}
        <p className="text-blue-500 font-medium tracking-[0.3em] uppercase text-xs mb-4">
          Stay Connected
        </p>
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Join Our Travel Community
        </h2>
        
        {/* Description */}
        <p className="text-zinc-400 mb-10 leading-relaxed max-w-lg mx-auto">
          Get exclusive offers, travel tips, and early access to our newest 
          safari experiences delivered straight to your inbox.
        </p>

        {submitted ? (
          <div className="bg-blue-600/10 border border-blue-600/20 py-6 px-8 rounded-2xl inline-block">
            <p className="text-blue-400 font-bold text-lg">
              Thank you for subscribing! 🎉
            </p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-600 transition text-sm"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold tracking-wider uppercase text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20"
            >
              Subscribe
            </button>
          </form>
        )}
        
        <p className="text-zinc-500 text-[10px] mt-6 uppercase tracking-widest">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;