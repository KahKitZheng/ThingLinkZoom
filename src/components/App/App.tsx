import { useState } from "react";
import "./App.scss";
import {
  TransformWrapper,
  TransformComponent,
  useTransformComponent,
} from "react-zoom-pan-pinch";

const CurrentScale = () => {
  return useTransformComponent(({ state }) => {
    return <div>Current Scale: {state.scale}</div>;
  });
};

export default function App() {
  const [selectId, setSelectId] = useState<number>(-1);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TransformWrapper maxScale={1.8}>
        {({ zoomToElement, resetTransform }) => (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <CurrentScale />
              <button onClick={() => resetTransform()}>reset scale</button>
            </div>
            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{ width: "100%", height: "100%" }}
            >
              <main>
                {Array.from({ length: 8 }, (_, i) => (
                  <button
                    key={i}
                    id={`element-${i}`}
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
                      backgroundColor: `hsl(calc(${i} * 40), 100%, 90%)`,
                      color: `hsl(calc(${i} * 40), 100%, 30%)`,
                    }}
                  >
                    <section>
                      <p>Section {i + 1}</p>
                    </section>
                  </button>
                ))}
              </main>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
