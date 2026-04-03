import { useState, useEffect } from "react";
import { HalftoneDots } from "@paper-design/shaders-react";
import "./ShaderImage.css";

export default function ShaderImage({ src, alt, className, layoutId, width = 1280, height = 720 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [colors, setColors] = useState({ back: "#f2f1e8", front: "#2b2b2b" });

  useEffect(() => {
    // Get computed CSS variables
    const styles = getComputedStyle(document.documentElement);
    const bg = styles.getPropertyValue("--bg").trim();
    const text = styles.getPropertyValue("--text").trim();
    
    if (bg && text) {
      setColors({ back: bg, front: text });
    }
  }, []);

  return (
    <div 
      className={`shader-image-wrapper ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Original image (revealed on hover) */}
      <img
        src={src}
        alt={alt}
        className="shader-image-original"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      
      {/* Shader overlay (fades on hover) */}
      <div 
        className="shader-image-overlay"
        style={{ opacity: isHovered ? 0 : 1 }}
      >
        <HalftoneDots
          width={width}
          height={height}
          image={src}
          colorBack={colors.back}
          colorFront={colors.front}
          originalColors={false}
          type="gooey"
          grid="hex"
          inverted={false}
          size={0.5}
          radius={1.25}
          contrast={0.4}
          grainMixer={0.2}
          grainOverlay={0.2}
          grainSize={0.5}
          fit="cover"
        />
      </div>
    </div>
  );
}
