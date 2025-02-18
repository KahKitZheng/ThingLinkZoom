import { useCallback, useState } from "react";
import { TLDrawEditorContext } from "./context/TLDrawEditorContext";
import { Editor, Tldraw, TLUiEventHandler } from "tldraw";
import { components } from "./config/components";
import { overrides } from "./config/overrides";
import "tldraw/tldraw.css";
import "./DigibordTools.scss";

type DigibordToolsProps = {
  step: number;
};

export default function DigibordTools(props: DigibordToolsProps) {
  const { step } = props;

  const [editor, setEditor] = useState<Editor | null>(null);

  const handleUiEvent = useCallback<TLUiEventHandler>((name, data: unknown) => {
    // insert real logger here
    console.log(`event: ${name}`, data);
  }, []);

  return (
    <TLDrawEditorContext.Provider value={{ editor, step }}>
      <div className="digibord-tools-container">
        <Tldraw
          persistenceKey={`step-${step}`}
          components={components}
          onMount={(editor) => setEditor(editor)}
          cameraOptions={{ zoomSteps: [1, 1.25, 1.5, 2, 3, 4] }}
          onUiEvent={handleUiEvent}
          overrides={overrides}
        />
      </div>
      {/* <CustomDigibordToolbar /> */}
    </TLDrawEditorContext.Provider>
  );
}
