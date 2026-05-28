// app/booking/confirm/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API = "https://wikima-backend.onrender.com";

export default function BookingConfirmPage() {
  const params = useSearchParams();
  const reference = params.get("reference") || params.get("ref");
  const [status, setStatus] = useState<"loading"|"success"|"failed">("loading");
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
    <div style={{ textAlign:"center", padding:"60px 20px", fontFamily:"sans-serif" }}>
      <div style={{ fontSize:"18px", color:"#4B5320" }}>Verifying your payment…</div>
    </div>
  );

  if (status === "success") return (
    <div style={{ textAlign:"center", padding:"60px 20px", fontFamily:"sans-serif", maxWidth:"480px", margin:"0 auto" }}>
      <div style={{ fontSize:"48px", marginBottom:"16px" }}>✅</div>
      <h1 style={{ color:"#4B5320", marginBottom:"8px" }}>Booking Confirmed!</h1>
      <p style={{ color:"#555", marginBottom:"16px" }}>
        Your payment was successful.<br/>
        Booking reference: <strong style={{ color:"#4B5320" }}>{bookingRef}</strong>
      </p>
      <p style={{ color:"#777", fontSize:"14px" }}>
        A confirmation email has been sent to you.<br/>
        Our team will contact you within 24 hours.
      </p>
      <button
        onClick={() => window.location.href = "/"}
        style={{ marginTop:"24px", background:"#4B5320", color:"#fff", border:"none", padding:"12px 28px", borderRadius:"8px", fontSize:"14px", cursor:"pointer" }}
      >
        Back to Home
      </button>
    </div>
  );

  return (
    <div style={{ textAlign:"center", padding:"60px 20px", fontFamily:"sans-serif" }}>
      <div style={{ fontSize:"48px", marginBottom:"16px" }}>❌</div>
      <h1 style={{ color:"#dc2626" }}>Payment Failed</h1>
      <p style={{ color:"#555" }}>Something went wrong. Please try again or contact us.</p>
      <button
        onClick={() => window.location.href = "/"}
        style={{ marginTop:"24px", background:"#4B5320", color:"#fff", border:"none", padding:"12px 28px", borderRadius:"8px", fontSize:"14px", cursor:"pointer" }}
      >
        Try Again
      </button>
    </div>
  );
}
