import { useState } from "react";
import "tldraw/tldraw.css";
import "./App.scss";
import "../DigibordTools/DigibordTools.scss"; // after tldraw.css
import DigibordTools from "../DigibordTools/DigibordTools";

const MAX_STEPS = 5;

export default function App() {
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
    <>
      <button className="nav-btn prev" onClick={prevStep} disabled={step === 0}>
        prev
      </button>
      <DigibordTools step={step} />
      <button
        className="nav-btn next"
        onClick={nextStep}
        disabled={step === MAX_STEPS}
      >
        next
      </button>
    </>
  );
}
