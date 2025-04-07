import { useContext } from "react";
import { TLDrawEditorContext } from "../../DigibordTools/context/TLDrawEditorContext";
import { FullScreenContext } from "../../../context/FullScreenContext";

export default function AssignmentExample8() {
  const { isFullScreen, toggleFullScreen } = useContext(FullScreenContext);
  const { isIdle } = useContext(TLDrawEditorContext);

  const id = "1215196305530290183";

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <iframe
        // width="100%"
        // height="100%"
        data-original-width="934"
        data-original-height="638"
        src={`https://www.thinglink.com/card/${id}`}
        style={{
          border: 0,
          backgroundColor: "white",
          height: isFullScreen ? "100vh" : "600px",
          width: isFullScreen ? "100vw" : "600px",
          pointerEvents: isIdle ? "auto" : "none",
        }}
        allowFullScreen
      />
      <button
        onClick={toggleFullScreen}
        style={{
          position: "absolute",
          height: "40px",
          width: "40px",
          bottom: "15px",
          right: "10px",
          backgroundColor: "transparent ",
          border: 0,
          cursor: "pointer",
        }}
      />

      <script async src="//cdn.thinglink.me/jse/responsive.js" />
    </div>
  );
}
