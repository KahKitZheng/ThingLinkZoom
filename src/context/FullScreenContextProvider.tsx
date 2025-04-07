import { useEffect, useState } from "react";
import { FullScreenContext } from "./FullScreenContext";

type FullScreenContextProviderProps = {
  refEl: React.RefObject<HTMLElement>;
  children: React.ReactNode;
};

export const FullScreenContextProvider = (
  props: FullScreenContextProviderProps
) => {
  const { refEl, children } = props;

  const [isFullScreen, setIsFullScreen] = useState(false);

  function toggleFullScreen() {
    if (!isFullScreen) {
      refEl.current?.requestFullscreen?.();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullScreen(false);
    }
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      return document.removeEventListener(
        "fullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <FullScreenContext.Provider
      value={{
        isFullScreen,
        toggleFullScreen,
        refEl,
      }}
    >
      {children}
    </FullScreenContext.Provider>
  );
};
