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
  onClick?: () => void;
};

const TooltipButton: React.FC<TooltipButtonProps> = ({
  text,
  tooltip,
  containerRef,
  onClick,
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

    if (buttonRect.right + tooltipRect.width > containerRect.right) {
      newPosition = "left";
    }
    if (buttonRect.bottom + tooltipRect.height > containerRect.bottom) {
      newPosition = "top";
    }
    if (buttonRect.left - tooltipRect.width < containerRect.left) {
      newPosition = "right";
    }
    if (buttonRect.top - tooltipRect.height < containerRect.top) {
      newPosition = "bottom";
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

  function handleOnClick() {
    if (onClick) {
      onClick();
    }

    console.log("clicky");
  }

  return (
    <div>
      <button
        ref={buttonRef}
        onMouseEnter={() => adjustPosition()}
        onClick={handleOnClick}
        // onPointerDown={(e) => e.stopPropagation()}
        // onTouchStart={(e) => e.stopPropagation()}
        // onTouchEnd={(e) => e.stopPropagation()}
      >
        {text}
      </button>
      <div ref={tooltipRef} className={`tooltip absolute ${position}`}>
        {tooltip}
      </div>
    </div>
  );
};

export default TooltipButton;
