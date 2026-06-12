export default function Footer() {
  return (
    <footer className="bg-[#0B1957] px-6 py-12 text-center text-sm text-white/50">
      <div className="flex justify-center mb-6">
        <a href="https://www.producthunt.com/products/relocate2day?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-relocate2day" target="_blank" rel="noopener noreferrer">
          <img alt="Relocate2Day | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1169633&theme=dark&t=1781259421644" />
        </a>
      </div>
      <p>© {new Date().getFullYear()} Relocate2Day. All rights reserved.</p>
      <div className="mt-3 flex justify-center gap-6">
        <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="/image-credits" className="hover:text-white transition-colors">Image Credits</a>
      </div>
    </footer>
  );
}
