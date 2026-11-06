"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Camera, SwitchCamera, Wand2, Sparkles, Trash2, Heart, Check, Image as ImageIcon } from "lucide-react";
import { playCountdownBeep, playShutterSound } from "../utils/audio";
import {
  StarSparkle,
  Y2KSpeechBubble,
  Y2KWindowHeader,
} from "./Y2KStickers";
import {
  Y2K_STICKER_LIST,
  Y2KStickerItem,
  STICKER_SVG_STRINGS,
  getLoadedStickerImage,
} from "./Y2KStickerSVGs";
import {
  Y2K_FRAMES,
  Y2KFrameDef,
  getLoadedFrameImage,
} from "./Y2KFrameSVGs";

interface CameraViewProps {
  onCaptureComplete: (photos: string[]) => void;
  onPermissionDenied: (errorMsg: string) => void;
}

export interface FilterDef {
  id: string;
  name: string;
  tagline: string;
  cssFilter: string;
  canvasFilter: string;
  badgeColor: string;
}

export const CAMERA_FILTERS: FilterDef[] = [
  {
    id: "none",
    name: "Original",
    tagline: "Natural",
    cssFilter: "none",
    canvasFilter: "none",
    badgeColor: "#ffe600",
  },
  {
    id: "bw",
    name: "Cyber B&W",
    tagline: "Noir",
    cssFilter: "grayscale(100%) contrast(125%)",
    canvasFilter: "grayscale(100%) contrast(125%)",
    badgeColor: "#ffffff",
  },
  {
    id: "warm",
    name: "Golden 2000s",
    tagline: "Warm Glow",
    cssFilter: "sepia(50%) contrast(110%) brightness(105%) saturate(120%)",
    canvasFilter: "sepia(50%) contrast(110%) brightness(105%) saturate(120%)",
    badgeColor: "#ffd700",
  },
  {
    id: "vintage",
    name: "Retro 90s",
    tagline: "Analog",
    cssFilter: "contrast(115%) brightness(95%) sepia(25%) saturate(85%)",
    canvasFilter: "contrast(115%) brightness(95%) sepia(25%) saturate(85%)",
    badgeColor: "#ff2a85",
  },
  {
    id: "cool",
    name: "Neon Cyan",
    tagline: "Cyber",
    cssFilter: "saturate(90%) hue-rotate(185deg) contrast(115%)",
    canvasFilter: "saturate(90%) hue-rotate(185deg) contrast(115%)",
    badgeColor: "#00e5ff",
  },
  {
    id: "fade",
    name: "Pastel Pop",
    tagline: "Dreamy",
    cssFilter: "contrast(95%) brightness(108%) saturate(115%) hue-rotate(330deg)",
    canvasFilter: "contrast(95%) brightness(108%) saturate(115%) hue-rotate(330deg)",
    badgeColor: "#f472b6",
  },
];

export interface ActiveStickerInstance {
  instanceId: string;
  stickerId: string;
  xPct: number; // 0 to 1
  yPct: number; // 0 to 1
  size: number;
}

export const CameraView: React.FC<CameraViewProps> = ({
  onCaptureComplete,
  onPermissionDenied,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [selectedFilterId, setSelectedFilterId] = useState<string>("none");
  const [selectedFrameId, setSelectedFrameId] = useState<string>("none");

  // Drawer toggles
  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [showFramePicker, setShowFramePicker] = useState(false);

  const [previewThumbUrl, setPreviewThumbUrl] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // User placed stickers
  const [placedStickers, setPlacedStickers] = useState<ActiveStickerInstance[]>([]);

  // Shooting sequence states
  const [isShooting, setIsShooting] = useState(false);
  const [currentShotIndex, setCurrentShotIndex] = useState(0); // 0 to 3
  const [countdown, setCountdown] = useState<number | null>(null); // 3, 2, 1
  const [isFlashing, setIsFlashing] = useState(false);
  const [capturedThumbs, setCapturedThumbs] = useState<string[]>([]);

  const activeFilter =
    CAMERA_FILTERS.find((f) => f.id === selectedFilterId) || CAMERA_FILTERS[0];
  const activeFrame =
    Y2K_FRAMES.find((f) => f.id === selectedFrameId) || Y2K_FRAMES[0];

  // Start Camera Stream
  const startCamera = useCallback(async () => {
    try {
      setIsCameraReady(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
          setIsCameraReady(true);
        };
      }
    } catch (err: unknown) {
      console.error("Camera access error:", err);
      const error = err as Error;
      if (
        error.name === "NotAllowedError" ||
        error.name === "PermissionDeniedError" ||
        error.name === "NotFoundError"
      ) {
        onPermissionDenied(
          error.message || "Camera permission denied or camera device not found."
        );
      } else {
        onPermissionDenied(
          "Could not access camera. Please make sure no other app is using it."
        );
      }
    }
  }, [facingMode, onPermissionDenied]);

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [startCamera]);

  // Flip front / back camera
  const toggleFacingMode = () => {
    if (isShooting) return;
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  // Capture small snapshot for filter thumbnail previews
  const captureThumbnailSample = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = 160;
      canvas.height = 160;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const size = Math.min(video.videoWidth, video.videoHeight);
      const sx = (video.videoWidth - size) / 2;
      const sy = (video.videoHeight - size) / 2;

      ctx.save();
      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, sx, sy, size, size, 0, 0, 160, 160);
      ctx.restore();

      setPreviewThumbUrl(canvas.toDataURL("image/jpeg", 0.8));
    } catch {
      // Ignore
    }
  }, [facingMode]);

  // Toggle filter drawer
  const handleToggleFilterPicker = () => {
    if (isShooting) return;
    setShowStickerPicker(false);
    setShowFramePicker(false);
    if (!showFilterPicker) {
      captureThumbnailSample();
      setShowFilterPicker(true);
    } else {
      setShowFilterPicker(false);
    }
  };

  // Toggle sticker drawer
  const handleToggleStickerPicker = () => {
    if (isShooting) return;
    setShowFilterPicker(false);
    setShowFramePicker(false);
    setShowStickerPicker((prev) => !prev);
  };

  // Toggle frame drawer
  const handleToggleFramePicker = () => {
    if (isShooting) return;
    setShowFilterPicker(false);
    setShowStickerPicker(false);
    setShowFramePicker((prev) => !prev);
  };

  // Add a sticker from the list
  const handleAddSticker = (item: Y2KStickerItem) => {
    const newSticker: ActiveStickerInstance = {
      instanceId: `st_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      stickerId: item.id,
      xPct: 0.35 + Math.random() * 0.3,
      yPct: 0.35 + Math.random() * 0.3,
      size: 68,
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
  };

  // Remove a sticker
  const handleRemoveSticker = (instanceId: string) => {
    setPlacedStickers((prev) => prev.filter((s) => s.instanceId !== instanceId));
  };

  // Clear all stickers
  const handleClearStickers = () => {
    setPlacedStickers([]);
  };

  // Select frame
  const handleSelectFrame = (id: string) => {
    setSelectedFrameId(id);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
  };

  // Dragging stickers on video viewport
  const handleDragSticker = (instanceId: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (isShooting || !viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();

    const onPointerMove = (moveEvent: PointerEvent) => {
      const newXPct = Math.min(
        0.92,
        Math.max(0.08, (moveEvent.clientX - rect.left) / rect.width)
      );
      const newYPct = Math.min(
        0.92,
        Math.max(0.08, (moveEvent.clientY - rect.top) / rect.height)
      );

      setPlacedStickers((prev) =>
        prev.map((s) =>
          s.instanceId === instanceId ? { ...s, xPct: newXPct, yPct: newYPct } : s
        )
      );
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleSelectFilter = (id: string) => {
    setSelectedFilterId(id);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  // Render stickers directly onto canvas during frame capture
  const renderStickersOnCanvas = (
    ctx: CanvasRenderingContext2D,
    canvasW: number,
    canvasH: number
  ) => {
    const vpW = viewportRef.current?.clientWidth || 360;
    const scale = canvasW / vpW;

    for (const s of placedStickers) {
      const img = getLoadedStickerImage(s.stickerId);
      if (!img || !img.complete) continue;

      const cx = s.xPct * canvasW;
      const cy = s.yPct * canvasH;
      const drawSize = s.size * scale;
      const halfSize = drawSize / 2;

      ctx.save();
      ctx.drawImage(img, cx - halfSize, cy - halfSize, drawSize, drawSize);
      ctx.restore();
    }
  };

  // Capture single frame from video to data URL with exact screen crop & undistorted frame
  const snapFrame = (): string => {
    const video = videoRef.current;
    if (!video) return "";

    const viewport = viewportRef.current;
    const vpWidth = viewport?.clientWidth || 360;
    const vpHeight = viewport?.clientHeight || 600;
    const vpAspect = vpWidth / vpHeight;

    // Use crisp high-resolution portrait canvas matching viewport aspect ratio
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = Math.round(1080 / vpAspect);
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Calculate crop for video so it matches screen object-cover perfectly
    const vWidth = video.videoWidth || 1920;
    const vHeight = video.videoHeight || 1080;
    const videoAspect = vWidth / vHeight;

    let sx = 0;
    let sy = 0;
    let sw = vWidth;
    let sh = vHeight;

    if (videoAspect > vpAspect) {
      sw = vHeight * vpAspect;
      sx = (vWidth - sw) / 2;
    } else {
      sh = vWidth / vpAspect;
      sy = (vHeight - sh) / 2;
    }

    // 1. Draw video feed (mirrored for front camera + filter)
    ctx.save();
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    if (activeFilter.canvasFilter && activeFilter.canvasFilter !== "none") {
      ctx.filter = activeFilter.canvasFilter;
    }
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // 2. Draw Frame Overlay if selected (fills canvas uniformly without distortion)
    if (selectedFrameId !== "none") {
      const frameImg = getLoadedFrameImage(selectedFrameId);
      if (frameImg && frameImg.complete) {
        ctx.save();
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    }

    // 3. Render all active stickers directly onto the captured photo!
    renderStickersOnCanvas(ctx, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.95);
  };

  // Start 4-photo booth sequence
  const startShutterSequence = async () => {
    if (isShooting || !isCameraReady) return;
    setShowFilterPicker(false);
    setShowStickerPicker(false);
    setShowFramePicker(false);
    setIsShooting(true);
    setCapturedThumbs([]);

    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([20, 40, 20]);
    }

    const takenPhotos: string[] = [];

    for (let shot = 0; shot < 4; shot++) {
      setCurrentShotIndex(shot);

      for (let count = 3; count >= 1; count--) {
        setCountdown(count);
        playCountdownBeep(count === 1);
        await wait(950);
      }

      setCountdown(null);

      setIsFlashing(true);
      playShutterSound();

      const frameUrl = snapFrame();
      if (frameUrl) {
        takenPhotos.push(frameUrl);
        setCapturedThumbs((prev) => [...prev, frameUrl]);
      }

      await wait(300);
      setIsFlashing(false);

      if (shot < 3) {
        await wait(1000);
      }
    }

    await wait(600);
    setIsShooting(false);
    onCaptureComplete(takenPhotos);
  };

  return (
    <div className="absolute inset-0 w-full h-full y2k-wavy-bg flex flex-col justify-between overflow-hidden select-none px-2 sm:px-4">
      {/* Background Decorative Sparkles */}
      <div className="absolute top-20 left-4 pointer-events-none opacity-80 animate-pulse">
        <StarSparkle size={26} color="#ffe600" />
      </div>
      <div className="absolute top-36 right-6 pointer-events-none opacity-80">
        <StarSparkle size={32} color="#00e5ff" />
      </div>
      <div className="absolute bottom-36 left-3 pointer-events-none opacity-80">
        <StarSparkle size={22} color="#ffffff" />
      </div>

      {/* Screen Flash Overlay */}
      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-flash" />
      )}

      {/* Top Section with Safe Area */}
      <div className="w-full pt-safe z-20 flex flex-col gap-2">
        {/* Top Header Bar: Speech Bubble & Action Buttons (Frames, Stickers & Filters) */}
        <div className="w-full max-w-md mx-auto flex items-center justify-between px-1">
          {/* Left: Cute Speech Bubble */}
          <div className="flex-shrink-0 flex items-center gap-1.5">
            <Y2KSpeechBubble text="Smile! :3" bg="#ffffff" />
          </div>

          {/* Right: Frames, Stickers & Filters Buttons */}
          <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
            {/* Frames Button */}
            <button
              onClick={handleToggleFramePicker}
              disabled={isShooting}
              type="button"
              className={`btn-y2k flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border-[2.5px] border-black shadow-y2k font-black text-[11px] sm:text-xs uppercase tracking-tight sm:tracking-wider ${
                showFramePicker
                  ? "bg-[#6366f1] text-white"
                  : selectedFrameId !== "none"
                  ? "bg-[#00e5ff] text-black"
                  : "bg-white text-black"
              } ${isShooting ? "opacity-40 pointer-events-none" : ""}`}
              title="Photo Frames"
            >
              <ImageIcon className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Frames</span>
            </button>

            {/* Stickers Button */}
            <button
              onClick={handleToggleStickerPicker}
              disabled={isShooting}
              type="button"
              className={`btn-y2k flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border-[2.5px] border-black shadow-y2k font-black text-[11px] sm:text-xs uppercase tracking-tight sm:tracking-wider ${
                showStickerPicker
                  ? "bg-[#ff2a85] text-white"
                  : placedStickers.length > 0
                  ? "bg-[#ffe600] text-black"
                  : "bg-white text-black"
              } ${isShooting ? "opacity-40 pointer-events-none" : ""}`}
              title="Open Stickers"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Stickers</span>
              {placedStickers.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold ml-0.5">
                  {placedStickers.length}
                </span>
              )}
            </button>

            {/* Filters Button */}
            <button
              onClick={handleToggleFilterPicker}
              disabled={isShooting}
              type="button"
              className={`btn-y2k flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl border-[2.5px] border-black shadow-y2k font-black text-[11px] sm:text-xs uppercase tracking-tight sm:tracking-wider ${
                showFilterPicker
                  ? "bg-[#00e5ff] text-black"
                  : activeFilter.id !== "none"
                  ? "bg-[#ffe600] text-black"
                  : "bg-white text-black"
              } ${isShooting ? "opacity-40 pointer-events-none" : ""}`}
              title="Choose Filter"
            >
              <Wand2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Center: Main Camera Window (Retro OS 95/98 Window style) */}
      <div className="relative flex-1 w-full max-w-md mx-auto my-2 flex flex-col rounded-2xl border-[3.5px] border-black bg-white shadow-y2k-lg overflow-hidden z-10">
        {/* Retro Window Header */}
        <Y2KWindowHeader
          title="photobooth.exe [live_cam]"
          icon={<Heart className="w-3.5 h-3.5 text-black fill-black" />}
          color="#00e5ff"
        />

        {/* Live Camera Viewport (Video + Graphic Cutout Frame + Placed Stickers) */}
        <div
          ref={viewportRef}
          className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center"
        >
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              filter: activeFilter.cssFilter,
            }}
            className={`w-full h-full object-cover transition-all duration-200 pointer-events-none ${
              facingMode === "user" ? "video-mirror" : ""
            }`}
          />

          {/* Active Graphic Cutout Frame Overlay (Fills 100% of camera area) */}
          {selectedFrameId !== "none" && activeFrame.svgMarkup && (
            <div
              className="absolute inset-0 pointer-events-none z-10 w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
              dangerouslySetInnerHTML={{ __html: activeFrame.svgMarkup }}
            />
          )}

          {/* Interactive User Placed Stickers (Drag & Delete) */}
          <div className="absolute inset-0 pointer-events-auto z-20">
            {placedStickers.map((s) => (
              <div
                key={s.instanceId}
                style={{
                  left: `${s.xPct * 100}%`,
                  top: `${s.yPct * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onPointerDown={(e) => handleDragSticker(s.instanceId, e)}
                className="absolute cursor-move touch-none group filter drop-shadow-[2px_3px_0px_rgba(0,0,0,0.6)]"
              >
                <div className="relative p-1">
                  <div
                    style={{ width: `${s.size}px`, height: `${s.size}px` }}
                    className="select-none flex items-center justify-center"
                    dangerouslySetInnerHTML={{
                      __html: STICKER_SVG_STRINGS[s.stickerId] || "",
                    }}
                  />

                  {/* Quick Remove '×' Button on each sticker */}
                  {!isShooting && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSticker(s.instanceId);
                      }}
                      type="button"
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff3b30] border-1.5 border-black text-white text-[10px] font-black flex items-center justify-center shadow-md active:scale-90"
                      title="Remove sticker"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Countdown Center Display */}
          {countdown !== null && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none bg-black/35 backdrop-blur-[2px]">
              <div
                key={countdown}
                className="animate-count font-black text-9xl sm:text-[11rem] text-[#ffe600] drop-shadow-[5px_5px_0px_#000000]"
                style={{
                  WebkitTextStroke: "4px #000000",
                }}
              >
                {countdown}
              </div>
              <div className="mt-2 bg-[#ff2a85] text-white border-2 border-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-y2k-sm">
                Strike a Pose! ★
              </div>
            </div>
          )}

          {/* Shooting Status Banner */}
          {isShooting && (
            <div className="absolute top-3 left-0 right-0 z-30 flex flex-col items-center pointer-events-none px-4">
              <div className="w-full max-w-xs bg-white border-[2.5px] border-black p-1.5 rounded-xl shadow-y2k-sm flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-black px-1">
                  <span>Shot {currentShotIndex + 1} of 4</span>
                  <span className="text-[#ff2a85]">
                    {Math.round(((currentShotIndex + 1) / 4) * 100)}%
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 h-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <div
                      key={idx}
                      className={`h-full rounded-sm border border-black transition-all ${
                        idx < capturedThumbs.length
                          ? "bg-[#ff2a85]"
                          : idx === currentShotIndex
                          ? "bg-[#ffe600] animate-pulse"
                          : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frames Selector Drawer (Retro Pop-Up Window) */}
      {showFramePicker && (
        <div className="absolute bottom-28 left-2 right-2 sm:left-6 sm:right-6 max-w-md mx-auto z-30 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-y2k-lg overflow-hidden">
            <Y2KWindowHeader
              title="photo_frames.exe [select_frame]"
              color="#6366f1"
              onClose={() => setShowFramePicker(false)}
            />

            <div className="p-3 bg-[#fafafa]">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
                {Y2K_FRAMES.map((f) => {
                  const isSelected = selectedFrameId === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleSelectFrame(f.id)}
                      type="button"
                      className="btn-y2k flex flex-col items-center gap-1.5 flex-shrink-0 active:scale-95 transition-transform"
                    >
                      <div
                        className={`relative w-16 h-20 rounded-xl overflow-hidden border-[2.5px] border-black bg-neutral-900 transition-all ${
                          isSelected
                            ? "scale-105 shadow-y2k ring-2 ring-[#6366f1]"
                            : "opacity-85 shadow-[1.5px_1.5px_0px_#000]"
                        }`}
                      >
                        {f.id === "none" ? (
                          <div className="w-full h-full bg-white flex flex-col items-center justify-center p-1 text-center">
                            <span className="text-[10px] font-black text-black">NO FRAME</span>
                          </div>
                        ) : (
                          <div
                            className="w-full h-full pointer-events-none"
                            dangerouslySetInnerHTML={{ __html: f.svgMarkup }}
                          />
                        )}

                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#6366f1] border border-black flex items-center justify-center text-white">
                            <Check className="w-2.5 h-2.5 stroke-[4]" />
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-tight text-center ${
                          isSelected ? "text-[#6366f1]" : "text-black"
                        }`}
                      >
                        {f.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stickers Selector Drawer (Retro Pop-Up Window) */}
      {showStickerPicker && (
        <div className="absolute bottom-28 left-2 right-2 sm:left-6 sm:right-6 max-w-md mx-auto z-30 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-y2k-lg overflow-hidden">
            <Y2KWindowHeader
              title="y2k_stickers.exe [choose_sticker]"
              color="#ff2a85"
              onClose={() => setShowStickerPicker(false)}
            />

            <div className="p-3 bg-[#fafafa]">
              {placedStickers.length > 0 && (
                <div className="flex items-center justify-end pb-1.5 mb-1 px-1">
                  <button
                    onClick={handleClearStickers}
                    type="button"
                    className="flex items-center gap-1 text-[10px] font-black text-red-600 active:text-red-800"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All ({placedStickers.length})</span>
                  </button>
                </div>
              )}

              {/* Horizontal Scroll of 16 Y2K Die-Cut Stickers */}
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
                {Y2K_STICKER_LIST.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAddSticker(item)}
                    type="button"
                    className="btn-y2k flex flex-col items-center gap-1.5 flex-shrink-0 active:scale-95 transition-transform"
                  >
                    <div className="w-16 h-16 rounded-xl border-[2.5px] border-black bg-[#1e1b4b]/5 shadow-y2k-sm flex items-center justify-center p-1.5 hover:bg-neutral-100 transition-colors">
                      <div
                        className="w-12 h-12 flex items-center justify-center filter drop-shadow-[1px_2px_0px_rgba(0,0,0,0.5)]"
                        dangerouslySetInnerHTML={{ __html: item.svgMarkup }}
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tight text-black">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Selector Drawer (Retro Pop-Up Window) */}
      {showFilterPicker && (
        <div className="absolute bottom-28 left-2 right-2 sm:left-6 sm:right-6 max-w-md mx-auto z-30 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-y2k-lg overflow-hidden">
            <Y2KWindowHeader
              title="fx_filters.dll [select]"
              color="#ffe600"
              onClose={() => setShowFilterPicker(false)}
            />

            <div className="p-3 bg-[#fafafa]">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
                {CAMERA_FILTERS.map((f) => {
                  const isSelected = selectedFilterId === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleSelectFilter(f.id)}
                      type="button"
                      className="btn-y2k flex flex-col items-center gap-1.5 flex-shrink-0"
                    >
                      <div
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-[2.5px] border-black transition-transform ${
                          isSelected
                            ? "scale-105 shadow-y2k ring-2 ring-[#ff2a85]"
                            : "opacity-85 shadow-[1.5px_1.5px_0px_#000]"
                        }`}
                      >
                        {previewThumbUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={previewThumbUrl}
                            alt={f.name}
                            style={{ filter: f.cssFilter }}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            style={{ filter: f.cssFilter }}
                            className="w-full h-full bg-gradient-to-tr from-pink-300 to-cyan-300 flex items-center justify-center"
                          >
                            <Sparkles className="w-5 h-5 text-black" />
                          </div>
                        )}

                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ff2a85] border border-black flex items-center justify-center text-white">
                            <Check className="w-2.5 h-2.5 stroke-[4]" />
                          </div>
                        )}
                      </div>

                      <span
                        className={`text-[10px] font-black uppercase tracking-tight text-center ${
                          isSelected ? "text-[#ff2a85]" : "text-black"
                        }`}
                      >
                        {f.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar with Safe Area */}
      <footer className="w-full pb-safe z-20 pt-1">
        <div className="max-w-md mx-auto flex items-center justify-between px-6">
          {/* Left Slot: Thumbnail Stack in Retro Frame */}
          <div className="w-16 h-16 flex items-center justify-center">
            {capturedThumbs.length > 0 ? (
              <div className="relative w-13 h-13 rounded-xl overflow-hidden border-[2.5px] border-black shadow-y2k bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={capturedThumbs[capturedThumbs.length - 1]}
                  alt="Recent shot"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 bg-[#ff2a85] text-[9px] font-black text-white px-1 border-t border-l border-black">
                  {capturedThumbs.length}/4
                </span>
              </div>
            ) : (
              <div className="w-11 h-11 rounded-xl border-[2.5px] border-black bg-white shadow-y2k-sm flex items-center justify-center text-black">
                <Camera className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Center: Big Round Y2K Shutter Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={startShutterSequence}
              disabled={isShooting || !isCameraReady}
              type="button"
              className={`btn-y2k group relative w-20 h-20 rounded-full border-[3.5px] border-black bg-[#ffe600] flex items-center justify-center shadow-y2k-lg active:translate-x-[2px] active:translate-y-[2px] ${
                isShooting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#fff04d]"
              }`}
              aria-label="Take 4 photos"
            >
              <div className="w-14 h-14 rounded-full border-[2.5px] border-black bg-[#ff2a85] flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
            </button>
          </div>

          {/* Right Slot: Camera Flip Button */}
          <div className="w-16 h-16 flex items-center justify-center">
            <button
              onClick={toggleFacingMode}
              disabled={isShooting}
              type="button"
              className="btn-y2k w-12 h-12 rounded-full border-[2.5px] border-black bg-[#00e5ff] flex items-center justify-center text-black shadow-y2k active:translate-x-[2px] active:translate-y-[2px]"
              aria-label="Flip Camera"
            >
              <SwitchCamera className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
