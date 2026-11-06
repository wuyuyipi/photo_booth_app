"use client";

import React from "react";
import { RefreshCw, AlertTriangle, Settings, CameraOff } from "lucide-react";
import { StarSparkle, Y2KSpeechBubble, Y2KWindowHeader } from "./Y2KStickers";

interface PermissionDeniedViewProps {
  onRetry: () => void;
  errorMessage?: string;
}

export const PermissionDeniedView: React.FC<PermissionDeniedViewProps> = ({
  onRetry,
  errorMessage,
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between w-full h-full y2k-wavy-purple text-black px-4 pt-safe pb-safe select-none">
      {/* Background Sparkles */}
      <div className="absolute top-10 left-5 pointer-events-none opacity-80">
        <StarSparkle size={24} color="#ffe600" />
      </div>
      <div className="absolute top-20 right-6 pointer-events-none opacity-80">
        <StarSparkle size={30} color="#00e5ff" />
      </div>

      {/* Top Header Speech Bubble */}
      <div className="w-full flex items-center justify-center pt-4 z-10">
        <Y2KSpeechBubble text="I'm not sure! :(" bg="#ffe600" />
      </div>

      {/* Main Error Window (Retro System Alert like in reference image!) */}
      <div className="w-full max-w-sm my-auto rounded-2xl border-[3.5px] border-black bg-white shadow-y2k-lg overflow-hidden z-10">
        {/* Retro Window Titlebar */}
        <Y2KWindowHeader
          title="alert.exe [camera_err]"
          icon={<AlertTriangle className="w-4 h-4 text-black fill-[#ffe600]" />}
          color="#ffe600"
        />

        {/* Window Body */}
        <div className="p-5 flex flex-col items-center text-center">
          {/* Yellow Warning Triangle Icon (like in reference image!) */}
          <div className="w-16 h-16 rounded-2xl bg-[#ffe600] border-[2.5px] border-black flex items-center justify-center shadow-y2k mb-3">
            <CameraOff className="w-8 h-8 text-black" />
          </div>

          <h1 className="text-xl font-black uppercase tracking-tight text-black mb-1">
            Camera Access Needed!
          </h1>
          <p className="text-xs font-bold text-neutral-700 mb-4 leading-relaxed">
            Photobooth needs your camera to snap your 4-photo strip.
          </p>

          {/* Step-by-Step Instructions */}
          <div className="w-full bg-[#f4f4f5] border-[2px] border-black rounded-xl p-3 text-left space-y-2.5 mb-4 shadow-y2k-sm">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-black pb-1 border-b border-black/20">
              <Settings className="w-3.5 h-3.5" />
              <span>How to enable on iPhone:</span>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-md bg-[#ff2a85] border border-black text-white text-xs font-black flex items-center justify-center">
                1
              </span>
              <p className="text-xs font-bold text-black leading-tight">
                Tap <span className="bg-[#ffe600] px-1 py-0.5 border border-black rounded">aA</span> in Safari address bar.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-md bg-[#00e5ff] border border-black text-black text-xs font-black flex items-center justify-center">
                2
              </span>
              <p className="text-xs font-bold text-black leading-tight">
                Select <strong>Website Settings</strong> &gt; <strong>Camera</strong>.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-5 h-5 rounded-md bg-[#ffe600] border border-black text-black text-xs font-black flex items-center justify-center">
                3
              </span>
              <p className="text-xs font-bold text-black leading-tight">
                Set to <strong>Allow</strong> &amp; tap <strong>Try Again</strong>!
              </p>
            </div>
          </div>

          {errorMessage && (
            <p className="text-[11px] font-mono font-bold text-red-600 bg-red-100 border border-red-400 px-2 py-1 rounded-md mb-2">
              {errorMessage}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="w-full max-w-sm pb-4 z-10">
        <button
          onClick={onRetry}
          type="button"
          className="btn-y2k w-full h-14 bg-[#ffe600] border-[3px] border-black rounded-2xl flex items-center justify-center gap-2 font-black text-base uppercase tracking-wider text-black shadow-y2k active:translate-x-[2px] active:translate-y-[2px]"
        >
          <RefreshCw className="w-5 h-5 stroke-[2.5]" />
          <span>Try Again ★</span>
        </button>
      </div>
    </div>
  );
};
