import {
  DefaultToolbar,
  useTools,
  useIsToolSelected,
  TldrawUiMenuItem,
} from "tldraw";

export default function ModifiedDigibordToolbar() {
  const MAX_VISIBLE_TOOLS = 9;
  const visibleTools = [
    "select",
    "draw",
    "highlight",
    "eraser",
    "text",
    "rectangle",
  ];
  const FAKE_TOOLS = Array(MAX_VISIBLE_TOOLS - visibleTools.length).fill(null);

  const extraTools = [
    "arrow-left",
    "arrow-up",
    "arrow-down",
    "arrow-right",
    // "ellipse",
    // "triangle",
    // "diamond",
    // "hexagon",
    // "oval",
    // "rhombus",
    // "star",
    // "cloud",
    // "heart",
    // "x-box",
    // "check-box",
    // "arrow",
    // "line",
    // "laser",
    // "frame",
    // "note",
    // "asset",
  ];

  return (
    <DefaultToolbar>
      {visibleTools.map((toolId) => (
        <CustomToolbarItem key={toolId} toolId={toolId} />
      ))}
      {FAKE_TOOLS.map((_, index) => (
        <div
          key={index}
          style={{
            position: index === FAKE_TOOLS.length - 1 ? "absolute" : "relative",
          }}
        ></div>
      ))}
      {extraTools.map((toolId) => (
        <CustomToolbarItem key={toolId} toolId={toolId} />
      ))}
    </DefaultToolbar>
  );
}

type CustomToolbarItemType = {
  toolId: string;
};

function CustomToolbarItem({ toolId }: CustomToolbarItemType) {
  const tools = useTools();
  const isToolSelected = useIsToolSelected(tools[toolId]);

  return <TldrawUiMenuItem {...tools[toolId]} isSelected={isToolSelected} />;
}
