import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
  useLayoutEffect,
} from "react";
import "./Tooltip.scss";

type TooltipButtonProps = {
  text: string;
  tooltip: ReactNode;
  containerRef?: React.RefObject<HTMLDivElement>;
};

const TooltipButton: React.FC<TooltipButtonProps> = ({
  text,
  tooltip,
  containerRef,
}) => {
  const [position, setPosition] = useState("top");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const adjustPosition = useCallback(() => {
    if (!buttonRef.current || !tooltipRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const container = containerRef?.current || document.body;
    const containerRect = container.getBoundingClientRect();

    let newPosition = "top";

    if (buttonRect.top - tooltipRect.height < containerRect.top) {
      newPosition = "bottom";
    }
    if (buttonRect.bottom + tooltipRect.height > containerRect.bottom) {
      newPosition = "top";
    }
    if (buttonRect.left - tooltipRect.width < containerRect.left) {
      newPosition = "right";
    }
    if (buttonRect.right + tooltipRect.width > containerRect.right) {
      newPosition = "left";
    }

    setPosition(newPosition);
  }, [containerRef]);

  useLayoutEffect(() => {
    adjustPosition();
  }, [adjustPosition]);

  useEffect(() => {
    adjustPosition();
    window.addEventListener("resize", adjustPosition);
    return () => window.removeEventListener("resize", adjustPosition);
  }, [adjustPosition]);

  return (
    <div>
      <button ref={buttonRef} onMouseEnter={() => adjustPosition()}>
        {text}
      </button>
      <div ref={tooltipRef} className={`tooltip absolute ${position}`}>
        {tooltip}
      </div>
    </div>
  );
};

export default TooltipButton;
