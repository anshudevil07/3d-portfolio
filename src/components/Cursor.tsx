import { useEffect, useRef } from "react";
import "./styles/Cursor.css";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };

    document.addEventListener("mousemove", onMouseMove);

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;

      element.addEventListener("mouseover", () => {
        if (element.dataset.cursor === "icons") {
          const rect = element.getBoundingClientRect();
          cursor.classList.add("cursor-icons");
          cursor.classList.add("cursor-no-blend");
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      });

      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons", "cursor-no-blend");
      });
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
