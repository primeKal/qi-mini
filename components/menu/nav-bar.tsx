import Link from "next/link";
import ToolsDropdown from "./tools/tools-dropdown";
import HeaderAuth from "@/components/menu/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "@/components/env-var-warning";
import MobileMenu from "./mobile-menu"; 

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-5 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-blue-600">
          Quality Mini Tool
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-gray-700">
          {/* <ToolsDropdown /> */}
          <Link href="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </div>

        {/* Desktop Authentication */}
        <div className="flex items-center">
          {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
        </div>

        {/* Mobile Menu Trigger (Client Component) */}
        <MobileMenu />
      </div>
    </nav>
  );
}
