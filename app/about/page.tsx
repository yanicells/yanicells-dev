import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SiteFooter } from "@/components/portfolio/site-footer";

export const metadata: Metadata = {
  title: "About",
  description: "A little about Yani, competition results, and some photography.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Yani Capistrano", url: "/about" },
};

// Each photo is laid out like a loose print; `tilt` is its resting angle in degrees.
const photos = [
  { src: "/photos/8.png", width: 6000, height: 4000, alt: "Red sunset clouds over a city skyline", caption: "Red sky over the city", tilt: -2 },
  { src: "/photos/IMG_2084.jpg", width: 6000, height: 4000, alt: "Performers on a concert stage under pink and red lights", caption: "Pink stage lights", tilt: 1.5 },
  { src: "/photos/1.png", width: 5954, height: 3969, alt: "A bronze statue framed by yellow flowers", caption: "Statue in bloom", tilt: -1 },
  { src: "/photos/6.png", width: 6000, height: 4000, alt: "Brake lights through a rain-covered windshield at dusk", caption: "Traffic, as usual", tilt: 1 },
  { src: "/photos/9.png", width: 5609, height: 3739, alt: "Three silhouettes against an orange sunset through a window", caption: "Golden hour company", tilt: -1.5 },
  { src: "/photos/3.png", width: 6000, height: 4000, alt: "An ornate church tower under an overcast sky", caption: "Grey-day bell tower", tilt: 2 },
  { src: "/photos/5.png", width: 6000, height: 4000, alt: "Friends talking around a table outside a brightly lit shop at night", caption: "Late-night tambay", tilt: 1.5 },
  { src: "/photos/2.png", width: 6000, height: 4000, alt: "A golden church altar surrounded by statues and ornate columns", caption: "All that gold", tilt: -2 },
  { src: "/photos/7.png", width: 6000, height: 4000, alt: "Lit balconies reflected in a swimming pool at night", caption: "Pool at night", tilt: 1 },
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
            I learn by building things, though it didn’t start that way. My
            Grade 6 Scratch game was mostly my friend’s work, and my first HTML
            page was mostly my brother’s. C++ in Grade 9, in the middle of the
            pandemic, was the first time watching weird syntax turn into
            something that worked actually felt fun. Grade 10 robotics had us
            wiring Arduino robots with code the teacher handed us. I didn’t
            learn much, but I had a great time.
          </p>
          <p>
            Ateneo is where I really learned to code. These days I build web
            and desktop apps and AI products, intern at Diffusr and JWay Group,
            take on freelance work, and lead MISA’s IT Skills and Development
            team. What keeps me going is the same thing from Grade 6: making
            something out of nothing and seeing it come to life. When I’m not
            coding, I’m usually out with my camera.
          </p>
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
          <p>A few prints from my camera roll. Tap one to see it full size.</p>
          <ul className="photo-prints">
            {photos.map((photo) => (
              <li key={photo.src} style={{ "--tilt": `${photo.tilt}deg` } as CSSProperties}>
                <a className="photo-print" href={photo.src} aria-label={`Open photo: ${photo.alt}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 540px) calc(50vw - 36px), 240px"
                  />
                  <span aria-hidden="true">{photo.caption}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
