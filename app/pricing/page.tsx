
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserInfoCard from "@/components/ui/user-card";

export default function Pricing() {
  return (
    <div className="flex flex-col items-center p-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Choose Your Plan</h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        Get started for free or unlock premium features with our Pro plan.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-4xl">
        {/* Free Plan */}
        <div className="border border-gray-300 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-blue-600">Free</h2>
          <p className="text-gray-600 mt-2">Basic access to all tools</p>
          <p className="text-4xl font-bold text-gray-900 mt-4">$0</p>

          <ul className="mt-6 space-y-3 text-gray-700 text-left w-full">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> Access to all tools
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> Create & edit data
            </li>
            <li className="flex items-center gap-2">
              <XCircle className="text-red-500" size={20} /> Save matrices & charts
            </li>
            <li className="flex items-center gap-2">
              <XCircle className="text-red-500" size={20} /> Download reports
            </li>
            <li className="flex items-center gap-2">
              <XCircle className="text-red-500" size={20} /> AI-powered analysis (coming soon)
            </li>
          </ul>

          <Button variant="outline" className="mt-6 w-full" disabled>
            Current Plan
          </Button>
        </div>

        {/* Pro Plan */}
        <div className="border border-blue-500 bg-white rounded-lg shadow-md p-6 flex flex-col items-center relative">
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            Most Popular
          </span>
          <h2 className="text-2xl font-semibold text-blue-700">Pro</h2>
          <p className="text-gray-600 mt-2">Full access + AI-powered analysis</p>
          <p className="text-4xl font-bold text-gray-900 mt-4">$9.99/mo</p>

          <ul className="mt-6 space-y-3 text-gray-700 text-left w-full">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> Access to all tools
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> Create & edit data
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> Save matrices & charts
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> Download reports
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> AI-powered analysis (coming soon)
            </li>
          </ul>

          <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700">
            Upgrade to Pro
          </Button>
        </div>
      </div>

      {/* User Info Card */}
      <UserInfoCard />
    </div>
  );
}
