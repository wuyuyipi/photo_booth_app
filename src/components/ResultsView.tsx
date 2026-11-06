"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Download, RotateCcw, Share, Check, Heart, Sparkles } from "lucide-react";
import { generatePhotoStrip } from "../utils/photostrip";
import { StarSparkle, Y2KSpeechBubble, Y2KWindowHeader, Y2KStarSmiley } from "./Y2KStickers";

interface ResultsViewProps {
  photos: string[];
  onRetake: () => void;
}

const FRAME_OPTIONS = [
  { name: "Y2K Pink", color: "#FF2A85", borderClass: "bg-[#FF2A85]" },
  { name: "Cyber Cyan", color: "#00E5FF", borderClass: "bg-[#00E5FF]" },
  { name: "Sunny Yellow", color: "#FFE600", borderClass: "bg-[#FFE600]" },
  { name: "Classic White", color: "#FFFFFF", borderClass: "bg-white" },
  { name: "Cyber Noir", color: "#18181B", borderClass: "bg-neutral-900" },
];

export const ResultsView: React.FC<ResultsViewProps> = ({ photos, onRetake }) => {
  const [selectedFrame, setSelectedFrame] = useState(FRAME_OPTIONS[3]); // Classic White default
  const [stripUrl, setStripUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff2a85", "#00e5ff", "#ffe600", "#7c3aed", "#ffffff"],
      });
    } catch {
      // Ignore
    }
  }, []);

  // Generate strip whenever frame changes
  useEffect(() => {
    let isCancelled = false;

    async function build() {
      setIsGenerating(true);
      try {
        const url = await generatePhotoStrip(photos, {
          frameColor: selectedFrame.color,
        });
        if (!isCancelled) {
          setStripUrl(url);
          setIsGenerating(false);
        }
      } catch (err) {
        console.error("Failed to generate strip", err);
        setIsGenerating(false);
      }
    }

    build();

    return () => {
      isCancelled = true;
    };
  }, [photos, selectedFrame]);

  // Helper to trigger browser download
  const triggerDownload = (url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `photobooth-y2k-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Save handler (Web Share Sheet on phone, download on laptop)
  const handleSave = async () => {
    if (!stripUrl || isSharing) return;
    setIsSharing(true);

    try {
      const res = await fetch(stripUrl);
      const blob = await res.blob();
      const filename = `photobooth-y2k-${Date.now()}.png`;
      const file = new File([blob], filename, { type: "image/png" });

      const canShareFiles =
        typeof navigator !== "undefined" &&
        !!navigator.canShare &&
        navigator.canShare({ files: [file] });

      if (canShareFiles) {
        try {
          await navigator.share({
            files: [file],
            title: "Y2K Photo Booth Strip",
            text: "Taken with Y2K Photo Booth! ♡",
          });
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 3000);
        } catch (shareErr: unknown) {
          if ((shareErr as { name?: string })?.name !== "AbortError") {
            triggerDownload(stripUrl);
          }
        }
      } else {
        triggerDownload(stripUrl);
      }
    } catch (err) {
      console.error("Error during save/share:", err);
      triggerDownload(stripUrl);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full y2k-wavy-cyan flex flex-col justify-between overflow-hidden select-none px-2 sm:px-4">
      {/* Background Sparkles */}
      <div className="absolute top-14 left-4 pointer-events-none opacity-80">
        <StarSparkle size={24} color="#ffe600" />
      </div>
      <div className="absolute top-24 right-5 pointer-events-none opacity-80">
        <StarSparkle size={28} color="#ff2a85" />
      </div>

      {/* Top Bar with Safe Area */}
      <header className="flex-shrink-0 w-full pt-safe px-2 pb-1 flex items-center justify-between z-20">
        {/* Retake Button (Top-left quick return) */}
        <button
          onClick={onRetake}
          type="button"
          className="btn-y2k flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-[2.5px] border-black bg-white shadow-y2k font-black text-xs uppercase tracking-wider text-black active:translate-x-[2px] active:translate-y-[2px]"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Retake</span>
        </button>

        {/* Center Speech Bubble */}
        <Y2KSpeechBubble text="Enjoy :) ★" bg="#ffe600" />

        {/* Right Saved Status Pill */}
        <div className="w-20 flex justify-end">
          {savedSuccess && (
            <span className="flex items-center gap-1 text-[11px] font-black text-black bg-[#4ade80] border-[2px] border-black px-2 py-0.5 rounded-lg shadow-y2k-sm">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Saved!
            </span>
          )}
        </div>
      </header>

      {/* Main Preview: Scrollable area with Retro OS Window Frame */}
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start py-2 px-1 pb-28">
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Retro Window Housing the Strip */}
          <div className="w-full rounded-2xl border-[3.5px] border-black bg-white shadow-y2k-lg overflow-hidden my-1">
            <Y2KWindowHeader
              title="strip_preview.bmp [100%]"
              icon={<Heart className="w-3.5 h-3.5 text-black fill-black" />}
              color="#ff2a85"
            />

            {/* Strip Display Area */}
            <div className="p-4 bg-[#f4f4f5] flex flex-col items-center justify-center min-h-[460px]">
              {isGenerating ? (
                <div className="w-[230px] h-[520px] rounded-xl bg-white border-[2.5px] border-black shadow-y2k flex flex-col items-center justify-center p-4">
                  <Sparkles className="w-8 h-8 text-[#ff2a85] animate-spin" />
                  <p className="text-xs font-black text-black mt-3 uppercase tracking-wider">
                    Printing strip...
                  </p>
                  <div className="w-32 h-2.5 bg-neutral-200 border border-black rounded-full overflow-hidden mt-3">
                    <div className="w-full h-full bg-[#ff2a85] animate-pulse" />
                  </div>
                </div>
              ) : stripUrl ? (
                <div className="relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stripUrl}
                    alt="Vertical Photo Booth Strip"
                    className="w-[230px] sm:w-[250px] h-auto object-contain rounded-lg shadow-y2k-lg border-[3px] border-black"
                  />

                  {/* Cute Sticker badge overlapping photo strip bottom corner */}
                  <div className="absolute -bottom-4 -right-4 pointer-events-none">
                    <Y2KStarSmiley size={44} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Frame Color Selector Palette */}
          <div className="flex items-center gap-2 mt-4 px-3.5 py-2 bg-white border-[2.5px] border-black rounded-2xl shadow-y2k">
            <span className="text-[10px] font-black text-black uppercase tracking-wider mr-1">
              Frame:
            </span>
            {FRAME_OPTIONS.map((f) => (
              <button
                key={f.name}
                onClick={() => setSelectedFrame(f)}
                type="button"
                className={`w-7 h-7 rounded-lg border-2 border-black transition-transform ${
                  selectedFrame.name === f.name
                    ? "scale-110 ring-2 ring-[#ff2a85] shadow-y2k-sm"
                    : "opacity-80 active:scale-95"
                } ${f.borderClass}`}
                title={f.name}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Sticky Action Bar with Safe Area */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t-[3.5px] border-black px-4 pt-3 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Retake Button */}
          <button
            onClick={onRetake}
            type="button"
            className="btn-y2k flex-1 h-14 bg-white border-[3px] border-black rounded-2xl flex items-center justify-center gap-2 font-black text-sm uppercase tracking-wider text-black shadow-y2k active:translate-x-[2px] active:translate-y-[2px]"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>Retake</span>
          </button>

          {/* Primary Save Button (Bright Yellow Y2K Button) */}
          <button
            onClick={handleSave}
            disabled={isGenerating || !stripUrl}
            type="button"
            className="btn-y2k flex-[2] h-14 bg-[#ffe600] border-[3px] border-black rounded-2xl flex items-center justify-center gap-2 font-black text-base uppercase tracking-wider text-black shadow-y2k active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50"
          >
            {savedSuccess ? (
              <>
                <Check className="w-5 h-5 stroke-[3] text-black" />
                <span>Saved! ★</span>
              </>
            ) : (
              <>
                <Share className="w-5 h-5 stroke-[2.5]" />
                <span>Save Strip ★</span>
              </>
            )}
          </button>

          {/* Direct File Download Button */}
          {stripUrl && (
            <button
              onClick={() => triggerDownload(stripUrl)}
              type="button"
              className="btn-y2k w-14 h-14 bg-[#00e5ff] border-[3px] border-black rounded-2xl flex items-center justify-center text-black shadow-y2k active:translate-x-[2px] active:translate-y-[2px]"
              title="Download image file"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
