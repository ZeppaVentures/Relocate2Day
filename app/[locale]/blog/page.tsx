"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { useParams } from "next/navigation";

const NATIVE_POSTS = [
  {
    slug: "how-to-move-to-europe-from-usa",
    title: "How to Move to Europe From USA",
    description: "Learn how to move to Europe from USA with a clear plan for visas, taxes, housing, healthcare, banking, and choosing the right country.",
    date: "2026-06-15",
  },
  {
    slug: "moving-to-spain-2026",
    title: "Moving to Spain: A Practical Plan for 2026",
    description: "A step-by-step guide to relocating to Spain in 2026 — choosing the right visa, budgeting for your first year, understanding tax residency, and picking a city that fits your life.",
    date: "2026-07-12",
  },
  {
    slug: "best-visa-moving-to-spain-2026",
    title: "Best Visa for Moving to Spain in 2026",
    description: "A breakdown of Spain's main visa routes for 2026 — Digital Nomad, Non-Lucrative, work, entrepreneur, student, and family reunification — and how to match one to your income and life.",
    date: "2026-06-17",
  },
  {
    slug: "portugal-residency-options-retirees",
    title: "Portugal Residency Options for Retirees",
    description: "A guide to Portugal's main residency routes for retirees in 2026 — the D7 passive income visa, family reunification, income thresholds, healthcare, taxes, and where to settle.",
    date: "2026-06-18",
  },
  {
    slug: "7-best-countries-europe-retirees",
    title: "The 7 Best Countries in Europe for Retirees",
    description: "A country-by-country look at Spain, Portugal, Italy, Greece, Malta, Bulgaria, and France for retirees — residency routes, healthcare, taxes, and cost-of-living trade-offs.",
    date: "2026-07-14",
  },
  {
    slug: "spain-vs-portugal-residency",
    title: "Spain vs Portugal Residency: Which Fits You?",
    description: "Comparing Spain and Portugal for residency — visa routes, taxes, cost of living, healthcare, family fit, and long-term citizenship paths, to help you choose the right country.",
    date: "2026-06-30",
  },
  {
    slug: "italy-digital-nomad-visa-requirements",
    title: "Italy Digital Nomad Visa Requirements",
    description: "A practical breakdown of Italy's digital nomad visa — income thresholds, the highly skilled work standard, required documents, health insurance, and how to apply from the US.",
    date: "2026-06-19",
  },
  {
    slug: "open-bank-account-portugal-foreigner",
    title: "Open a Bank Account in Portugal as a Foreigner",
    description: "What foreigners need to open a bank account in Portugal — the NIF, required documents, choosing a bank, common friction points, and whether to open before or after moving.",
    date: "2026-06-21",
  },
  {
    slug: "italy-digital-nomad-visa-requirements",
    title: "Italy Digital Nomad Visa Requirements",
    description: "A practical breakdown of Italy's digital nomad visa — income thresholds, the highly skilled work standard, required documents, health insurance, and how to apply from the US.",
    date: "2026-06-19",
  },
];

export default function BlogPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  return (
    <div className="min-h-screen bg-white text-[#0B1957]">
      <Navbar variant="simple" />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-5xl font-black mb-4">Blog</h1>
        <p className="text-gray-500 text-lg mb-12">Tips, guides and real advice for making your move to Europe.</p>

        {NATIVE_POSTS.length > 0 && (
          <section className="mb-16">
            <h2 className="text-sm font-bold text-violet-600 uppercase tracking-widest mb-6">Featured Guides</h2>
            <div className="space-y-4">
              {NATIVE_POSTS.map((post) => (
                <a key={post.slug} href={`/${locale}/blog/${post.slug}`}
                  className="flex gap-6 items-start p-6 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-md transition group">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#0B1957] group-hover:text-violet-600 transition mb-1">{post.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">{post.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <span className="text-violet-400 text-xl mt-1 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">All Articles</h2>
          <div id="soro-blog"></div>
          <Script src="https://app.trysoro.com/api/embed/f68b1cb2-408d-41ad-9bd0-6ef9ba9681e3" strategy="afterInteractive" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
