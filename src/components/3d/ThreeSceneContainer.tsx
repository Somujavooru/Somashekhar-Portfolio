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
  const [webGLSupported] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {

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
      {/* ========================================================
          TELEMETRY CARD 1: TOP-LEFT DIE_TEMP SPARKLINE
         ======================================================== */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#E5E9E6] shadow-sm pointer-events-none">
        <div className="flex items-center gap-1.5 text-[10px] font-mono-tech font-bold text-[#15252B] mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C99543] animate-pulse" />
          <span>DIE_TEMP :: 38.4°C</span>
        </div>
        {/* Amber Sparkline SVG */}
        <svg className="w-24 h-6 text-[#C99543]" viewBox="0 0 100 24" fill="none">
          <path
            d="M0 18 Q 20 20, 35 12 T 65 14 T 85 6 T 100 8"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M0 18 Q 20 20, 35 12 T 65 14 T 85 6 T 100 8 L 100 24 L 0 24 Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      </div>

      {/* ========================================================
          TELEMETRY CARD 2: TOP-RIGHT XTAL OSCILLOSCOPE SINE
         ======================================================== */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#E5E9E6] shadow-sm pointer-events-none">
        <div className="flex items-center justify-between gap-3 text-[10px] font-mono-tech font-bold text-[#126B5B] mb-1">
          <span>XTAL :: 40.000 MHz</span>
        </div>
        {/* Teal Sine Wave SVG */}
        <svg className="w-24 h-6 text-[#126B5B]" viewBox="0 0 100 24" fill="none">
          <path
            d="M0 12 Q 10 2, 20 12 T 40 12 T 60 12 T 80 12 T 100 12"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
          />
        </svg>
      </div>

      {/* ========================================================
          TELEMETRY LIST: RIGHT SIDE PIN READOUT
         ======================================================== */}
      <div className="hidden sm:flex flex-col gap-1 absolute right-3 top-1/2 -translate-y-1/2 z-20 text-[9px] font-mono-tech text-[#68757A] bg-white/80 backdrop-blur-xs px-2.5 py-2 rounded-xl border border-[#E5E9E6]/80 pointer-events-none shadow-xs">
        {[
          { label: 'PWR', color: '#C99543' },
          { label: 'CORE', color: '#126B5B' },
          { label: 'CLK', color: '#C99543' },
          { label: 'RTOS', color: '#126B5B' },
          { label: 'DMA', color: '#68757A' },
          { label: 'I2C', color: '#126B5B' },
          { label: 'SPI', color: '#126B5B' },
          { label: 'UART', color: '#C99543' },
          { label: 'MQTT', color: '#126B5B' },
        ].map((pin) => (
          <div key={pin.label} className="flex items-center gap-1.5 leading-none py-0.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pin.color }} />
            <span className="font-semibold">{pin.label}</span>
          </div>
        ))}
      </div>

      {/* ========================================================
          3D THREE.JS CANVAS
         ======================================================== */}
      <CanvasErrorBoundary fallback={<CanvasFallback />}>
        <Suspense fallback={<CanvasFallback />}>
          <Canvas
            camera={{
              position: [0, 0, isMobile ? 5.8 : 5.2],
              fov: isMobile ? 42 : 36,
              near: 0.1,
              far: 100,
            }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: true,
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

      {/* ========================================================
          BOTTOM TELEMETRY PILL
         ======================================================== */}
      <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto z-20 flex items-center gap-2 text-[10px] font-mono-tech text-[#15252B] pointer-events-none bg-white/95 px-3 py-1.5 rounded-full border border-[#E5E9E6] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C99543] animate-pulse" />
        <span className="font-bold">SILICON DIE // XTENSA LX6</span>
        <span className="text-[#68757A]">|</span>
        <span className="text-[#68757A]">FREQ: <strong className="text-[#126B5B]">240MHz</strong></span>
        <span className="text-[#68757A]">|</span>
        <span className="text-[#68757A]">RTOS: <strong className="text-[#126B5B]">FreeRTOS</strong></span>
      </div>

      {/* ========================================================
          SIGNATURE ACCENT TEXT (Bottom-Right)
         ======================================================== */}
      <div className="hidden md:block absolute -bottom-3 right-3 z-20 pointer-events-none select-none font-signature text-2xl sm:text-3xl font-semibold text-[#15252B] -rotate-6 opacity-85">
        Somashekhar Javooru
      </div>
    </div>
  );
};
