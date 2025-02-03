import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  useCallback,
  useLayoutEffect,
} from "react";

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
      <div
        ref={tooltipRef}
        className={`absolute ${position}`}
        style={{
          whiteSpace: "nowrap",
        }}
      >
        {tooltip}
      </div>
      <style jsx>{`
        .absolute {
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.2s;
        }
        button:hover + .absolute {
          visibility: visible;
          opacity: 1;
        }
        .top {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
        .bottom {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
        .left {
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
        .right {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
};

export default TooltipButton;
