import { useContext, useRef, useState } from "react";
import { ThingLinkZoomContext } from "../../ThingLinkZoom/context/ThingLinkZoomContext";
import Pikachu from "../../../assets/pikachu.png";
import TooltipButton from "../../Tooltip/Tooltip";
import ThingLinkZoom from "../../ThingLinkZoom/ThingLinkZoom";
import ThingLinkZoomItemPreview from "../../ThingLinkZoomPreview/ThingLinkZoomPreview";
import "./AssignmentExample.scss";
import "../../ThingLinkZoom/ThingLinkZoom.scss";
import { TLDrawEditorContext } from "../../DigibordTools/context/TLDrawEditorContext";

export default function AssignmentExample2() {
  const imageRef = useRef<HTMLImageElement>(null);
  const { setActivePopupId } = useContext(TLDrawEditorContext);

  const [previewSelectedItem, setPreviewSelectedItem] = useState<
    ThingLinkItem | undefined
  >(undefined);

  return (
    <div className="assignment">
      <ThingLinkZoom
        selectedItem={previewSelectedItem}
        setPreviewSelectedItem={setPreviewSelectedItem}
      >
        <div
          style={{
            position: "relative",
            height: `calc(${imageRef.current?.offsetHeight} + 1px)`,
            width: `calc(${imageRef.current?.offsetWidth} + 1px)`,
            margin: "auto",
          }}
        >
          <img src={Pikachu} alt="Pokemon TCG - pikachu" ref={imageRef} />
          {items.map((item) => (
            <div
              id={`thinglink-spot-${item.id}`}
              key={item.id}
              className="thinglink-spot"
              style={{ top: item.y, left: item.x }}
            >
              <TooltipButton
                text="+"
                tooltip={<ThingLinkZoomItemPreview item={item} />}
                containerRef={imageRef}
                onClick={() => {
                  setPreviewSelectedItem(item);
                  setActivePopupId(item.id);
                }}
              />
            </div>
          ))}

          {areas.map((area, index) => (
            <ZoomArea key={index} item={area} />
          ))}
        </div>
      </ThingLinkZoom>
    </div>
  );
}

function ZoomArea({ item }: { item: ZoomElement }) {
  const { zoomToElement } = useContext(ThingLinkZoomContext);

  return (
    <button
      style={{
        position: "absolute",
        top: item.y,
        left: item.x,
        height: item.height,
        width: item.width,
        border: "4px dashed black",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: "0",
      }}
      onClick={(e) => {
        e.preventDefault();

        zoomToElement(item.id);
      }}
      // onPointerDown={(e) => e.stopPropagation()}
      // onTouchStart={(e) => e.stopPropagation()}
      // onTouchEnd={(e) => e.stopPropagation()}
      className="zoom-area"
    >
      <div id={item.id} style={{ height: "100%", width: "100%" }}></div>
    </button>
  );
}

const items: ThingLinkItem[] = [
  {
    id: "sCePq1fpcx",
    x: "45%",
    y: "4%",
    image: undefined,
    title: "Pikachu",
    description:
      "Pikachu is Pokémon #025 in the National Pokédex. It is an Electric-type Pokémon introduced in Generation 1 and is the mascot of the Pokémon franchise. Pikachu evolves from Pichu when leveled up with high friendship and can evolve into Raichu (or Alolan Raichu with a Thunder Stone in Alola).",
  },
];

const areas: ZoomElement[] = [
  { id: "sCePq1fpcx", x: "24%", y: "15%", height: "30%", width: "52%" },
];
