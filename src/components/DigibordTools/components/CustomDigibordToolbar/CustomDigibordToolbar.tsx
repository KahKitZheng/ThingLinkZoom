import { useContext } from "react";
import { useValue, GeoShapeGeoStyle } from "tldraw";
import { TLDrawEditorContext } from "../../context/TLDrawEditorContext";
import "./CustomDigibordToolbar.scss";

export default function CustomDigibordToolbar() {
  const { editor } = useContext(TLDrawEditorContext);

  const currentToolId = useValue(
    "current tool id",
    () => editor?.getCurrentToolId(),
    [editor]
  );

  function isToolActive(toolId: string) {
    return currentToolId === toolId;
  }

  function handleOnClickTool(selectedTool: string) {
    return editor?.setCurrentTool(selectedTool);
  }

  return (
    <div id="digibord-toolbar" className="external-toolbar">
      <button
        className="external-button"
        data-isactive={isToolActive("select")}
        onClick={() => handleOnClickTool("select")}
      >
        Select
      </button>
      <button
        className="external-button"
        data-isactive={isToolActive("draw")}
        onClick={() => handleOnClickTool("draw")}
      >
        Pencil
      </button>
      <button
        className="external-button"
        data-isactive={isToolActive("highlight")}
        onClick={() => handleOnClickTool("highlight")}
      >
        Highlight
      </button>
      <button
        className="external-button"
        data-isactive={isToolActive("eraser")}
        onClick={() => handleOnClickTool("eraser")}
      >
        Eraser
      </button>
      <button
        className="external-button"
        data-isactive={isToolActive("text")}
        onClick={() => handleOnClickTool("text")}
      >
        Text
      </button>
      <button
        className="external-button"
        data-isactive={
          isToolActive("geo") &&
          editor?.getStyleForNextShape(GeoShapeGeoStyle) === "rectangle"
        }
        onClick={() => {
          editor?.run(() => {
            editor?.setStyleForNextShapes(GeoShapeGeoStyle, "rectangle");
            handleOnClickTool("geo");
          });
        }}
      >
        Rectangle
      </button>
    </div>
  );
}
