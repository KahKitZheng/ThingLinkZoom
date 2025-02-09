import {
  BaseBoxShapeUtil,
  HTMLContainer,
  RecordProps,
  T,
  TLBaseShape,
} from "tldraw";

// There's a guide at the bottom of this file!

export type AssignmentShapeType = TLBaseShape<
  "assignment-shape",
  {
    w: number;
    h: number;
    assignments: React.ReactNode;
  }
>;

export class AssignmentShape extends BaseBoxShapeUtil<AssignmentShapeType> {
  static override type = "assignment-shape" as const;
  static override props: RecordProps<AssignmentShapeType> = {
    w: T.number,
    h: T.number,
    assignments: T.any,
  };

  override canEdit() {
    return false;
  }
  override canResize() {
    return false;
  }
  override isAspectRatioLocked() {
    return false;
  }
  // hide the selection bounds
  override hideSelectionBoundsBg() {
    return true;
  }
  // hide the selection bounds
  override hideSelectionBoundsFg() {
    return true;
  }

  getDefaultProps(): AssignmentShapeType["props"] {
    return {
      w: window.innerWidth,
      h: window.innerHeight,
      assignments: <></>,
    };
  }

  // [1]
  component(shape: AssignmentShapeType) {
    return (
      <HTMLContainer
        style={{
          width: shape.props.w,
          height: shape.props.h,
          pointerEvents: "all", // important to make everything inside the shape clickable if event propagation is stopped
        }}
      >
        {shape.props.assignments}
      </HTMLContainer>
    );
  }

  indicator() {
    return <></>;
  }
}
