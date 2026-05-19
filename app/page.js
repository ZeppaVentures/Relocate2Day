export default function Home() {
  const destinations = [
    {
      name: "Spain",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      description:
        "Great weather, vibrant cities and the Digital Nomad Visa.",
    },
    {
      name: "Portugal",
      image:
        "https://images.unsplash.com/photo-1513735492246-483525079686?q=80&w=1200&auto=format&fit=crop",
      description:
        "Affordable living, friendly locals and simple tax regimes.",
    },
    {
      name: "Italy",
      image:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop",
      description:
        "Beautiful coastline, amazing food and relaxed lifestyle.",
    },
    {
      name: "Greece",
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
      description:
        "Island living, sunshine and a growing remote work community.",
    },
  ]

  const features = [
    {
      title: "Visa & Residency",
      description:
        "Up-to-date visa guides and residency requirements.",
      icon: "🌍",
    },
    {
      title: "Taxes Made Simple",
      description:
        "Compare taxes, social contributions and savings.",
      icon: "💶",
    },
    {
      title: "Cost of Living",
      description:
        "Real living expenses for Europe’s top cities.",
      icon: "🏠",
    },
    {
      title: "Healthcare",
      description:
        "Find the best healthcare systems and options.",
      icon: "❤️",
    },
    {
      title: "Banking & Finance",
      description:
        "Open accounts, transfer money and manage finances.",
      icon: "🏦",
    },
    {
      title: "Community Support",
      description:
        "Connect with experts and remote workers abroad.",
      icon: "🤝",
    },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-[#0B1957]">

      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Relocate2Day
            </span>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#countries" className="hover:text-violet-600 transition">
              Countries
            </a>

            <a href="#features" className="hover:text-violet-600 transition">
              Features
            </a>

            <a href="#pricing" className="hover:text-violet-600 transition">
              Pricing
            </a>

            <a href="#faq" className="hover:text-violet-600 transition">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-semibold">
              Log in
            </button>

            <button className="rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-3 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20">

          <div className="mx-auto max-w-5xl text-center">

            <h1 className="text-5xl font-black leading-none tracking-tight text-[#0B1957] md:text-8xl">
              Move to Europe.
              <br />
              Live your{" "}
              <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                best life.
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-8 text-[#24346d]">
              Relocate2Day is your all-in-one platform for remote workers
              relocating to Spain, Portugal and beyond.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {[
                "Compare countries",
                "Understand taxes",
                "Plan your move",
              ].map((item) => (
                <button
                  key={item}
                  className="rounded-2xl border border-white/40 bg-white/70 px-6 py-3 text-sm font-semibold shadow-lg backdrop-blur-xl transition hover:scale-105"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-5xl rounded-[36px] bg-[#081B57]/95 p-8 shadow-[0_20px_80px_rgba(8,27,87,0.35)] backdrop-blur-xl">

            <div className="text-center">
              <h2 className="text-4xl font-black text-white">
                Where should you relocate?
              </h2>

              <p className="mt-3 text-gray-300">
                Answer a few questions and get personalized recommendations.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-4">

              <div className="rounded-2xl bg-white/10 p-5 text-white backdrop-blur-xl">
                <div className="text-sm text-gray-300">I'm from</div>
                <div className="mt-2 font-semibold">Select country</div>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-white backdrop-blur-xl">
                <div className="text-sm text-gray-300">Annual income</div>
                <div className="mt-2 font-semibold">€90,000</div>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 text-white backdrop-blur-xl">
                <div className="text-sm text-gray-300">I want to live in</div>
                <div className="mt-2 font-semibold">Europe</div>
              </div>

              <button className="rounded-2xl bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 px-6 py-5 text-lg font-bold text-white shadow-2xl transition hover:scale-[1.03]">
                Find my best options
              </button>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-300">
              <div>✅ 100% Free</div>
              <div>✅ No credit card required</div>
              <div>✅ Personalized results in 30 seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        id="countries"
        className="bg-white px-6 py-28"
      >
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-[0.3em] text-violet-500">
              Popular destinations
            </div>

            <h2 className="mt-4 text-5xl font-black">
              Find your perfect place in Europe
            </h2>

            <p className="mt-4 text-xl text-gray-500">
              Explore the best countries for remote workers.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {destinations.map((country) => (
              <div
                key={country.name}
                className="group relative overflow-hidden rounded-[32px] shadow-2xl"
              >
                <img
                  src={country.image}
                  alt={country.name}
                  className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-0 p-8 text-white">

                  <div className="mb-4 inline-flex rounded-full bg-orange-400 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    {country.name}
                  </div>

                  <h3 className="text-4xl font-black">
                    {country.name}
                  </h3>

                  <p className="mt-4 text-white/90">
                    {country.description}
                  </p>

                  <button className="mt-6 rounded-2xl bg-white/20 px-5 py-3 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/30">
                    Explore {country.name} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}