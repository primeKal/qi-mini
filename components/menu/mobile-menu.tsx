"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu
import ToolsDropdown from "./tools/tools-dropdown";
import HeaderAuth from "@/components/menu/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lg:hidden relative">
      {/* Toggle Button */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div ref={menuRef} className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <ul className="flex flex-col text-gray-700">
            <li><ToolsDropdown /></li>
            <li><Link href="/pricing" className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Pricing</Link></li>
            <li><Link href="/contact" className="block px-4 py-2 hover:bg-blue-600 hover:text-white transition" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
            {/* <li className="border-t border-gray-200 mt-2 px-4 py-2">
              {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
}
