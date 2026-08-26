"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { graphLinks, graphNodes } from "@/data/graph";

function GraphScene() {
  const groupRef = useRef<THREE.Group>(null);
  const elapsedTimeRef = useRef(0);

  const nodeMap = useMemo(
    () => new Map(graphNodes.map((node) => [node.id, node])),
    [],
  );

  const lines = useMemo(() => {
    return graphLinks.flatMap((link) => {
      const source = nodeMap.get(link.source);
      const target = nodeMap.get(link.target);

      if (!source || !target) return [];

      return [
        {
          id: `${link.source}-${link.target}`,
          points: [
            new THREE.Vector3(...source.position),
            new THREE.Vector3(...target.position),
          ],
        },
      ];
    });
  }, [nodeMap]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    elapsedTimeRef.current += delta;
    const elapsedTime = elapsedTimeRef.current;

    groupRef.current.rotation.y = elapsedTime * 0.08;
    groupRef.current.rotation.x =
      Math.sin(elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {lines.map((line) => (
        <Line
            key={line.id}
            points={line.points}
            color="#9ca3af"
            lineWidth={1}
            transparent
            opacity={0.75}
            />
      ))}

      {graphNodes.map((node) => (
        <mesh key={node.id} position={node.position}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      ))}
    </group>
  );
}

export default function BlueprintGraph() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const animation = gsap.fromTo(
      wrapper,
      { opacity: 0, scale: 0.94 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
      },
    );

    return () => animation.kill();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >

        <GraphScene />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}