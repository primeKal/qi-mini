import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/menu/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import ToolsDropdown from "@/components/menu/tools/tools-dropdown";
import Navbar from "@/components/menu/nav-bar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Quality Mini Tool",
  description: "The fastest way to build your quality diagrams online",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              {/* Navbar */}
              <Navbar />
              {/* Page Content */}
              <div className="flex flex-col gap-20 w-[90%] max-w-7xl items-center py-12">
                {children}
              </div>

              {/* Footer */}
              <footer className="w-full flex items-center justify-center border-t border-gray-200 bg-white py-6">
                <p className="text-gray-600 text-sm">
                  Powered by{" "}
                  <span className="font-semibold text-blue-600">
                    Kaleb Tech
                  </span>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
