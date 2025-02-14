"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { tools } from "./tools";

export default function ToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-100 text-gray-900 rounded-md shadow-sm hover:bg-gray-300 transition"
      >
        Tools ▼
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <ul className="flex flex-col text-gray-700">
            {tools.map((tool) => (
              <li key={tool.name} className="border-b last:border-none">
                <Link
                  href={tool.link}
                  className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
