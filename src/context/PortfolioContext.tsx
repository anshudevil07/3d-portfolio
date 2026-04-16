import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { demo } from "../data/demoData";

const API = "http://localhost:5000/api";

export interface PortfolioData {
  initials: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  roleSecond: string;
  bio: string;
  gpa: string;
  projects: string;
  stackLabel: string;
  whatIDo: { heading: string; subheading: string; description: string; tags: string[] }[];
  career: { role: string; company: string; year: string; description: string }[];
  works: { title: string; category: string; tools: string; image: string; link: string }[];
  linkedin: string;
  github: string;
  education: string;
  copyright: string;
  twitter?: string;
  website?: string;
  phone?: string;
  location?: string;
  resumeUrl?: string;
  views?: number;
  status?: string;
  slug?: string;
}

const PortfolioContext = createContext<PortfolioData>(demo as PortfolioData);

export const usePortfolio = () => useContext(PortfolioContext);

// Convert raw MongoDB portfolio doc → PortfolioData shape
function mapToPortfolioData(raw: Record<string, unknown>): PortfolioData {
  const name = (raw.name as string) || "Portfolio";
  const nameParts = name.trim().split(" ");
  const firstName = nameParts[0].toUpperCase();
  const lastName = nameParts.slice(1).join(" ").toUpperCase();
  const initials = nameParts.map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  const titleStr = (raw.title as string) || "Developer";
  const titleWords = titleStr.trim().split(" ");
  const roleSecond = titleWords[titleWords.length - 1];
  const role = titleWords.slice(0, -1).join(" ") || titleStr;

  const skills = (raw.skills as string[]) || [];
  const rawWorks = (raw.works as Record<string, string>[]) || [];
  const rawCareer = (raw.career as Record<string, string>[]) || [];

  return {
    initials,
    email: (raw.email as string) || "",
    firstName,
    lastName,
    role,
    roleSecond,
    bio: (raw.bio as string) || "",
    gpa: "",
    projects: `${rawWorks.filter(w => w.title).length}+`,
    stackLabel: titleStr,
    whatIDo: [
      {
        heading: titleStr.toUpperCase(),
        subheading: "Building great things",
        description: (raw.bio as string) || "Passionate developer building impactful products.",
        tags: skills.slice(0, 6),
      },
      {
        heading: "MORE SKILLS",
        subheading: "Additional expertise",
        description: "Continuously learning and growing.",
        tags: skills.length > 6 ? skills.slice(6) : skills,
      },
    ],
    career: rawCareer.filter(c => c.company).map(c => ({
      role: c.role || "",
      company: c.company || "",
      year: c.duration ? c.duration.split(/[-–]/)[0].trim() : "NOW",
      description: c.description || "",
    })),
    works: rawWorks.filter(w => w.title).map(w => ({
      title: w.title || "",
      category: w.description || "",
      tools: w.link ? `Link: ${w.link}` : "",
      // Optimize image via Cloudinary: auto format, auto quality, max 1280px wide
      image: w.image
        ? w.image.replace("/upload/", "/upload/w_1280,q_auto,f_auto/")
        : "",
      link: w.link || "",
    })),
    linkedin: (raw.linkedin as string) || "",
    github: (raw.github as string) || "",
    education: (raw.location as string) || "",
    copyright: name,
    twitter: (raw.twitter as string) || "",
    website: (raw.website as string) || "",
    phone: (raw.phone as string) || "",
    location: (raw.location as string) || "",
    resumeUrl: (raw.resumeUrl as string) || "",
    views: (raw.analytics as { views?: number })?.views || 0,
    status: (raw.status as string) || "active",
    slug: (raw.slug as string) || "",
  };
}

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(demo as PortfolioData);
  const [notFound, setNotFound] = useState(false);
  const [rejected, setRejected] = useState(false);

  useEffect(() => {
    const match = window.location.pathname.match(/^\/portfolio\/(.+)$/);
    if (!match) return;

    const slug = match[1];
    fetch(`${API}/portfolio/${slug}`)
      .then(r => r.json())
      .then(raw => {
        if (raw.error) { setNotFound(true); return; }
        if (raw.status === "rejected") { setRejected(true); return; }
        setData(mapToPortfolioData(raw));
      })
      .catch(() => setNotFound(true));
  }, []);

  if (notFound) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#0a0e17", color:"#eae5ec", fontFamily:"Geist,sans-serif", gap:16, textAlign:"center", padding:24 }}>
      <div style={{ fontSize:"3rem" }}>🔍</div>
      <h2 style={{ fontSize:"1.5rem", fontWeight:700 }}>Portfolio Not Found</h2>
      <p style={{ color:"rgba(234,229,236,0.5)", maxWidth:360 }}>This portfolio doesn't exist or the link is incorrect.</p>
      <a href="http://localhost:3000" style={{ padding:"12px 28px", background:"#5eead4", borderRadius:10, color:"#0a0e17", fontWeight:700, textDecoration:"none" }}>← Back to Home</a>
    </div>
  );

  if (rejected) return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"#0a0e17", color:"#eae5ec", fontFamily:"Geist,sans-serif", gap:16, textAlign:"center", padding:24 }}>
      <div style={{ fontSize:"3rem" }}>🚫</div>
      <h2 style={{ fontSize:"1.5rem", fontWeight:700 }}>Portfolio Unavailable</h2>
      <p style={{ color:"rgba(234,229,236,0.5)", maxWidth:360 }}>This portfolio has been deactivated.</p>
      <a href="http://localhost:3000" style={{ padding:"12px 28px", background:"#5eead4", borderRadius:10, color:"#0a0e17", fontWeight:700, textDecoration:"none" }}>← Back to Home</a>
    </div>
  );

  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
};
