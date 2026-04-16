import { usePortfolio } from "../context/PortfolioContext";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

const Work = () => {
  const data = usePortfolio();
  const projects = data.works;

  if (!projects?.length) return null;

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="work-list">
          {projects.map((project, index) => (
            <div className="work-list-item" key={index}>
              <div className="carousel-content">
                <div className="carousel-info">
                  <div className="carousel-number"><h3>0{index + 1}</h3></div>
                  <div className="carousel-details">
                    <h4>{project.title}</h4>
                    <p className="carousel-category">{project.category}</p>
                    <div className="carousel-tools">
                      <span className="tools-label">Tools &amp; Features</span>
                      <p>{project.tools}</p>
                    </div>
                  </div>
                </div>
                <div className="carousel-image-wrapper">
                  <WorkImage image={project.image} alt={project.title} link={project.link} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
