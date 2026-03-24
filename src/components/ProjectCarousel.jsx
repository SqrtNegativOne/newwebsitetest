import { useRef, useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectCarousel.css";

export default function ProjectCarousel({ projects }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Scroll by one card width in the given direction (-1 or +1)
  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".project-card");
    const cardWidth = (card?.offsetWidth ?? 280) + 16; // 16px = gap
    track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  // Track scroll position for the progress bar
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // Arrow key navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft")  scroll(-1);
      if (e.key === "ArrowRight") scroll(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-track" ref={trackRef}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Thin progress bar */}
      <div className="carousel-progress-bar">
        <div
          className="carousel-progress-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Nav row */}
      <div className="carousel-nav">
        <button className="carousel-btn" onClick={() => scroll(-1)} aria-label="Previous">
          ← prev
        </button>
        <span className="carousel-label">{projects.length} projects</span>
        <button className="carousel-btn" onClick={() => scroll(1)} aria-label="Next">
          next →
        </button>
      </div>
    </div>
  );
}
