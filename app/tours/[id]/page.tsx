// app/tours/[id]/page.tsx
// ── SERVER COMPONENT — no "use client" here ──────────────────────────────────
// generateStaticParams and dynamicParams MUST be in a server component.
// The actual UI is in TourDetailClient which handles all interactivity.

import { toursData } from "@/data/tours";
import TourDetailClient from "./TourDetailClient";

export function generateStaticParams() {
  return toursData.map((tour) => ({ id: tour.slug }));
}

export const dynamicParams = false;

export default function TourDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <TourDetailClient id={params.id} />;
}
