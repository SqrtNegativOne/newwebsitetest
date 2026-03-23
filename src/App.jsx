import { useEffect } from "react";
import Navbar from "./components/Navbar";

import Bio from "./components/Bio";
import Quote from "./components/Quote";
import HeroName from "./components/HeroName";
import "./App.css";

function App() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div className="page">
      {/* Portrait pinned to top-left */}
      <div className="portrait-column">
        <picture>
          {/* Small layout (≤640px): image fills the screen → use portrait 2 */}
          <source media="(max-width: 640px)" srcSet="/portraits/2.png" />
          {/* Medium layout (641–1024px): image is tiny in grid → use portrait 5 */}
          <source media="(max-width: 1024px)" srcSet="/portraits/5.png" />
          {/* Wide layout (>1024px): image is sidebar-sized → use portrait 3 */}
          <img
            src="/portraits/3.png"
            alt="Ark Malhotra portrait"
            className="portrait"
          />
        </picture>
      </div>

      {/* Bio text on the right */}
      <main className="content">
        <Bio />
      </main>

      {/* Quote above the name */}
      <Quote />

      {/* Navbar — fixed top-right */}
      <Navbar />

      {/* Bottom row: name pinned to bottom-left */}
      <footer className="bottom-bar">
        <HeroName />
      </footer>
    </div>
  );
}

export default App;
