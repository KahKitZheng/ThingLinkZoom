import { useCallback, useEffect, useState } from "react";
import { TLDrawEditorContext } from "./context/TLDrawEditorContext";
import { Editor, Tldraw, TLUiEventHandler } from "tldraw";
import { components } from "./config/components";
import useTLDrawOverrides from "./config/overrides";
import "tldraw/tldraw.css";
import "./DigibordTools.scss";
import { IdleTool } from "./tools/TLDrawIdleTool";
import { customAssetUrls } from "./assets/customAssets";

type DigibordToolsProps = {
  step: number;
  currentTool: string;
  setCurrentTool: React.Dispatch<React.SetStateAction<string>>;
};

export default function DigibordTools(props: DigibordToolsProps) {
  const { step, currentTool, setCurrentTool } = props;

  const [editor, setEditor] = useState<Editor | null>(null);
  const [isIdle, setIsIdle] = useState(false);

  const handleUiEvent = useCallback<TLUiEventHandler>(
    (name, data: unknown) => {
      // insert real logger here
      console.log(`event: ${name}`, data);

      setCurrentTool(data?.id as string);
    },
    [setCurrentTool]
  );

  const customTools = [IdleTool];
  const overrides = useTLDrawOverrides(setCurrentTool);

  useEffect(() => {
    setIsIdle(currentTool === "idle");
  }, [currentTool, editor]);

  return (
    <TLDrawEditorContext.Provider
      value={{ editor, step, isIdle, setCurrentTool }}
    >
      <div className={`digibord-tools-container ${isIdle ? "idle" : ""}`}>
        <Tldraw
          // hideUi
          persistenceKey={`toggle-mode-step-${props.step}`}
          components={components}
          tools={customTools}
          onMount={(editor) => {
            editor.setCurrentTool("idle");
            editor.user.updateUserPreferences({ locale: "nl" });

            setEditor(editor);
          }}
          cameraOptions={{ zoomSteps: [1, 1.25, 1.5, 2, 3, 4] }}
          onUiEvent={handleUiEvent}
          overrides={overrides}
          assetUrls={customAssetUrls}
        />
      </div>

      {/* <CustomDigibordToolbar /> */}
    </TLDrawEditorContext.Provider>
  );
}
