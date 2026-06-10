import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata = {
  title: "Blog | Relocate2Day",
  description: "Tips, guides and advice for relocating to Europe. Country insights, visa updates and expat stories.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1957]">
      <Navbar variant="simple" />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <h1 className="text-5xl font-black mb-4">Blog</h1>
        <p className="text-gray-500 text-lg mb-12">
          Tips, guides and real advice for making your move to Europe.
        </p>

        <div id="soro-blog"></div>
        <Script
          src="https://app.trysoro.com/api/embed/f68b1cb2-408d-41ad-9bd0-6ef9ba9681e3"
          strategy="afterInteractive"
        />
      </main>

      <Footer />
    </div>
  );
}
