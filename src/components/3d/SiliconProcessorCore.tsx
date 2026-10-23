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
  const pointerLightRef = useRef<THREE.PointLight>(null);

  // Generate floating micro-components (MEMS, capacitors, quartz resonators)
  const microComponents = useMemo(() => {
    const count = isMobile ? 10 : 22;
    const comps = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 2.5 + Math.random() * 1.6;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 1.6;
      const z = Math.sin(angle) * radius;
      comps.push({
        position: [x, y, z] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: [0.14 + Math.random() * 0.16, 0.05 + Math.random() * 0.06, 0.14 + Math.random() * 0.16] as [number, number, number],
        color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#38bdf8' : '#818cf8',
      });
    }
    return comps;
  }, [isMobile]);

  // Ambient electron dust & telemetry carrier particles
  const particleData = useMemo(() => {
    const particleCount = isMobile ? 50 : 130;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 3.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.65;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return { positions };
  }, [isMobile]);

  // QFP package leadframe pins (8 pins per side = 32 total metallic contacts)
  const pinData = useMemo(() => {
    const pins: { position: [number, number, number]; rotation: [number, number, number] }[] = [];
    const pinsPerSide = 8;
    const halfWidth = 1.32;
    const pinSpacing = (halfWidth * 2) / (pinsPerSide + 1);

    for (let i = 1; i <= pinsPerSide; i++) {
      const offset = -halfWidth + i * pinSpacing;
      // Top pins
      pins.push({ position: [offset, halfWidth + 0.16, 0.02], rotation: [0, 0, 0] });
      // Bottom pins
      pins.push({ position: [offset, -halfWidth - 0.16, 0.02], rotation: [0, 0, 0] });
      // Left pins
      pins.push({ position: [-halfWidth - 0.16, offset, 0.02], rotation: [0, 0, Math.PI / 2] });
      // Right pins
      pins.push({ position: [halfWidth + 0.16, offset, 0.02], rotation: [0, 0, Math.PI / 2] });
    }
    return pins;
  }, []);

  // Concentric radar & bus clock ring geometries
  const ringGeo1 = useMemo(() => new THREE.RingGeometry(2.1, 2.13, 64), []);
  const ringGeo2 = useMemo(() => new THREE.RingGeometry(2.5, 2.52, 64), []);
  const ringGeo3 = useMemo(() => new THREE.RingGeometry(2.9, 2.92, 64), []);

  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Smooth pointer parallax tilt on the entire core assembly
    if (groupRef.current) {
      const targetRotationY = pointerPosition.current.x * 0.45 + time * 0.06;
      const targetRotationX = -pointerPosition.current.y * 0.35 + 0.32; // tilted isometric perspective
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      
      // Floating harmonic oscillation
      groupRef.current.position.y = Math.sin(time * 0.9) * 0.08;
    }

    // Dynamic light tracking pointer
    if (pointerLightRef.current) {
      pointerLightRef.current.position.x = pointerPosition.current.x * 3.5;
      pointerLightRef.current.position.y = pointerPosition.current.y * 3.5 + 0.5;
    }

    // Concentric bus clock rings counter-rotation
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.16;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.12;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.08;

    // Processor Core Die pulse
    if (coreDieRef.current) {
      const pulse = 1.0 + Math.sin(time * 2.5) * 0.035;
      coreDieRef.current.scale.set(pulse, pulse, pulse);
    }

    // Particle field rotation
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.035;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Base FR4 PCB Substrate (Matte dark obsidian with beveled depth) */}
      <mesh position={[0, 0, -0.08]}>
        <boxGeometry args={[2.7, 2.7, 0.14]} />
        <meshStandardMaterial
          color="#060c18"
          roughness={0.45}
          metalness={0.85}
        />
      </mesh>

      {/* PCB Corner Gold Mount Rings & Fiducial Vias */}
      {[-1.18, 1.18].map((x) =>
        [-1.18, 1.18].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.01]}>
            <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#00f0ff"
              emissiveIntensity={0.8}
              metalness={0.9}
            />
          </mesh>
        ))
      )}

      {/* 2. Metallic QFP Leadframe Contact Pins (32 metallic pins) */}
      {pinData.map((pin, i) => (
        <mesh key={`pin-${i}`} position={pin.position} rotation={pin.rotation}>
          <boxGeometry args={[0.09, 0.28, 0.04]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* 3. Integrated Heat Spreader (IHS) Metallic Nickel-Copper Cap */}
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.85, 1.85, 0.2]} />
        <meshStandardMaterial
          color="#0c1932"
          metalness={0.92}
          roughness={0.22}
        />
      </mesh>

      {/* Heat Spreader Beveled Trim Wireframe Glow */}
      <lineSegments position={[0, 0, 0.2]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.85, 1.85, 0.01)]} />
        <lineBasicMaterial color="#38bdf8" linewidth={1.5} />
      </lineSegments>

      {/* 4. Exposed Central Silicon Die Unit (High-Gloss Blue Emissive Logic Matrix) */}
      <mesh ref={coreDieRef} position={[0, 0, 0.23]}>
        <boxGeometry args={[1.15, 1.15, 0.09]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#00f0ff"
          emissiveIntensity={0.95}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Silicon Die Internal Bus Grid */}
      <lineSegments position={[0, 0, 0.28]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.15, 1.15, 0.01)]} />
        <lineBasicMaterial color="#ffffff" linewidth={2} />
      </lineSegments>

      {/* Core ALU & SRAM Compute Modules (4 sub-blocks) */}
      {[-0.29, 0.29].map((x) =>
        [-0.29, 0.29].map((y) => (
          <group key={`alu-group-${x}-${y}`} position={[x, y, 0.29]}>
            <mesh>
              <boxGeometry args={[0.42, 0.42, 0.02]} />
              <meshStandardMaterial
                color="#082f49"
                emissive="#38bdf8"
                emissiveIntensity={0.65}
                metalness={0.8}
              />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <boxGeometry args={[0.24, 0.24, 0.01]} />
              <meshStandardMaterial
                color="#00f0ff"
                emissive="#00f0ff"
                emissiveIntensity={1.2}
              />
            </mesh>
          </group>
        ))
      )}

      {/* 5. Concentric Holographic Bus / Radar Rings */}
      <group ref={ring1Ref} position={[0, 0, 0.05]}>
        <primitive object={new THREE.Mesh(ringGeo1, new THREE.MeshBasicMaterial({ color: '#38bdf8', side: THREE.DoubleSide, transparent: true, opacity: 0.55 }))} />
      </group>

      <group ref={ring2Ref} position={[0, 0, 0.02]} rotation={[0.22, 0, 0]}>
        <primitive object={new THREE.Mesh(ringGeo2, new THREE.MeshBasicMaterial({ color: '#00f0ff', side: THREE.DoubleSide, transparent: true, opacity: 0.38 }))} />
      </group>

      <group ref={ring3Ref} position={[0, 0, -0.02]} rotation={[-0.18, 0.12, 0]}>
        <primitive object={new THREE.Mesh(ringGeo3, new THREE.MeshBasicMaterial({ color: '#818cf8', side: THREE.DoubleSide, transparent: true, opacity: 0.28 }))} />
      </group>

      {/* 6. Floating Peripheral Micro-Components */}
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
            emissiveIntensity={0.7}
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
      ))}

      {/* 7. Ambient Electron & Silicon Carrier Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particleData.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#38bdf8"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 8. Dynamic Specular Lighting System */}
      {/* Pointer-following specular glint */}
      <pointLight ref={pointerLightRef} position={[0, 0, 2.4]} color="#00f0ff" intensity={3.8} distance={7} decay={2} />
      {/* Stationary blue key lights */}
      <pointLight position={[-3, 2.5, 1.5]} color="#38bdf8" intensity={2.4} distance={8} decay={2} />
      <pointLight position={[3, -2.5, -1]} color="#818cf8" intensity={2.0} distance={8} decay={2} />
      <ambientLight intensity={0.5} color="#0d1b30" />
    </group>
  );
};
