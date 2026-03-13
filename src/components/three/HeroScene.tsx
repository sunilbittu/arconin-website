import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.15 - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (mouse.current.y * 0.08 - groupRef.current.rotation.x) * 0.03;
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        mouse.current.x = (e.clientX / size.width - 0.5) * 2;
        mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
      }}
    >
      <mesh visible={false}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {children}
    </group>
  );
}

// Wireframe room outline
function RoomWireframe() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.PI * -0.15 + Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
  });

  const w = 5; // room width
  const d = 4; // room depth
  const h = 3; // room height

  // Room edges — floor, back wall, left wall (open front & right for visibility)
  const roomLines: [number, number, number][][] = [
    // Floor
    [[-w/2, 0, -d/2], [w/2, 0, -d/2]],
    [[w/2, 0, -d/2], [w/2, 0, d/2]],
    [[w/2, 0, d/2], [-w/2, 0, d/2]],
    [[-w/2, 0, d/2], [-w/2, 0, -d/2]],
    // Back wall
    [[-w/2, 0, -d/2], [-w/2, h, -d/2]],
    [[w/2, 0, -d/2], [w/2, h, -d/2]],
    [[-w/2, h, -d/2], [w/2, h, -d/2]],
    // Left wall
    [[-w/2, 0, -d/2], [-w/2, 0, d/2]],
    [[-w/2, 0, d/2], [-w/2, h, d/2]],
    [[-w/2, h, d/2], [-w/2, h, -d/2]],
    // Ceiling edges
    [[-w/2, h, -d/2], [-w/2, h, d/2]],
    [[w/2, h, -d/2], [w/2, h, d/2]],
    [[-w/2, h, d/2], [w/2, h, d/2]],
  ];

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {roomLines.map((pts, i) => (
        <Line key={`room-${i}`} points={pts} color="#b8935f" transparent opacity={0.15} lineWidth={1} />
      ))}
    </group>
  );
}

// Wireframe sofa
function Sofa() {
  const lines: [number, number, number][][] = [
    // Seat base
    [[-1.2, 0, 0.8], [1.2, 0, 0.8]],
    [[1.2, 0, 0.8], [1.2, 0, 1.6]],
    [[1.2, 0, 1.6], [-1.2, 0, 1.6]],
    [[-1.2, 0, 1.6], [-1.2, 0, 0.8]],
    // Seat top
    [[-1.2, 0.4, 0.8], [1.2, 0.4, 0.8]],
    [[1.2, 0.4, 0.8], [1.2, 0.4, 1.6]],
    [[1.2, 0.4, 1.6], [-1.2, 0.4, 1.6]],
    [[-1.2, 0.4, 1.6], [-1.2, 0.4, 0.8]],
    // Verticals
    [[-1.2, 0, 0.8], [-1.2, 0.4, 0.8]],
    [[1.2, 0, 0.8], [1.2, 0.4, 0.8]],
    [[1.2, 0, 1.6], [1.2, 0.4, 1.6]],
    [[-1.2, 0, 1.6], [-1.2, 0.4, 1.6]],
    // Backrest
    [[-1.2, 0.4, 0.8], [-1.2, 0.9, 0.8]],
    [[1.2, 0.4, 0.8], [1.2, 0.9, 0.8]],
    [[-1.2, 0.9, 0.8], [1.2, 0.9, 0.8]],
    // Armrests
    [[-1.2, 0.4, 1.6], [-1.2, 0.65, 1.6]],
    [[-1.2, 0.65, 1.6], [-1.2, 0.65, 0.8]],
    [[1.2, 0.4, 1.6], [1.2, 0.65, 1.6]],
    [[1.2, 0.65, 1.6], [1.2, 0.65, 0.8]],
  ];

  return (
    <group position={[-0.3, -1.2, -0.5]}>
      {lines.map((pts, i) => (
        <Line key={`sofa-${i}`} points={pts} color="#b8935f" transparent opacity={0.25} lineWidth={1.2} />
      ))}
    </group>
  );
}

// Wireframe coffee table
function CoffeeTable() {
  const lines: [number, number, number][][] = [
    // Top
    [[-0.5, 0.35, 0], [0.5, 0.35, 0]],
    [[0.5, 0.35, 0], [0.5, 0.35, 0.4]],
    [[0.5, 0.35, 0.4], [-0.5, 0.35, 0.4]],
    [[-0.5, 0.35, 0.4], [-0.5, 0.35, 0]],
    // Legs
    [[-0.45, 0, 0.05], [-0.45, 0.35, 0.05]],
    [[0.45, 0, 0.05], [0.45, 0.35, 0.05]],
    [[-0.45, 0, 0.35], [-0.45, 0.35, 0.35]],
    [[0.45, 0, 0.35], [0.45, 0.35, 0.35]],
  ];

  return (
    <group position={[-0.3, -1.2, 0.7]}>
      {lines.map((pts, i) => (
        <Line key={`table-${i}`} points={pts} color="#b8935f" transparent opacity={0.2} lineWidth={1} />
      ))}
    </group>
  );
}

// Wireframe floor lamp
function FloorLamp() {
  const lines: [number, number, number][][] = [
    // Base circle approximation
    [[-0.15, 0, 0], [0.15, 0, 0]],
    [[-0.1, 0, -0.1], [0.1, 0, 0.1]],
    [[-0.1, 0, 0.1], [0.1, 0, -0.1]],
    // Pole
    [[0, 0, 0], [0, 1.8, 0]],
    // Shade
    [[-0.25, 1.8, -0.1], [0.25, 1.8, -0.1]],
    [[0.25, 1.8, -0.1], [0.25, 1.8, 0.1]],
    [[0.25, 1.8, 0.1], [-0.25, 1.8, 0.1]],
    [[-0.25, 1.8, 0.1], [-0.25, 1.8, -0.1]],
    [[-0.2, 2.05, -0.07], [0.2, 2.05, -0.07]],
    [[0.2, 2.05, -0.07], [0.2, 2.05, 0.07]],
    [[0.2, 2.05, 0.07], [-0.2, 2.05, 0.07]],
    [[-0.2, 2.05, 0.07], [-0.2, 2.05, -0.07]],
    // Shade verticals
    [[-0.25, 1.8, -0.1], [-0.2, 2.05, -0.07]],
    [[0.25, 1.8, -0.1], [0.2, 2.05, -0.07]],
    [[0.25, 1.8, 0.1], [0.2, 2.05, 0.07]],
    [[-0.25, 1.8, 0.1], [-0.2, 2.05, 0.07]],
  ];

  return (
    <group position={[1.8, -1.2, -1.2]}>
      {lines.map((pts, i) => (
        <Line key={`lamp-${i}`} points={pts} color="#b8935f" transparent opacity={0.2} lineWidth={1} />
      ))}
    </group>
  );
}

// Wall shelf unit
function WallShelves() {
  const shelves: [number, number, number][][] = [];
  for (let i = 0; i < 3; i++) {
    const y = 0.8 + i * 0.6;
    shelves.push(
      [[-2.4, y, -1.9], [-1.2, y, -1.9]],
      [[-2.4, y, -1.9], [-2.4, y, -1.7]],
      [[-1.2, y, -1.9], [-1.2, y, -1.7]],
      [[-2.4, y, -1.7], [-1.2, y, -1.7]],
    );
    // Brackets
    shelves.push(
      [[-2.3, y, -1.9], [-2.3, y - 0.15, -1.9]],
      [[-1.3, y, -1.9], [-1.3, y - 0.15, -1.9]],
    );
  }

  return (
    <group position={[0, -1.2, 0]}>
      {shelves.map((pts, i) => (
        <Line key={`shelf-${i}`} points={pts} color="#b8935f" transparent opacity={0.18} lineWidth={1} />
      ))}
    </group>
  );
}

// Pendant light hanging from ceiling
function PendantLight() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  const segments = 12;
  const radius = 0.3;
  const points: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
  }

  const topPoints: [number, number, number][] = [];
  const topRadius = 0.12;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    topPoints.push([Math.cos(angle) * topRadius, 0.25, Math.sin(angle) * topRadius]);
  }

  return (
    <group ref={groupRef} position={[0, 1.6, 0.3]}>
      {/* Wire */}
      <Line points={[[0, 0.8, 0], [0, 0.25, 0]]} color="#b8935f" transparent opacity={0.2} lineWidth={1} />
      {/* Shade bottom ring */}
      <Line points={points} color="#b8935f" transparent opacity={0.3} lineWidth={1.2} />
      {/* Shade top ring */}
      <Line points={topPoints} color="#b8935f" transparent opacity={0.25} lineWidth={1} />
      {/* Shade lines */}
      {[0, 3, 6, 9].map((i) => {
        const bAngle = (i / segments) * Math.PI * 2;
        const tAngle = (i / segments) * Math.PI * 2;
        return (
          <Line
            key={`pendant-${i}`}
            points={[
              [Math.cos(bAngle) * radius, 0, Math.sin(bAngle) * radius],
              [Math.cos(tAngle) * topRadius, 0.25, Math.sin(tAngle) * topRadius],
            ]}
            color="#b8935f"
            transparent
            opacity={0.2}
            lineWidth={1}
          />
        );
      })}
      {/* Glow */}
      <pointLight position={[0, 0, 0]} intensity={0.4} color="#b8935f" distance={4} />
    </group>
  );
}

// Floating dust/light particles
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#b8935f" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

// Decorative floating picture frame
function PictureFrame() {
  const lines: [number, number, number][][] = [
    [[0, 0, 0], [0.7, 0, 0]],
    [[0.7, 0, 0], [0.7, 0.5, 0]],
    [[0.7, 0.5, 0], [0, 0.5, 0]],
    [[0, 0.5, 0], [0, 0, 0]],
    // Inner frame
    [[0.05, 0.05, 0], [0.65, 0.05, 0]],
    [[0.65, 0.05, 0], [0.65, 0.45, 0]],
    [[0.65, 0.45, 0], [0.05, 0.45, 0]],
    [[0.05, 0.45, 0], [0.05, 0.05, 0]],
  ];

  return (
    <group position={[0.5, 0.4, -1.88]}>
      {lines.map((pts, i) => (
        <Line key={`frame-${i}`} points={pts} color="#b8935f" transparent opacity={0.2} lineWidth={1} />
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [3, 1.5, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <pointLight position={[-1, 1, 3]} intensity={0.5} color="#b8935f" distance={12} />
        <pointLight position={[2, 0.5, 1]} intensity={0.3} color="#a67c47" distance={8} />

        <MouseTracker>
          <RoomWireframe />
          <Sofa />
          <CoffeeTable />
          <FloorLamp />
          <WallShelves />
          <PendantLight />
          <PictureFrame />
          <FloatingParticles />
        </MouseTracker>
      </Canvas>
    </div>
  );
}
