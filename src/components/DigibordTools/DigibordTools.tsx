import { Tldraw, TLUiComponents } from "tldraw";
import "tldraw/tldraw.css";
import "./DigibordTools.scss";

type DigibordToolsProps = {};

export default function DigibordTools(props: Readonly<DigibordToolsProps>) {
  // The type here is include only to ensure this example contains all possible ui components,
  const components: Required<TLUiComponents> = {
    // ContextMenu: null, // right click menu
    ActionsMenu: null, // top left expandable menu to align items
    // HelpMenu: null,
    // ZoomMenu: null, // bottom left zoom menu
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

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        components={components}
        persistenceKey={today}
        cameraOptions={{ isLocked: true }}
      />
    </div>
  );
}
