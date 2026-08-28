"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import type { Group } from "three";
import BlueprintBuilding from "@/components/BlueprintBuilding";

type CitySceneProps = {
  buildProgressRef: MutableRefObject<number>;
};

export default function CityScene({ buildProgressRef }: CitySceneProps) {
  const farLeftBuildingRef = useRef<Group>(null);
  const leftBuildingRef = useRef<Group>(null);
  const backLeftBuildingRef = useRef<Group>(null);
  const centerBuildingRef = useRef<Group>(null);
  const mainBuildingRef = useRef<Group>(null);
  const backRightBuildingRef = useRef<Group>(null);
  const rightBuildingRef = useRef<Group>(null);
  const farRightBuildingRef = useRef<Group>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useFrame(() => {
    const buildings = [
      farLeftBuildingRef.current,
      farRightBuildingRef.current,
      backLeftBuildingRef.current,
      backRightBuildingRef.current,
      leftBuildingRef.current,
      rightBuildingRef.current,
      centerBuildingRef.current,
      mainBuildingRef.current,
    ].filter((building): building is Group => building !== null);

    const progress = reducedMotionRef.current ? 1 : buildProgressRef.current;

    buildings.forEach((building, index) => {
      const start = index * 0.07;
      const localProgress = Math.min(
        1,
        Math.max(0, (progress - start) / 0.42),
      );
      const easedProgress = 1 - Math.pow(1 - localProgress, 3);

      building.scale.set(
        0.88 + easedProgress * 0.12,
        Math.max(0.001, easedProgress),
        0.88 + easedProgress * 0.12,
      );
    });
  });

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} />

      <group position={[-0.2, -4.2, 0]} rotation={[0, -0.08, 0]}>
        <gridHelper
          args={[16, 16, "#49666a", "#29383a"]}
          position={[0, -0.01, 0]}
        />

        <BlueprintBuilding
          ref={farLeftBuildingRef}
          position={[-4.5, 0, -0.8]}
          size={[1.05, 2.8, 1]}
          floors={6}
        />

        <BlueprintBuilding
          ref={backLeftBuildingRef}
          position={[-2.7, 0, -2]}
          size={[1.15, 4.5, 1.15]}
          floors={9}
        />

        <BlueprintBuilding
          ref={leftBuildingRef}
          position={[-3.2, 0, 0.5]}
          size={[1.35, 3.7, 1.35]}
          floors={8}
        />

        <BlueprintBuilding
          ref={centerBuildingRef}
          position={[-1.45, 0, -0.45]}
          size={[1.45, 5.4, 1.45]}
          floors={11}
        />

        <BlueprintBuilding
          ref={backRightBuildingRef}
          position={[1.95, 0, -2.25]}
          size={[1.25, 5.7, 1.2]}
          floors={12}
        />

        <BlueprintBuilding
          ref={mainBuildingRef}
          position={[0.65, 0, 0]}
          size={[2.1, 7.8, 1.8]}
          floors={16}
          crown
        />

        <BlueprintBuilding
          ref={rightBuildingRef}
          position={[3.05, 0, 0.55]}
          size={[1.5, 4.7, 1.4]}
          floors={10}
        />

        <BlueprintBuilding
          ref={farRightBuildingRef}
          position={[4.55, 0, -0.85]}
          size={[1.05, 3.4, 1.05]}
          floors={7}
        />
      </group>
    </>
  );
}
