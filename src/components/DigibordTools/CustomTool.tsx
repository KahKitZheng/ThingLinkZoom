import { StateNode } from "tldraw";
// import { ScreenshotDragging } from "./childStates/Dragging";
// import { ScreenshotIdle } from "./childStates/Idle";
// import { ScreenshotPointing } from "./childStates/Pointing";

// There's a guide at the bottom of this file!

export class CustomTool extends StateNode {
  // [1]
  static override id = "idle";
  static override initial = "idle";
  // static override children() {
  //   return [ScreenshotIdle, ScreenshotPointing, ScreenshotDragging];
  // }

  // [2]
  override onEnter() {
    this.editor.setCursor({ type: "default", rotation: 0 });
  }

  override onExit() {
    this.editor.setCursor({ type: "default", rotation: 0 });
  }

  // [3]
  override onInterrupt() {
    this.complete();
  }

  override onCancel() {
    this.complete();
  }

  private complete() {
    return;
  }
}
