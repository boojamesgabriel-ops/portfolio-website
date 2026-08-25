"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { graphLinks, graphNodes } from "@/data/graph";

function GraphScene() {
    const groupRef = useRef<THREE.Group>(null);

    const nodeMap = useMemo(() => {
        return new Map(graphNodes.map((node) => [node.id, node]));
    }, []);

    const lines = useMemo(() => {
        return graphLinks.map((link) => {
            const source = nodeMap.get(link.source);
            const target = nodeMap.get(link.target);

            if (!source || !target) {
                return null;
            }

            return {
                id: `${link.source}-${link.target}`,
                points: [
                    new THREE.Vector3(...source.position),
                    new THREE.Vector3(...target.position),
                ],
            };
        }).filter(Boolean);
    }, [nodeMap]);

    useFrame(({ clock }) => {
        if (!groupRef.current) {
            return;
        }

        groupRef.current.rotation.y = clock.elapsedTime * 0.08;
        groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.08;
    });

    return (
        <group ref={groupRef}>
            {lines.map((line) => {
                if (!line) {
                    return null;
                }

                return (
                    <line key={line.id}>
                        <bufferGeometry setFromPoints={line.points} />
                        <lineBasicMaterial color="#09ca3af" transparent opacity={0.28} />
                    </line>
                );
            })}

            {graphNodes.map((node) => (
                <mesh key={node.id} position={node.position}>
                    <sphereGeometry args={[0.045, 16, 16]} />
                    <meshBasicMaterial color="#f8fafc" />
                </mesh>
            ))}
        </group>
    )
}

export default function BlueprintGraph() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useMemo(() => {
        if(!wrapperRef.current){
            return;
        }

        gsap.fromTo(
            wrapperRef.current,
            { opacity: 0, scale: 0.94 },
            { opacity: 1, scale: 1, duration: 1.4, ease: "power3.out"}
        );
    }, []);

    return (
        <div ref={wrapperRef} className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 45}}>
                <color attach="background" args={["#050505"]} />
                <GraphScene />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
            </Canvas>
        </div>
    )
}