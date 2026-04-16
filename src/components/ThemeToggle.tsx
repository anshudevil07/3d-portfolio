import { useState, useRef, useEffect } from "react";
import { usePortfolioTheme, PortfolioTheme } from "../context/ThemeContext";
import "./styles/ThemeToggle.css";

const themes: { id: PortfolioTheme; label: string; icon: string; desc: string }[] = [
  { id: "dark",     label: "Dark",     icon: "🌑", desc: "Navy + Teal" },
  { id: "light",    label: "Light",    icon: "☀️", desc: "Cream + Indigo" },
  { id: "midnight", label: "Midnight", icon: "🌌", desc: "Purple + Rose" },
];

const ThemeToggle = () => {
  const { theme, setTheme } = usePortfolioTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = themes.find(t => t.id === theme)!;

  return (
    <div className="tt-wrap" ref={ref} data-cursor="disable">
      <button className="tt-trigger" onClick={() => setOpen(o => !o)}>
        <span className="tt-icon">{current.icon}</span>
        <span className="tt-label">{current.label}</span>
        <span className={`tt-chevron ${open ? "tt-chevron-open" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="tt-dropdown">
          <p className="tt-dropdown-title">Choose Theme</p>
          {themes.map(t => (
            <button
              key={t.id}
              className={`tt-option ${theme === t.id ? "tt-option-active" : ""}`}
              onClick={() => { setTheme(t.id); setOpen(false); }}
            >
              <span className="tt-opt-icon">{t.icon}</span>
              <div className="tt-opt-info">
                <span className="tt-opt-label">{t.label}</span>
                <span className="tt-opt-desc">{t.desc}</span>
              </div>
              {theme === t.id && <span className="tt-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
