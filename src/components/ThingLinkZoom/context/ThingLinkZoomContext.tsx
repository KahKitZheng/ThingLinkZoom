import React from "react";

type ThingLinkZoomContextEntity = {
  zoomToElement: (elementId: string) => void;
};

export const ThingLinkZoomContext = React.createContext(
  {} as ThingLinkZoomContextEntity
);
