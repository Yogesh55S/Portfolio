"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";

function AnimatedParticles() {
  const ref = useRef();

  const sphere = useMemo(() => {
    const particles = new Float32Array(1200 * 3);
    for (let i = 0; i < 1200; i++) {
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      particles[i * 3] = x;
      particles[i * 3 + 1] = y;
      particles[i * 3 + 2] = z;
    }
    return particles;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.05;
      ref.current.rotation.x = t * 0.02;
    }
  });

  return (
    <group ref={ref}>
      <Points positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#60a5fa"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Particles() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <AnimatedParticles />
    </Canvas>
  );
}
