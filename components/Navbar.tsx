import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

type NavbarProps =
  | { variant: "simple" }
  | { variant: "account"; onLogout: () => void }
  | { variant: "content"; backHref: string; backLabel: string };

export default function Navbar(props: NavbarProps) {
  const isContent = props.variant === "content";
  return (
    <header
      className={
        isContent
          ? "sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl"
          : "border-b border-gray-100 px-6 py-5"
      }
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between ${isContent ? "px-6 py-5" : ""}`}>
        <div className="flex items-center gap-8">
          <Link href="/" className="text-3xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Relocate2Day
            </span>
          </Link>
          <Link href="/blog" className="text-sm font-semibold text-gray-500 hover:text-violet-600 transition">
            Blog
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {props.variant === "content" && (
            <Link href={props.backHref} className="text-sm font-semibold hover:text-violet-600 transition">
              {props.backLabel}
            </Link>
          )}
          {props.variant === "account" && (
            <button
              onClick={props.onLogout}
              className="text-sm font-semibold text-gray-500 hover:text-red-500 transition"
            >
              Log out
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
