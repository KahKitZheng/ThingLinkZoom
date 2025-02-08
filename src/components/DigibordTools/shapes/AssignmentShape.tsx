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
          height: shape.props.h,
          width: shape.props.w,
          // [a] This is where we allow pointer events on our shape
          pointerEvents: "all",
          overflow: "hidden",
        }}
      >
        {shape.props.assignments}
      </HTMLContainer>
    );
  }

  // [5]
  indicator(shape: AssignmentShapeType) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}

/* 
This is a custom shape, for a more in-depth look at how to create a custom shape,
see our custom shape example.

[1]
This is where we describe how our shape will render

	[a] We need to set pointer-events to all so that we can interact with our shape. This CSS property is
	set to "none" off by default. We need to manually opt-in to accepting pointer events by setting it to
	'all' or 'auto'. 

	[b] We need to stop event propagation so that the editor doesn't select the shape
		when we click on the checkbox. The 'canvas container' forwards events that it receives
		on to the editor, so stopping propagation here prevents the event from reaching the canvas.
	
	[c] If the shape is not checked, we stop event propagation so that the editor doesn't
		select the shape when we click on the input. If the shape is checked then we allow that event to
		propagate to the canvas and then get sent to the editor, triggering clicks or drags as usual.

*/
