import { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import Skeleton from "./components/Skeleton";
import { useModelLoading } from "./context/ModelLoadingContext";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));

const App = () => {
  const { modelReady } = useModelLoading();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    document.body.style.overflowY = "auto";
    import("./components/utils/initialFX").then((module) => {
      module.initialFX();
    });
  }, []);

  // Fade out skeleton after model is ready
  useEffect(() => {
    if (modelReady) {
      // Small delay so the model renders one frame before skeleton disappears
      const t = setTimeout(() => setShowSkeleton(false), 400);
      return () => clearTimeout(t);
    }
  }, [modelReady]);

  return (
    <>
      {showSkeleton && (
        <div style={{
          opacity: modelReady ? 0 : 1,
          transition: "opacity 0.4s ease",
          position: "fixed", inset: 0, zIndex: 10,
          pointerEvents: modelReady ? "none" : "all",
        }}>
          <Skeleton />
        </div>
      )}

      <Suspense fallback={null}>
        <MainContainer>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </>
  );
};

export default App;
