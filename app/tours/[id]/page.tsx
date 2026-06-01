// app/tours/[id]/page.tsx
// ── SERVER COMPONENT — no "use client" here ──────────────────────────────────
// generateStaticParams and dynamicParams MUST be in a server component.
// The actual UI is in TourDetailClient which handles all interactivity.
// app/tours/[id]/page.tsx
import { toursData } from "@/data/tours";
import TourDetailClient from "./TourDetailClient";

export function generateStaticParams() {
  return toursData.map((tour) => ({ id: tour.slug }));
}

export const dynamicParams = false;

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TourDetailClient id={id} />;
}
