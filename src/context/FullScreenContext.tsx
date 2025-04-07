import React from "react";

type FullScreenContextType = {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  refEl: React.RefObject<HTMLElement>;
};

export const FullScreenContext = React.createContext<FullScreenContextType>(
  {} as FullScreenContextType
);
