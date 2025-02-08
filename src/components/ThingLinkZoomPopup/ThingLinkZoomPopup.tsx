import ThingLinkZoomItemPreview from "../ThingLinkZoomPreview/ThingLinkZoomPreview";
import "./ThingLinkZoomPopup.scss";

type ThingLinkZoomPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: ThingLinkItem | undefined;
};

export default function ThingLinkZoomPopup(
  props: Readonly<ThingLinkZoomPopupProps>
) {
  const { isOpen, onClose, selectedItem } = props;

  return selectedItem && isOpen ? (
    <div>
      <button
        className="shade"
        onClick={onClose}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      />
      <div className="popup">
        <ThingLinkZoomItemPreview item={selectedItem} isPopup />
      </div>
    </div>
  ) : null;
}
