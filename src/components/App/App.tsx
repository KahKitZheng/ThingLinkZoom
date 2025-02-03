import DigibordTools from "../DigibordTools/DigibordTools";
import { useEffect, useState } from "react";
import { Tldraw } from "tldraw";
import "../DigibordTools/DigibordTools.scss";
import "tldraw/tldraw.css";
import "./App.scss";
import AssignmentExample1 from "./AssignmentExample/AssignmentExample1";
import AssignmentExample2 from "./AssignmentExample/AssignmentExample2";

export default function App() {
  const [step, setStep] = useState(1);

  const [digibordMode, setDigibordMode] = useState(false);

  // if CMD + K is pressed, toggle digibord mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setDigibordMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // The type here is include only to ensure this example contains all possible ui components,
  const components = {
    // ContextMenu: null, // right click menu
    ActionsMenu: null, // top left expandable menu to align items
    // HelpMenu: null,
    ZoomMenu: null, // bottom left zoom menu
    MainMenu: null, // top left hamburger menu
    Minimap: null, // expandable minimap in bottom left
    // StylePanel: null, // top right menu with color pickers
    PageMenu: null, // top left, available pages
    // NavigationPanel: null, // zoomMenu + Minimap
    // Toolbar: null, // tools at bottom center
    KeyboardShortcutsDialog: null,
    // QuickActions: null, // undo, redo, duplicate, delete
    // HelperButtons: null,
    DebugPanel: null, // bottom right
    DebugMenu: null, // bottom right
    SharePanel: null,
    // MenuPanel: null, // everything top left
    // TopPanel: null,
    // CursorChatBubble: null,
  };

  // todays date in dd-mm-yyyy format
  const today = new Date().toLocaleDateString("nl-NL");

  function prevStep() {
    if (step <= 0) {
      return;
    }
    setStep(step - 1);
  }

  function nextStep() {
    if (step >= 1) {
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
        {/* <Tldraw
        components={components}
        persistenceKey={today}
        cameraOptions={{ isLocked: true }}
      > */}
        {step === 0 && <AssignmentExample1 />}
        {step === 1 && <AssignmentExample2 />}
        {/* {digibordMode && <DigibordTools />} */}
        {/* </Tldraw> */}
        <button className="nav-btn" onClick={nextStep}>
          next
        </button>
      </main>
    </div>
  );
}
