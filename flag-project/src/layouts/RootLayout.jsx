import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import logoDark from "../assets/techover-logo-dark.png";
import logoLight from "../assets/techover-logo.png";    
import moon from "../assets/moon.svg";                  
import moonBordered from "../assets/moon-bordered.svg";   

const RootLayout = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

  const logoSrc = theme === "dark" ? logoLight : logoDark;
  const moonIcon = theme === "dark" ? moon : moonBordered;

  return (
    <div className="root-layout">
      <header>
        <div className="navbar">
          <h2 className="flag-text">The Flag App</h2>

          <img
            src={logoSrc}
            alt="Techover logo"
            className="techover-logo-dark"
          />

          <div className="dark-toggle">
            <button
              className="dark-toggle-btn"
              onClick={toggleTheme}
              aria-pressed={theme === "dark"}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <img src={moonIcon} alt="" aria-hidden="true" />
              <span className="dark-text">Dark Mode</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
