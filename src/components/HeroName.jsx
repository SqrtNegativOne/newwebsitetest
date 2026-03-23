import { useState, useEffect, useRef } from "react";

const fonts = [
  // { family: '"Major Mono Display", monospace', weight: 400 },
  // { family: '"Plaster", system-ui', weight: 400 },
  // { family: '"Monoton", sans-serif', weight: 400 },
  // { family: '"IBM Plex Sans", sans-serif', weight: 700 },
  { family: '"IBM Plex Sans", sans-serif', weight: 100 },
];

const FULL  = "Ark Malhotra.";
const SHORT = "Ark.";

// Renders text as individual character spans so each can be animated separately.
// phase: "idle" | "out" | "in"
// --i is a CSS custom property used by charOut/charIn to stagger animation-delay per char.
function SplitText({ text, phase }) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className={phase !== "idle" ? `char char-${phase}` : "char"}
      style={{ "--i": i }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function HeroName() {
  const [fontIndex, setFontIndex] = useState(null);
  const [phase, setPhase]         = useState("idle");
  const animating = useRef(false);
  const timers    = useRef([]);

  // Pre-load all fonts so the swap is instant when it happens mid-animation.
  useEffect(() => {
    fonts.forEach(({ family, weight }) => {
      const name = family.split(",")[0].replace(/['"]/g, "").trim();
      document.fonts.load(`${weight} 1em "${name}"`);
    });
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const handleMouseEnter = () => {
    if (animating.current) return;
    animating.current = true;

    const nextIndex   = fontIndex === null ? 0 : (fontIndex + 1) % fonts.length;
    const n           = FULL.length; // 13 chars
    const stagger     = 22;          // ms between each char starting
    const charDur     = 55;          // ms for one char to vanish/appear
    const outComplete = (n - 1) * stagger + charDur;
    const hold        = 30;          // brief pause at all-invisible

    setPhase("out");

    // Swap font exactly when all chars are invisible.
    const t1 = setTimeout(() => {
      setFontIndex(nextIndex);
      setPhase("in");
    }, outComplete + hold);

    // Return to idle after in-phase finishes.
    const t2 = setTimeout(() => {
      setPhase("idle");
      animating.current = false;
    }, outComplete + hold + outComplete + 80);

    timers.current = [t1, t2];
  };

  const fontStyle = fontIndex !== null
    ? { fontFamily: fonts[fontIndex].family, fontWeight: fonts[fontIndex].weight }
    : {};

  return (
    <div className="name-wrapper">
      <h1 className="name" onMouseEnter={handleMouseEnter} style={fontStyle}>
        <span className="name-full">
          <SplitText text={FULL}  phase={phase} />
        </span>
        <span className="name-short">
          <SplitText text={SHORT} phase={phase} />
        </span>
      </h1>
    </div>
  );
}
