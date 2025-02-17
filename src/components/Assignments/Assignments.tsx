import { useContext, useEffect } from "react";
import { TLDrawEditorContext } from "../DigibordTools/context/TLDrawEditorContext";
import AssignmentExample1 from "./AssignmentExample/AssignmentExample1";
import AssignmentExample2 from "./AssignmentExample/AssignmentExample2";
import AssignmentExample3 from "./AssignmentExample/AssignmentExample3";
import AssignmentExample4 from "./AssignmentExample/AssignmentExample4";
import AssignmentExample5 from "./AssignmentExample/AssignmentExample5";
import AssignmentExample6 from "./AssignmentExample/AssignmentExample6";
import "./Assignments.scss";

export default function Assignments() {
  const { editor, step } = useContext(TLDrawEditorContext);

  // refs doesn't re-render the component, so we use getElementById instead
  const assignmentContainerEl = document.getElementById("assignment-container");

  useEffect(() => {
    // Once the assignment is loaded, update camera options to fit assignments taller than viewport
    function updateCameraOptions() {
      if (!editor || !assignmentContainerEl) {
        return;
      }

      editor.setCameraOptions({
        ...editor.getCameraOptions(),
        constraints: {
          initialZoom: "default",
          baseZoom: "default",
          bounds: {
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: assignmentContainerEl?.clientHeight ?? window.innerHeight,
          },
          behavior: { x: "contain", y: "contain" },
          padding: { x: 0, y: 0 },
          origin: { x: 0.5, y: 0.5 },
        },
      });
    }

    updateCameraOptions();

    window.addEventListener("resize", updateCameraOptions);
    return () => {
      window.removeEventListener("resize", updateCameraOptions);
    };
  }, [assignmentContainerEl, editor]);

  return (
    <div id="assignment-container" className="assignment-layout">
      {step === 0 && <AssignmentExample1 />}
      {step === 1 && <AssignmentExample2 />}
      {step === 2 && <AssignmentExample3 />}
      {step === 3 && <AssignmentExample4 />}
      {step === 4 && <AssignmentExample5 />}
      {step === 5 && <AssignmentExample6 />}
    </div>
  );
}
