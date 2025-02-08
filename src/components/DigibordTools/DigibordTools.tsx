import { Editor, Tldraw, TLUiComponents } from "tldraw";
import "tldraw/tldraw.css";
import "./DigibordTools.scss";
import { createContext, useState } from "react";
import ExternalToolbar from "./components/Toolbar/Toolbar";
import useIsDigibordToolsActive from "./hooks/useIsDigibordToolsActive";

type DigibordToolsProps = {
  children?: React.ReactNode;
};

export const editorContext = createContext({} as { editor: Editor });

export default function DigibordTools(props: DigibordToolsProps) {
  const [editor, setEditor] = useState<Editor | null>(null);

  // The type here is include only to ensure this example contains all possible ui components,
  const components: TLUiComponents = {
    // ContextMenu: null, // right click menu
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

  return (
    <div className="digibord-tools">
      <Tldraw
        components={components}
        persistenceKey={new Date().toLocaleDateString("nl-NL")}
        cameraOptions={{ isLocked: true }}
        onMount={(editor) => setEditor(editor)}
      >
        {props.children}
      </Tldraw>
      {editor && (
        <editorContext.Provider value={{ editor }}>
          <ExternalToolbar />
        </editorContext.Provider>
      )}
    </div>
  );
}
