import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col gap-12 items-center text-center px-6">
      <h1 className="sr-only">Quality Improvement Mini Tool</h1>
      
      {/* Updated Motto */}
      <p className="text-4xl lg:text-5xl font-bold !leading-tight mx-auto max-w-3xl text-gray-900">
        Turn <span className="text-blue-600">Complex Data</span> Into{" "}
        <span className="text-green-600">Actionable Insights</span> Faster
      </p>

      {/* Decorative Line */}
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 rounded-full my-4" />

      {/* Feature Section */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center w-full max-w-5xl">
        {/* Focusing Matrix */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-xl rounded-xl w-full lg:w-1/2 border border-gray-200 transition hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-blue-600">Focusing Matrix</h3>
          <p className="text-gray-700 mt-2">
            A structured tool to help you prioritize tasks based on importance and urgency.
          </p>
          <Link href="/focusing-matrix">
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
              Open Focusing Matrix
            </button>
          </Link>
        </div>

        {/* Pareto Chart */}
        <div className="flex flex-col items-center text-center p-6 bg-white shadow-xl rounded-xl w-full lg:w-1/2 border border-gray-200 transition hover:shadow-2xl">
          <h3 className="text-2xl font-semibold text-green-600">Pareto Chart</h3>
          <p className="text-gray-700 mt-2">
            Identify the most impactful factors in your data and optimize decisions.
          </p>
          <Link href="/pareto-chart">
            <button className="mt-4 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
              Open Pareto Chart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
