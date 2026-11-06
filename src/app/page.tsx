"use client";

import React, { useState } from "react";
import { CameraView } from "@/components/CameraView";
import { ResultsView } from "@/components/ResultsView";
import { PermissionDeniedView } from "@/components/PermissionDeniedView";

type ScreenState = "camera" | "results" | "permission_denied";

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>("camera");
  const [photos, setPhotos] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleCaptureComplete = (capturedPhotos: string[]) => {
    setPhotos(capturedPhotos);
    setScreen("results");
  };

  const handleRetake = () => {
    setPhotos([]);
    setErrorMessage(undefined);
    setScreen("camera");
  };

  const handlePermissionDenied = (msg: string) => {
    setErrorMessage(msg);
    setScreen("permission_denied");
  };

  const handleRetryPermission = () => {
    setErrorMessage(undefined);
    setScreen("camera");
  };

  return (
    <main className="fixed inset-0 w-full h-full overflow-hidden select-none bg-[#ff2a85]">
      {screen === "camera" && (
        <CameraView
          onCaptureComplete={handleCaptureComplete}
          onPermissionDenied={handlePermissionDenied}
        />
      )}

      {screen === "results" && (
        <ResultsView
          photos={photos}
          onRetake={handleRetake}
        />
      )}

      {screen === "permission_denied" && (
        <PermissionDeniedView
          onRetry={handleRetryPermission}
          errorMessage={errorMessage}
        />
      )}
    </main>
  );
}
