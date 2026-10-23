import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SiliconProcessorCore } from './SiliconProcessorCore';
import { CanvasFallback } from './CanvasFallback';

interface ThreeSceneProps {
  className?: string;
}

// Custom Error Boundary for 3D Canvas
class CanvasErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('WebGL / R3F render notice, falling back to SVG schematic:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const ThreeSceneContainer: React.FC<ThreeSceneProps> = ({ className = '' }) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Detect WebGL capability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }

    // Check media queries
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Reduced motion check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', checkViewport);
      motionQuery.removeEventListener('change', motionListener);
    };
  }, []);

  // Pointer movement listener with normalized coordinates (-1 to 1)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    pointerPosition.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
  };

  const handlePointerLeave = () => {
    // Gracefully ease back to center
    pointerPosition.current = { x: 0, y: 0 };
  };

  if (!webGLSupported) {
    return (
      <div className={`relative ${className}`}>
        <CanvasFallback />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative select-none ${className}`}
      aria-label="Interactive 3D Semiconductor Core Visualization"
    >
      <CanvasErrorBoundary fallback={<CanvasFallback />}>
        <Suspense fallback={<CanvasFallback />}>
          <Canvas
            camera={{
              position: [0, 0, isMobile ? 5.6 : 4.9],
              fov: isMobile ? 44 : 40,
              near: 0.1,
              far: 100,
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            className="w-full h-full pointer-events-auto"
          >
            <SiliconProcessorCore
              pointerPosition={pointerPosition}
              isMobile={isMobile}
              reducedMotion={reducedMotion}
            />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>

      {/* Floating HUD Telemetry Pill */}
      <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-tech text-cyan-300 pointer-events-none select-none px-3 py-1.5 rounded-lg bg-[#060b18]/85 border border-cyan-500/25 backdrop-blur-md shadow-lg shadow-black/40">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>CORE_ARCH :: 32-BIT XTENSA</span>
        </div>
        <div className="text-slate-400">
          RTOS_HZ :: 1000 | 240MHz
        </div>
      </div>
    </div>
  );
};
