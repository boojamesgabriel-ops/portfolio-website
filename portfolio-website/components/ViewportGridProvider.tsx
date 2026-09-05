"use client";

import { useEffect, type ReactNode } from "react";

type ViewportGridProviderProps = {
  children: ReactNode;
};

const CONTENT_RATIO = 0.94;
const MIN_COLUMNS = 6;
const MAX_COLUMNS = 30;
const MIN_DESKTOP_HEIGHT = 648;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function toEven(value: number) {
  const rounded = Math.floor(value);
  return rounded % 2 === 0 ? rounded : rounded - 1;
}

function getSectionColumns(width: number) {
  if (width < 480) {
    return 6;
  }

  if (width < 768) {
    return 10;
  }

  if (width < 1024) {
    return 12;
  }

  if (width < 1440) {
    return 14;
  }

  return toEven(clamp(width / 86, 16, MAX_COLUMNS));
}

function updateViewportGrid() {
  const root = document.documentElement;
  const viewportWidth = root.clientWidth || window.innerWidth;
  const viewportHeight = root.clientHeight || window.innerHeight;
  const sectionColumns = clamp(
    toEven(getSectionColumns(viewportWidth)),
    MIN_COLUMNS,
    MAX_COLUMNS,
  );

  const widthBasedBlock = (viewportWidth * CONTENT_RATIO) / sectionColumns;
  const estimatedRows = Math.max(
    6,
    Math.floor((viewportHeight * CONTENT_RATIO) / widthBasedBlock),
  );
  const blockSize = Math.min(
    widthBasedBlock,
    (viewportHeight * CONTENT_RATIO) / estimatedRows,
  );
  const viewportColumns = Math.max(
    sectionColumns,
    Math.floor(viewportWidth / blockSize),
  );
  const viewportRows = Math.max(1, Math.floor(viewportHeight / blockSize));
  const gridMaxWidth = blockSize * sectionColumns;
  const xOffset = Math.max(0, (viewportWidth - gridMaxWidth) / 2);
  const headerHeight = blockSize;
  const canUseEnhancedScroll =
    viewportHeight >= MIN_DESKTOP_HEIGHT && sectionColumns >= 16;

  root.style.setProperty("--grid-block-size", `${blockSize}px`);
  root.style.setProperty("--grid-block-size-num", blockSize.toFixed(3));
  root.style.setProperty(
    "--grid-columns-per-viewport",
    String(viewportColumns),
  );
  root.style.setProperty("--grid-rows-per-viewport", String(viewportRows));
  root.style.setProperty("--grid-section-columns", String(sectionColumns));
  root.style.setProperty("--grid-max-width", `${gridMaxWidth}px`);
  root.style.setProperty("--grid-x-offset", `${xOffset}px`);
  root.style.setProperty("--grid-viewport-height", `${viewportHeight}px`);
  root.style.setProperty("--header-height", `${headerHeight}px`);
  root.style.setProperty("--grid-size", "var(--grid-block-size)");
  root.dataset.enhancedScroll = canUseEnhancedScroll ? "true" : "false";
}

export default function ViewportGridProvider({
  children,
}: ViewportGridProviderProps) {
  useEffect(() => {
    let frame = 0;

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateViewportGrid);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleUpdate();
      }
    };

    scheduleUpdate();

    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("orientationchange", scheduleUpdate, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return children;
}
