import "./App.scss";
import "tldraw/tldraw.css";
import "../DigibordTools/DigibordTools.scss"; // after tldraw.css
import DigibordTools from "../DigibordTools/DigibordTools";
import { useState } from "react";

const MAX_STEPS = 3;

export default function App() {
  const [step, setStep] = useState(MAX_STEPS);

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
    <>
      <button
        className="nav-btn prev"
        onClick={prevStep}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        disabled={step === 0}
      >
        prev
      </button>
      <DigibordTools step={step} />
      <button
        className="nav-btn next"
        onClick={nextStep}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        disabled={step === MAX_STEPS}
      >
        next
      </button>
    </>
  );
}
