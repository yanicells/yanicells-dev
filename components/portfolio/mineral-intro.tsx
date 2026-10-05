import Image from "next/image";

// One-time homepage entrance: a rock centered on a blank cover drifts toward
// the mineral backdrop and fades as the cover dissolves into the page.
// Pure CSS, never intercepts input, and hides itself when it finishes.
export function MineralIntro() {
  return (
    <div className="mineral-intro" aria-hidden="true">
      <div className="mineral-intro-rock">
        <Image
          src="/rubidium-rock.png"
          alt=""
          fill
          sizes="(max-width: 540px) 168px, 240px"
          preload
        />
      </div>
    </div>
  );
}
