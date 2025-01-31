import { useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useFullScreen from "../../hooks/useFullScreen";
import "./ThingLinkZoom.scss";

export default function ThingLinkZoom() {
  const [selectId, setSelectId] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  const { toggleFullScreen } = useFullScreen(containerRef);

  return (
    <div style={{ position: "relative" }} ref={containerRef}>
      <TransformWrapper maxScale={1.5} wheel={{ disabled: true }}>
        {({ zoomToElement, resetTransform }) => (
          <>
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="grid-areas">
                {Array.from({ length: 7 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (selectId === i) {
                        resetTransform();
                        setSelectId(-1);
                        return;
                      } else {
                        setSelectId(i);
                        zoomToElement(`element-${i}`);
                      }
                    }}
                    style={{
                      backgroundColor: `hsl(calc(${i} * 45), 100%, 90%)`,
                      color: `hsl(calc(${i} * 45), 100%, 30%)`,
                    }}
                    className="grid-area"
                  >
                    <p id={`element-${i}`}>Tuesday</p>
                  </button>
                ))}
              </div>
            </TransformComponent>
            <button
              className="full-screen-btn"
              onClick={() => {
                toggleFullScreen();
                resetTransform();
                setSelectId(-1);
              }}
            >
              🥸
            </button>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
