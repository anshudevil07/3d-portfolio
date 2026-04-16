import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type PortfolioTheme = "dark" | "light" | "midnight";

interface ThemeContextType {
  theme: PortfolioTheme;
  setTheme: (t: PortfolioTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});

export const usePortfolioTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<PortfolioTheme>(() => {
    return (localStorage.getItem("portfolio_theme") as PortfolioTheme) || "dark";
  });

  const setTheme = (t: PortfolioTheme) => {
    setThemeState(t);
    localStorage.setItem("portfolio_theme", t);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-portfolio-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
