import { useState } from "react";
import "./App.scss";
import "../DigibordTools/DigibordTools.scss";
import "tldraw/tldraw.css";
import AssignmentExample1 from "./AssignmentExample/AssignmentExample1";
import AssignmentExample2 from "./AssignmentExample/AssignmentExample2";
import AssignmentExample3 from "./AssignmentExample/AssignmentExample3";

const MAX_STEPS = 2;

export default function App() {
  const [step, setStep] = useState(0);

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
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <main className="layout">
        <button className="nav-btn" onClick={prevStep}>
          prev
        </button>

        {step === 0 && <AssignmentExample1 />}
        {step === 1 && <AssignmentExample2 />}
        {step === 2 && <AssignmentExample3 />}

        <button className="nav-btn" onClick={nextStep}>
          next
        </button>
      </main>
    </div>
  );
}
