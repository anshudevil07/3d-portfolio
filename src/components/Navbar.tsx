import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { usePortfolio } from "../context/PortfolioContext";
import ThemeToggle from "./ThemeToggle";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const data = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      speed: 1,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    smoother.scrollTop(0);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const el = e.currentTarget as HTMLAnchorElement;
          const section = el.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        } else {
          setMobileMenuOpen(false);
        }
      });
    });
    window.addEventListener("resize", () => ScrollSmoother.refresh(true));
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {data.initials}
        </a>
        <a href={`mailto:${data.email}`} className="navbar-connect" data-cursor="disable">
          {data.email}
        </a>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <ul className={mobileMenuOpen ? 'active' : ''}>
          <li><a data-href="#about" href="#about"><HoverLinks text="ABOUT" /></a></li>
          <li><a data-href="#work" href="#work"><HoverLinks text="WORK" /></a></li>
          <li><a data-href="#contact" href="#contact"><HoverLinks text="CONTACT" /></a></li>
          {/* Show theme toggle only on desktop */}
          <li className="desktop-only"><ThemeToggle /></li>
        </ul>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-overlay" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
      
      {/* Floating Theme Toggle for Mobile */}
      <div className="floating-theme-toggle">
        <ThemeToggle />
      </div>
      
      <div className="landing-circle1" />
      <div className="landing-circle2" />
      <div className="nav-fade" />
    </>
  );
};

export default Navbar;
