import React from 'react';

export const CanvasFallback: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

      {/* SVG Circuit Schematic Architecture */}
      <svg
        className="w-full max-w-[420px] aspect-square transition-all duration-700"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Orbit Traces */}
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="4 8"
          strokeOpacity="0.3"
          className="animate-spin"
          style={{ animationDuration: '60s' }}
        />
        <circle
          cx="200"
          cy="200"
          r="135"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeDasharray="8 12"
          strokeOpacity="0.4"
          className="animate-spin"
          style={{ animationDuration: '45s', animationDirection: 'reverse' }}
        />
        <circle
          cx="200"
          cy="200"
          r="110"
          stroke="#818cf8"
          strokeWidth="1"
          strokeDasharray="16 16"
          strokeOpacity="0.3"
          className="animate-spin"
          style={{ animationDuration: '30s' }}
        />

        {/* Bus Trace Pathways */}
        {/* Top Traces */}
        <path d="M200 40 V110" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M170 45 V110" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M230 45 V110" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        
        {/* Bottom Traces */}
        <path d="M200 290 V360" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M170 290 V355" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M230 290 V355" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />

        {/* Left Traces */}
        <path d="M40 200 H110" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M45 170 H110" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M45 230 H110" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />

        {/* Right Traces */}
        <path d="M290 200 H360" stroke="#00f0ff" strokeWidth="1.5" strokeOpacity="0.7" />
        <path d="M290 170 H355" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M290 230 H355" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />

        {/* Diagonal Test Points & Vias */}
        <circle cx="120" cy="120" r="4" fill="#00f0ff" fillOpacity="0.8" />
        <line x1="120" y1="120" x2="145" y2="145" stroke="#00f0ff" strokeWidth="1.2" strokeOpacity="0.6" />
        
        <circle cx="280" cy="120" r="4" fill="#38bdf8" fillOpacity="0.8" />
        <line x1="280" y1="120" x2="255" y2="145" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" />
        
        <circle cx="120" cy="280" r="4" fill="#818cf8" fillOpacity="0.8" />
        <line x1="120" y1="280" x2="145" y2="255" stroke="#818cf8" strokeWidth="1.2" strokeOpacity="0.6" />
        
        <circle cx="280" cy="280" r="4" fill="#00f0ff" fillOpacity="0.8" />
        <line x1="280" y1="280" x2="255" y2="255" stroke="#00f0ff" strokeWidth="1.2" strokeOpacity="0.6" />

        {/* Processor Package Carrier */}
        <rect
          x="125"
          y="125"
          width="150"
          height="150"
          rx="12"
          fill="#0a1222"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeOpacity="0.6"
        />

        {/* Outer IC Frame */}
        <rect
          x="145"
          y="145"
          width="110"
          height="110"
          rx="6"
          fill="#040812"
          stroke="#0284c7"
          strokeWidth="1.5"
        />

        {/* Silicon Die Core */}
        <rect
          x="165"
          y="165"
          width="70"
          height="70"
          rx="4"
          fill="#0369a1"
          fillOpacity="0.3"
          stroke="#00f0ff"
          strokeWidth="2"
        />

        {/* Core ALU / Register Grid */}
        <rect x="172" y="172" width="24" height="24" rx="2" fill="#0284c7" fillOpacity="0.5" />
        <rect x="204" y="172" width="24" height="24" rx="2" fill="#0284c7" fillOpacity="0.5" />
        <rect x="172" y="204" width="24" height="24" rx="2" fill="#0284c7" fillOpacity="0.5" />
        <rect x="204" y="204" width="24" height="24" rx="2" fill="#0284c7" fillOpacity="0.5" />

        {/* Center Heartbeat Pulse Node */}
        <circle cx="200" cy="200" r="5" fill="#00f0ff" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx="200" cy="200" r="3.5" fill="#ffffff" />

        {/* Telemetry labels */}
        <text x="200" y="105" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="1">
          BUS_CLK :: 240MHz
        </text>
        <text x="200" y="303" textAnchor="middle" fill="#818cf8" fontSize="9" fontFamily="monospace" letterSpacing="1">
          FREERTOS :: ACTIVE
        </text>
      </svg>
    </div>
  );
};
