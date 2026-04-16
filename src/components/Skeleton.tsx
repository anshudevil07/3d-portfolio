import "./styles/Skeleton.css";

// Skeleton screen that matches the portfolio layout
// Shows while the 3D character model is loading
const Skeleton = () => {
  return (
    <div className="sk-root">
      {/* Navbar skeleton */}
      <div className="sk-nav">
        <div className="sk-bar sk-bar-sm" />
        <div className="sk-bar sk-bar-md" />
        <div className="sk-nav-links">
          <div className="sk-bar sk-bar-xs" />
          <div className="sk-bar sk-bar-xs" />
          <div className="sk-bar sk-bar-xs" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="sk-hero">
        {/* Left: name */}
        <div className="sk-hero-left">
          <div className="sk-bar sk-bar-xs sk-accent" style={{ width: 80 }} />
          <div className="sk-bar sk-bar-lg" style={{ width: 180 }} />
          <div className="sk-bar sk-bar-lg" style={{ width: 220 }} />
        </div>

        {/* Center: character placeholder */}
        <div className="sk-hero-center">
          <div className="sk-character">
            {/* Animated glow rings mimicking the 3D model loading */}
            <div className="sk-char-ring sk-char-ring-1" />
            <div className="sk-char-ring sk-char-ring-2" />
            <div className="sk-char-ring sk-char-ring-3" />
            <div className="sk-char-body" />
            <div className="sk-char-head" />
            <div className="sk-char-label">
              <div className="sk-dot-pulse">
                <span /><span /><span />
              </div>
              <span className="sk-char-text">Loading 3D model...</span>
            </div>
          </div>
        </div>

        {/* Right: role */}
        <div className="sk-hero-right">
          <div className="sk-bar sk-bar-xs sk-accent" style={{ width: 100 }} />
          <div className="sk-bar sk-bar-xl" style={{ width: 200 }} />
        </div>
      </div>

      {/* Social icons skeleton */}
      <div className="sk-social">
        <div className="sk-circle" />
        <div className="sk-circle" />
        <div className="sk-circle" />
      </div>
    </div>
  );
};

export default Skeleton;
