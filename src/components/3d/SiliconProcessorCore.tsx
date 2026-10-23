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
  const coreDieRef = useRef<THREE.Group>(null);
  const pointerLightRef = useRef<THREE.PointLight>(null);
  const pulseLinesRef = useRef<THREE.Group>(null);

  // Generate 36 physical metallic QFP pins (9 per side) with dual-tone tin-gold tips
  const pinData = useMemo(() => {
    const pins: {
      position: [number, number, number];
      rotation: [number, number, number];
      tipPos: [number, number, number];
    }[] = [];
    const pinsPerSide = 9;
    const halfWidth = 1.45;
    const spacing = (halfWidth * 2) / (pinsPerSide + 1);

    for (let i = 1; i <= pinsPerSide; i++) {
      const offset = -halfWidth + i * spacing;
      // Top pins
      pins.push({
        position: [offset, halfWidth + 0.16, 0.02],
        rotation: [0, 0, 0],
        tipPos: [offset, halfWidth + 0.32, 0.02],
      });
      // Bottom pins
      pins.push({
        position: [offset, -halfWidth - 0.16, 0.02],
        rotation: [0, 0, 0],
        tipPos: [offset, -halfWidth - 0.32, 0.02],
      });
      // Left pins
      pins.push({
        position: [-halfWidth - 0.16, offset, 0.02],
        rotation: [0, 0, Math.PI / 2],
        tipPos: [-halfWidth - 0.32, offset, 0.02],
      });
      // Right pins
      pins.push({
        position: [halfWidth + 0.16, offset, 0.02],
        rotation: [0, 0, Math.PI / 2],
        tipPos: [halfWidth + 0.32, offset, 0.02],
      });
    }
    return pins;
  }, []);

  // Circuit trace lines radiating across the PCB substrate
  const pcbTraces = useMemo(() => {
    const traces: [number, number, number][][] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r1 = 1.6;
      const r2 = 2.4;
      const x1 = Math.cos(angle) * r1;
      const y1 = Math.sin(angle) * r1;
      const x2 = Math.cos(angle + 0.15) * r2;
      const y2 = Math.sin(angle + 0.15) * r2;
      traces.push([
        [x1, y1, 0.08],
        [x2, y2, 0.08],
      ]);
    }
    return traces;
  }, []);

  // Floating micro-components (capacitors, crystalline oscillators)
  const microComponents = useMemo(() => {
    const count = isMobile ? 8 : 16;
    const comps = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
      const radius = 2.6 + Math.random() * 1.4;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 1.4;
      const z = Math.sin(angle) * radius;
      comps.push({
        position: [x, y, z] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: [0.12 + Math.random() * 0.14, 0.04 + Math.random() * 0.05, 0.12 + Math.random() * 0.14] as [number, number, number],
        color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#38bdf8' : '#a5b4fc',
      });
    }
    return comps;
  }, [isMobile]);

  // Concentric radar & clock rings
  const ringGeo1 = useMemo(() => new THREE.RingGeometry(2.15, 2.18, 64), []);
  const ringGeo2 = useMemo(() => new THREE.RingGeometry(2.55, 2.57, 64), []);
  const ringGeo3 = useMemo(() => new THREE.RingGeometry(2.95, 2.97, 64), []);

  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Smooth pointer parallax tilt on the entire core assembly
    if (groupRef.current) {
      // Default isometric tilted angle: x=0.42, y=-0.32
      const targetRotationY = -0.28 + (pointerPosition.current.x * 0.4) + Math.sin(time * 0.25) * 0.08;
      const targetRotationX = 0.38 - (pointerPosition.current.y * 0.3) + Math.cos(time * 0.25) * 0.05;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.06);
      
      // Gentle harmonic float
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.07;
    }

    // Dynamic light tracking pointer for metallic glints
    if (pointerLightRef.current) {
      pointerLightRef.current.position.x = pointerPosition.current.x * 4;
      pointerLightRef.current.position.y = pointerPosition.current.y * 4 + 1.2;
    }

    // Concentric bus clock rings counter-rotation
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.14;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.1;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.07;

    // Silicon Core Die pulse
    if (coreDieRef.current) {
      const pulse = 1.0 + Math.sin(time * 2.4) * 0.025;
      coreDieRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ========================================================
          1. PCB SUBSTRATE LAYER (Rich Deep Teal / FR4 Surface)
          Distinct contrast against midnight-black background
         ======================================================== */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[3.0, 3.0, 0.14]} />
        <meshStandardMaterial
          color="#12233c"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* PCB Substrate Outer Chamfered Trim */}
      <lineSegments position={[0, 0, 0.02]}>
        <edgesGeometry args={[new THREE.BoxGeometry(3.0, 3.0, 0.14)]} />
        <lineBasicMaterial color="#38bdf8" opacity={0.6} transparent linewidth={1.5} />
      </lineSegments>

      {/* 4 Golden Mounting Pads & Ground Vias in Corners */}
      {[-1.32, 1.32].map((x) =>
        [-1.32, 1.32].map((y) => (
          <group key={`corner-pad-${x}-${y}`} position={[x, y, 0.02]}>
            <mesh>
              <cylinderGeometry args={[0.09, 0.09, 0.04, 16]} />
              <meshStandardMaterial
                color="#f59e0b"
                emissive="#d97706"
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.025]}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
          </group>
        ))
      )}

      {/* Etched PCB Circuit Traces Radiating From Package */}
      <group ref={pulseLinesRef}>
        {pcbTraces.map((pts, idx) => (
          <line key={`trace-${idx}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(pts.flat()), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00f0ff" opacity={0.5} transparent linewidth={1.5} />
          </line>
        ))}
      </group>

      {/* ========================================================
          2. METALLIC QFP LEADFRAME PINS (36 Visible Pins)
          Bright tin-silver leads with golden solder pads
         ======================================================== */}
      {pinData.map((pin, i) => (
        <group key={`pin-assembly-${i}`}>
          {/* Main Tin-Silver Lead Body */}
          <mesh position={pin.position} rotation={pin.rotation}>
            <boxGeometry args={[0.08, 0.3, 0.04]} />
            <meshStandardMaterial
              color="#cbd5e1"
              emissive="#38bdf8"
              emissiveIntensity={0.25}
              metalness={0.88}
              roughness={0.15}
            />
          </mesh>
          {/* Golden Solder Foot Pad */}
          <mesh position={pin.tipPos} rotation={pin.rotation}>
            <boxGeometry args={[0.07, 0.1, 0.03]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.5}
              metalness={0.92}
              roughness={0.18}
            />
          </mesh>
        </group>
      ))}

      {/* ========================================================
          3. INTEGRATED HEAT SPREADER (IHS) - METALLIC TITANIUM/NICKEL
          Visible metallic luster, beveled edges, high specular response
         ======================================================== */}
      {/* Lower IHS Flange */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2.2, 2.2, 0.12]} />
        <meshStandardMaterial
          color="#1e2e47"
          roughness={0.3}
          metalness={0.75}
        />
      </mesh>

      {/* Upper IHS Cap (Brushed Titanium finish with distinct chamfer) */}
      <mesh position={[0, 0, 0.18]}>
        <boxGeometry args={[1.9, 1.9, 0.14]} />
        <meshStandardMaterial
          color="#293d5d"
          roughness={0.28}
          metalness={0.78}
        />
      </mesh>

      {/* Heat Spreader Outer Glow Contour */}
      <lineSegments position={[0, 0, 0.26]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.9, 1.9, 0.01)]} />
        <lineBasicMaterial color="#38bdf8" linewidth={2} />
      </lineSegments>

      {/* Silicon Alignment Notch in Top-Left Corner */}
      <mesh position={[-0.8, 0.8, 0.26]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
        <meshStandardMaterial color="#f43f5e" emissive="#fb7185" emissiveIntensity={0.8} />
      </mesh>

      {/* ========================================================
          4. CENTRAL SILICON DIE (Logic Core Centerpiece)
          Brilliant reflective silicon, glowing cyan compute matrix
         ======================================================== */}
      <group ref={coreDieRef} position={[0, 0, 0.28]}>
        {/* Silicon Die Mirror Substrate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.25, 1.25, 0.08]} />
          <meshStandardMaterial
            color="#0369a1"
            emissive="#0284c7"
            emissiveIntensity={0.7}
            roughness={0.12}
            metalness={0.92}
          />
        </mesh>

        {/* Die Edge Border Neon Accent */}
        <lineSegments position={[0, 0, 0.045]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.25, 1.25, 0.01)]} />
          <lineBasicMaterial color="#00f0ff" linewidth={2} />
        </lineSegments>

        {/* 4 Multi-Core Processing Modules (Xtensa Dual-Core + SRAM Cache + DMA) */}
        {[-0.32, 0.32].map((x, cX) =>
          [-0.32, 0.32].map((y, cY) => (
            <group key={`core-block-${x}-${y}`} position={[x, y, 0.045]}>
              {/* Outer Core Block */}
              <mesh>
                <boxGeometry args={[0.44, 0.44, 0.03]} />
                <meshStandardMaterial
                  color="#082f49"
                  emissive="#0284c7"
                  emissiveIntensity={0.6}
                  metalness={0.85}
                  roughness={0.2}
                />
              </mesh>
              {/* Inner Glowing Micro-ALU Array */}
              <mesh position={[0, 0, 0.02]}>
                <boxGeometry args={[0.26, 0.26, 0.015]} />
                <meshStandardMaterial
                  color="#00f0ff"
                  emissive="#00f0ff"
                  emissiveIntensity={1.4}
                />
              </mesh>
              {/* Core Active Telemetry LED */}
              <mesh position={[0.13, 0.13, 0.03]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshBasicMaterial color={cX === 0 && cY === 0 ? '#34d399' : '#00f0ff'} />
              </mesh>
            </group>
          ))
        )}

        {/* Center Bus Crosshair Interconnect */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.8, 0.03, 0.01]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.03, 0.8, 0.01]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* ========================================================
          5. HOLOGRAPHIC BUS & RADAR DATA RINGS
         ======================================================== */}
      <group ref={ring1Ref} position={[0, 0, 0.08]}>
        <primitive
          object={
            new THREE.Mesh(
              ringGeo1,
              new THREE.MeshBasicMaterial({
                color: '#38bdf8',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.65,
              })
            )
          }
        />
      </group>

      <group ref={ring2Ref} position={[0, 0, 0.04]} rotation={[0.2, 0, 0]}>
        <primitive
          object={
            new THREE.Mesh(
              ringGeo2,
              new THREE.MeshBasicMaterial({
                color: '#00f0ff',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.45,
              })
            )
          }
        />
      </group>

      <group ref={ring3Ref} position={[0, 0, -0.02]} rotation={[-0.16, 0.1, 0]}>
        <primitive
          object={
            new THREE.Mesh(
              ringGeo3,
              new THREE.MeshBasicMaterial({
                color: '#818cf8',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.35,
              })
            )
          }
        />
      </group>

      {/* Floating Micro-Components */}
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
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* ========================================================
          6. MULTI-ANGLE BALANCED STUDIO LIGHTING
          Prevents black shadows and ensures bright, visible layers
         ======================================================== */}
      {/* Dynamic Cursor Light (Tracks Pointer Coordinates) */}
      <pointLight
        ref={pointerLightRef}
        position={[0, 0, 2.5]}
        color="#00f0ff"
        intensity={3.5}
        distance={8}
        decay={2}
      />

      {/* White Key Light from Top-Front */}
      <directionalLight
        position={[-3.5, 4.5, 4.0]}
        color="#ffffff"
        intensity={2.8}
      />

      {/* Cyan Fill Light from Bottom-Right */}
      <directionalLight
        position={[3.5, -3.0, 3.0]}
        color="#38bdf8"
        intensity={2.2}
      />

      {/* Violet Rim Backlight */}
      <directionalLight
        position={[0, 3.5, -3.5]}
        color="#818cf8"
        intensity={2.0}
      />

      {/* Central Point Glow on the Die */}
      <pointLight
        position={[0, 0, 1.2]}
        color="#00f0ff"
        intensity={2.5}
        distance={4.5}
        decay={1.8}
      />

      {/* Generous Ambient Base Light (Ensures materials are always visible) */}
      <ambientLight color="#1e2d48" intensity={1.5} />
    </group>
  );
};
