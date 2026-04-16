import { createContext, useContext, useState, ReactNode } from "react";

interface ModelLoadingContextType {
  modelReady: boolean;
  setModelReady: (v: boolean) => void;
}

const ModelLoadingContext = createContext<ModelLoadingContextType>({
  modelReady: false,
  setModelReady: () => {},
});

export const useModelLoading = () => useContext(ModelLoadingContext);

export const ModelLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [modelReady, setModelReady] = useState(false);
  return (
    <ModelLoadingContext.Provider value={{ modelReady, setModelReady }}>
      {children}
    </ModelLoadingContext.Provider>
  );
};
