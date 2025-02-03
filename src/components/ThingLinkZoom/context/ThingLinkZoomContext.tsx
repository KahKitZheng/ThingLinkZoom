import React from "react";

type ThingLinkZoomContextEntity = {
  zoomToElement: (elementId: number) => void;
};

export const ThingLinkZoomContext = React.createContext(
  {} as ThingLinkZoomContextEntity
);
