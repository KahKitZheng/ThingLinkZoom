import { useCallback, useEffect, useRef, useState } from "react";
import "tldraw/tldraw.css";
import "./App.scss";
import "../DigibordTools/DigibordTools.scss"; // after tldraw.css
import DigibordTools from "../DigibordTools/DigibordTools";
import { FullScreenContextProvider } from "../../context/FullscreenContextProvider";

const MAX_STEPS = 7;

export default function App() {
  const [step, setStep] = useState(7);
  const [currentTool, setCurrentTool] = useState<string>("idle");

  const prevStep = useCallback(() => {
    if (step <= 0) {
      return;
    }
    setStep(step - 1);
  }, [step]);

  const nextStep = useCallback(() => {
    if (step >= MAX_STEPS) {
      return;
    }
    setStep((prev) => prev + 1);
  }, [step]);

  useEffect(() => {
    if (currentTool !== "idle") {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevStep();
      } else if (e.key === "ArrowRight") {
        nextStep();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentTool, nextStep, prevStep]);

  const assignmentContainerRef = useRef<HTMLDivElement | null>(null);

  return (
    <FullScreenContextProvider refEl={assignmentContainerRef}>
      <div ref={assignmentContainerRef}>
        <button
          className="nav-btn prev"
          onClick={prevStep}
          disabled={step === 0}
        >
          prev
        </button>
        <DigibordTools
          step={step}
          currentTool={currentTool}
          setCurrentTool={setCurrentTool}
        />
        <button
          className="nav-btn next"
          onClick={nextStep}
          disabled={step === MAX_STEPS}
        >
          next
        </button>
      </div>
    </FullScreenContextProvider>
  );
}
