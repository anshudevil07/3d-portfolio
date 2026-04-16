import { PropsWithChildren } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const data = usePortfolio();
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            {data.firstName}
            <br />
            <span>{data.lastName}</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>{data.role} &</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">{data.roleSecond}</div>
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Landing;
