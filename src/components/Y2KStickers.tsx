"use client";

import React from "react";

// Y2K 4-Point Star Sparkle
export const StarSparkle: React.FC<{
  className?: string;
  color?: string;
  size?: number;
}> = ({ className = "", color = "#ffffff", size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
  </svg>
);

// Cute Y2K Heart with Black Outline & Eyes
export const Y2KHeartFace: React.FC<{
  className?: string;
  fill?: string;
  size?: number;
}> = ({ className = "", fill = "#00e5ff", size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 42C24 42 6 30 6 17C6 10 12 5 18 5C21 5 23 7 24 9C25 7 27 5 30 5C36 5 42 10 42 17C42 30 24 42 24 42Z"
      fill={fill}
      stroke="#000000"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <ellipse cx="17" cy="18" rx="2" ry="2.5" fill="#000000" />
    <ellipse cx="31" cy="18" rx="2" ry="2.5" fill="#000000" />
    <path
      d="M21 23 C22.5 25, 25.5 25, 27 23"
      stroke="#000000"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <ellipse cx="14" cy="22" rx="2" ry="1.2" fill="#ff2a85" opacity="0.8" />
    <ellipse cx="34" cy="22" rx="2" ry="1.2" fill="#ff2a85" opacity="0.8" />
  </svg>
);

// Cute Y2K Smiley Emoticon with Star Eyes
export const Y2KStarSmiley: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = "", size = 42 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="21" fill="#ffe600" stroke="#000000" strokeWidth="3.5" />
    <path
      d="M16 14L17.5 18.5L22 18.5L18.5 21L20 25.5L16 23L12 25.5L13.5 21L10 18.5L14.5 18.5Z"
      fill="#00e5ff"
      stroke="#000000"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M32 14L33.5 18.5L38 18.5L34.5 21L36 25.5L32 23L28 25.5L29.5 21L26 18.5L30.5 18.5Z"
      fill="#00e5ff"
      stroke="#000000"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M18 29C18 34 30 34 30 29Z"
      fill="#ff2a85"
      stroke="#000000"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Cute Speech Bubble
export const Y2KSpeechBubble: React.FC<{
  text: string;
  className?: string;
  bg?: string;
}> = ({ text, className = "", bg = "#ffffff" }) => (
  <div
    style={{ backgroundColor: bg }}
    className={`relative inline-flex items-center px-3 py-1 rounded-xl border-[2.5px] border-black shadow-y2k-sm text-xs font-black text-black tracking-wide ${className}`}
  >
    <span>{text}</span>
    <div
      style={{ borderTopColor: bg }}
      className="absolute -bottom-2 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] z-10"
    />
    <div className="absolute -bottom-3 left-[11px] w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[10px] border-t-black" />
  </div>
);

// Retro OS Window Header
export const Y2KWindowHeader: React.FC<{
  title: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  color?: string;
}> = ({ title, icon, onClose, color = "#ff2a85" }) => (
  <div
    style={{ backgroundColor: color }}
    className="w-full flex items-center justify-between px-3 py-2 border-b-[2.5px] border-black text-black select-none"
  >
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
        {title}
      </span>
    </div>

    <div className="flex items-center gap-1">
      <div className="w-4 h-4 bg-white border-[1.5px] border-black flex items-center justify-center text-[10px] font-bold shadow-[1px_1px_0px_#000]">
        _
      </div>
      <div className="w-4 h-4 bg-white border-[1.5px] border-black flex items-center justify-center text-[9px] font-bold shadow-[1px_1px_0px_#000]">
        □
      </div>
      <button
        onClick={onClose}
        type="button"
        className="w-4 h-4 bg-[#ff3b30] border-[1.5px] border-black flex items-center justify-center text-[10px] font-black text-white shadow-[1px_1px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
      >
        ×
      </button>
    </div>
  </div>
);

// Sticker Definitions for Sticker Drawer
export interface StickerItem {
  id: string;
  name: string;
  type: "heart" | "smiley" | "sparkle" | "emoji" | "text";
  emoji?: string;
  text?: string;
  bg?: string;
  color?: string;
}

export const STICKER_LIBRARY: StickerItem[] = [
  { id: "heart_cyan", name: "Heart", type: "heart", bg: "#00e5ff" },
  { id: "heart_pink", name: "Pink Heart", type: "heart", bg: "#ff2a85" },
  { id: "heart_yellow", name: "Yellow Heart", type: "heart", bg: "#ffe600" },
  { id: "star_smiley", name: "Smiley", type: "smiley" },
  { id: "sparkle_gold", name: "Sparkle", type: "sparkle", color: "#ffe600" },
  { id: "sparkle_pink", name: "Pink Star", type: "sparkle", color: "#ff2a85" },
  { id: "emoji_butterfly", name: "Butterfly", type: "emoji", emoji: "🦋" },
  { id: "emoji_bow", name: "Ribbon", type: "emoji", emoji: "🎀" },
  { id: "emoji_flower", name: "Daisy", type: "emoji", emoji: "🌸" },
  { id: "emoji_fire", name: "Fire", type: "emoji", emoji: "🔥" },
  { id: "emoji_cherry", name: "Cherries", type: "emoji", emoji: "🍒" },
  { id: "emoji_peace", name: "Peace", type: "emoji", emoji: "✌️" },
  { id: "stamp_besties", name: "BESTIES", type: "text", text: "BESTIES ♡", bg: "#ff2a85", color: "#ffffff" },
  { id: "stamp_smile", name: "SMILE", type: "text", text: "SMILE! :3", bg: "#ffe600", color: "#000000" },
  { id: "stamp_xoxo", name: "XOXO", type: "text", text: "XOXO ★", bg: "#00e5ff", color: "#000000" },
  { id: "stamp_y2k", name: "2000s", type: "text", text: "2000s VIBE", bg: "#a78bfa", color: "#ffffff" },
];
