import { contact } from "@/lib/data/contact";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Yani Capistrano</p>
      <nav aria-label="Social links">
        <a href={contact.github}>GitHub</a>
        <a href={contact.linkedin}>LinkedIn</a>
      </nav>
    </footer>
  );
}
