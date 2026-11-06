"use client";

import React from "react";

// Raw SVG strings for canvas rendering & sharp scaling
export const STICKER_SVG_STRINGS: Record<string, string> = {
  peeling_smiley: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 6C74 6 94 26 94 50C94 74 74 94 50 94C38 94 28 89 20 81L30 65C34 68 42 70 50 70C61 70 70 61 70 50C70 39 61 30 50 30C39 30 30 39 30 50C30 54 31 57 33 60L16 65C10 58 6 48 6 50C6 26 26 6 50 6Z" fill="#ffffff" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
    <path d="M50 10C72 10 90 28 90 50C90 72 72 90 50 90C38 90 28 85 22 76L38 68C42 70 46 71 50 71C62 71 71 62 71 50C71 38 62 29 50 29C38 29 29 38 29 50C29 54 30 58 32 62L16 68C12 63 10 57 10 50C10 28 28 10 50 10Z" fill="#ffd200" stroke="#000000" stroke-width="3.5"/>
    <path d="M22 76L38 68L32 62L16 68L22 76Z" fill="#fffae0" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="40" cy="40" rx="4.5" ry="9" fill="#000000"/>
    <ellipse cx="60" cy="40" rx="4.5" ry="9" fill="#000000"/>
    <circle cx="38.5" cy="36" r="2" fill="#ffffff"/>
    <circle cx="58.5" cy="36" r="2" fill="#ffffff"/>
    <path d="M38 56C42 63 58 63 62 56" stroke="#000000" stroke-width="3.5" stroke-linecap="round"/>
  </svg>`,

  boombox: `<svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="24" width="108" height="60" rx="14" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <path d="M36 24V10C36 7 39 4 42 4H78C81 4 84 7 84 10V24" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>
    <path d="M36 24V10C36 7 39 4 42 4H78C81 4 84 7 84 10V24" stroke="#ffd200" stroke-width="7" stroke-linecap="round"/>
    <path d="M36 24V10C36 7 39 4 42 4H78C81 4 84 7 84 10V24" stroke="#000000" stroke-width="2" stroke-linecap="round" fill="none"/>
    <rect x="8" y="26" width="104" height="56" rx="12" fill="#ff2a85" stroke="#000000" stroke-width="3.5"/>
    <circle cx="32" cy="56" r="18" fill="#ffd200" stroke="#000000" stroke-width="3"/>
    <line x1="16" y1="56" x2="48" y2="56" stroke="#000000" stroke-width="2"/>
    <line x1="32" y1="40" x2="32" y2="72" stroke="#000000" stroke-width="2"/>
    <circle cx="32" cy="56" r="6" fill="#ff2a85"/>
    <circle cx="88" cy="56" r="18" fill="#ffd200" stroke="#000000" stroke-width="3"/>
    <line x1="72" y1="56" x2="104" y2="56" stroke="#000000" stroke-width="2"/>
    <line x1="88" y1="40" x2="88" y2="72" stroke="#000000" stroke-width="2"/>
    <circle cx="88" cy="56" r="6" fill="#ff2a85"/>
    <rect x="54" y="44" width="12" height="24" rx="2" fill="#00e5ff" stroke="#000000" stroke-width="2"/>
    <line x1="20" y1="32" x2="100" y2="32" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  cellphone: `<svg viewBox="0 0 65 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="57" height="92" rx="18" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <rect x="6" y="6" width="53" height="88" rx="16" fill="#ffd200" stroke="#000000" stroke-width="3.5"/>
    <rect x="12" y="14" width="41" height="32" rx="8" fill="#ff2a85" stroke="#000000" stroke-width="2.5"/>
    <rect x="16" y="18" width="33" height="24" rx="4" fill="#00e5ff" stroke="#000000" stroke-width="2"/>
    <path d="M19 28 Q 24 23 32 30 T 45 25" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="19" cy="58" r="3.5" fill="#ff2a85"/>
    <circle cx="32.5" cy="58" r="3.5" fill="#ff2a85"/>
    <circle cx="46" cy="58" r="3.5" fill="#ff2a85"/>
    <circle cx="19" cy="69" r="3.5" fill="#ff2a85"/>
    <circle cx="32.5" cy="69" r="3.5" fill="#ff2a85"/>
    <circle cx="46" cy="69" r="3.5" fill="#ff2a85"/>
    <circle cx="19" cy="80" r="3.5" fill="#ff2a85"/>
    <circle cx="32.5" cy="80" r="3.5" fill="#ff2a85"/>
    <circle cx="46" cy="80" r="3.5" fill="#ff2a85"/>
  </svg>`,

  game_console: `<svg viewBox="0 0 65 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="57" height="92" rx="16" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <rect x="6" y="6" width="53" height="88" rx="14" fill="#ff2a85" stroke="#000000" stroke-width="3.5"/>
    <rect x="12" y="14" width="41" height="38" rx="6" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <path d="M26 26H31V31H36V26H41V35H36V40H31V35H26V26Z" fill="#6366f1"/>
    <path d="M21 64V68H17V72H21V76H25V72H29V68H25V64H21Z" fill="#6366f1" stroke="#000000" stroke-width="2"/>
    <circle cx="44" cy="67" r="4.5" fill="#ffd200" stroke="#000000" stroke-width="2"/>
    <circle cx="37" cy="75" r="4.5" fill="#ffd200" stroke="#000000" stroke-width="2"/>
  </svg>`,

  cool_badge: `<svg viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 38L4 26L16 22L14 10L26 12L30 2L42 8L50 2L58 8L70 2L74 12L86 10L84 22L96 26L90 38L96 50L84 54L86 66L74 64L70 74L58 68L50 74L42 68L30 74L26 64L14 66L16 54L4 50L10 38Z" fill="#ffffff" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
    <path d="M10 38L4 26L16 22L14 10L26 12L30 2L42 8L50 2L58 8L70 2L74 12L86 10L84 22L96 26L90 38L96 50L84 54L86 66L74 64L70 74L58 68L50 74L42 68L30 74L26 64L14 66L16 54L4 50L10 38Z" fill="#ff2a85" stroke="#000000" stroke-width="3" stroke-linejoin="round"/>
    <text x="50" y="46" text-anchor="middle" fill="#ffd200" stroke="#000000" stroke-width="2" font-family="system-ui, sans-serif" font-weight="900" font-size="20" font-style="italic" letter-spacing="1">Cool</text>
  </svg>`,

  floppy_disk: `<svg viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10H65L75 20V75H10V10Z" fill="#ffffff" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
    <path d="M10 10H65L75 20V75H10V10Z" fill="#ffd200" stroke="#000000" stroke-width="3.5" stroke-linejoin="round"/>
    <rect x="22" y="10" width="40" height="24" rx="2" fill="#ff2a85" stroke="#000000" stroke-width="2.5"/>
    <rect x="30" y="15" width="8" height="14" rx="2" fill="#000000"/>
    <rect x="20" y="42" width="45" height="33" rx="4" fill="#00e5ff" stroke="#000000" stroke-width="2"/>
    <line x1="25" y1="50" x2="60" y2="50" stroke="#000000" stroke-width="2"/>
    <line x1="25" y1="58" x2="60" y2="58" stroke="#000000" stroke-width="2"/>
    <line x1="25" y1="66" x2="60" y2="66" stroke="#000000" stroke-width="2"/>
  </svg>`,

  smile_window: `<svg viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="88" height="63" rx="8" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <rect x="8" y="8" width="84" height="59" rx="6" fill="#ff2a85" stroke="#000000" stroke-width="3"/>
    <rect x="8" y="8" width="84" height="16" rx="5" fill="#ffd200" stroke="#000000" stroke-width="2"/>
    <circle cx="16" cy="16" r="2.5" fill="#ff2a85"/>
    <circle cx="24" cy="16" r="2.5" fill="#ff2a85"/>
    <text x="82" y="19" font-size="9" font-weight="bold" fill="#000000">_ ×</text>
    <text x="50" y="42" text-anchor="middle" fill="#ffd200" stroke="#000000" stroke-width="1.5" font-weight="900" font-size="13" letter-spacing="2">SMILE</text>
    <text x="50" y="58" text-anchor="middle" fill="#ffd200" stroke="#000000" stroke-width="1.5" font-weight="900" font-size="13" letter-spacing="2">SMILE</text>
  </svg>`,

  heart_buddy: `<svg viewBox="0 0 90 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 68C45 68 12 48 12 26C12 14 22 6 32 6C37 6 42 10 45 13C48 10 53 6 58 6C68 6 78 14 78 26C78 48 45 68 45 68Z" fill="#ffffff" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
    <path d="M45 68C45 68 12 48 12 26C12 14 22 6 32 6C37 6 42 10 45 13C48 10 53 6 58 6C68 6 78 14 78 26C78 48 45 68 45 68Z" fill="#ff2a85" stroke="#000000" stroke-width="3.5" stroke-linejoin="round"/>
    <ellipse cx="34" cy="30" rx="5" ry="9" fill="#000000"/>
    <ellipse cx="56" cy="30" rx="5" ry="9" fill="#000000"/>
    <circle cx="32" cy="26" r="2.5" fill="#ffffff"/>
    <circle cx="54" cy="26" r="2.5" fill="#ffffff"/>
    <path d="M38 45C42 50 48 50 52 45" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
    <path d="M46 47C46 53 52 53 52 47" fill="#ffd200" stroke="#000000" stroke-width="2"/>
  </svg>`,

  saturn_planet: `<svg viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="40" rx="42" ry="16" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <circle cx="50" cy="38" r="24" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <circle cx="50" cy="38" r="24" fill="#ffd200" stroke="#000000" stroke-width="3.5"/>
    <path d="M30 32 Q 50 42 70 32" stroke="#ff2a85" stroke-width="3" fill="none"/>
    <path d="M34 44 Q 50 52 66 44" stroke="#ff2a85" stroke-width="2.5" fill="none"/>
    <ellipse cx="50" cy="40" rx="40" ry="14" fill="none" stroke="#6366f1" stroke-width="7"/>
    <ellipse cx="50" cy="40" rx="40" ry="14" fill="none" stroke="#000000" stroke-width="2.5"/>
    <path d="M26 38 A 24 24 0 0 0 74 38 Z" fill="#ffd200"/>
    <path d="M26 38 A 24 24 0 0 0 74 38" stroke="#000000" stroke-width="3.5" fill="none"/>
    <path d="M10 40 A 40 14 0 0 0 90 40" stroke="#6366f1" stroke-width="7" fill="none"/>
    <path d="M10 40 A 40 14 0 0 0 90 40" stroke="#000000" stroke-width="2.5" fill="none"/>
  </svg>`,

  cassette: `<svg viewBox="0 0 100 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="92" height="57" rx="8" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <rect x="6" y="6" width="88" height="53" rx="6" fill="#ffd200" stroke="#000000" stroke-width="3"/>
    <rect x="14" y="12" width="72" height="28" rx="4" fill="#6366f1" stroke="#000000" stroke-width="2"/>
    <rect x="20" y="18" width="60" height="16" rx="2" fill="#ff2a85"/>
    <circle cx="34" cy="26" r="5" fill="#ffffff" stroke="#000000" stroke-width="2"/>
    <circle cx="66" cy="26" r="5" fill="#ffffff" stroke="#000000" stroke-width="2"/>
    <polygon points="26,59 74,59 66,45 34,45" fill="#ffd200" stroke="#000000" stroke-width="2"/>
  </svg>`,

  rotary_phone: `<svg viewBox="0 0 90 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="45" cy="18" rx="38" ry="12" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <path d="M22 28H68L76 68H14L22 28Z" fill="#ffffff" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
    <path d="M12 18 Q 45 4 78 18 Q 78 26 68 24 Q 45 16 22 24 Q 12 26 12 18 Z" fill="#ff2a85" stroke="#000000" stroke-width="3"/>
    <path d="M22 28H68L74 66H16L22 28Z" fill="#ffd200" stroke="#000000" stroke-width="3.5"/>
    <circle cx="45" cy="48" r="14" fill="#ffffff" stroke="#000000" stroke-width="2.5"/>
    <circle cx="45" cy="48" r="6" fill="#ff2a85" stroke="#000000" stroke-width="2"/>
    <circle cx="45" cy="38" r="2" fill="#6366f1"/>
    <circle cx="52" cy="42" r="2" fill="#6366f1"/>
    <circle cx="53" cy="50" r="2" fill="#6366f1"/>
    <circle cx="48" cy="56" r="2" fill="#6366f1"/>
    <circle cx="40" cy="56" r="2" fill="#6366f1"/>
    <circle cx="36" cy="48" r="2" fill="#6366f1"/>
  </svg>`,

  alien: `<svg viewBox="0 0 75 95" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37 6C56 6 70 24 70 46C70 68 50 88 37 88C24 88 4 68 4 46C4 24 18 6 37 6Z" fill="#ffffff" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
    <path d="M37 8C54 8 68 25 68 46C68 67 48 86 37 86C26 86 6 67 6 46C6 25 20 8 37 8Z" fill="#6366f1" stroke="#000000" stroke-width="3.5"/>
    <ellipse cx="24" cy="42" rx="7" ry="14" transform="rotate(-20 24 42)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="50" cy="42" rx="7" ry="14" transform="rotate(20 50 42)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <path d="M33 66 Q 37 70 41 66" stroke="#ffd200" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  dont_worry: `<svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="45" r="40" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <path d="M45 7L51 14L60 11L63 19L72 20L72 29L80 32L77 41L83 47L77 53L80 62L72 65L72 74L63 75L60 83L51 80L45 87L39 80L30 83L27 75L18 74L18 65L10 62L13 53L7 47L13 41L10 32L18 29L18 20L27 19L30 11L39 14L45 7Z" fill="#ff2a85" stroke="#000000" stroke-width="3"/>
    <circle cx="45" cy="45" r="24" fill="#ff4d9d"/>
    <ellipse cx="38" cy="40" rx="3" ry="6" fill="#000000"/>
    <ellipse cx="52" cy="40" rx="3" ry="6" fill="#000000"/>
    <circle cx="37" cy="38" r="1.5" fill="#ffffff"/>
    <circle cx="51" cy="38" r="1.5" fill="#ffffff"/>
    <path d="M40 50 Q 45 54 48 50" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M44 51 Q 44 56 48 55" fill="#ffd200" stroke="#000000" stroke-width="1.5"/>
    <text x="45" y="24" text-anchor="middle" fill="#ffd200" font-weight="900" font-size="7" letter-spacing="0.8">DON'T WORRY</text>
    <text x="45" y="72" text-anchor="middle" fill="#ffd200" font-weight="900" font-size="7" letter-spacing="0.8">BE HAPPY</text>
  </svg>`,

  retro_daisy: `<svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="45" r="38" fill="#ffffff" stroke="#ffffff" stroke-width="8"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(36 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(72 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(108 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(144 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(180 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(216 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(252 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(288 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <ellipse cx="45" cy="22" rx="7" ry="18" transform="rotate(324 45 45)" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <circle cx="45" cy="45" r="13" fill="#ffffff" stroke="#000000" stroke-width="3"/>
    <circle cx="45" cy="45" r="7" fill="#ff2a85"/>
  </svg>`,

  lollipop: `<svg viewBox="0 0 70 95" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="44" width="10" height="46" rx="5" fill="#ffffff" stroke="#ffffff" stroke-width="6"/>
    <rect x="31" y="44" width="8" height="46" rx="4" fill="#ffd200" stroke="#000000" stroke-width="2.5"/>
    <circle cx="35" cy="30" r="26" fill="#ffffff" stroke="#ffffff" stroke-width="7"/>
    <circle cx="35" cy="30" r="23" fill="#ff2a85" stroke="#000000" stroke-width="3.5"/>
    <path d="M35 12 A 18 18 0 0 1 50 30" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M14 34 Q 35 44 56 34" stroke="#ffd200" stroke-width="4" fill="none"/>
  </svg>`,

  lips: `<svg viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 40 C 22 22, 38 20, 50 26 C 62 20, 78 22, 88 40 C 76 56, 62 60, 50 56 C 38 60, 24 56, 12 40 Z" fill="#ffffff" stroke="#ffffff" stroke-width="8" stroke-linejoin="round"/>
    <path d="M12 40 C 22 24, 38 22, 50 28 C 62 22, 78 24, 88 40 C 72 38, 60 44, 50 42 C 40 44, 28 38, 12 40 Z" fill="#ff2a85" stroke="#000000" stroke-width="3.5"/>
    <path d="M38 38 C 38 52, 42 66, 50 66 C 58 66, 62 52, 62 38 Z" fill="#ffd200" stroke="#000000" stroke-width="3"/>
    <line x1="50" y1="42" x2="50" y2="58" stroke="#000000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M12 40 C 24 52, 38 50, 42 42" stroke="#000000" stroke-width="3" fill="#ff2a85"/>
    <path d="M88 40 C 76 52, 62 50, 58 42" stroke="#000000" stroke-width="3" fill="#ff2a85"/>
  </svg>`,
};

// Sticker metadata
export interface Y2KStickerItem {
  id: string;
  name: string;
  svgMarkup: string;
}

export const Y2K_STICKER_LIST: Y2KStickerItem[] = [
  { id: "peeling_smiley", name: "Smiley", svgMarkup: STICKER_SVG_STRINGS.peeling_smiley },
  { id: "boombox", name: "Boombox", svgMarkup: STICKER_SVG_STRINGS.boombox },
  { id: "game_console", name: "Game Boy", svgMarkup: STICKER_SVG_STRINGS.game_console },
  { id: "cellphone", name: "Cell Phone", svgMarkup: STICKER_SVG_STRINGS.cellphone },
  { id: "cool_badge", name: "Cool Star", svgMarkup: STICKER_SVG_STRINGS.cool_badge },
  { id: "floppy_disk", name: "Floppy", svgMarkup: STICKER_SVG_STRINGS.floppy_disk },
  { id: "smile_window", name: "OS Window", svgMarkup: STICKER_SVG_STRINGS.smile_window },
  { id: "heart_buddy", name: "Heart", svgMarkup: STICKER_SVG_STRINGS.heart_buddy },
  { id: "saturn_planet", name: "Saturn", svgMarkup: STICKER_SVG_STRINGS.saturn_planet },
  { id: "cassette", name: "Mixtape", svgMarkup: STICKER_SVG_STRINGS.cassette },
  { id: "rotary_phone", name: "Telephone", svgMarkup: STICKER_SVG_STRINGS.rotary_phone },
  { id: "alien", name: "Alien", svgMarkup: STICKER_SVG_STRINGS.alien },
  { id: "dont_worry", name: "Be Happy", svgMarkup: STICKER_SVG_STRINGS.dont_worry },
  { id: "retro_daisy", name: "Daisy", svgMarkup: STICKER_SVG_STRINGS.retro_daisy },
  { id: "lollipop", name: "Lollipop", svgMarkup: STICKER_SVG_STRINGS.lollipop },
  { id: "lips", name: "Pop Lips", svgMarkup: STICKER_SVG_STRINGS.lips },
];

// In-memory image cache for canvas drawing
const stickerImageCache = new Map<string, HTMLImageElement>();

export function getLoadedStickerImage(id: string): HTMLImageElement | null {
  if (typeof window === "undefined") return null;

  if (stickerImageCache.has(id)) {
    return stickerImageCache.get(id)!;
  }

  const svgStr = STICKER_SVG_STRINGS[id];
  if (!svgStr) return null;

  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgStr)}`;
  stickerImageCache.set(id, img);
  return img;
}

// Preload all sticker images on module load in browser
if (typeof window !== "undefined") {
  for (const item of Y2K_STICKER_LIST) {
    getLoadedStickerImage(item.id);
  }
}
