import "./ThingLinkZoomPreview.scss";

export default function ThingLinkZoomItemPreview(props: {
  item: ThingLinkItem;
}) {
  const { item } = props;

  return (
    <div className="thinglink-item">
      {item.image && (
        <img src={item.image} alt="" className="thinglink-item__image" />
      )}
      <div>
        {item.title && <p className="thinglink-item__title">{item.title}</p>}
        {item.description && (
          <p className="thinglink-item__description">{item.description}</p>
        )}
      </div>
    </div>
  );
}
