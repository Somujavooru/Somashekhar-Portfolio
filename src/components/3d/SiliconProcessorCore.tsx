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
  const coreDieRef = useRef<THREE.Group>(null);
  const pointerLightRef = useRef<THREE.PointLight>(null);

  // Generate 36 physical metallic QFP pins (9 per side) with warm 24K gold contact pads
  const pinData = useMemo(() => {
    const pins: {
      position: [number, number, number];
      rotation: [number, number, number];
      tipPos: [number, number, number];
    }[] = [];
    const pinsPerSide = 9;
    const halfWidth = 1.42;
    const spacing = (halfWidth * 2) / (pinsPerSide + 1);

    for (let i = 1; i <= pinsPerSide; i++) {
      const offset = -halfWidth + i * spacing;
      // Top side
      pins.push({
        position: [offset, halfWidth + 0.16, 0.02],
        rotation: [0, 0, 0],
        tipPos: [offset, halfWidth + 0.32, 0.02],
      });
      // Bottom side
      pins.push({
        position: [offset, -halfWidth - 0.16, 0.02],
        rotation: [0, 0, 0],
        tipPos: [offset, -halfWidth - 0.32, 0.02],
      });
      // Left side
      pins.push({
        position: [-halfWidth - 0.16, offset, 0.02],
        rotation: [0, 0, Math.PI / 2],
        tipPos: [-halfWidth - 0.32, offset, 0.02],
      });
      // Right side
      pins.push({
        position: [halfWidth + 0.16, offset, 0.02],
        rotation: [0, 0, Math.PI / 2],
        tipPos: [halfWidth + 0.32, offset, 0.02],
      });
    }
    return pins;
  }, []);

  // Copper & Gold microscopic traces radiating across the FR4 substrate
  const pcbTraces = useMemo(() => {
    const traces: [number, number, number][][] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r1 = 1.55;
      const r2 = 2.25;
      const x1 = Math.cos(angle) * r1;
      const y1 = Math.sin(angle) * r1;
      const x2 = Math.cos(angle + 0.1) * r2;
      const y2 = Math.sin(angle + 0.1) * r2;
      traces.push([
        [x1, y1, 0.08],
        [x2, y2, 0.08],
      ]);
    }
    return traces;
  }, []);

  // Hairline precision measurement reticles (oscilloscope / CAD reticles)
  const ringGeo1 = useMemo(() => new THREE.RingGeometry(2.18, 2.20, 64), []);
  const ringGeo2 = useMemo(() => new THREE.RingGeometry(2.55, 2.565, 64), []);

  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();

    // Natural, subtle damping pointer tilt
    if (groupRef.current) {
      // Perspective tilt matching the reference isometric view
      const targetRotationY = -0.32 + pointerPosition.current.x * 0.22 + Math.sin(time * 0.3) * 0.02;
      const targetRotationX = 0.42 - pointerPosition.current.y * 0.18 + Math.cos(time * 0.3) * 0.02;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);

      // Gentle floating levitation
      groupRef.current.position.y = Math.sin(time * 0.7) * 0.035;
    }

    // Dynamic key specular tracking
    if (pointerLightRef.current) {
      pointerLightRef.current.position.x = pointerPosition.current.x * 3.0;
      pointerLightRef.current.position.y = pointerPosition.current.y * 3.0 + 1.2;
    }

    // Hairline measurement reticles slow rotation
    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.05;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.03;

    // Silicon core micro-pulse
    if (coreDieRef.current) {
      const pulse = 1.0 + Math.sin(time * 1.8) * 0.01;
      coreDieRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={isMobile ? 0.88 : 1.0}>
      {/* ========================================================
          1. FROSTED GLASS PEDESTAL BASE (Crystal Stage)
         ======================================================== */}
      <mesh position={[0, 0, -0.16]}>
        <boxGeometry args={[3.6, 3.6, 0.06]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Soft Drop Shadow Plane on Light Canvas */}
      <mesh position={[0, 0, -0.22]}>
        <planeGeometry args={[4.2, 4.2]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* ========================================================
          2. FR4 CARRIER SUBSTRATE (Dark Graphite / Forest Green Accent)
         ======================================================== */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[2.95, 2.95, 0.12]} />
        <meshStandardMaterial
          color="#15252B"
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>

      {/* PCB Outer Border Ground Ring (Warm Champagne Gold) */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.95, 2.95, 0.12)]} />
        <lineBasicMaterial color="#C99543" opacity={0.65} transparent linewidth={1.5} />
      </lineSegments>

      {/* 4 Gold Fiducial Alignment Points in Corners */}
      {[-1.3, 1.3].map((x) =>
        [-1.3, 1.3].map((y) => (
          <group key={`corner-fiducial-${x}-${y}`} position={[x, y, 0.02]}>
            <mesh>
              <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
              <meshStandardMaterial
                color="#C99543"
                emissive="#A3752C"
                emissiveIntensity={0.3}
                metalness={0.95}
                roughness={0.18}
              />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <cylinderGeometry args={[0.03, 0.03, 0.015, 16]} />
              <meshBasicMaterial color="#126B5B" />
            </mesh>
          </group>
        ))
      )}

      {/* Substrate Circuit Traces (Gold & Teal Conduction Lines) */}
      <group>
        {pcbTraces.map((pts, idx) => (
          <line key={`trace-${idx}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array(pts.flat()), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color={idx % 2 === 0 ? '#C99543' : '#126B5B'}
              opacity={0.5}
              transparent
              linewidth={1.5}
            />
          </line>
        ))}
      </group>

      {/* ========================================================
          3. METALLIC QFP PIN ARRAY (36 Visible Gold Pins)
         ======================================================== */}
      {pinData.map((pin, i) => (
        <group key={`pin-lead-${i}`}>
          {/* Nickel Lead Body */}
          <mesh position={pin.position} rotation={pin.rotation}>
            <boxGeometry args={[0.075, 0.28, 0.035]} />
            <meshStandardMaterial
              color="#A0A7B0"
              metalness={0.88}
              roughness={0.2}
            />
          </mesh>
          {/* 24K Gold Contact Tip */}
          <mesh position={pin.tipPos} rotation={pin.rotation}>
            <boxGeometry args={[0.07, 0.11, 0.03]} />
            <meshStandardMaterial
              color="#C99543"
              emissive="#9B6C24"
              emissiveIntensity={0.35}
              metalness={0.96}
              roughness={0.15}
            />
          </mesh>
        </group>
      ))}

      {/* ========================================================
          4. INTEGRATED HEAT SPREADER (IHS)
         ======================================================== */}
      {/* Lower IHS Stiffener Base */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[2.2, 2.2, 0.1]} />
        <meshStandardMaterial
          color="#1E2830"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Upper Brushed Titanium Cap */}
      <mesh position={[0, 0, 0.16]}>
        <boxGeometry args={[1.9, 1.9, 0.12]} />
        <meshStandardMaterial
          color="#223038"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Laser-Etched Gold Perimeter Edge */}
      <lineSegments position={[0, 0, 0.23]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.9, 1.9, 0.01)]} />
        <lineBasicMaterial color="#C99543" opacity={0.7} transparent linewidth={1.5} />
      </lineSegments>

      {/* Pin 1 Index Orientation Notch */}
      <mesh position={[-0.78, 0.78, 0.23]}>
        <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
        <meshStandardMaterial color="#C99543" emissive="#A3752C" emissiveIntensity={0.6} />
      </mesh>

      {/* ========================================================
          5. CENTRAL SILICON DIE (Logic Engine)
         ======================================================== */}
      <group ref={coreDieRef} position={[0, 0, 0.25]}>
        {/* Monolithic Silicon Die Substrate */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.25, 1.25, 0.07]} />
          <meshStandardMaterial
            color="#0D161C"
            roughness={0.06}
            metalness={0.95}
          />
        </mesh>

        {/* Die Chamfer Frame (Teal accent) */}
        <lineSegments position={[0, 0, 0.04]}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.25, 1.25, 0.01)]} />
          <lineBasicMaterial color="#126B5B" opacity={0.8} transparent linewidth={1.5} />
        </lineSegments>

        {/* 4 Compute Blocks with Teal & Gold luminescence */}
        {[-0.3, 0.3].map((x, cX) =>
          [-0.3, 0.3].map((y, cY) => (
            <group key={`core-block-${x}-${y}`} position={[x, y, 0.04]}>
              <mesh>
                <boxGeometry args={[0.42, 0.42, 0.025]} />
                <meshStandardMaterial
                  color="#15252B"
                  metalness={0.9}
                  roughness={0.15}
                />
              </mesh>
              {/* Luminescent ALU Core */}
              <mesh position={[0, 0, 0.018]}>
                <boxGeometry args={[0.24, 0.24, 0.01]} />
                <meshStandardMaterial
                  color={cX === 0 ? '#126B5B' : '#C99543'}
                  emissive={cX === 0 ? '#126B5B' : '#C99543'}
                  emissiveIntensity={1.2}
                  roughness={0.2}
                />
              </mesh>
              {/* Micro Status Beacon */}
              <mesh position={[0.13, 0.13, 0.028]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color={cX === 0 && cY === 0 ? '#C99543' : '#38BDF8'} />
              </mesh>
            </group>
          ))
        )}

        {/* Gold Internal System Bus Interconnect Crosshair */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[0.8, 0.025, 0.008]} />
          <meshBasicMaterial color="#C99543" />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[0.025, 0.8, 0.008]} />
          <meshBasicMaterial color="#C99543" />
        </mesh>
      </group>

      {/* ========================================================
          6. INSTRUMENTATION RETICLES (Hairline Graticules)
         ======================================================== */}
      <group ref={ring1Ref} position={[0, 0, 0.06]}>
        <primitive
          object={
            new THREE.Mesh(
              ringGeo1,
              new THREE.MeshBasicMaterial({
                color: '#C99543',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.35,
              })
            )
          }
        />
      </group>

      <group ref={ring2Ref} position={[0, 0, 0.02]} rotation={[0.12, 0, 0]}>
        <primitive
          object={
            new THREE.Mesh(
              ringGeo2,
              new THREE.MeshBasicMaterial({
                color: '#126B5B',
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.3,
              })
            )
          }
        />
      </group>

      {/* ========================================================
          7. STUDIO LIGHTING RIG FOR LIGHT BACKGROUND
         ======================================================== */}
      {/* Specular Glint Cursor Tracker */}
      <pointLight
        ref={pointerLightRef}
        position={[0, 0, 2.8]}
        color="#FFFFFF"
        intensity={2.6}
        distance={7}
        decay={2}
      />

      {/* Daylight 5500K Key Light */}
      <directionalLight
        position={[-3.5, 4.5, 4.5]}
        color="#FFFFFF"
        intensity={2.8}
      />

      {/* Warm Gold Rim Light */}
      <directionalLight
        position={[4.0, -3.0, 3.0]}
        color="#FDE68A"
        intensity={2.0}
      />

      {/* Soft Teal Fill */}
      <directionalLight
        position={[0, 4.0, -3.0]}
        color="#DCEFE9"
        intensity={1.4}
      />

      {/* Center Silicon Die Focus Light */}
      <pointLight
        position={[0, 0, 1.2]}
        color="#38BDF8"
        intensity={1.6}
        distance={3.8}
        decay={1.8}
      />

      {/* Ambient Fill Base */}
      <ambientLight color="#FFFFFF" intensity={1.5} />
    </group>
  );
};
