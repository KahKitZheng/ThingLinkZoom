import { useState } from "react";
import { Editor, Tldraw } from "tldraw";
import { AssignmentShape } from "./shapes/AssignmentShape";
import { TLDrawEditorContext } from "./context/TLDrawEditorContext";
import ExternalToolbar from "./components/Toolbar/Toolbar";
import Assignments from "../Assignments/Assignments";
import "tldraw/tldraw.css";
import "./DigibordTools.scss";

export default function DigibordTools() {
  const [editor, setEditor] = useState<Editor | null>(null);

  const components = {
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
    OnTheCanvas: Assignments,
  };

  const customShapeUtils = [AssignmentShape];

  return (
    <TLDrawEditorContext.Provider value={{ editor: editor }}>
      <Tldraw
        persistenceKey={new Date().toLocaleDateString("nl-NL")}
        components={components}
        shapeUtils={customShapeUtils}
        onMount={(editor) => {
          setEditor(editor);
        }}
      />
      <ExternalToolbar />
    </TLDrawEditorContext.Provider>
  );
}
