import { useState } from "react";
import AssignmentExample1 from "./AssignmentExample/AssignmentExample1";
import AssignmentExample2 from "./AssignmentExample/AssignmentExample2";
import AssignmentExample3 from "./AssignmentExample/AssignmentExample3";
import "./Assignments.scss";

const MAX_STEPS = 2;

export default function Assignments() {
  const [step, setStep] = useState(2);

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

  return (
    <main className="layout">
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

      {step === 0 && <AssignmentExample1 />}
      {step === 1 && <AssignmentExample2 />}
      {step === 2 && <AssignmentExample3 />}

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
