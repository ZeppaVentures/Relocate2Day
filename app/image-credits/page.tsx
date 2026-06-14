import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Image Credits | Relocate2Day",
  description: "Photo credits and licensing information for images used on Relocate2Day.",
};

const credits = [
  { location: "Homepage hero", scene: "Barcelona, Spain", source: "Unsplash", url: "https://unsplash.com/photos/1504019347908-b45f9b0b8dd5" },
  { location: "Spain guide", scene: "Seville, Plaza de España", source: "Unsplash", url: "https://unsplash.com/photos/1543783207-ec64e4d95325" },
  { location: "Portugal guide", scene: "Lisbon", source: "Unsplash", url: "https://unsplash.com/photos/1548707309-dcebeab9ea9b" },
  { location: "Italy guide", scene: "Amalfi Coast", source: "Unsplash", url: "https://unsplash.com/photos/1515542622106-078bda23543c" },
  { location: "Gibraltar guide", scene: "Rock of Gibraltar", source: "Unsplash", url: "https://unsplash.com/photos/1586861203927-800a5acdcc4d" },
  { location: "Malta guide", scene: "Valletta Grand Harbour", source: "Unsplash", url: "https://unsplash.com/photos/1602562737290-3f5b7e5cfd82" },
  { location: "Bulgaria guide", scene: "Sofia, Alexander Nevsky Cathedral", source: "Unsplash", url: "https://unsplash.com/photos/1555521144-e864c2dbf5e8" },
  { location: "Greece guide", scene: "Athens, Acropolis at Golden Hour", source: "Unsplash", url: "https://unsplash.com/photos/acropolis-of-athens-at-golden-hour-yqBvJJ8jGBQ" },
  { location: "Netherlands guide", scene: "Tulips in Amsterdam", source: "Unsplash", url: "https://unsplash.com/photos/pink-flowers-near-city-buildings-during-daytime-RRl_m_fQzNY" },
  { location: "Romania guide (hero)", scene: "Brasov Old Town at sunset", source: "Unsplash", url: "https://unsplash.com/photos/a-view-of-a-city-from-the-top-of-a-hill-H7Vhf8GVUNE" },
  { location: "Romania guide (card)", scene: "Calea Victoriei, Bucharest Old Town", source: "Unsplash", url: "https://unsplash.com/photos/a-city-street-filled-with-lots-of-tall-buildings-WziMWpMfGEY" },
];

export default function ImageCreditsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1957]">
      <Navbar variant="content" backHref="/" backLabel="← Back to all countries" />

      <main className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-5xl font-black mb-4">Image Credits</h1>
        <p className="text-gray-500 text-lg mb-12">
          All photography used on Relocate2Day is sourced from{" "}
          <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
            Unsplash
          </a>{" "}
          and licensed under the{" "}
          <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
            Unsplash License
          </a>
          , which permits free commercial use.
        </p>

        <div className="overflow-x-auto rounded-[24px] border border-gray-100 shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f8f7ff] border-b border-gray-100">
                <th className="text-left px-6 py-4 font-black text-[#0B1957]">Used on</th>
                <th className="text-left px-6 py-4 font-black text-[#0B1957]">Scene</th>
                <th className="text-left px-6 py-4 font-black text-[#0B1957]">Source</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((credit, i) => (
                <tr key={credit.location} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#fafafa]"}`}>
                  <td className="px-6 py-4 font-semibold">{credit.location}</td>
                  <td className="px-6 py-4 text-gray-600">{credit.scene}</td>
                  <td className="px-6 py-4">
                    <a
                      href={credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 hover:underline font-semibold"
                    >
                      {credit.source} ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 rounded-[24px] bg-[#f8f7ff] p-8">
          <h2 className="text-xl font-black mb-3">Unsplash License</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Photos from Unsplash are free to use for commercial and non-commercial purposes. 
            No attribution is required under the Unsplash License, though we include these 
            credits as a courtesy to the photographers whose work makes this site possible.
          </p>
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-violet-600 hover:underline"
          >
            Read the full Unsplash License ↗
          </a>
        </div>

        <div className="mt-8 rounded-[24px] bg-[#f8f7ff] p-8">
          <h2 className="text-xl font-black mb-3">Original Artwork</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            The following original illustrations and designs were created exclusively for Relocate2Day.
          </p>
          <div className="overflow-x-auto rounded-[16px] border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white border-b border-gray-100">
                  <th className="text-left px-6 py-4 font-black text-[#0B1957]">Artwork</th>
                  <th className="text-left px-6 py-4 font-black text-[#0B1957]">Artist</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 bg-white">
                  <td className="px-6 py-4 font-semibold">Logo</td>
                  <td className="px-6 py-4 text-gray-600">Marina Babeva</td>
                </tr>
                <tr className="bg-[#fafafa]">
                  <td className="px-6 py-4 font-semibold">Banner illustration</td>
                  <td className="px-6 py-4 text-gray-600">Sofia Babeva</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
