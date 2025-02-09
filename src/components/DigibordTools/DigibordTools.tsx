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

  // WILL CREATE AN 2 ASSIGNMENT SHAPES ON MOUNT BECAUSE OF STRICT MODE
  function addAssignmentShape(editor: Editor) {
    editor.createShape({
      id: createShapeId(),
      type: "assignment-shape",
      x: 0,
      y: 0,
      props: { assignments: <Assignments /> },
    });
  }

  // PREVENTS ASSIGNMENT SHAPES FROM BEING DELETED, OTHERWISE THE WHOLE PAGE WILL BE DELETED
  function disallowAssignmentShapeDeletion(editor: Editor) {
    editor.sideEffects.registerBeforeDeleteHandler("shape", (shape) => {
      if (shape.type === "assignment-shape") {
        return false;
      } else {
        return;
      }
    });
  }

  // PREVENTS ASSIGNMENT SHAPES FROM BEING MOVED
  function disallowAssignmentShapeMove(editor: Editor) {
    editor.sideEffects.registerBeforeChangeHandler("shape", (prev, next) => {
      if (
        editor.isShapeOfType<AssignmentShapeType>(prev, "assignment-shape") &&
        editor.isShapeOfType<AssignmentShapeType>(next, "assignment-shape")
      ) {
        if (
          next.x !== prev.x ||
          next.y !== prev.y ||
          next.rotation !== prev.rotation ||
          next.props.w !== prev.props.w ||
          next.props.h !== prev.props.h
        ) {
          return prev;
        }
      }
      return next;
    });
  }

  return (
    <TLDrawEditorContext.Provider value={{ editor: editor }}>
      <Tldraw
        // persistenceKey={new Date().toLocaleDateString("nl-NL")}
        components={components}
        shapeUtils={customShapeUtils}
        onMount={(editor) => {
          setEditor(editor);

          addAssignmentShape(editor);
          disallowAssignmentShapeDeletion(editor);
          disallowAssignmentShapeMove(editor);
        }}
      />
      <ExternalToolbar />
    </TLDrawEditorContext.Provider>
  );
}
