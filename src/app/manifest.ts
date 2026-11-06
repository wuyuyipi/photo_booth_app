import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Y2K Photo Booth",
    short_name: "Y2K Booth",
    description: "Retro 2000s 4-shot photo booth for your phone",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ff2a85",
    theme_color: "#ff2a85",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
