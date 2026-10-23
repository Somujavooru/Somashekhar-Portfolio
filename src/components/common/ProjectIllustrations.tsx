import React from 'react';

interface IllustrationProps {
  projectId: string;
}

export const ProjectIllustration: React.FC<IllustrationProps> = ({ projectId }) => {
  switch (projectId) {
    case 'esp32-cam-face-display':
      return (
        <div className="w-full h-48 bg-[#070d18] relative flex items-center justify-center p-4 overflow-hidden border-b border-slate-800">
          <svg className="w-full h-full max-h-40" viewBox="0 0 320 160" fill="none">
            {/* Camera Module */}
            <rect x="20" y="45" width="70" height="70" rx="8" fill="#0b172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="55" cy="80" r="18" fill="#0284c7" fillOpacity="0.4" stroke="#00f0ff" strokeWidth="1.5" />
            <circle cx="55" cy="80" r="8" fill="#00f0ff" />
            <text x="55" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">OV2640 DVP</text>

            {/* Connecting Bus */}
            <line x1="90" y1="80" x2="130" y2="80" stroke="#00f0ff" strokeWidth="2" strokeDasharray="3 3" />
            <text x="110" y="73" textAnchor="middle" fill="#00f0ff" fontSize="7" fontFamily="monospace">DMA BUS</text>

            {/* Processing Unit */}
            <rect x="130" y="35" width="75" height="90" rx="8" fill="#0d1b33" stroke="#00f0ff" strokeWidth="1.8" />
            <rect x="145" y="50" width="45" height="45" rx="4" fill="#0369a1" fillOpacity="0.5" stroke="#38bdf8" />
            <text x="167" y="75" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">ESP32</text>
            <text x="167" y="86" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">FreeRTOS</text>
            <text x="167" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">CORE STREAMER</text>

            {/* Connecting SPI Bus */}
            <line x1="205" y1="80" x2="245" y2="80" stroke="#38bdf8" strokeWidth="2" />
            <text x="225" y="73" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">SPI BUS</text>

            {/* ST7789 TFT Display */}
            <rect x="245" y="45" width="60" height="70" rx="6" fill="#091427" stroke="#818cf8" strokeWidth="1.5" />
            <rect x="252" y="52" width="46" height="56" rx="3" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
            <text x="275" y="78" textAnchor="middle" fill="#a5b4fc" fontSize="7" fontFamily="monospace">EEZ GUI</text>
            <text x="275" y="90" textAnchor="middle" fill="#818cf8" fontSize="6" fontFamily="monospace">TOUCH TFT</text>
            <text x="275" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">ST7789</text>
          </svg>
        </div>
      );

    case 'lpg-gas-leakage-system':
      return (
        <div className="w-full h-48 bg-[#070d18] relative flex items-center justify-center p-4 overflow-hidden border-b border-slate-800">
          <svg className="w-full h-full max-h-40" viewBox="0 0 320 160" fill="none">
            {/* MQ Gas Sensor */}
            <circle cx="50" cy="80" r="28" fill="#0b172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="50" cy="80" r="16" fill="#0284c7" fillOpacity="0.4" stroke="#00f0ff" strokeDasharray="3 3" />
            <text x="50" y="83" textAnchor="middle" fill="#00f0ff" fontSize="8" fontWeight="bold" fontFamily="monospace">MQ-GAS</text>
            <text x="50" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">ANALOG SENSOR</text>

            {/* ADC Wire */}
            <line x1="78" y1="80" x2="125" y2="80" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="100" y="73" textAnchor="middle" fill="#00f0ff" fontSize="7" fontFamily="monospace">ADC GPIO34</text>

            {/* ESP32 Core */}
            <rect x="125" y="45" width="70" height="70" rx="8" fill="#0d1b33" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="160" y="75" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">ESP32</text>
            <text x="160" y="88" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">&lt;500ms ISR</text>
            <text x="160" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">SAFETY CORE</text>

            {/* Servo Cutoff Actuator */}
            <line x1="195" y1="80" x2="240" y2="80" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="218" y="73" textAnchor="middle" fill="#f43f5e" fontSize="7" fontFamily="monospace">PWM 90°</text>

            <rect x="240" y="55" width="65" height="50" rx="6" fill="#1c0e18" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="272" y="78" textAnchor="middle" fill="#fb7185" fontSize="8" fontWeight="bold" fontFamily="monospace">VALVE CUT</text>
            <text x="272" y="90" textAnchor="middle" fill="#fda4af" fontSize="7" fontFamily="monospace">SERVO ACTUATOR</text>
            <text x="272" y="125" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">ISOLATION</text>
          </svg>
        </div>
      );

    case 'esp32-ota-system':
      return (
        <div className="w-full h-48 bg-[#070d18] relative flex items-center justify-center p-4 overflow-hidden border-b border-slate-800">
          <svg className="w-full h-full max-h-40" viewBox="0 0 320 160" fill="none">
            {/* Remote Cloud Manifest */}
            <rect x="20" y="50" width="70" height="60" rx="6" fill="#0b172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="55" y="75" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">UPDATE.JSON</text>
            <text x="55" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">VERSION MANIFEST</text>

            {/* HTTP Wi-Fi Transfer */}
            <line x1="90" y1="80" x2="135" y2="80" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="112" y="72" textAnchor="middle" fill="#00f0ff" fontSize="7" fontFamily="monospace">HTTP / Wi-Fi</text>

            {/* Flash Memory Dual Partition */}
            <rect x="135" y="30" width="165" height="100" rx="8" fill="#0c1830" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="217" y="47" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">ESP32 SPI FLASH</text>

            {/* Partition 0 (Active) */}
            <rect x="145" y="55" width="68" height="60" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.2" />
            <text x="179" y="78" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="monospace">ota_0 (Active)</text>
            <text x="179" y="92" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontFamily="monospace">RUNNING BUILD</text>

            {/* Partition 1 (Passive / Target) */}
            <rect x="222" y="55" width="68" height="60" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="256" y="78" textAnchor="middle" fill="#a5b4fc" fontSize="8" fontWeight="bold" fontFamily="monospace">ota_1 (Passive)</text>
            <text x="256" y="92" textAnchor="middle" fill="#c7d2fe" fontSize="7" fontFamily="monospace">FLASH & VERIFY</text>
          </svg>
        </div>
      );

    case 'plant-watering-system':
      return (
        <div className="w-full h-48 bg-[#070d18] relative flex items-center justify-center p-4 overflow-hidden border-b border-slate-800">
          <svg className="w-full h-full max-h-40" viewBox="0 0 320 160" fill="none">
            {/* Soil Probe */}
            <rect x="25" y="55" width="60" height="55" rx="6" fill="#0b172a" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="45" y1="110" x2="45" y2="135" stroke="#38bdf8" strokeWidth="2" />
            <line x1="65" y1="110" x2="65" y2="135" stroke="#38bdf8" strokeWidth="2" />
            <text x="55" y="80" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">SOIL PROBE</text>
            <text x="55" y="94" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="monospace">HYGROMETER</text>

            {/* Wire to Arduino */}
            <line x1="85" y1="80" x2="130" y2="80" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="107" y="73" textAnchor="middle" fill="#00f0ff" fontSize="7" fontFamily="monospace">ANALOG A0</text>

            {/* Arduino Uno */}
            <rect x="130" y="45" width="75" height="70" rx="8" fill="#0d1b33" stroke="#00f0ff" strokeWidth="1.5" />
            <text x="167" y="75" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">ARDUINO</text>
            <text x="167" y="88" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace">ATmega328P</text>
            <text x="167" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">BIET CIE 2023</text>

            {/* Relay and Pump */}
            <line x1="205" y1="80" x2="245" y2="80" stroke="#10b981" strokeWidth="1.5" />
            <text x="225" y="73" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily="monospace">5V RELAY</text>

            <rect x="245" y="55" width="60" height="55" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="275" cy="78" r="12" fill="#047857" stroke="#34d399" />
            <text x="275" y="100" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontFamily="monospace">DC PUMP</text>
          </svg>
        </div>
      );

    case 'edunova-platform':
      return (
        <div className="w-full h-48 bg-[#070d18] relative flex items-center justify-center p-4 overflow-hidden border-b border-slate-800">
          <svg className="w-full h-full max-h-40" viewBox="0 0 320 160" fill="none">
            {/* Browser window mockup */}
            <rect x="30" y="25" width="260" height="110" rx="8" fill="#0b1426" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="30" y1="45" x2="290" y2="45" stroke="#1e293b" strokeWidth="1" />
            <circle cx="45" cy="35" r="3" fill="#f43f5e" />
            <circle cx="55" cy="35" r="3" fill="#fbbf24" />
            <circle cx="65" cy="35" r="3" fill="#10b981" />
            <rect x="85" y="30" width="150" height="10" rx="3" fill="#0f172a" />
            <text x="160" y="38" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">edunova-platform.app</text>

            {/* Dashboard Cards Inside */}
            <rect x="45" y="55" width="65" height="65" rx="4" fill="#0c1e3d" stroke="#0284c7" />
            <text x="77" y="75" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">PROJECTS</text>
            <text x="77" y="88" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">100+ USERS</text>

            <rect x="120" y="55" width="70" height="65" rx="4" fill="#0c1e3d" stroke="#0284c7" />
            <text x="155" y="75" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">REST API</text>
            <text x="155" y="88" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">-30% LATENCY</text>

            <rect x="200" y="55" width="75" height="65" rx="4" fill="#0c1e3d" stroke="#0284c7" />
            <text x="237" y="75" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold" fontFamily="monospace">SQL SCHEMA</text>
            <text x="237" y="88" textAnchor="middle" fill="#94a3b8" fontSize="6" fontFamily="monospace">DATA REPO</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="w-full h-48 bg-[#070d18] relative flex items-center justify-center p-4 overflow-hidden border-b border-slate-800">
          <svg className="w-full h-full max-h-40" viewBox="0 0 320 160" fill="none">
            <rect x="40" y="30" width="240" height="100" rx="8" fill="#0c152a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="100" cy="80" r="24" fill="#0284c7" fillOpacity="0.4" stroke="#00f0ff" />
            <circle cx="160" cy="80" r="24" fill="#0369a1" fillOpacity="0.4" stroke="#38bdf8" />
            <circle cx="220" cy="80" r="24" fill="#1e1b4b" fillOpacity="0.4" stroke="#818cf8" />
            <text x="160" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="monospace">TECHNICAL PIPELINE ARCHITECTURE</text>
          </svg>
        </div>
      );
  }
};
