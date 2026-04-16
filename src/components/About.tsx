import { usePortfolio } from "../context/PortfolioContext";
import "./styles/About.css";

const About = () => {
  const data = usePortfolio();
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <div className="about-label">
          <span className="about-line" />
          <span className="about-tag">About Me</span>
        </div>
        <h2 className="about-heading">
          Crafting <em>digital</em><br />experiences
        </h2>
        <p className="para">{data.bio}</p>
        <div className="about-stats">
          {data.gpa && (
            <div className="about-stat">
              <span className="stat-num">{data.gpa}</span>
              <span className="stat-label">GPA</span>
            </div>
          )}
          <div className="about-stat">
            <span className="stat-num">{data.projects}</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="about-stat">
            <span className="stat-num">Full</span>
            <span className="stat-label">{data.stackLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
