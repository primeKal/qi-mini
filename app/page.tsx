import Hero from "@/components/hero";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Head from "next/head";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <Head>
          <title>Quality Improvement Mini Tool</title>
          <meta
            name="description"
            content="Turn complex data into actionable insights faster with tools like Focusing Matrix, Pareto Chart, and I-MR Chart."
          />
          <meta name="robots" content="index, follow" />
          <meta
            name="keywords"
            content="Quality Improvement, Focusing Matrix, Pareto Chart, I-MR Chart"
          />
          <link rel="canonical" href="https://qi-mini.vercel.app/" />
        </Head>
      </main>
    </>
  );
}
