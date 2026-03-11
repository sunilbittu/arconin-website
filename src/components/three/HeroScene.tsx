import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function MouseTracker({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouse.current.y * 0.2 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        mouse.current.x = (e.clientX / size.width - 0.5) * 2;
        mouse.current.y = -(e.clientY / size.height - 0.5) * 2;
      }}
    >
      {/* Invisible plane to capture pointer events */}
      <mesh visible={false}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {children}
    </group>
  );
}

function ArchWireframe() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
  });

  const columns = useMemo(() => {
    const cols: { x: number; z: number; h: number }[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      cols.push({
        x: Math.cos(angle) * 2.5,
        z: Math.sin(angle) * 2.5,
        h: 2.5 + Math.sin(i * 0.8) * 0.8,
      });
    }
    return cols;
  }, []);

  const sharedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#b8935f",
        emissive: "#a67c47",
        emissiveIntensity: 0.3,
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {columns.map((col, i) => (
        <group key={i} position={[col.x, 0, col.z]}>
          <mesh material={sharedMaterial}>
            <cylinderGeometry args={[0.04, 0.04, col.h, 6]} />
          </mesh>
          <mesh position={[0, col.h / 2, 0]} material={sharedMaterial}>
            <boxGeometry args={[0.2, 0.06, 0.2]} />
          </mesh>
        </group>
      ))}

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} material={sharedMaterial}>
        <torusGeometry args={[2.5, 0.02, 6, 32]} />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1.8, 0]} material={sharedMaterial}>
        <torusGeometry args={[2.5, 0.02, 6, 32]} />
      </mesh>

      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={`beam-${i}`}
            position={[Math.cos(angle) * 2.5, 1.8, Math.sin(angle) * 2.5]}
            rotation={[0, -angle, 0]}
            material={sharedMaterial}
          >
            <boxGeometry args={[0.5, 0.02, 0.02]} />
          </mesh>
        );
      })}
    </group>
  );
}

function GlassStructure() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#b8935f"
          metalness={0.3}
          roughness={0.05}
          transmission={0.9}
          thickness={0.5}
          ior={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#b8935f" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GridFloor() {
  const gridRef = useRef<Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.elapsedTime * 0.2) % 1;
  });

  const lines = useMemo(() => {
    const result: [number, number, number][][] = [];
    for (let i = -8; i <= 8; i += 2) {
      result.push([[i, 0, -8], [i, 0, 8]]);
      result.push([[-8, 0, i], [8, 0, i]]);
    }
    return result;
  }, []);

  return (
    <group ref={gridRef} position={[0, -3, 0]} rotation={[0, Math.PI / 4, 0]}>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color="#b8935f" transparent opacity={0.06} lineWidth={1} />
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
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
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <pointLight position={[-3, 2, 4]} intensity={0.8} color="#b8935f" distance={15} />
        <pointLight position={[3, -2, -4]} intensity={0.4} color="#a67c47" distance={12} />

        <MouseTracker>
          <GlassStructure />
          <ArchWireframe />
          <FloatingParticles />
          <GridFloor />
        </MouseTracker>
      </Canvas>
    </div>
  );
}
