import {
  TLUiOverrides,
  TLUiActionsContextType,
  TLUiToolsContextType,
} from "tldraw";

// Last check v3.8.1

// Keyboard modifiers
// shift:     !
// ctrl/cmd:  $
// alt:       ?

export default function useTLDrawOverrides(
  setCurrentTool: React.Dispatch<React.SetStateAction<string>>
) {
  const overrides: TLUiOverrides = {
    tools(_editor, tools): TLUiToolsContextType {
      const newTools = {
        ...tools,

        // Active tools
        // ----------------------------------------------------------------
        idle: {
          id: "idle",
          label: "idle",
          icon: "tool-idle",
          kbd: "s",
          onSelect() {
            setCurrentTool("idle");
            _editor.setCurrentTool("idle");
          },
        },
        eraser: {
          ...tools.eraser,
          onSelect() {
            setCurrentTool("eraser");
            _editor.setCurrentTool("eraser");
          },
          // kbd: "e",
        },
        highlight: {
          ...tools.highlight,
          onSelect() {
            setCurrentTool("highlight");
            _editor.setCurrentTool("highlight");
          },
          // kbd: "!d",
        },
        pencil: {
          ...tools.pencil,
          onSelect() {
            setCurrentTool("pencil");
            _editor.setCurrentTool("pencil");
          },
          // kbd: "d,b,x",
        },
        rectangle: {
          ...tools.rectangle,
          onSelect() {
            setCurrentTool("rectangle");
            _editor.setCurrentTool("geo");
          },
          // kbd: "r",
        },
        select: {
          ...tools.select,
          onSelect() {
            setCurrentTool("select");
            _editor.setCurrentTool("select");
          },
          // kbd: "v",
        },
        text: {
          ...tools.text,
          onSelect() {
            setCurrentTool("text");
            _editor.setCurrentTool("text");
          },
          // kbd: "t",
        },

        // Disabled tools
        // ----------------------------------------------------------------
        arrow: {
          ...tools.arrow,
          kbd: undefined, // kbd: "a"
        },
        asset: {
          ...tools.asset,
          kbd: undefined, // kbd: "$u"
        },
        ellipse: {
          ...tools.ellipse,
          kbd: undefined, // kbd: "o"
        },
        frame: {
          ...tools.laser,
          kbd: undefined, // kbd: "f"
        },
        hand: {
          ...tools.hand,
          kbd: undefined, // kbd: "h"
        },
        laser: {
          ...tools.laser,
          kbd: undefined, // kbd: "k"
        },
        line: {
          ...tools.line,
          kbd: undefined, // kbd: "l"
        },
        note: {
          ...tools.note,
          kbd: undefined, // kbd: "n"
        },
      };

      return newTools;
    },

    actions(_editor, actions): TLUiActionsContextType {
      const newActions = {
        ...actions,

        // Keep
        // ---------------------------------------------------------------
        undo: {
          ...actions["undo"],
          kbd: "$z",
        },
        redo: {
          ...actions["redo"],
          kbd: "$!z",
        },
        "select-zoom-tool": {
          ...actions["select-zoom-tool"],
          kbd: "z",
        },
        duplicate: {
          ...actions["duplicate"],
          kbd: "$d",
        },
        cut: {
          ...actions["cut"],
          kbd: "$x",
        },
        copy: {
          ...actions["copy"],
          kbd: "$c",
        },
        paste: {
          ...actions["paste"],
          kbd: "$v",
        },
        "select-all": {
          ...actions["select-all"],
          kbd: "$a",
        },
        delete: {
          ...actions["delete"],
          kbd: "⌫,del,backspace",
        },
        ungroup: {
          ...actions["ungroup"],
          kbd: "$!g",
        },
        group: {
          ...actions["group"],
          kbd: "$g",
        },
        "zoom-in": {
          ...actions["zoom-in"],
          kbd: "$=,=",
        },
        "zoom-out": {
          ...actions["zoom-out"],
          kbd: "$-,-",
        },
        "zoom-to-100": {
          ...actions["zoom-to-100"],
          kbd: "!0",
        },
        "zoom-to-fit": {
          ...actions["zoom-to-fit"],
          kbd: "!1",
        },
        "zoom-to-selection": {
          ...actions["zoom-to-selection"],
          kbd: "!2",
        },

        // Disable
        // ---------------------------------------------------------------
        "insert-embed": {
          ...actions["insert-embed"],
          kbd: undefined, // kbd: "$i"
        },
        "insert-media": {
          ...actions["insert-media"],
          kbd: undefined, // kbd: "$u"
        },
        "copy-as-svg": {
          ...actions["copy-as-svg"],
          kbd: undefined, // kbd: "$!c",
        },
        "toggle-dark-mode": {
          ...actions["toggle-dark-mode"],
          kbd: undefined, // kbd: "$/"
        },

        // Power-users?
        // ----------------------------------------------------------------
        "align-left": {
          ...actions["align-left"],
          kbd: "?A",
        },
        "align-center-horizontal": {
          ...actions["align-center-horizontal"],
          kbd: "?H",
        },
        "align-right": {
          ...actions["align-right"],
          kbd: "?D",
        },
        "align-center-vertical": {
          ...actions["align-center-vertical"],
          kbd: "?V",
        },
        "align-top": {
          ...actions["align-top"],
          kbd: "?W",
        },
        "align-bottom": {
          ...actions["align-bottom"],
          kbd: "?S",
        },
        "distribute-horizontal": {
          ...actions["distribute-horizontal"],
          kbd: "?!h",
        },
        "distribute-vertical": {
          ...actions["distribute-vertical"],
          kbd: "?!V",
        },
        "flip-horizontal": {
          ...actions["flip-horizontal"],
          kbd: "!h",
        },
        "flip-vertical": {
          ...actions["flip-vertical"],
          kbd: "!v",
        },
        "bring-to-front": {
          ...actions["bring-to-front"],
          kbd: "]",
        },
        "bring-forward": {
          ...actions["bring-forward"],
          kbd: "?]",
        },
        "send-backward": {
          ...actions["send-backward"],
          kbd: "?[",
        },
        "send-to-back": {
          ...actions["send-to-back"],
          kbd: "[",
        },
        "toggle-lock": {
          ...actions["toggle-lock"],
          kbd: "!l",
        },
        "select-white-color": {
          ...actions["select-white-color"],
          kbd: "?t",
        },
        "select-fill-fill": {
          ...actions["select-fill-fill"],
          kbd: "?f",
        },
        "flatten-to-image": {
          ...actions["flatten-to-image"],
          kbd: "!f",
        },
        "remove-frame": {
          ...actions["remove-frame"],
          kbd: "$!f",
        },
        "toggle-tool-lock": {
          ...actions["toggle-tool-lock"],
          kbd: "q",
        },
        "toggle-focus-mode": {
          ...actions["toggle-focus-mode"],
          kbd: "$.",
        },
        "toggle-grid": {
          ...actions["toggle-grid"],
          kbd: "$'",
        },

        // Unsure
        // ----------------------------------------------------------------
        print: {
          ...actions["print"],
          kbd: "$p",
        },
        "select-geo-tool": {
          ...actions["select-geo-tool"],
          kbd: "g",
        },
      };

      return newActions;
    },
  };

  return overrides;
}
