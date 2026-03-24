import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], .nav-link, .blog-item, .skill-item";
const TEXT = "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, time, dd, dt, label, del, em, strong";

export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onOver = (e) => {
      // Interactive elements take priority over text
      if (e.target.closest(INTERACTIVE)) {
        dot.classList.remove("cursor-text");
        dot.classList.add("cursor-expanded");
      } else if (e.target.closest(TEXT)) {
        dot.classList.remove("cursor-expanded");
        dot.classList.add("cursor-text");
      }
    };

    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        dot.classList.remove("cursor-expanded");
      }
      if (e.target.closest(TEXT)) {
        dot.classList.remove("cursor-text");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div ref={dotRef} className="custom-cursor" />;
}
