import { useCallback, useEffect, useRef, useState } from "react";
import ThingLinkZoom from "../../ThingLinkZoom/ThingLinkZoom";
import "./AssignmentExample.scss";

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
};

const BASE_IMAGE_URL = "https://cdn.filestackcontent.com/89DsEzVMRJCFxKpIatxO";
const OVERLAY_IMAGE_URL =
  "https://cdn.filestackcontent.com/OsPp6TFTkinetUtbRpFn";

export default function AssignmentExample7() {
  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Refs for caching loaded images to prevent flickering
  const baseImageObjRef = useRef<HTMLImageElement | null>(null);
  const overlayImageObjRef = useRef<HTMLImageElement | null>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Load images automatically on component mount
  useEffect(() => {
    loadBaseImage();
    loadOverlayImage();
  }, []);

  const loadBaseImage = () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setBaseImage(BASE_IMAGE_URL);
      baseImageObjRef.current = img;
      updateCanvasSize(img.width, img.height);

      // Only render if both images are loaded
      if (overlayImageObjRef.current) {
        renderCanvas();
      }
    };
    img.onerror = () => {
      console.error("Failed to load base image");
    };
    img.src = BASE_IMAGE_URL;
  };

  const loadOverlayImage = () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setOverlayImage(OVERLAY_IMAGE_URL);
      overlayImageObjRef.current = img;
      updateCanvasSize(img.width, img.height);

      // Only render if both images are loaded
      if (baseImageObjRef.current) {
        renderCanvas();
      }
    };
    img.onerror = () => {
      console.error("Failed to load overlay image");
    };
    img.src = OVERLAY_IMAGE_URL;
  };

  const updateCanvasSize = useCallback((width: number, height: number) => {
    // Maintain aspect ratio but limit size
    const maxWidth = containerRef.current?.clientWidth || 800;
    const maxHeight = window.innerHeight * 0.7;

    let newWidth = width;
    let newHeight = height;

    if (newWidth > maxWidth) {
      newHeight = (maxWidth / newWidth) * newHeight;
      newWidth = maxWidth;
    }

    if (newHeight > maxHeight) {
      newWidth = (maxHeight / newHeight) * newWidth;
      newHeight = maxHeight;
    }

    const devicePixelRatio = window.devicePixelRatio || 1;

    setCanvasSize({
      width: newWidth,
      height: newHeight,
    });

    // Create or resize the offscreen canvas
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement("canvas");
    }
    offscreenCanvasRef.current.width = newWidth * devicePixelRatio;
    offscreenCanvasRef.current.height = newHeight * devicePixelRatio;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = newWidth * devicePixelRatio;
      canvas.height = newHeight * devicePixelRatio;
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
    }
  }, []);

  // Drawing functionality
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!baseImage || !overlayImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentRect({ x, y, width: 0, height: 0, zIndex: rectangles.length });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentRect || !baseImage || !overlayImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentRect({
      ...currentRect,
      width: x - currentRect.x,
      height: y - currentRect.y,
    });

    // Use requestAnimationFrame to prevent flickering
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(renderCanvas);
  };

  const stopDrawing = () => {
    if (isDrawing && currentRect) {
      // Only add rectangles with positive width and height
      const normalizedRect = {
        x:
          currentRect.width < 0
            ? currentRect.x + currentRect.width
            : currentRect.x,
        y:
          currentRect.height < 0
            ? currentRect.y + currentRect.height
            : currentRect.y,
        width: Math.abs(currentRect.width),
        height: Math.abs(currentRect.height),
        zIndex: rectangles.length, // Assign z-index based on order of creation
      };

      if (normalizedRect.width > 5 && normalizedRect.height > 5) {
        setRectangles([...rectangles, normalizedRect]);
      }
    }

    setIsDrawing(false);
    setCurrentRect(null);

    // Final render to ensure everything is displayed correctly
    renderCanvas();
  };

  const clearRectangles = () => {
    setRectangles([]);
    renderCanvas();
  };

  // Draw dashed rectangle only for active rectangle
  const drawDashedRect = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      isActive = false
    ) => {
      // Normalize rectangle coordinates
      const normalizedX = width < 0 ? x + width : x;
      const normalizedY = height < 0 ? y + height : y;
      const normalizedWidth = Math.abs(width);
      const normalizedHeight = Math.abs(height);

      // Only draw borders for active rectangles (the one being drawn)
      // Skip drawing borders for placed rectangles
      if (!isActive) return;

      ctx.save();

      // Add transparency to the border color
      // Use full opacity (0.9) for the active rectangle
      const alpha = 0.9;
      const colorWithAlpha = hexToRgba("#ff0000", alpha);

      ctx.strokeStyle = colorWithAlpha;
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      ctx.strokeRect(
        normalizedX,
        normalizedY,
        normalizedWidth,
        normalizedHeight
      );
      ctx.restore();
    },
    []
  );

  // Add a helper function to convert hex color to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    // Remove the hash if it exists
    hex = hex.replace("#", "");

    // Parse the hex values
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    // Return rgba color string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Optimized canvas rendering to eliminate flickering
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const offscreen = offscreenCanvasRef.current;
    const baseImg = baseImageObjRef.current;
    const overlayImg = overlayImageObjRef.current;

    if (!canvas || !offscreen || !baseImg || !overlayImg) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    const offCtx = offscreen.getContext("2d", { alpha: false });

    if (!ctx || !offCtx) return;

    const devicePixelRatio = window.devicePixelRatio || 1;

    // Clear offscreen canvas
    offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

    // Draw base image to offscreen canvas
    offCtx.drawImage(baseImg, 0, 0, offscreen.width, offscreen.height);

    if (isOverlayVisible) {
      // Create a temporary canvas for the overlay with masks
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = offscreen.width;
      tempCanvas.height = offscreen.height;
      const tempCtx = tempCanvas.getContext("2d", { alpha: true });
      if (!tempCtx) return;

      // Draw overlay image on temp canvas
      tempCtx.drawImage(overlayImg, 0, 0, tempCanvas.width, tempCanvas.height);

      // Sort rectangles by z-index (lowest to highest)
      const sortedRectangles = [...rectangles].sort(
        (a, b) => a.zIndex - b.zIndex
      );

      // Process each rectangle as a mask
      sortedRectangles.forEach((rect) => {
        // For each rectangle, cut out that portion from the overlay
        tempCtx.globalCompositeOperation = "destination-out";
        tempCtx.fillRect(
          rect.x * devicePixelRatio,
          rect.y * devicePixelRatio,
          rect.width * devicePixelRatio,
          rect.height * devicePixelRatio
        );
      });

      // If currently drawing, add the current rectangle too
      if (isDrawing && currentRect) {
        tempCtx.globalCompositeOperation = "destination-out";
        tempCtx.fillRect(
          currentRect.width < 0
            ? (currentRect.x + currentRect.width) * devicePixelRatio
            : currentRect.x * devicePixelRatio,
          currentRect.height < 0
            ? (currentRect.y + currentRect.height) * devicePixelRatio
            : currentRect.y * devicePixelRatio,
          Math.abs(currentRect.width) * devicePixelRatio,
          Math.abs(currentRect.height) * devicePixelRatio
        );
      }

      // Reset composite operation
      tempCtx.globalCompositeOperation = "source-over";

      // Draw the masked overlay onto the offscreen canvas with opacity
      // offCtx.globalAlpha = opacity / 100;
      offCtx.drawImage(tempCanvas, 0, 0);
      offCtx.globalAlpha = 1;

      // Only draw dashed border around the current rectangle if drawing
      if (isDrawing && currentRect) {
        drawDashedRect(
          offCtx,
          currentRect.x * devicePixelRatio,
          currentRect.y * devicePixelRatio,
          currentRect.width * devicePixelRatio,
          currentRect.height * devicePixelRatio,
          true // Pass true to indicate this is the active rectangle
        );
      }
    }

    // Copy from offscreen canvas to visible canvas in a single operation
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);

    // Clean up animation frame reference
    animationFrameRef.current = null;
  }, [rectangles, isDrawing, currentRect, drawDashedRect, isOverlayVisible]);

  // Initialize offscreen canvas
  useEffect(() => {
    offscreenCanvasRef.current = document.createElement("canvas");
    offscreenCanvasRef.current.width = canvasSize.width;
    offscreenCanvasRef.current.height = canvasSize.height;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasSize.width, canvasSize.height]);

  // Render when rectangles change (not during drawing)
  useEffect(() => {
    if (!isDrawing) {
      renderCanvas();
    }
  }, [renderCanvas, isDrawing]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (baseImageObjRef.current) {
        updateCanvasSize(
          baseImageObjRef.current.width,
          baseImageObjRef.current.height
        );
        renderCanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateCanvasSize, renderCanvas]);

  return (
    <div className="assignment assignment-7">
      <ThingLinkZoom>
        <div className="pdf-assignment">
          <div className="assignment-image-preview">
            <canvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>
          <div>
            <button onClick={() => setIsOverlayVisible(false)}>
              Reveal all
            </button>
            <button
              onClick={() => {
                clearRectangles();
                setIsOverlayVisible(true);
              }}
            >
              Hide all
            </button>
          </div>
        </div>
      </ThingLinkZoom>
    </div>
  );
}
