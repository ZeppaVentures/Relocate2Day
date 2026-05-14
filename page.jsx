import Link from "next/link"

export default function Relocate2DayHomepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-violet-50 text-gray-900">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="text-2xl font-bold tracking-tight">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Relocate<span className="text-gray-500">2Day</span>
            </Link>
          </div>

          <nav className="hidden gap-8 md:flex text-sm font-medium">
            <a href="#features" className="hover:text-gray-600 transition-colors">Features</a>
            <a href="#countries" className="hover:text-gray-600 transition-colors">Countries</a>
            <a href="#pricing" className="hover:text-gray-600 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-600 transition-colors">FAQ</a>
          </nav>

          <button className="rounded-2xl bg-black px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:scale-105">
            Get Started
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <h1 className="text-5xl font-bold">
            Relocate to Europe without the confusion.
          </h1>

          <p className="mt-6 text-gray-600 max-w-xl">
            Compare visas, taxes, residency requirements, healthcare, and cost of living.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-4xl font-bold">Features</h2>
      </section>

      {/* COUNTRIES */}
      <section id="countries" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-4xl font-bold">Countries</h2>
      </section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-4xl font-bold">Pricing</h2>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-4xl font-bold">FAQ</h2>
      </section>

      <footer className="border-t p-10 text-center">
        Relocate2Day ©
      </footer>
    </div>
  )
}