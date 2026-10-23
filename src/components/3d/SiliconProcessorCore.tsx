import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProcessorCoreProps {
  pointerPosition: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
  reducedMotion: boolean;
}

export const SiliconProcessorCore: React.FC<ProcessorCoreProps> = ({
  pointerPosition,
  isMobile,
  reducedMotion,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const coreDieRef = useRef<THREE.Mesh>(null);

  // Generate delicate floating micro-components
  const microComponents = useMemo(() => {
    const count = isMobile ? 8 : 18;
    const comps = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const radius = 2.4 + Math.random() * 1.8;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 1.8;
      const z = Math.sin(angle) * radius;
      comps.push({
        position: [x, y, z] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: [0.12 + Math.random() * 0.15, 0.04 + Math.random() * 0.05, 0.15 + Math.random() * 0.15] as [number, number, number],
        speed: 0.4 + Math.random() * 0.8,
        color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#38bdf8' : '#818cf8',
      });
    }
    return comps;
  }, [isMobile]);

  // Restrained ambient dust/electron carrier particles
  const particleData = useMemo(() => {
    const particleCount = isMobile ? 40 : 110;
    const positions = new Float32Array(particleCount * 3);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.6; // slightly flattened
      positions[i * 3 + 2] = radius * Math.cos(phi);

      opacities[i] = 0.2 + Math.random() * 0.8;
    }

    return { positions, particleCount };
  }, [isMobile]);

  // Circuit trace ring geometries
  const ringGeometry1 = useMemo(() => new THREE.RingGeometry(2.0, 2.03, 64), []);
  const ringGeometry2 = useMemo(() => new THREE.RingGeometry(2.4, 2.42, 64), []);
  const ringGeometry3 = useMemo(() => new THREE.RingGeometry(2.8, 2.82, 64), []);

  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Smooth pointer parallax tilt on the entire core assembly
    if (groupRef.current) {
      const targetRotationY = (pointerPosition.current.x * 0.35) + time * 0.08;
      const targetRotationX = -pointerPosition.current.y * 0.25 + 0.35; // default tilted engineering perspective
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.04);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.04);
      
      // Subtle harmonic floating motion
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.08;
    }

    // Concentric bus clock rings counter-rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = time * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -time * 0.12;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = time * 0.09;
    }

    // Processor Core Die pulse
    if (coreDieRef.current) {
      const pulse = 1.0 + Math.sin(time * 2.2) * 0.03;
      coreDieRef.current.scale.set(pulse, pulse, pulse);
    }

    // Particle rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Silicon Die Carrier / PCB Substrate */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[2.5, 2.5, 0.12]} />
        <meshStandardMaterial
          color="#070d18"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* PCB Gold / Copper Corner Fiducial Markers */}
      {[-1.05, 1.05].map((x) =>
        [-1.05, 1.05].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.02]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#00f0ff" emissiveIntensity={0.6} />
          </mesh>
        ))
      )}

      {/* Peripheral Pinout Contacts (Surface Mount Pads) */}
      {Array.from({ length: 14 }).map((_, i) => {
        const offset = -1.0 + (i / 13) * 2.0;
        return (
          <React.Fragment key={i}>
            {/* Top and Bottom Pins */}
            <mesh position={[offset, 1.28, -0.02]}>
              <boxGeometry args={[0.08, 0.18, 0.04]} />
              <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[offset, -1.28, -0.02]}>
              <boxGeometry args={[0.08, 0.18, 0.04]} />
              <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Left and Right Pins */}
            <mesh position={[1.28, offset, -0.02]}>
              <boxGeometry args={[0.18, 0.08, 0.04]} />
              <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh position={[-1.28, offset, -0.02]}>
              <boxGeometry args={[0.18, 0.08, 0.04]} />
              <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
            </mesh>
          </React.Fragment>
        );
      })}

      {/* 2. Silicon Integrated Circuit Heatspreader / Package */}
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.7, 1.7, 0.18]} />
        <meshStandardMaterial
          color="#0b1528"
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>

      {/* Package Bevel Outline Glow */}
      <lineSegments position={[0, 0, 0.2]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.7, 1.7, 0.01)]} />
        <lineBasicMaterial color="#38bdf8" linewidth={1.5} />
      </lineSegments>

      {/* 3. Central Semiconductor Silicon Die Core (Glowing Logic Unit) */}
      <mesh ref={coreDieRef} position={[0, 0, 0.22]}>
        <boxGeometry args={[1.05, 1.05, 0.08]} />
        <meshStandardMaterial
          color="#0369a1"
          emissive="#00f0ff"
          emissiveIntensity={0.85}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Micro-architecture Core Grid Lines */}
      <lineSegments position={[0, 0, 0.27]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.05, 1.05, 0.01)]} />
        <lineBasicMaterial color="#ffffff" linewidth={2} />
      </lineSegments>

      {/* Internal Core Sub-Blocks (ALU / SRAM / Register Blocks) */}
      {[-0.26, 0.26].map((x) =>
        [-0.26, 0.26].map((y) => (
          <mesh key={`alu-${x}-${y}`} position={[x, y, 0.28]}>
            <boxGeometry args={[0.38, 0.38, 0.02]} />
            <meshStandardMaterial
              color="#082f49"
              emissive="#38bdf8"
              emissiveIntensity={0.5}
              metalness={0.8}
            />
          </mesh>
        ))
      )}

      {/* 4. Concentric Holographic Bus / Clock Rings */}
      <group ref={ring1Ref} position={[0, 0, 0.05]}>
        <primitive object={new THREE.Mesh(ringGeometry1, new THREE.MeshBasicMaterial({ color: '#38bdf8', side: THREE.DoubleSide, transparent: true, opacity: 0.5 }))} />
      </group>

      <group ref={ring2Ref} position={[0, 0, 0.02]} rotation={[0.2, 0, 0]}>
        <primitive object={new THREE.Mesh(ringGeometry2, new THREE.MeshBasicMaterial({ color: '#00f0ff', side: THREE.DoubleSide, transparent: true, opacity: 0.35 }))} />
      </group>

      <group ref={ring3Ref} position={[0, 0, -0.02]} rotation={[-0.15, 0.1, 0]}>
        <primitive object={new THREE.Mesh(ringGeometry3, new THREE.MeshBasicMaterial({ color: '#818cf8', side: THREE.DoubleSide, transparent: true, opacity: 0.25 }))} />
      </group>

      {/* 5. Floating Micro-Components (Capacitors, Crystal Oscillators, SMT Diodes) */}
      {microComponents.map((comp, idx) => (
        <mesh
          key={idx}
          position={comp.position}
          rotation={comp.rotation}
          scale={comp.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={comp.color}
            emissive={comp.color}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* 6. Ambient Electron Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#38bdf8"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 7. Professional Blue Engineering Lighting */}
      <pointLight position={[0, 0, 1.8]} color="#00f0ff" intensity={3.5} distance={6} decay={2} />
      <pointLight position={[-2.5, 2, 1.2]} color="#38bdf8" intensity={2.0} distance={7} decay={2} />
      <pointLight position={[2.5, -2, -1]} color="#818cf8" intensity={1.8} distance={7} decay={2} />
      <ambientLight intensity={0.4} color="#0c1a30" />
    </group>
  );
};
