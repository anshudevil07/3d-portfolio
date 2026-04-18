import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { usePortfolio } from "../context/PortfolioContext";
import "./styles/Contact.css";

const Contact = () => {
  const data = usePortfolio();
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            {data.linkedin && (
              <>
                <h4>Connect</h4>
                <p>
                  <a href={data.linkedin} target="_blank" rel="noreferrer" data-cursor="disable">
                    LinkedIn — {data.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, "").replace(/\/$/, "")}
                  </a>
                </p>
              </>
            )}
            {data.education && (
              <>
                <h4>Education / Location</h4>
                <p>{data.education}</p>
              </>
            )}
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
                GitHub <MdArrowOutward />
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
                LinkedIn <MdArrowOutward />
              </a>
            )}
            {data.email && (
              <a href={`mailto:${data.email}`} data-cursor="disable" className="contact-social"
                onClick={(e) => { e.preventDefault(); window.open(`mailto:${data.email}`); }}>
                Email <MdArrowOutward />
              </a>
            )}
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by{" "}
              <a 
                href="https://www.linkedin.com/in/himanshu-palariya-639852240/" 
                target="_blank" 
                rel="noreferrer" 
                data-cursor="disable"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span style={{ cursor: "pointer", transition: "opacity 0.3s" }} 
                      onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                      onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                  Himanshu Palariya
                </span>
              </a>
            </h2>
            <h5><MdCopyright /> 2026</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
