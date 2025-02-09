import { useContext, useEffect, useRef, useState } from "react";
import { TLDrawEditorContext } from "../DigibordTools/context/TLDrawEditorContext";
import { AssignmentShapeType } from "../DigibordTools/shapes/AssignmentShape";
import { TLShapePartial } from "tldraw";
import AssignmentExample1 from "./AssignmentExample/AssignmentExample1";
import AssignmentExample2 from "./AssignmentExample/AssignmentExample2";
import AssignmentExample3 from "./AssignmentExample/AssignmentExample3";
import AssignmentExample4 from "./AssignmentExample/AssignmentExample4";
import "./Assignments.scss";

const MAX_STEPS = 3;

export default function Assignments() {
  const { editor } = useContext(TLDrawEditorContext);

  const [step, setStep] = useState(MAX_STEPS);

  const assignmentsRef = useRef<HTMLDivElement>(null);

  function prevStep() {
    if (step <= 0) {
      return;
    }
    setStep(step - 1);
  }

  function nextStep() {
    if (step >= MAX_STEPS) {
      return;
    }
    setStep((prev) => prev + 1);
  }

  useEffect(() => {
    // Once the assignment is loaded, update the camera options to fit tall assignments better
    function updateCameraOptions() {
      if (!editor || !assignmentsRef.current) {
        return;
      }

      editor.setCameraOptions({
        zoomSteps: [1, 1.25, 1.5, 2],
        constraints: {
          initialZoom: "default",
          baseZoom: "default",
          bounds: {
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: assignmentsRef.current.clientHeight ?? window.innerHeight,
          },
          behavior: { x: "contain", y: "contain" },
          padding: { x: 0, y: 0 },
          origin: { x: 0.5, y: 0.5 },
        },
      });

      // update shape
      const assignmentShape = editor.getShapeAtPoint({ x: 0, y: 0 });

      // const shapeUpdate: TLShapePartial<AssignmentShapeType> = {
      //   id: assignmentShape!.id,
      //   type: assignmentShape!.type,
      //   props: {
      //     w: window.innerWidth,
      //     h: assignmentsRef.current.clientHeight ?? window.innerHeight,
      //   },
      // };

      // Update the shape
      editor.updateShapes([
        {
          id: assignmentShape!.id,
          type: assignmentShape!.type,
          props: {
            w: window.innerWidth,
            h: assignmentsRef.current.clientHeight ?? window.innerHeight,
          },
        },
      ]);

      console.log("test", assignmentShape, window.innerWidth);
    }

    updateCameraOptions();

    window.addEventListener("resize", updateCameraOptions);
    return () => {
      window.removeEventListener("resize", updateCameraOptions);
    };
  }, [editor]);

  return (
    <main className="assignment-layout" ref={assignmentsRef}>
      <button
        className="nav-btn"
        onClick={prevStep}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        disabled={step === 0}
      >
        prev
      </button>

      <div
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "6px",
        }}
      >
        {step === 0 && <AssignmentExample1 />}
        {step === 1 && <AssignmentExample2 />}
        {step === 2 && <AssignmentExample3 />}
        {step === 3 && <AssignmentExample4 />}
      </div>

      <button
        className="nav-btn"
        onClick={nextStep}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        disabled={step === MAX_STEPS}
      >
        next
      </button>
    </main>
  );
}
