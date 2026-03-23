import { useRef, useEffect, useState } from "react";

/**
 * Renders a portrait with Atkinson dithering applied via <canvas>.
 *
 * Atkinson dithering (Bill Atkinson, Apple 1984):
 *  - Snaps each pixel to black or white
 *  - Spreads only 75% of the error to 6 neighbors (not 4)
 *  - The lost 25% is what gives it higher contrast and sharper edges
 *
 * Error diffusion pattern (each neighbor gets 1/8 of the error):
 *
 *            [current]  +1/8   +1/8
 *      +1/8    +1/8     +1/8
 *               +1/8
 */

function addError(data, idx, error) {
  data[idx] += error;
  data[idx + 1] += error;
  data[idx + 2] += error;
}

export default function DitheredImage({ src, alt = "", className = "" }) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;

      // Convert to grayscale + boost contrast
      // Contrast multiplier >1 pushes values away from midpoint (128),
      // making the dither pattern more dramatic.
      const contrast = 1.4;
      for (let i = 0; i < data.length; i += 4) {
        let gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        gray = Math.max(0, Math.min(255, (gray - 128) * contrast + 128));
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }

      // Atkinson dithering
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const oldPixel = data[idx];
          const newPixel = oldPixel < 128 ? 0 : 255;
          // Only 6/8 of the error is diffused — the other 2/8 vanishes,
          // which is what produces the higher-contrast look.
          const err = (oldPixel - newPixel) / 8;

          data[idx] = newPixel;
          data[idx + 1] = newPixel;
          data[idx + 2] = newPixel;

          //  [X]  +1   +2
          //  +3   +4   +5
          //       +6
          if (x + 1 < w) addError(data, idx + 4, err);                           // +1
          if (x + 2 < w) addError(data, idx + 8, err);                           // +2
          if (y + 1 < h) {
            if (x - 1 >= 0) addError(data, ((y + 1) * w + (x - 1)) * 4, err);   // +3
            addError(data, ((y + 1) * w + x) * 4, err);                          // +4
            if (x + 1 < w) addError(data, ((y + 1) * w + (x + 1)) * 4, err);    // +5
          }
          if (y + 2 < h) addError(data, ((y + 2) * w + x) * 4, err);            // +6
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setLoaded(true);
    };

    img.onerror = () => {
      console.warn("DitheredImage: Could not load", src);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      role="img"
      aria-label={alt}
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}
    />
  );
}
