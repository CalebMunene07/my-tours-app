"use client";

/**
 * Global "Resident / Non-Resident" selection.
 *
 * - Persists to localStorage so it survives page navigation on this
 *   statically-exported site (no server session available).
 * - Also read from the `?visitor=resident|non-resident` URL param so a
 *   shared link (e.g. from the homepage dropdown) can set it on load.
 * - Booking payloads should include `visitorType` — see BookingForm.tsx.
 *   The backend (wikima-backend) needs to accept & store this field for
 *   it to show up in the admin panel / affect stored pricing.
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type VisitorType = "resident" | "non-resident";

const STORAGE_KEY = "wikima_visitor_type";
const DEFAULT_VISITOR_TYPE: VisitorType = "non-resident";

interface VisitorTypeContextValue {
  visitorType: VisitorType;
  setVisitorType: (type: VisitorType) => void;
}

const VisitorTypeContext = createContext<VisitorTypeContextValue>({
  visitorType: DEFAULT_VISITOR_TYPE,
  setVisitorType: () => {},
});

function readInitialVisitorType(): VisitorType {
  if (typeof window === "undefined") return DEFAULT_VISITOR_TYPE;

  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("visitor");
  if (fromUrl === "resident" || fromUrl === "non-resident") return fromUrl;

  const fromStorage = window.localStorage.getItem(STORAGE_KEY);
  if (fromStorage === "resident" || fromStorage === "non-resident") return fromStorage;

  return DEFAULT_VISITOR_TYPE;
}

export function VisitorTypeProvider({ children }: { children: React.ReactNode }) {
  const [visitorType, setVisitorTypeState] = useState<VisitorType>(DEFAULT_VISITOR_TYPE);

  // Resolve real value after mount (avoids SSR/static-export hydration mismatch)
  useEffect(() => {
    setVisitorTypeState(readInitialVisitorType());
  }, []);

  const setVisitorType = useCallback((type: VisitorType) => {
    setVisitorTypeState(type);
    window.localStorage.setItem(STORAGE_KEY, type);
  }, []);

  return (
    <VisitorTypeContext.Provider value={{ visitorType, setVisitorType }}>
      {children}
    </VisitorTypeContext.Provider>
  );
}

export function useVisitorType() {
  return useContext(VisitorTypeContext);
}
