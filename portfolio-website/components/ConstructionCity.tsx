"use client";

import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import CityScene from "@/components/CityScene";

export default function ConstructionCity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buildProgressRef = useRef(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.4 },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = container.closest<HTMLElement>(".projects-section");

    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      buildProgressRef.current = 1;
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 900px)", () => {
      const buildTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        end: "top 16%",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          buildProgressRef.current = self.progress;
        },
      });

      const pinTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * 1.35)}`,
        pin: true,
        invalidateOnRefresh: true,
      });

      return () => {
        buildTrigger.kill();
        pinTrigger.kill();
      };
    });

    media.add("(max-width: 899px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        end: "bottom 35%",
        scrub: true,
        onUpdate: (self) => {
          buildProgressRef.current = self.progress;
        },
      });

      return () => trigger.kill();
    });

    return () => media.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="construction-city-3d"
      data-active={isActive}
      role="img"
      aria-label="A blueprint city constructing itself"
    >
      <Canvas
        orthographic
        camera={{
          position: [9, 8, 11],
          zoom: 38,
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
        dpr={[1, 1.5]}
      >
        <CityScene buildProgressRef={buildProgressRef} />
      </Canvas>

      <span className="city-frame-label city-frame-label--top">
        URBAN STUDY / BUILD 01
      </span>
      <span className="city-frame-label city-frame-label--bottom">
        X 14.22 / Y 08.28
      </span>
      <span className="city-scan-line" aria-hidden="true" />
    </div>
  );
}
