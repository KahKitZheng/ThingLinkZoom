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
  const [isDigibordUIVisible, setIsDigibordUIVisible] = useState(true);
  const [activePopupId, setActivePopupId] = useState<string | undefined>("");

  const handleUiEvent = useCallback<TLUiEventHandler>(
    (name, data: Record<string, unknown>) => {
      // insert real logger here
      console.log(`event: ${name}`, data);

      setCurrentTool(data?.id as string);
    },
    [setCurrentTool]
  );

  const overrides = useTLDrawOverrides(setCurrentTool);

  useEffect(() => {
    setIsIdle(currentTool === "idle");
  }, [currentTool, editor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey && e.key === "k") || (e.ctrlKey && e.key === "k")) {
        setIsDigibordUIVisible(!isDigibordUIVisible);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDigibordUIVisible]);

  useEffect(() => {
    if (!editor) return;

    // Function to update shape visibility
    const updateShapeVisibility = () => {
      const currentPageShapes = editor.getCurrentPageShapeIds();
      editor.batch(() => {
        currentPageShapes.forEach((shapeId) => {
          const shape = editor.getShape(shapeId);
          if (shape) {
            const shapePopupId = shape.meta?.popupId;
            // Show shapes that match the active popup, hide others that have a popupId
            const shouldBeHidden =
              shapePopupId !== undefined &&
              shapePopupId !== "" &&
              shapePopupId !== activePopupId;
            const shouldBeVisible = !shouldBeHidden;

            // Determine if shape should be locked
            const shouldBeLocked =
              // Lock normal shapes when any popup is open
              ((!shapePopupId || shapePopupId === "") &&
                activePopupId !== undefined &&
                activePopupId !== "") ||
              // Lock popup shapes that don't match the active popup
              (shapePopupId !== undefined &&
                shapePopupId !== "" &&
                shapePopupId !== activePopupId);

            editor.updateShape({
              id: shapeId,
              type: shape.type,
              opacity: shouldBeVisible ? 1 : 0,
              isLocked: shouldBeLocked,
            });

            // Update z-index for normal shapes
            if (!shapePopupId || shapePopupId === "") {
              // Find the shape element in the DOM
              const shapeElement = document.querySelector(
                `[data-shape-id="${shapeId}"]`
              );
              if (shapeElement) {
                (shapeElement as HTMLElement).style.zIndex = "0";
              }
            }
          }
        });
      });
    };

    // Add store listener to track shape creation
    const unsubscribe = editor.store.listen((entry) => {
      const addedRecords = Object.values(entry.changes.added);
      if (addedRecords.length > 0) {
        editor.batch(() => {
          addedRecords.forEach((record) => {
            if (record.typeName === "shape") {
              editor.updateShape({
                id: record.id,
                type: record.type,
                meta: {
                  ...record.meta,
                  popupId: activePopupId,
                },
              });
            }
          });
        });
        // Update visibility after adding new shapes
        updateShapeVisibility();
      }
    });

    // Initial visibility update
    updateShapeVisibility();

    return () => {
      unsubscribe();
    };
  }, [editor, activePopupId]);

  return (
    <TLDrawEditorContext.Provider
      value={{
        editor,
        step,
        isIdle,
        setCurrentTool,
        activePopupId,
        setActivePopupId,
      }}
    >
      <div className={`digibord-tools-container ${isIdle ? "idle" : ""}`}>
        <Tldraw
          hideUi={!isDigibordUIVisible}
          persistenceKey={`toggle-mode-step-${props.step}`}
          components={components}
          tools={[IdleTool]}
          onMount={(editor) => {
            editor.setCurrentTool("idle");
            editor.user.updateUserPreferences({ locale: "nl" });

            setEditor(editor);

            const currentPageShapes = editor.getCurrentPageShapeIds();
            const shapes = [...currentPageShapes].map((shape) =>
              editor.getShape(shape)
            );

            console.log("shapes", shapes);
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
