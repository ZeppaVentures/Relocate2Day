export default function Footer() {
  return (
    <footer className="bg-[#0B1957] px-6 py-12 text-center text-sm text-white/50">
      <p>© {new Date().getFullYear()} Relocate2Day. All rights reserved.</p>
      <div className="mt-3 flex justify-center gap-6">
        <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="/image-credits" className="hover:text-white transition-colors">Image Credits</a>
      </div>
    </footer>
  );
}
