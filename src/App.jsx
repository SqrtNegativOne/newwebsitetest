import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Cursor from "./components/Cursor";

import Bio from "./components/Bio";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import Quote from "./components/Quote";
import HeroName from "./components/HeroName";
import "./App.css";

// Known React routes — everything else is a 404
const KNOWN_ROUTES = ["/", "/skills", "/projects", "/contact"];

// Pages where the portrait should be hidden
const HIDE_PORTRAIT = ["/skills", "/projects"];

function App() {
  const location = useLocation();

  const isKnown = KNOWN_ROUTES.includes(location.pathname);

  // 404 gets its own minimal layout — no name, no portrait, no quote
  if (!isKnown) {
    return (
      <>
        <NotFound />
        <ThemeToggle />
        <Cursor />
      </>
    );
  }

  // Derive the current nav key from the pathname for Navbar highlighting
  const currentView =
    location.pathname === "/" ? "about" : location.pathname.slice(1);

  const showPortrait = !HIDE_PORTRAIT.includes(location.pathname);

  return (
    <div className={`page${showPortrait ? "" : " no-portrait"}`}>
      {/* Quote + Name group — top-left */}
      <div className="name-group">
        <Quote />
        <footer className="bottom-bar">
          <HeroName />
        </footer>
      </div>

      {/* Portrait — bottom-left (hidden on skills/projects) */}
      {showPortrait && (
        <div className="portrait-column">
          <img
            src="/portraits/colour.png"
            alt="Ark Malhotra portrait"
            className="portrait"
          />
        </div>
      )}

      {/* Content — bottom-right, swaps based on route */}
      <main className={`content${location.pathname === "/projects" || location.pathname === "/skills" ? " content--fill" : ""}`} key={location.pathname}>
        <Routes>
          <Route path="/" element={<Bio />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Navbar — fixed top-right */}
      <Navbar view={currentView} />

      {/* Theme toggle — left border edge */}
      <ThemeToggle />

      {/* Custom cursor */}
      <Cursor />
    </div>
  );
}

export default App;
