import { useContext, useRef, useState } from "react";
import Pikachu from "../../../assets/pikachu.png";
import TooltipButton from "../../Tooltip/Tooltip";
import ThingLinkZoom from "../../ThingLinkZoom/ThingLinkZoom";
import ThingLinkZoomItemPreview from "../../ThingLinkZoomPreview/ThingLinkZoomPreview";
import "./AssignmentExample.scss";
import "../../ThingLinkZoom/ThingLinkZoom.scss";
import { ThingLinkZoomContext } from "../../ThingLinkZoom/context/ThingLinkZoomContext";

export default function AssignmentExample2() {
  const imageRef = useRef<HTMLImageElement>(null);

  const [previewSelectedItem, setPreviewSelectedItem] = useState<
    ThingLinkItem | undefined
  >(undefined);

  return (
    <div>
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
      onPointerDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
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
  // {
  //   id: "1Zl01h55hr",
  //   x: "87%",
  //   y: "68%",
  //   image:
  //     "https://lds-img.finalfantasyxiv.com/promo/h/b/d7BM1x8OZRZU-9fTk-D7g1t2oc.png",
  //   title: "Attack points",
  //   description:
  //     "Number of damage dealt to opponent's Pokémon. The higher the number, the more damage dealt.",
  // },
];

const areas: ZoomElement[] = [
  { id: "sCePq1fpcx", x: "24%", y: "15%", height: "30%", width: "52%" },
];
