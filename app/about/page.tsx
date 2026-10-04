import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";

export const metadata: Metadata = {
  title: "About",
  description: "A little about Yani, plus photography, music, and favourite anime.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Yani Capistrano", url: "/about" },
};

const photos = [
  { src: "/photos/1.png", width: 5954, height: 3969, alt: "A bronze statue framed by yellow flowers" },
  { src: "/photos/IMG_2084.jpg", width: 6000, height: 4000, alt: "Performers on a concert stage under pink and red lights" },
  { src: "/photos/3.png", width: 6000, height: 4000, alt: "An ornate church tower under an overcast sky" },
];

const favouriteAnime = [
  { title: "Attack on Titan", rating: "10" },
  { title: "Frieren: Beyond Journey’s End", rating: "9.7" },
  { title: "Your Name", rating: "9" },
  { title: "86: Eighty-Six", rating: "10" },
];

export default function AboutPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" className="index-page about-page">
        <header className="page-heading">
          <p className="eyebrow">About</p>
          <h1>Yani, outside the tabs.</h1>
          <p>
            I’m Edrian Miguel E. Capistrano, usually Yani. I study Computer
            Science at Ateneo de Manila University, specializing in Data
            Science and Analytics. I’m a Financial Aid and DOST scholar,
            expecting to graduate in 2028.
          </p>
        </header>
        <div className="about-introduction">
          <p>
            I work on web and desktop applications, AI products, and software
            for teams and businesses. Alongside internships and freelance work,
            I lead MISA’s IT Skills and Development team. Outside that, I’m
            usually taking photos, listening to music, or watching anime.
          </p>
          <nav className="interest-links" aria-label="On this page">
            <a className="text-link" href="#photography">Photography ↓</a>
            <a className="text-link" href="#music">Music ↓</a>
            <a className="text-link" href="#anime">Anime ↓</a>
          </nav>
        </div>

        <section className="interest-section" aria-labelledby="recognition-heading">
          <h2 id="recognition-heading">Competition results</h2>
          <ul className="recognition-list">
            <li>
              <strong>Meera — Top 3</strong>
              <span>KPMG x Microsoft Academic Innovation Challenge 2026</span>
            </li>
            <li>
              <strong>Academic Ally — Top 10, Round 1</strong>
              <span>KPMG x Microsoft Academic Innovation Challenge 2026</span>
            </li>
            <li>
              <strong>DigiTALINO — Grand Champion</strong>
              <span>IM Summit 2026 Business Case Competition</span>
            </li>
            <li>
              <strong>Schrollar — 2nd runner-up</strong>
              <span>HackFest 2026 Axis Case Challenge</span>
            </li>
          </ul>
        </section>

        <section id="photography" className="interest-section" aria-labelledby="photo-heading">
          <div className="section-heading">
            <h2 id="photo-heading">Through the camera</h2>
            <span className="interest-note">Canon R50</span>
          </div>
          <p>Some photos from my camera roll.</p>
          <div className="photo-strip">
            {photos.map((photo) => (
              <a href={photo.src} key={photo.src} aria-label={`Open photo: ${photo.alt}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 540px) calc(100vw - 48px), 300px"
                />
              </a>
            ))}
          </div>
        </section>

        <section id="music" className="interest-section" aria-labelledby="music-heading">
          <h2 id="music-heading">In the rotation</h2>
          <p>A few favourite artists.</p>
          <ul className="artist-list">
            {["Munimuni", "Ed Sheeran", "Cup of Joe"].map((artist, index) => (
              <li key={artist}>
                <span className="artist-number" aria-hidden="true">0{index + 1}</span>
                <span>{artist}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="anime" className="interest-section" aria-labelledby="anime-heading">
          <div className="section-heading">
            <h2 id="anime-heading">From the watchlist</h2>
            <span className="interest-note">My ratings</span>
          </div>
          <p>Four favourites from my anime list.</p>
          <ul className="anime-list">
            {favouriteAnime.map((anime) => (
              <li key={anime.title}>
                <span>{anime.title}</span>
                <span className="anime-rating">{anime.rating}<span>/10</span></span>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
