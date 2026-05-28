// app/booking/confirm/page.tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API = "https://wikima-backend.onrender.com";

// ── Inner component that uses useSearchParams ─────────────────────────────
function ConfirmContent() {
  const params = useSearchParams();
  const reference = params.get("reference") || params.get("ref");
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [bookingRef, setBookingRef] = useState("");

  useEffect(() => {
    if (!reference) { setStatus("failed"); return; }

    fetch(`${API}/api/payments/paystack/verify/${reference}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === "success") {
          setStatus("success");
          setBookingRef(reference);
        } else {
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
  }, [reference]);

  if (status === "loading") return (
    <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "sans-serif" }}>
      <div style={{ width: 40, height: 40, border: "3px solid #e8f0dc", borderTopColor: "#4B5320", borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto 16px" }}/>
      <p style={{ color: "#4B5320", fontSize: "16px" }}>Verifying your payment…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (status === "success") return (
    <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "sans-serif", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f0f4ea", border: "2px solid #4B5320", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "28px" }}>✅</div>
      <h1 style={{ color: "#4B5320", marginBottom: "8px", fontWeight: 700 }}>Booking Confirmed!</h1>
      <p style={{ color: "#555", marginBottom: "8px", lineHeight: 1.6 }}>
        Your payment was successful.<br />
        Booking reference: <strong style={{ color: "#4B5320" }}>{bookingRef}</strong>
      </p>
      <p style={{ color: "#777", fontSize: "14px", marginBottom: "24px", lineHeight: 1.6 }}>
        A confirmation email has been sent to you.<br />
        Our team will contact you within 24 hours.
      </p>
      <button
        onClick={() => window.location.href = "/"}
        style={{ background: "#4B5320", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}
      >
        Back to Home
      </button>
    </div>
  );

  return (
    <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "sans-serif", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>❌</div>
      <h1 style={{ color: "#dc2626", marginBottom: "8px" }}>Payment Failed</h1>
      <p style={{ color: "#555", marginBottom: "24px" }}>Something went wrong. Please try again or contact us.</p>
      <button
        onClick={() => window.location.href = "/"}
        style={{ background: "#4B5320", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: 600 }}
      >
        Try Again
      </button>
    </div>
  );
}

// ── Page export — Suspense required for useSearchParams in Next.js ─────────
export default function BookingConfirmPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: "center", padding: "60px 20px", fontFamily: "sans-serif" }}>
        <p style={{ color: "#4B5320" }}>Loading…</p>
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  );
}
