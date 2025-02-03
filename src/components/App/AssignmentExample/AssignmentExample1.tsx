import { useContext } from "react";
import { ThingLinkZoomContext } from "../../ThingLinkZoom/context/ThingLinkZoomContext";
import ThingLinkZoom from "../../ThingLinkZoom/ThingLinkZoom";
import "./AssignmentExample.scss";

export default function AssignmentExample1() {
  return (
    <div className="assignment-1">
      <ThingLinkZoom>
        <div className="grid-areas">
          {Array.from({ length: 7 }, (_, i) => (
            <Area index={i} />
          ))}
        </div>
      </ThingLinkZoom>
      <div>
        <h1 className="assignment-title">Which color is Tuesday?</h1>
        <p>
          <b>Grapheme–color synesthesia</b> or{" "}
          <b>colored grapheme synesthesia</b> is a form of synesthesia in which
          an individual's perception of numerals and letters is associated with
          the experience of colors.
        </p>
      </div>
    </div>
  );
}

function Area(props: { index: number }) {
  const { zoomToElement } = useContext(ThingLinkZoomContext);

  return (
    <button
      key={props.index}
      onClick={() => zoomToElement(props.index.toString())}
      style={{
        backgroundColor: `hsl(calc(${props.index} * 45), 100%, 90%)`,
        color: `hsl(calc(${props.index} * 45), 100%, 30%)`,
      }}
      className="grid-area"
    >
      <p className="grid-area__text" id={props.index.toString()}>
        Tuesday
      </p>
    </button>
  );
}
