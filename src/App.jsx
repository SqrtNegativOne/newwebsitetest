import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import Bio from "./components/Bio";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Quote from "./components/Quote";
import HeroName from "./components/HeroName";
import "./App.css";

const views = { about: Bio, skills: Skills, projects: Projects, blog: Blog, contact: Contact };

function App() {
  const [view, setView] = useState("about");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const ViewComponent = views[view];

  return (
    <div className="page">
      {/* Quote + Name group — top-left (wide), dissolves at smaller breakpoints */}
      <div className="name-group">
        <Quote />
        <footer className="bottom-bar">
          <HeroName />
        </footer>
      </div>

      {/* Portrait — bottom-left */}
      <div className="portrait-column">
        <img
          src="/portraits/colour.png"
          alt="Ark Malhotra portrait"
          className="portrait"
        />
      </div>

      {/* Content — bottom-right, swaps based on nav */}
      <main className="content" key={view}>
        <ViewComponent />
      </main>

      {/* Navbar — fixed top-right */}
      <Navbar view={view} onNavigate={setView} />
    </div>
  );
}

export default App;
