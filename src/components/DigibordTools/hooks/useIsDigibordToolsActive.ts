import { useEffect, useState } from "react";

export default function useIsDigibordToolsActive() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const assignmentNavigationToggle =
      document.querySelector("#digibord-toolbar");

    function handleClickOutside(event: MouseEvent) {
      if (assignmentNavigationToggle?.contains(event.target as Node)) {
        return setIsActive(true);
      } else {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return isActive;
}
