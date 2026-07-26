import { notFound } from "next/navigation";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {} as Record<string, string>, body: content };
  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(": ");
    if (key && rest.length) meta[key.trim()] = rest.join(": ").replace(/^"|"$/g, "").trim();
  });
  return { meta, body: match[2] };
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .split(/\n\n+/)
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      if (block.startsWith("<h") || block.startsWith("<ul") || block.startsWith("<ol")) return block;
      return `<p>${block.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");
}

const LOCALES = ["en", "es", "pt", "zh"] as const;
type Locale = typeof LOCALES[number];
const LOCALE_LABELS: Record<Locale, string> = { en: "English", es: "Español", pt: "Português", zh: "中文" };

function getPost(locale: string, slug: string) {
  const filePath = join(process.cwd(), "posts", locale, `${slug}.md`);
  if (!existsSync(filePath)) return null;
  return parseFrontmatter(readFileSync(filePath, "utf-8"));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | Relocate2Day`,
    description: post.meta.description,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((l) => [l, `https://relocate2day.com/${l}/blog/${slug}`])),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) notFound();

  const html = markdownToHtml(post.body);
  const availableLocales = LOCALES.filter((l) => existsSync(join(process.cwd(), "posts", l, `${slug}.md`)));

  const dateLocale = locale === "zh" ? "zh-CN" : locale === "pt" ? "pt-BR" : locale === "es" ? "es-ES" : "en-US";

  return (
    <div className="min-h-screen bg-white text-[#0B1957]">
      <Navbar variant="simple" />
      <main className="mx-auto max-w-3xl px-6 py-20">

        {availableLocales.length > 1 && (
          <div className="flex gap-3 mb-8 flex-wrap">
            {availableLocales.map((l) => (
              <a key={l} href={`/${l}/blog/${slug}`}
                className={`text-sm px-3 py-1 rounded-full border transition ${
                  l === locale ? "bg-violet-600 text-white border-violet-600" : "border-gray-200 text-gray-500 hover:border-violet-400"
                }`}>
                {LOCALE_LABELS[l]}
              </a>
            ))}
          </div>
        )}

        {post.meta.date && (
          <p className="text-sm text-gray-400 mb-4">
            {new Date(post.meta.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
          </p>
        )}

        <article
          className="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-[#0B1957] prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-8 prose-p:mb-6"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-16 rounded-3xl bg-gradient-to-br from-violet-600 to-pink-500 p-8 text-white text-center">
          <h3 className="text-2xl font-black mb-3">Ready to find your perfect country?</h3>
          <p className="mb-6 text-white/80">Use our free quiz to get a personalised country ranking based on your income, lifestyle and goals.</p>
          <a href={`/${locale}/quiz`} className="inline-block bg-white text-violet-600 font-bold px-8 py-3 rounded-2xl hover:bg-violet-50 transition">
            Take the free quiz →
          </a>
        </div>

        <div className="mt-10 text-center">
          <a href={`/${locale}/blog`} className="text-sm text-gray-400 hover:text-violet-600 transition">← Back to all articles</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
