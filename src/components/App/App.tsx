import "./App.scss";
import "tldraw/tldraw.css";
import "../DigibordTools/DigibordTools.scss"; // after tldraw.css
import DigibordTools from "../DigibordTools/DigibordTools";

export default function App() {
  return (
    // <div style={{ height: "100vh", width: "100vw" }}>
    <DigibordTools />
    // </div>
  );
}
