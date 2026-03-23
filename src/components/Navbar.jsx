import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  { key: "about", label: "About" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "blog", label: "Blog" },
  { key: "contact", label: "Contact" },
];

export default function Navbar({ view, onNavigate }) {
  const [open, setOpen] = useState(true);
  const navRef = useRef(null);

  // Close when clicking outside (for mobile tap-to-open)
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <nav
      className={`nav-pill${open ? " open" : ""}`}
      ref={navRef}
      onClick={() => setOpen((prev) => !prev)}
    >
      <svg
        className="nav-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
      </svg>
      <div className="nav-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`nav-link${view === item.key ? " active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(item.key);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
