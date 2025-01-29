import { useEffect, useState } from "react";

export default function useFullScreen(refEl: React.RefObject<HTMLElement>) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      refEl.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullScreen(true);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  return { isFullScreen, toggleFullScreen };
}
