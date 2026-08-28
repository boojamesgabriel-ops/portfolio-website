"use client";

import { Edges, Line } from "@react-three/drei";
import { forwardRef, useMemo } from "react";
import type { Group } from "three";

type Vector3Tuple = [number, number, number];

type BlueprintBuildingProps = {
  position: Vector3Tuple;
  size: Vector3Tuple;
  floors: number;
  accent?: string;
  crown?: boolean;
};

const BlueprintBuilding = forwardRef<Group, BlueprintBuildingProps>(
  function BlueprintBuilding(
    {
      position,
      size,
      floors,
      accent = "#1cabb0",
      crown = false,
    },
    ref,
  ) {
    const [width, height, depth] = size;

    const floorHeights = useMemo(
      () =>
        Array.from(
          { length: floors - 1 },
          (_, index) => ((index + 1) / floors) * height,
        ),
      [floors, height],
    );

    return (
      <group ref={ref} position={position}>
        <mesh position={[0, height / 2, 0]}>
          <boxGeometry args={[width, height, depth]} />

          <meshStandardMaterial
            color="#111417"
            transparent
            opacity={0.46}
            roughness={0.8}
            metalness={0.1}
          />

          <Edges color="#d5dcdf" threshold={15} />
        </mesh>

        {floorHeights.map((floorHeight) => (
          <group key={floorHeight} position={[0, floorHeight, 0]}>
            <Line
              points={[
                [-width / 2, 0, depth / 2 + 0.01],
                [width / 2, 0, depth / 2 + 0.01],
              ]}
              color={accent}
              lineWidth={0.7}
              transparent
              opacity={0.55}
            />

            <Line
              points={[
                [width / 2 + 0.01, 0, -depth / 2],
                [width / 2 + 0.01, 0, depth / 2],
              ]}
              color={accent}
              lineWidth={0.7}
              transparent
              opacity={0.55}
            />
          </group>
        ))}

        {crown && (
          <>
            <mesh position={[0, height + 0.35, 0]}>
              <boxGeometry args={[width * 0.72, 0.7, depth * 0.72]} />
              <meshStandardMaterial
                color="#111417"
                transparent
                opacity={0.5}
              />
              <Edges color="#d5dcdf" />
            </mesh>

            <mesh position={[0, height + 1.25, 0]}>
              <cylinderGeometry args={[0.025, 0.04, 1.1, 8]} />
              <meshBasicMaterial color="#d5dcdf" />
            </mesh>
          </>
        )}
      </group>
    );
  },
);

BlueprintBuilding.displayName = "BlueprintBuilding";

export default BlueprintBuilding;