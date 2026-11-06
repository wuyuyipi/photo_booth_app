"use client";

import React from "react";

export interface Y2KFrameDef {
  id: string;
  name: string;
  tagline: string;
  badgeColor: string;
  svgMarkup: string;
}

export const Y2K_FRAMES: Y2KFrameDef[] = [
  {
    id: "none",
    name: "No Frame",
    tagline: "Clean",
    badgeColor: "#ffffff",
    svgMarkup: "",
  },
  {
    id: "cyber_star",
    name: "Cyber Star",
    tagline: "Y2K Star",
    badgeColor: "#00d2f0",
    svgMarkup: `<svg viewBox="0 0 360 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask_cyber_star">
          <rect x="-100" y="-100" width="560" height="800" fill="white" />
          <polygon points="180,175 215,261 308,268 237,329 259,419 180,370 101,419 123,329 52,268 145,261" fill="black" />
        </mask>
      </defs>
      <!-- Background pattern with extended bleed for full coverage without distortion -->
      <g mask="url(#mask_cyber_star)">
        <rect x="-100" y="-100" width="560" height="800" fill="#00d2f0" />
        <!-- Retro Wavy lines -->
        <path d="M-50,45 Q90,15 230,45 T510,45 M-50,115 Q90,85 230,115 T510,115 M-50,475 Q90,445 230,475 T510,475 M-50,545 Q90,515 230,545 T510,545" stroke="rgba(255,255,255,0.45)" stroke-width="3" fill="none" />
        <!-- Top Left WOW badge -->
        <g transform="translate(20, 24) rotate(-10)">
          <rect width="64" height="28" rx="8" fill="#ffd200" stroke="#000000" stroke-width="3" />
          <text x="32" y="19" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="13" fill="#000000">WOW!</text>
        </g>
        <!-- Purple Saturn Planet -->
        <g transform="translate(16, 68)">
          <ellipse cx="28" cy="22" rx="24" ry="9" fill="#6366f1" stroke="#000000" stroke-width="2.5" />
          <circle cx="28" cy="20" r="14" fill="#ff2a85" stroke="#000000" stroke-width="2.5" />
        </g>
        <!-- Top Right Smiley -->
        <g transform="translate(288, 22)">
          <circle cx="24" cy="24" r="22" fill="#ffd200" stroke="#000000" stroke-width="3" />
          <ellipse cx="18" cy="20" rx="2.5" ry="5" fill="#000000" />
          <ellipse cx="30" cy="20" rx="2.5" ry="5" fill="#000000" />
          <path d="M17 29 Q24 35 31 29" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </g>
        <!-- Bottom Left Good Vibes Smile Badge -->
        <g transform="translate(22, 490)">
          <circle cx="34" cy="34" r="30" fill="#ff2a85" stroke="#000000" stroke-width="3" />
          <circle cx="34" cy="34" r="20" fill="#00e5ff" />
          <ellipse cx="28" cy="30" rx="2.5" ry="5" fill="#000000" />
          <ellipse cx="40" cy="30" rx="2.5" ry="5" fill="#000000" />
          <path d="M28 38 Q34 44 40 38" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </g>
        <!-- Bottom Right Pink Card -->
        <g transform="translate(270, 500) rotate(8)">
          <rect width="64" height="42" rx="8" fill="#ff2a85" stroke="#000000" stroke-width="3" />
          <text x="32" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="12" fill="#ffffff" letter-spacing="1">HELLO</text>
        </g>
      </g>
      <!-- Perfectly Proportioned Symmetrical 5-Point Star Cutout Rim -->
      <polygon points="180,175 215,261 308,268 237,329 259,419 180,370 101,419 123,329 52,268 145,261" fill="none" stroke="#ffd200" stroke-width="8" stroke-linejoin="round" />
      <polygon points="180,175 215,261 308,268 237,329 259,419 180,370 101,419 123,329 52,268 145,261" fill="none" stroke="#000000" stroke-width="3.5" stroke-linejoin="round" />
    </svg>`,
  },
  {
    id: "retro_arch",
    name: "Retro Arch",
    tagline: "Arch Portal",
    badgeColor: "#00b894",
    svgMarkup: `<svg viewBox="0 0 360 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask_retro_arch">
          <rect x="-100" y="-100" width="560" height="800" fill="white" />
          <!-- Perfectly proportioned circular arch cutout matching reference -->
          <path d="M60,280 A120,120 0 0,1 300,280 L300,530 L60,530 Z" fill="black" />
        </mask>
      </defs>
      <!-- Background pattern with extended bleed -->
      <g mask="url(#mask_retro_arch)">
        <rect x="-100" y="-100" width="560" height="800" fill="#00b894" />
        <!-- Concentric topo ripples in top-right corner -->
        <g stroke="rgba(255,255,255,0.35)" stroke-width="3" fill="none">
          <circle cx="320" cy="90" r="30" />
          <circle cx="320" cy="90" r="60" />
          <circle cx="320" cy="90" r="90" />
          <circle cx="320" cy="90" r="120" />
          <circle cx="320" cy="90" r="150" />
        </g>
        <!-- Curved Banner Tape at top -->
        <g transform="translate(0, 45)">
          <path d="M35,65 Q180,-10 325,65" stroke="#ffffff" stroke-width="26" fill="none" stroke-linecap="round" />
          <path d="M35,65 Q180,-10 325,65" stroke="#ff2a85" stroke-width="18" fill="none" stroke-linecap="round" />
          <text font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="12.5" fill="#ffffff" letter-spacing="2">
            <textPath href="#textPathArchNorm" startOffset="50%" text-anchor="middle">★ HAVE A NICE DAY ★</textPath>
          </text>
          <path id="textPathArchNorm" d="M35,69 Q180,-6 325,69" fill="none" />
        </g>
        <!-- Cute smile badge bottom left -->
        <g transform="translate(18, 545)">
          <rect width="75" height="26" rx="6" fill="#ffd200" stroke="#000000" stroke-width="2.5" />
          <text x="37" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="#000000">HELLO :)</text>
        </g>
      </g>
      <!-- Perfectly Rounded Arch Cutout Rim -->
      <path d="M60,280 A120,120 0 0,1 300,280 L300,530 L60,530 Z" fill="none" stroke="#ffd200" stroke-width="8" stroke-linejoin="round" />
      <path d="M60,280 A120,120 0 0,1 300,280 L300,530 L60,530 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round" />
    </svg>`,
  },
  {
    id: "oval_portal",
    name: "Oval Portal",
    tagline: "Cosmic Glow",
    badgeColor: "#6d28d9",
    svgMarkup: `<svg viewBox="0 0 360 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask_oval_portal">
          <rect x="-100" y="-100" width="560" height="800" fill="white" />
          <!-- Slanted oval cutout with natural 1.43 proportions matching reference -->
          <ellipse cx="180" cy="310" rx="115" ry="165" transform="rotate(-18 180 310)" fill="black" />
        </mask>
      </defs>
      <!-- Background filling canvas with bleed -->
      <g mask="url(#mask_oval_portal)">
        <rect x="-100" y="-100" width="560" height="800" fill="#18181b" />
        <!-- Constellation Lines & Stars -->
        <g stroke="rgba(0, 229, 255, 0.4)" stroke-width="2" fill="none">
          <line x1="20" y1="50" x2="70" y2="25" />
          <line x1="70" y1="25" x2="110" y2="70" />
          <line x1="250" y1="540" x2="300" y2="500" />
          <line x1="300" y1="500" x2="340" y2="570" />
        </g>
        <!-- Sparkles in corners -->
        <path d="M315,65 L319,77 L331,80 L319,83 L315,95 L311,83 L299,80 L311,77 Z" fill="#ffffff" />
        <path d="M35,510 L39,520 L49,523 L39,526 L35,536 L31,526 L21,523 L31,520 Z" fill="#ffd200" />
        <!-- Cyan Daisy Character in bottom right -->
        <g transform="translate(255, 475)">
          <circle cx="34" cy="34" r="30" fill="#00e5ff" stroke="#000000" stroke-width="3" />
          <circle cx="34" cy="34" r="18" fill="#ffffff" stroke="#000000" stroke-width="2.5" />
          <ellipse cx="29" cy="32" rx="3" ry="5" fill="#000000" />
          <ellipse cx="39" cy="32" rx="3" ry="5" fill="#000000" />
          <path d="M29 40 Q34 44 39 40" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </g>
      </g>
      <!-- Smooth True Oval Cutout Rim -->
      <ellipse cx="180" cy="310" rx="115" ry="165" transform="rotate(-18 180 310)" fill="none" stroke="#ff2a85" stroke-width="9" />
      <ellipse cx="180" cy="310" rx="115" ry="165" transform="rotate(-18 180 310)" fill="none" stroke="#ffffff" stroke-width="3.5" />
      <ellipse cx="180" cy="310" rx="115" ry="165" transform="rotate(-18 180 310)" fill="none" stroke="#000000" stroke-width="2" />
    </svg>`,
  },
  {
    id: "y2k_periwinkle",
    name: "Periwinkle",
    tagline: "Y2K Pop",
    badgeColor: "#818cf8",
    svgMarkup: `<svg viewBox="0 0 360 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask_y2k_periwinkle">
          <rect x="-100" y="-100" width="560" height="800" fill="white" />
          <rect x="38" y="52" width="284" height="476" rx="18" fill="black" />
        </mask>
      </defs>
      <!-- Background filling canvas with bleed -->
      <g mask="url(#mask_y2k_periwinkle)">
        <rect x="-100" y="-100" width="560" height="800" fill="#818cf8" />
        <!-- Spiral Spring wire top left -->
        <g stroke="rgba(0,0,0,0.3)" stroke-width="2.5" fill="none">
          <ellipse cx="70" cy="22" rx="45" ry="9" />
          <ellipse cx="70" cy="30" rx="45" ry="9" />
          <ellipse cx="70" cy="38" rx="45" ry="9" />
        </g>
        <!-- Golden Sparkles on right edge -->
        <path d="M336,85 L340,100 L355,103 L340,106 L336,121 L332,106 L317,103 L332,100 Z" fill="#ffd200" stroke="#000000" stroke-width="2.5" />
        <path d="M336,180 L339,190 L349,193 L339,196 L336,206 L333,196 L323,193 L333,190 Z" fill="#ffd200" stroke="#000000" stroke-width="2" />
        <!-- Pop Star Badge -->
        <g transform="translate(18, 545)">
          <rect width="80" height="26" rx="6" fill="#ffd200" stroke="#000000" stroke-width="2.5" />
          <text x="40" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="#000000">POP STAR ★</text>
        </g>
      </g>
      <!-- Rectangular Cutout Rim -->
      <rect x="38" y="52" width="284" height="476" rx="18" fill="none" stroke="#ffd200" stroke-width="8" />
      <rect x="38" y="52" width="284" height="476" rx="18" fill="none" stroke="#000000" stroke-width="3" />
    </svg>`,
  },
  {
    id: "cyber_ticker",
    name: "Cyber Ticker",
    tagline: "Streetwear",
    badgeColor: "#18181b",
    svgMarkup: `<svg viewBox="0 0 360 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask_cyber_ticker">
          <rect x="-100" y="-100" width="560" height="800" fill="white" />
          <rect x="32" y="38" width="296" height="466" rx="14" fill="black" />
        </mask>
      </defs>
      <!-- Background filling canvas with bleed -->
      <g mask="url(#mask_cyber_ticker)">
        <rect x="-100" y="-100" width="560" height="800" fill="#18181b" />
        <!-- Neon squiggly lines on sides -->
        <path d="M12,0 Q22,35 12,70 T12,140 T12,210 T12,280 T12,350 T12,420 T12,490 T12,560" stroke="#22c55e" stroke-width="2.5" fill="none" opacity="0.6" />
        <path d="M348,0 Q358,35 348,70 T348,140 T348,210 T348,280 T348,350 T348,420 T348,490 T348,560" stroke="#22c55e" stroke-width="2.5" fill="none" opacity="0.6" />
        <!-- Top Sparkles -->
        <path d="M180,14 L183,22 L191,25 L183,28 L180,36 L177,28 L169,25 L177,22 Z" fill="#ffffff" />
        <!-- Bottom Marquee Ticker -->
        <rect x="-50" y="525" width="460" height="75" fill="#ffd200" stroke="#000000" stroke-width="3.5" />
        <text x="180" y="565" text-anchor="middle" font-family="'Courier New', monospace, sans-serif" font-weight="900" font-size="18" fill="#000000" letter-spacing="4">
          ★ OK OK OK OK ★
        </text>
      </g>
      <!-- Rectangular Cutout Rim -->
      <rect x="32" y="38" width="296" height="466" rx="14" fill="none" stroke="#00e5ff" stroke-width="8" />
      <rect x="32" y="38" width="296" height="466" rx="14" fill="none" stroke="#000000" stroke-width="3" />
    </svg>`,
  },
  {
    id: "golden_sunburst",
    name: "Golden Sun",
    tagline: "Sunburst",
    badgeColor: "#ffd200",
    svgMarkup: `<svg viewBox="0 0 360 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask_golden_sunburst">
          <rect x="-100" y="-100" width="560" height="800" fill="white" />
          <path d="M60,260 A120,120 0 0,1 300,260 L300,530 L60,530 Z" fill="black" />
        </mask>
      </defs>
      <!-- Background filling canvas with bleed -->
      <g mask="url(#mask_golden_sunburst)">
        <rect x="-100" y="-100" width="560" height="800" fill="#ffd200" />
        <!-- Retro 2000s Sunburst in top-right -->
        <g transform="translate(320, 45)">
          <path d="M0,0 L-90,-30 A90,90 0 0,1 -30,-90 Z" fill="#ff2a85" />
          <path d="M0,0 L-120,15 A120,120 0 0,1 -90,-30 Z" fill="#ff70a6" />
          <path d="M0,0 L-120,70 A120,120 0 0,1 -120,15 Z" fill="#ff2a85" />
          <path d="M0,0 L-70,120 A120,120 0 0,1 -120,70 Z" fill="#ff70a6" />
        </g>
        <!-- Good Vibes ribbon top left -->
        <g transform="translate(22, 22)">
          <circle cx="34" cy="34" r="28" fill="#6366f1" stroke="#000000" stroke-width="3" />
          <text x="34" y="29" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="10" fill="#ffffff" letter-spacing="1">GOOD</text>
          <text x="34" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="10" fill="#ffffff" letter-spacing="1">VIBES</text>
        </g>
      </g>
      <!-- Arch Cutout Rim -->
      <path d="M60,260 A120,120 0 0,1 300,260 L300,530 L60,530 Z" fill="none" stroke="#ff2a85" stroke-width="8" stroke-linejoin="round" />
      <path d="M60,260 A120,120 0 0,1 300,260 L300,530 L60,530 Z" fill="none" stroke="#000000" stroke-width="3" stroke-linejoin="round" />
    </svg>`,
  },
  {
    id: "duo_windows",
    name: "Duo Snap",
    tagline: "2 Photos",
    badgeColor: "#a78bfa",
    svgMarkup: `<svg viewBox="0 0 360 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="mask_duo_windows">
          <rect x="-100" y="-100" width="560" height="800" fill="white" />
          <!-- Two staggered square photo windows matching reference -->
          <rect x="155" y="45" width="170" height="205" rx="12" fill="black" />
          <rect x="35" y="295" width="170" height="205" rx="12" fill="black" />
        </mask>
      </defs>
      <!-- Background filling canvas with bleed -->
      <g mask="url(#mask_duo_windows)">
        <rect x="-100" y="-100" width="560" height="800" fill="#18181b" />
        <path d="M-50,30 Q90,5 230,30 T510,30 M-50,270 Q90,245 230,270 T510,270 M-50,540 Q90,515 230,540 T510,540" stroke="rgba(167, 139, 250, 0.4)" stroke-width="2.5" fill="none" />
        <g transform="translate(45, 60)">
          <ellipse cx="30" cy="18" rx="28" ry="8" fill="none" stroke="#a78bfa" stroke-width="2.5" />
          <ellipse cx="30" cy="28" rx="28" ry="8" fill="none" stroke="#a78bfa" stroke-width="2.5" />
        </g>
        <g transform="translate(38, 140)">
          <path d="M25,35 A12,12 0 0,1 45,15 A12,12 0 0,1 65,35 Q65,55 45,70 Q25,55 25,35 Z" fill="#00e5ff" stroke="#000000" stroke-width="2.5" />
        </g>
        <g transform="translate(240, 420)">
          <circle cx="28" cy="28" r="24" fill="#ffd200" stroke="#000000" stroke-width="3" />
          <ellipse cx="22" cy="24" rx="2.5" ry="4.5" fill="#000000" />
          <ellipse cx="34" cy="24" rx="2.5" ry="4.5" fill="#000000" />
          <path d="M21 33 Q28 38 35 33" stroke="#000000" stroke-width="2.5" fill="none" stroke-linecap="round" />
        </g>
        <g transform="translate(240, 520)">
          <rect width="84" height="28" rx="6" fill="#ff2a85" stroke="#000000" stroke-width="2.5" />
          <text x="42" y="19" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="11" fill="#ffffff">Y2K DUO ★</text>
        </g>
      </g>
      <rect x="155" y="45" width="170" height="205" rx="12" fill="none" stroke="#ffd200" stroke-width="8" />
      <rect x="155" y="45" width="170" height="205" rx="12" fill="none" stroke="#000000" stroke-width="3" />
      <rect x="35" y="295" width="170" height="205" rx="12" fill="none" stroke="#ff2a85" stroke-width="8" />
      <rect x="35" y="295" width="170" height="205" rx="12" fill="none" stroke="#000000" stroke-width="3" />
    </svg>`,
  },
];

// In-memory image cache for canvas frame rendering
const frameImageCache = new Map<string, HTMLImageElement>();

export function getLoadedFrameImage(frameId: string): HTMLImageElement | null {
  if (typeof window === "undefined" || frameId === "none") return null;

  if (frameImageCache.has(frameId)) {
    return frameImageCache.get(frameId)!;
  }

  const frameDef = Y2K_FRAMES.find((f) => f.id === frameId);
  if (!frameDef || !frameDef.svgMarkup) return null;

  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(frameDef.svgMarkup)}`;
  frameImageCache.set(frameId, img);
  return img;
}

// Preload all frame images
if (typeof window !== "undefined") {
  for (const f of Y2K_FRAMES) {
    if (f.id !== "none") {
      getLoadedFrameImage(f.id);
    }
  }
}
