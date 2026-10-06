import Link from "next/link";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";

export default function NotFound() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="not-found">
        <h1>Page not found</h1>
        <p>
          This page may have moved. You can find my selected projects on the
          home page.
        </p>
        <Link className="text-link" href="/#work">
          View selected work
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
