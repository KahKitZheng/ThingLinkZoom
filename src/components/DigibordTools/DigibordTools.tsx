import { useState } from "react";
import { createShapeId, Editor, Tldraw, TLUiComponents } from "tldraw";
import { AssignmentShape, AssignmentShapeType } from "./shapes/AssignmentShape";
import ExternalToolbar from "./components/Toolbar/Toolbar";
import Assignments from "../Assignments/Assignments";
import "tldraw/tldraw.css";
import "./DigibordTools.scss";
import { TLDrawEditorContext } from "./context/TLDrawEditorContext";

export default function DigibordTools() {
  const [editor, setEditor] = useState<Editor | null>(null);

  // The type here is include only to ensure this example contains all possible ui components,
  const components: TLUiComponents = {
    ContextMenu: null, // right click menu
    ActionsMenu: null, // top left expandable menu to align items
    // HelpMenu: null,
    ZoomMenu: null, // bottom left zoom menu
    MainMenu: null, // top left hamburger menu
    Minimap: null, // expandable minimap in bottom left
    // StylePanel: null, // top right menu with color pickers
    PageMenu: null, // top left, available pages
    // NavigationPanel: null, // zoomMenu + Minimap
    Toolbar: null, // tools at bottom center
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

  const customShapeUtils = [AssignmentShape];

  return (
    <>
      <Tldraw
        components={components}
        // persistenceKey={new Date().toLocaleDateString("nl-NL")}
        shapeUtils={customShapeUtils}
        onMount={(editor) => {
          setEditor(editor);

          // WILL CREATE AN 2 ASSIGNMENT SHAPES ON MOUNT BECAUSE OF STRICT MODE
          editor.createShape({
            id: createShapeId(),
            type: "assignment-shape",
            x: 0,
            y: 0,
            props: {
              assignments: <Assignments />,
            },
          });
        }}
      />

      {editor && (
        <TLDrawEditorContext.Provider value={{ editor }}>
          <ExternalToolbar />
        </TLDrawEditorContext.Provider>
      )}
    </>
  );
}
