import { useState, useEffect, useCallback } from "react";
import { getRandomQuote } from "../data/quotes";

const TYPE_MS   = 28; // ms per character when typing forward
const DELETE_MS = 12; // ms per character when backspacing (faster feels natural)

export default function Quote() {
  const [displayed, setDisplayed] = useState("");
  const [fullText,  setFullText]  = useState("");
  // "idle" | "typing" | "deleting"
  const [phase,     setPhase]     = useState("idle");
  // Holds the incoming quote while we finish deleting the current one.
  const [nextText,  setNextText]  = useState(null);

  // Fetch the first quote on mount.
  useEffect(() => {
    getRandomQuote().then(text => {
      setFullText(text);
      setPhase("typing");
    });
  }, []);

  // Animation engine: each state update re-runs this effect and schedules the next frame.
  useEffect(() => {
    if (phase === "typing") {
      if (displayed.length < fullText.length) {
        const t = setTimeout(
          () => setDisplayed(fullText.slice(0, displayed.length + 1)),
          TYPE_MS
        );
        return () => clearTimeout(t);
      } else {
        setPhase("idle");
      }

    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(prev => prev.slice(0, -1)),
          DELETE_MS
        );
        return () => clearTimeout(t);
      } else if (nextText !== null) {
        // Deletion finished and the next quote is ready — start typing it.
        setFullText(nextText);
        setNextText(null);
        setPhase("typing");
      }
      // If nextText is still null (fetch hasn't returned), we wait.
      // The effect re-runs automatically when setNextText fires.
    }
  }, [phase, displayed, fullText, nextText]);

  const handleClick = useCallback(() => {
    if (phase === "deleting") return; // already in progress

    // Fetch runs in parallel with the deletion so it's usually ready by the time
    // the last character disappears.
    getRandomQuote().then(setNextText);
    setPhase("deleting");
  }, [phase]);

  if (phase === "idle" && !displayed) return null;

  return (
    <p className="quote" onClick={handleClick}>
      {displayed}
      {phase !== "idle" && <span className="quote-cursor">|</span>}
    </p>
  );
}
