import { ImageResponse } from "next/og";

export const alt = "Yani Capistrano. Software and AI engineering.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "90px",
        background: "#fafafa",
        color: "#23252a",
      }}
    >
      <div style={{ display: "flex", fontSize: 72, letterSpacing: "-3px" }}>
        Yani Capistrano
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 24,
          fontSize: 30,
          color: "#60646c",
        }}
      >
        Software &amp; AI engineering
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 80,
          fontSize: 24,
          color: "#60646c",
        }}
      >
        yanicells.dev
      </div>
    </div>,
    size,
  );
}
