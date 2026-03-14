"use client";

import { useState } from "react";

// Define the shape of your props
interface SafariDropdownProps {
  title: string;
  items: string[];
}

export default function SafariDropdown({ title, items }: SafariDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full text-left text-xl font-bold text-[#4B5320]"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <ul className="mt-3 space-y-2 text-gray-600 text-sm">
          {items.map((item) => (
            <li
              key={item}
              className="hover:text-[#4B5320] cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}