export interface StripOptions {
  frameColor?: string; // e.g. '#FF2A85', '#00E5FF', '#FFFFFF', '#18181B', '#A78BFA'
  textColor?: string;
  theme?: "y2k_pink" | "y2k_cyan" | "y2k_lilac" | "classic_white" | "cyber_noir";
}

/**
 * Loads an image from a data URL or blob URL
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

/**
 * Draws rounded rectangle path on canvas
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Draws a 4-point star sparkle on canvas
 */
function drawSparkle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx, cy, cx + size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + size);
  ctx.quadraticCurveTo(cx, cy, cx - size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - size);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

/**
 * Generates a high-resolution vertical photo strip canvas data URL in Y2K aesthetic
 */
export async function generatePhotoStrip(
  photoDataUrls: string[],
  options: StripOptions = {}
): Promise<string> {
  const {
    frameColor = "#FFFFFF",
  } = options;

  const isDarkFrame =
    frameColor.toLowerCase() === "#18181b" ||
    frameColor.toLowerCase() === "#000000";
  const isWhiteFrame = frameColor.toLowerCase() === "#ffffff";

  // 1. Load all photos first to determine their natural aspect ratio
  const loadedImages = await Promise.all(photoDataUrls.map((url) => loadImage(url)));
  const firstImg = loadedImages[0];
  const photoAspect = firstImg ? firstImg.width / firstImg.height : 3 / 4;

  // Canvas Dimensions
  const canvasWidth = 1200;
  const paddingX = 64;
  const paddingTop = 72;
  const gap = 48;
  const photoWidth = canvasWidth - paddingX * 2; // 1072px
  const photoHeight = Math.round(photoWidth / photoAspect); // Preserves exact 1:1 natural aspect ratio
  const bottomFooterHeight = 340;

  const totalPhotos = photoDataUrls.length;
  const canvasHeight =
    paddingTop +
    totalPhotos * photoHeight +
    (totalPhotos - 1) * gap +
    bottomFooterHeight;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2D canvas context");

  // 2. Draw Background Frame
  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Decorative wavy lines on colored Y2K frames
  if (!isWhiteFrame && !isDarkFrame) {
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 4;
    for (let wy = 40; wy < canvasHeight; wy += 90) {
      ctx.beginPath();
      ctx.moveTo(0, wy);
      for (let wx = 0; wx <= canvasWidth; wx += 100) {
        ctx.quadraticCurveTo(wx + 25, wy - 20, wx + 50, wy);
        ctx.quadraticCurveTo(wx + 75, wy + 20, wx + 100, wy);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // Outer border of entire strip (Y2K bold border)
  ctx.save();
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 8;
  ctx.strokeRect(4, 4, canvasWidth - 8, canvasHeight - 8);
  ctx.restore();

  // 3. Draw each photo with Y2K hard border & shadow (100% full frame, zero distortion)
  for (let i = 0; i < loadedImages.length; i++) {
    const img = loadedImages[i];
    const x = paddingX;
    const y = paddingTop + i * (photoHeight + gap);

    // Hard black shadow behind photo (Y2K signature offset)
    ctx.save();
    ctx.fillStyle = "#000000";
    roundRect(ctx, x + 6, y + 6, photoWidth, photoHeight, 14);
    ctx.fill();
    ctx.restore();

    // Clip & Draw photo preserving full frame
    ctx.save();
    roundRect(ctx, x, y, photoWidth, photoHeight, 14);
    ctx.clip();
    ctx.drawImage(img, 0, 0, img.width, img.height, x, y, photoWidth, photoHeight);
    ctx.restore();

    // Bold solid black border around each photo
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 6;
    roundRect(ctx, x, y, photoWidth, photoHeight, 14);
    ctx.stroke();
    ctx.restore();

    // Corner decorative sparkle on first and third photo
    if (i === 0) {
      drawSparkle(ctx, x - 12, y - 12, 18, "#FFE600");
    } else if (i === 2) {
      drawSparkle(ctx, x + photoWidth + 12, y + photoHeight + 12, 18, "#00E5FF");
    }
  }

  // 4. Draw Footer Content (Y2K Neo-Pop aesthetic)
  const footerStartY = paddingTop + totalPhotos * photoHeight + (totalPhotos - 1) * gap;
  const footerCenterY = footerStartY + bottomFooterHeight / 2 - 10;

  // Header banner badge
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // White box banner for title
  const bannerW = 680;
  const bannerH = 74;
  const bannerX = (canvasWidth - bannerW) / 2;
  const bannerY = footerCenterY - 60;

  // Shadow behind banner
  ctx.fillStyle = "#000000";
  roundRect(ctx, bannerX + 5, bannerY + 5, bannerW, bannerH, 16);
  ctx.fill();

  // Banner body
  ctx.fillStyle = isWhiteFrame ? "#FFE600" : "#FFFFFF";
  roundRect(ctx, bannerX, bannerY, bannerW, bannerH, 16);
  ctx.fill();

  // Banner border
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 5;
  roundRect(ctx, bannerX, bannerY, bannerW, bannerH, 16);
  ctx.stroke();

  // Title: ★ PHOTO BOOTH ★
  ctx.fillStyle = "#000000";
  ctx.font = "900 38px system-ui, -apple-system, sans-serif";
  ctx.fillText("★  P H O T O  B O O T H  ★", canvasWidth / 2, bannerY + bannerH / 2);

  // Sparkles around banner
  drawSparkle(ctx, bannerX - 25, bannerY + bannerH / 2, 20, "#FF2A85");
  drawSparkle(ctx, bannerX + bannerW + 25, bannerY + bannerH / 2, 20, "#00E5FF");

  // Date and Time in retro ticker style
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase();
  const timeFormatted = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Ticker text
  ctx.fillStyle = isDarkFrame ? "#FFFFFF" : "#000000";
  ctx.font = "bold 26px 'Courier New', monospace, sans-serif";
  ctx.fillText(`[ ${dateFormatted}  •  ${timeFormatted} ]`, canvasWidth / 2, footerCenterY + 36);

  // Cute Subtitle: ♡ SMILE FOREVER :) ♡
  ctx.font = "800 22px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = isDarkFrame ? "#FF69B4" : "#FF007F";
  ctx.fillText("♡  S M I L E  •  E N J O Y  : )  ♡", canvasWidth / 2, footerCenterY + 76);

  // Retro Barcode
  const barcodeY = footerCenterY + 115;
  const barcodeH = 26;
  ctx.fillStyle = isDarkFrame ? "#FFFFFF" : "#000000";
  // Draw barcode lines
  let bx = canvasWidth / 2 - 140;
  const barWidths = [3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 2, 1, 3, 4, 1, 2, 4, 2, 1, 3, 2];
  for (const w of barWidths) {
    ctx.fillRect(bx, barcodeY, w * 2, barcodeH);
    bx += w * 2 + 5;
  }

  ctx.restore();

  return canvas.toDataURL("image/png", 0.98);
}
