import { useEffect, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const data = usePortfolio();
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) container.removeEventListener("click", () => handleClick(container));
      });
    };
  }, []);

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>I<span className="do-h2"> DO</span></div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>
          {data.whatIDo.map((item, index) => (
            <div
              key={index}
              className="what-content what-noTouch"
              ref={(el) => { containerRef.current[index] = el; }}
            >
              <div className="what-border1">
                <svg height="100%">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  {index === data.whatIDo.length - 1 && (
                    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  )}
                </svg>
              </div>
              <div className="what-corner" />
              <div className="what-content-in">
                <h3>{item.heading}</h3>
                <h4>{item.subheading}</h4>
                <p>{item.description}</p>
                <h5>Skillset &amp; tools</h5>
                <div className="what-content-flex">
                  {item.tags.map((tag, i) => (
                    <div key={i} className="what-tags">{tag}</div>
                  ))}
                </div>
                <div className="what-arrow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    Array.from(container.parentElement.children).forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
