import { useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import React from "react";
import useFullScreen from "../../hooks/useFullScreen";
import { ThingLinkZoomContext } from "./context/ThingLinkZoomContext";
import "./ThingLinkZoom.scss";

type ThingLinkZoomProps = {
  children: React.ReactNode;
};

export default function ThingLinkZoom(props: ThingLinkZoomProps) {
  const { children } = props;

  const [selectId, setSelectId] = useState<number>(-1);

  const fullScreenContainerRef = useRef<HTMLDivElement>(null);
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const { toggleFullScreen } = useFullScreen(fullScreenContainerRef);

  function resetZoom() {
    if (!transformComponentRef.current) {
      return;
    }

    const { resetTransform } = transformComponentRef.current;

    resetTransform();
  }

  function zoomToElement(elementId: number) {
    if (!transformComponentRef.current) {
      return;
    }

    const { zoomToElement } = transformComponentRef.current;

    if (selectId === elementId) {
      resetZoom();
      setSelectId(-1);
    } else {
      setSelectId(elementId);
      zoomToElement(`element-${elementId}`);
    }
  }

  function handleOnClickFullScreen() {
    toggleFullScreen();
    resetZoom();
    setSelectId(-1);
  }

  return (
    <div className="thinglink-wrapper" ref={fullScreenContainerRef}>
      <TransformWrapper
        maxScale={3}
        wheel={{ disabled: true }}
        panning={{ disabled: true }}
        doubleClick={{ disabled: true }}
        ref={transformComponentRef}
      >
        <ThingLinkZoomContext.Provider value={{ zoomToElement }}>
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: "100%", height: "100%" }}
          >
            {children}
          </TransformComponent>
        </ThingLinkZoomContext.Provider>
        <button className="full-screen-btn" onClick={handleOnClickFullScreen}>
          🥸
        </button>
      </TransformWrapper>
    </div>
  );
}
