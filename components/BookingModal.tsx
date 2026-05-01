"use client";

import { useEffect, useRef } from "react";
import { X, MapPin } from "lucide-react";
import BookingForm from "./BookingForm";

interface BookingModalProps {
  open:    boolean;
  onClose: () => void;
  tourTitle?: string;     // pre-fill if opened from a tour page
}

export default function BookingModal({ open, onClose, tourTitle }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl max-h-[95dvh] sm:max-h-[90vh] flex flex-col bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4B5320] flex items-center justify-center">
              <MapPin size={14} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">Book Your Safari</p>
              <p className="text-[10px] text-gray-400 leading-tight">Wikima Safari Expeditions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close booking form"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          <BookingForm tourTitle={tourTitle || ""} />
        </div>
      </div>
    </div>
  );
}
