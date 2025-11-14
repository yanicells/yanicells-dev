"use client";

import { useState } from "react";

export default function Home() {
  const [uglyMode, setUglyMode] = useState(false);

  return (
    <div
      className={`flex flex-col items-center text-center justify-center min-h-screen ${
        uglyMode ? "bg-[#ff1a00] text-[#009b00]" : "bg-white text-black"
      }`}
      style={{ fontFamily: '"Comic Sans MS"' }}
    >
      <img
        onClick={() => setUglyMode(!uglyMode)}
        src="/yanicells-image.png"
        className="w-[170px] mt-[50px] cursor-pointer"
        alt="yanicells"
      />
      <p className="text-xs mt-2 italic">Art by my kiddo</p>
      <h1 className="m-5 text-4xl font-bold">Hi I am Yani !!</h1>
      <p className="mt-3">An aspiring fullstack web developer.</p>
      <p className="m-0 mb-5">Here are some of my projects!</p>
      <ul className="list-none p-0 mb-[30px]">
        <li>
          <a href="https://github.com/yanicells/Musicells">Musicells</a>
        </li>
        <li>
          <a href="https://github.com/yanicells/pixcells">Pixcells</a>
        </li>
        <li>
          <a href="https://github.com/yanicells/Blogcells">Blogcells</a>
        </li>
        <li>
          <a href="https://github.com/yanicells/Secrets">Secrets</a>
        </li>
        <li>
          <a href="https://github.com/yanicells/Big-4-Sorter">Big-4-Sorter</a>
        </li>
        <li>
          <a href="https://github.com/yanicells/Redhead-Redemption">
            Redhead-Redemption
          </a>
        </li>
        <li>
          <a href="https://github.com/yanicells/NASA-APIs">NASA-APIs</a>
        </li>
        <li>
          <a href="https://github.com/yanicells/CityCraft">CityCraft</a>
        </li>
        <li>
          <a href="https://github.com/yanicells/Card-Game">Card-Game</a>
        </li>
      </ul>
      <footer>
        <p>
          &copy; 2025 <a href="https://github.com/yanicells">yanicells</a>
        </p>
      </footer>
    </div>
  );
}
