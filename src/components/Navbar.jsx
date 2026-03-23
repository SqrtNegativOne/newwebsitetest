import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
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

  const links = [
    { label: "Work", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

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
        {links.map((l) => (
          <a key={l.label} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
