import { redirect } from "next/navigation";
import Link from "next/link";
import { BadgeCheck, BarChart, Settings, LayoutGrid } from "lucide-react";
import { getProfile, getUser } from "./service";

export default async function ProtectedPage() {
  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const profile = await getProfile(user.id);

  return (
    <div className="flex flex-col items-center w-full px-6 py-12">
      {/* Welcome Section */}
      <div className="w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome, {profile?.first_name || "User"}! 🎉
        </h1>
        <p className="text-gray-600 mt-2">
          Explore your tools and enhance your quality improvement workflow.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Focusing Matrix */}
        <Link href="/protected/focusing-matrix">
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex flex-col items-center text-center">
            <BadgeCheck size={36} className="text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold">Focusing Matrix</h2>
            <p className="text-gray-600">
              Prioritize tasks based on importance and urgency.
            </p>
          </div>
        </Link>

        {/* Pareto Chart */}
        <Link href="/protected/pareto-chart">
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex flex-col items-center text-center">
            <BarChart size={36} className="text-green-500 mb-4" />
            <h2 className="text-xl font-semibold">Pareto Chart</h2>
            <p className="text-gray-600">
              Identify the most significant factors in a dataset.
            </p>
          </div>
        </Link>

        {/* Run Chart */}
        <Link href="/protected/imr-chart">
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex flex-col items-center text-center">
            <Settings size={36} className="text-yellow-500 mb-4" />
            <h2 className="text-xl font-semibold">IMR Chart</h2>
            <p className="text-gray-600">
              Track process variations in your data over time( n=1 ).
            </p>
          </div>
        </Link>

        {/* Fishbone Diagram */}
        {/* <Link href="/protected/fishbone-diagram">
          <div className="p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition flex flex-col items-center text-center">
            <LayoutGrid size={36} className="text-purple-500 mb-4" />
            <h2 className="text-xl font-semibold">Fishbone Diagram</h2>
            <p className="text-gray-600">
              Identify root causes of issues systematically.
            </p>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
