import "./ThingLinkZoomPreview.scss";

export default function ThingLinkZoomItemPreview(props: {
  item: ThingLinkItem;
  isPopup?: boolean;
}) {
  const { item, isPopup } = props;

  return (
    <div
      className={`thinglink-item ${isPopup ? "popup-type" : "preview-type"}`}
    >
      {item.image && (
        <img src={item.image} alt="" className="thinglink-item__image" />
      )}
      <div className="thinglink-item__content">
        {item.title && (
          <p className="thinglink-item__content__title">{item.title}</p>
        )}
        {item.description && (
          <p className="thinglink-item__content__description">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
