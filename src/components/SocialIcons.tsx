import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { usePortfolio } from "../context/PortfolioContext";

const SocialIcons = () => {
  const data = usePortfolio();
  const resumeUrl = (data as { resumeUrl?: string }).resumeUrl;

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;
    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;
      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2, mouseY = rect.height / 2;
      let currentX = 0, currentY = 0;
      const update = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);
        requestAnimationFrame(update);
      };
      const onMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) { mouseX = x; mouseY = y; }
        else { mouseX = rect.width / 2; mouseY = rect.height / 2; }
      };
      document.addEventListener("mousemove", onMove);
      update();
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {data.github && (
          <span>
            <a href={data.github} target="_blank" rel="noreferrer"><FaGithub /></a>
          </span>
        )}
        {data.linkedin && (
          <span>
            <a href={data.linkedin} target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
          </span>
        )}
        {(data as { twitter?: string }).twitter && (
          <span>
            <a href={(data as { twitter?: string }).twitter} target="_blank" rel="noreferrer">
              <FaXTwitter />
            </a>
          </span>
        )}
      </div>

      {/* Resume download button — shows if user uploaded a resume */}
      {resumeUrl ? (
        <a
          className="resume-button"
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <HoverLinks text="RESUME" />
          <span><TbNotes /></span>
        </a>
      ) : null}
    </div>
  );
};

export default SocialIcons;
