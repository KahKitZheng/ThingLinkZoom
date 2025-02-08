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
import ThingLinkZoomPopup from "../ThingLinkZoomPopup/ThingLinkZoomPopup";

type ThingLinkZoomProps = {
  children: React.ReactNode;
  selectedItem?: ThingLinkItem | undefined;
  setPreviewSelectedItem?: React.Dispatch<
    React.SetStateAction<ThingLinkItem | undefined>
  >;
};

export default function ThingLinkZoom(props: ThingLinkZoomProps) {
  const { children } = props;

  const [selectId, setSelectId] = useState<string>("");

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

  function zoomToElement(elementId: string) {
    if (!transformComponentRef.current) {
      return;
    }

    const { zoomToElement } = transformComponentRef.current;

    if (selectId === elementId) {
      resetZoom();
      setSelectId("");
    } else {
      setSelectId(elementId);
      zoomToElement(elementId);
    }
  }

  // todo: does not reset properly when entering/exiting full-screen, because of the animation
  // animation needs to finish to get the correct width to reset to
  function handleOnClickFullScreen(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    toggleFullScreen();
    resetZoom();
    setSelectId("");
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
        <button
          className="full-screen-btn"
          onClick={(e) => handleOnClickFullScreen(e)}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          👀
        </button>
      </TransformWrapper>
      <ThingLinkZoomPopup
        isOpen={props.selectedItem !== undefined}
        onClose={() => {
          if (props.setPreviewSelectedItem) {
            props.setPreviewSelectedItem(undefined);
          }
        }}
        selectedItem={props.selectedItem}
      />
    </div>
  );
}
