import Assignments from "../../Assignments/Assignments";
import ModifiedDigibordToolbar from "../components/ModifiedDigibordToolbar/ModifiedDigibordToolbar";

// Last check v3.8.1

// Keyboard modifiers
// shift:     !
// ctrl/cmd:  $
// alt:       ?

export const components = {
  // Keep
  // ---------------------------------------------------------------
  // StylePanel: null, // top right menu with color pickers
  // QuickActions: null, // undo, redo, duplicate, delete

  // Modify
  // ---------------------------------------------------------------
  Toolbar: ModifiedDigibordToolbar, // tools at bottom center
  OnTheCanvas: Assignments, // components on top of the canvas

  // Disable
  // ---------------------------------------------------------------
  ActionsMenu: null, // top-left | expandable menu to align items
  PageMenu: null, // top left, available pages
  MainMenu: null, // top left hamburger menu
  ZoomMenu: null, // bottom left zoom menu
  Minimap: null, // expandable minimap in bottom left
  NavigationPanel: null, // zoomMenu + Minimap
  KeyboardShortcutsDialog: null,
  DebugPanel: null, // bottom right
  DebugMenu: null, // bottom right
  SharePanel: null,
  ContextMenu: null, // right click menu

  // Unsure
  // ---------------------------------------------------------------
  // HelpMenu: null,
  // MenuPanel: null, // everything top left
  // HelperButtons: null,
  // TopPanel: null,
  // CursorChatBubble: null,
};
