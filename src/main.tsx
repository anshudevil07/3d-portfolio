import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PortfolioProvider } from "./context/PortfolioContext.tsx";
import { ModelLoadingProvider } from "./context/ModelLoadingContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./index.css";

// Apply saved theme before render
const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
document.documentElement.setAttribute("data-portfolio-theme", savedTheme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PortfolioProvider>
      <ModelLoadingProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ModelLoadingProvider>
    </PortfolioProvider>
  </StrictMode>
);
