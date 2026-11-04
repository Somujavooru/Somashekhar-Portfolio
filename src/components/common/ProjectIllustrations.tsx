import React from 'react';

interface IllustrationProps {
  projectId: string;
}

export const ProjectIllustration: React.FC<IllustrationProps> = ({ projectId }) => {
  switch (projectId) {
    case 'esp32-cam-face-display':
      return (
        <div className="w-full h-52 bg-[#0a0d14] relative flex items-center justify-center p-3 overflow-hidden border-b border-white/10">
          <svg className="w-full h-full max-h-44" viewBox="0 0 340 170" fill="none">
            {/* Laboratory Instrument Grid */}
            <defs>
              <pattern id="cam-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cam-grid)" />

            {/* Camera Module (OV2640) */}
            <rect x="18" y="44" width="76" height="82" rx="6" fill="#111622" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <circle cx="56" cy="85" r="22" fill="#182030" stroke="#55D6E8" strokeWidth="1.5" />
            <circle cx="56" cy="85" r="10" fill="#55D6E8" fillOpacity="0.8" />
            <text x="56" y="118" textAnchor="middle" fill="#F5F2EA" fontSize="8" fontWeight="bold" fontFamily="monospace">OV2640 CMOS</text>
            <text x="56" y="140" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">8-BIT DVP / DMA</text>

            {/* Interconnect: Camera to MCU */}
            <line x1="94" y1="85" x2="132" y2="85" stroke="#55D6E8" strokeWidth="1.8" strokeDasharray="3 3" />
            <polygon points="132,82 137,85 132,88" fill="#55D6E8" />
            <text x="113" y="77" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">DMA_STREAM</text>

            {/* Central MCU (ESP32-S / Dual-Core) */}
            <rect x="135" y="30" width="80" height="110" rx="8" fill="#131926" stroke="#F5A623" strokeWidth="1.5" />
            <rect x="145" y="44" width="60" height="46" rx="4" fill="#1b2334" stroke="rgba(245,166,35,0.3)" strokeWidth="1" />
            <text x="175" y="65" textAnchor="middle" fill="#F5F2EA" fontSize="9" fontWeight="bold" fontFamily="monospace">ESP32-S</text>
            <text x="175" y="78" textAnchor="middle" fill="#F5A623" fontSize="7" fontFamily="monospace">FreeRTOS Core</text>
            <text x="175" y="105" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">240MHz / PSRAM</text>
            <text x="175" y="125" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">HTTP 30FPS STREAM</text>

            {/* Bus interconnect: MCU to Display */}
            <line x1="215" y1="85" x2="252" y2="85" stroke="#F5A623" strokeWidth="1.8" />
            <polygon points="252,82 257,85 252,88" fill="#F5A623" />
            <text x="234" y="77" textAnchor="middle" fill="#F5A623" fontSize="7" fontFamily="monospace">SPI BUS</text>

            {/* ST7789 TFT Display Module */}
            <rect x="255" y="40" width="70" height="90" rx="6" fill="#111622" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <rect x="263" y="48" width="54" height="66" rx="3" fill="#161e2e" stroke="#55D6E8" strokeWidth="1" />
            <text x="290" y="76" textAnchor="middle" fill="#F5F2EA" fontSize="8" fontWeight="bold" fontFamily="monospace">EEZ GUI</text>
            <text x="290" y="88" textAnchor="middle" fill="#F5A623" fontSize="7" fontFamily="monospace">TOUCH TFT</text>
            <text x="290" y="102" textAnchor="middle" fill="#55D6E8" fontSize="6" fontFamily="monospace">ST7789V</text>
            <text x="290" y="142" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">HSPI INTERFACE</text>
          </svg>
        </div>
      );

    case 'lpg-gas-leakage-system':
      return (
        <div className="w-full h-52 bg-[#0a0d14] relative flex items-center justify-center p-3 overflow-hidden border-b border-white/10">
          <svg className="w-full h-full max-h-44" viewBox="0 0 340 170" fill="none">
            <defs>
              <pattern id="lpg-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lpg-grid)" />

            {/* MQ Sensor Probe */}
            <circle cx="55" cy="85" r="30" fill="#111622" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" />
            <circle cx="55" cy="85" r="18" fill="#1a2233" stroke="#55D6E8" strokeDasharray="3 3" />
            <text x="55" y="83" textAnchor="middle" fill="#F5F2EA" fontSize="9" fontWeight="bold" fontFamily="monospace">MQ SENSOR</text>
            <text x="55" y="94" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">GAS ANALOG</text>
            <text x="55" y="130" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">CALIBRATED PPM</text>

            {/* Analog Trace to MCU */}
            <line x1="85" y1="85" x2="132" y2="85" stroke="#55D6E8" strokeWidth="1.8" />
            <polygon points="132,82 137,85 132,88" fill="#55D6E8" />
            <text x="110" y="77" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">GPIO34 ADC</text>

            {/* ESP32 Safety Logic Controller */}
            <rect x="135" y="32" width="76" height="106" rx="8" fill="#131926" stroke="#F5A623" strokeWidth="1.5" />
            <text x="173" y="62" textAnchor="middle" fill="#F5F2EA" fontSize="9" fontWeight="bold" fontFamily="monospace">ESP32</text>
            <text x="173" y="76" textAnchor="middle" fill="#F5A623" fontSize="7" fontFamily="monospace">&lt;500ms ISR</text>
            <rect x="145" y="86" width="56" height="18" rx="3" fill="#1e2738" />
            <text x="173" y="98" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">SAFE STATE</text>
            <text x="173" y="125" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">HTTP/MQTT ALERT</text>

            {/* Cutoff Signal */}
            <line x1="211" y1="85" x2="252" y2="85" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="4 2" />
            <polygon points="252,82 257,85 252,88" fill="#f43f5e" />
            <text x="233" y="77" textAnchor="middle" fill="#f43f5e" fontSize="7" fontFamily="monospace">PWM GPIO13</text>

            {/* Emergency Valve Actuator */}
            <rect x="255" y="45" width="72" height="80" rx="6" fill="#1e1217" stroke="#f43f5e" strokeWidth="1.5" />
            <rect x="265" y="55" width="52" height="34" rx="4" fill="#381822" stroke="#f43f5e" />
            <text x="291" y="73" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="bold" fontFamily="monospace">VALVE CUT</text>
            <text x="291" y="84" textAnchor="middle" fill="#fb7185" fontSize="7" fontFamily="monospace">SERVO 90°</text>
            <text x="291" y="105" textAnchor="middle" fill="#F5F2EA" fontSize="7" fontFamily="monospace">AUTO SHUTOFF</text>
            <text x="291" y="140" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">SAFETY RELAY (GPIO4)</text>
          </svg>
        </div>
      );

    case 'esp32-ota-system':
      return (
        <div className="w-full h-52 bg-[#0a0d14] relative flex items-center justify-center p-3 overflow-hidden border-b border-white/10">
          <svg className="w-full h-full max-h-44" viewBox="0 0 340 170" fill="none">
            <defs>
              <pattern id="ota-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ota-grid)" />

            {/* Remote Cloud Release Manifest */}
            <rect x="18" y="45" width="80" height="80" rx="6" fill="#111622" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <text x="58" y="72" textAnchor="middle" fill="#F5A623" fontSize="8" fontWeight="bold" fontFamily="monospace">UPDATE.JSON</text>
            <text x="58" y="86" textAnchor="middle" fill="#F5F2EA" fontSize="7" fontFamily="monospace">VER: 2.1.0-RC</text>
            <text x="58" y="102" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">SHA256 OK</text>
            <text x="58" y="140" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">HTTP CLOUD HOST</text>

            {/* Over-The-Air Stream */}
            <line x1="98" y1="85" x2="137" y2="85" stroke="#55D6E8" strokeWidth="1.8" strokeDasharray="4 4" />
            <polygon points="137,82 142,85 137,88" fill="#55D6E8" />
            <text x="118" y="77" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">Wi-Fi OTA</text>

            {/* ESP32 SPI Flash Dual Partitions */}
            <rect x="140" y="25" width="185" height="120" rx="8" fill="#131926" stroke="#F5A623" strokeWidth="1.5" />
            <text x="232" y="42" textAnchor="middle" fill="#F5F2EA" fontSize="9" fontWeight="bold" fontFamily="monospace">ESP32 4MB SPI FLASH</text>

            {/* Active Partition ota_0 */}
            <rect x="150" y="52" width="76" height="74" rx="4" fill="#122822" stroke="#10b981" strokeWidth="1.2" />
            <text x="188" y="78" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="monospace">ota_0 (Active)</text>
            <text x="188" y="92" textAnchor="middle" fill="#F5F2EA" fontSize="7" fontFamily="monospace">CURRENT FIRMWARE</text>
            <text x="188" y="112" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">BOOT POINTER</text>

            {/* Target Partition ota_1 */}
            <rect x="236" y="52" width="78" height="74" rx="4" fill="#201a2c" stroke="#F5A623" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="275" y="78" textAnchor="middle" fill="#F5A623" fontSize="8" fontWeight="bold" fontFamily="monospace">ota_1 (Passive)</text>
            <text x="275" y="92" textAnchor="middle" fill="#F5F2EA" fontSize="7" fontFamily="monospace">TARGET FLASH</text>
            <text x="275" y="112" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">SAFE ROLLBACK</text>
          </svg>
        </div>
      );

    case 'plant-watering-system':
      return (
        <div className="w-full h-52 bg-[#0a0d14] relative flex items-center justify-center p-3 overflow-hidden border-b border-white/10">
          <svg className="w-full h-full max-h-44" viewBox="0 0 340 170" fill="none">
            <defs>
              <pattern id="plant-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#plant-grid)" />

            {/* Soil Moisture Probe */}
            <rect x="20" y="50" width="72" height="65" rx="6" fill="#111622" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <line x1="45" y1="115" x2="45" y2="145" stroke="#55D6E8" strokeWidth="2.5" />
            <line x1="68" y1="115" x2="68" y2="145" stroke="#55D6E8" strokeWidth="2.5" />
            <text x="56" y="78" textAnchor="middle" fill="#F5F2EA" fontSize="8" fontWeight="bold" fontFamily="monospace">SOIL PROBE</text>
            <text x="56" y="92" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">HYGROMETER</text>
            <text x="56" y="104" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">RESISTIVE DIV</text>

            {/* Wire to Arduino Uno */}
            <line x1="92" y1="85" x2="135" y2="85" stroke="#55D6E8" strokeWidth="1.8" />
            <polygon points="135,82 140,85 135,88" fill="#55D6E8" />
            <text x="114" y="77" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">ADC A0</text>

            {/* Arduino Uno Controller */}
            <rect x="138" y="32" width="78" height="106" rx="8" fill="#131926" stroke="#F5A623" strokeWidth="1.5" />
            <text x="177" y="60" textAnchor="middle" fill="#F5F2EA" fontSize="9" fontWeight="bold" fontFamily="monospace">ARDUINO</text>
            <text x="177" y="74" textAnchor="middle" fill="#F5A623" fontSize="7" fontFamily="monospace">ATmega328P</text>
            <text x="177" y="96" textAnchor="middle" fill="#34d399" fontSize="7" fontFamily="monospace">HYSTERESIS</text>
            <text x="177" y="125" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">BIET CIE 2023</text>

            {/* Relay Trigger */}
            <line x1="216" y1="85" x2="255" y2="85" stroke="#10b981" strokeWidth="1.8" />
            <polygon points="255,82 260,85 255,88" fill="#10b981" />
            <text x="236" y="77" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily="monospace">D7 RELAY</text>

            {/* Relay & DC Submersible Pump */}
            <rect x="258" y="45" width="72" height="80" rx="6" fill="#122822" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="294" cy="74" r="16" fill="#1a3d34" stroke="#34d399" strokeWidth="1.5" />
            <text x="294" y="77" textAnchor="middle" fill="#F5F2EA" fontSize="8" fontWeight="bold" fontFamily="monospace">PUMP</text>
            <text x="294" y="104" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">5V DC MOTOR</text>
            <text x="294" y="140" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">AUTO IRRIGATION</text>
          </svg>
        </div>
      );

    case 'edunova-platform':
      return (
        <div className="w-full h-52 bg-[#0a0d14] relative flex items-center justify-center p-3 overflow-hidden border-b border-white/10">
          <svg className="w-full h-full max-h-44" viewBox="0 0 340 170" fill="none">
            <defs>
              <pattern id="edu-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#edu-grid)" />

            {/* Browser Interface */}
            <rect x="20" y="25" width="300" height="120" rx="8" fill="#111622" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <line x1="20" y1="46" x2="320" y2="46" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="34" cy="36" r="3.5" fill="#f43f5e" />
            <circle cx="45" cy="36" r="3.5" fill="#F5A623" />
            <circle cx="56" cy="36" r="3.5" fill="#10b981" />
            <rect x="80" y="30" width="180" height="12" rx="3" fill="#182030" />
            <text x="170" y="39" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">edunova-platform.app/projects</text>

            {/* Sub-panels */}
            <rect x="35" y="58" width="80" height="72" rx="4" fill="#161e2e" stroke="rgba(255,255,255,0.1)" />
            <text x="75" y="80" textAnchor="middle" fill="#F5F2EA" fontSize="8" fontWeight="bold" fontFamily="monospace">CATALOG</text>
            <text x="75" y="94" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">100+ STUDENTS</text>
            <text x="75" y="112" textAnchor="middle" fill="#F5A623" fontSize="7" fontFamily="monospace">DISCOVERY UI</text>

            <rect x="125" y="58" width="85" height="72" rx="4" fill="#161e2e" stroke="rgba(255,255,255,0.1)" />
            <text x="167" y="80" textAnchor="middle" fill="#F5F2EA" fontSize="8" fontWeight="bold" fontFamily="monospace">REST API</text>
            <text x="167" y="94" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">-30% LATENCY</text>
            <text x="167" y="112" textAnchor="middle" fill="#55D6E8" fontSize="7" fontFamily="monospace">PAYLOAD OPT</text>

            <rect x="220" y="58" width="85" height="72" rx="4" fill="#161e2e" stroke="rgba(255,255,255,0.1)" />
            <text x="262" y="80" textAnchor="middle" fill="#F5F2EA" fontSize="8" fontWeight="bold" fontFamily="monospace">SQL SCHEMA</text>
            <text x="262" y="94" textAnchor="middle" fill="#A0A7B4" fontSize="7" fontFamily="monospace">RELATIONAL DB</text>
            <text x="262" y="112" textAnchor="middle" fill="#F5A623" fontSize="7" fontFamily="monospace">NORMALIZED</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className="w-full h-52 bg-[#0a0d14] relative flex items-center justify-center p-3 overflow-hidden border-b border-white/10">
          <svg className="w-full h-full max-h-44" viewBox="0 0 340 170" fill="none">
            <rect x="30" y="25" width="280" height="120" rx="8" fill="#111622" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
            <circle cx="90" cy="85" r="26" fill="#182030" stroke="#F5A623" strokeWidth="1.5" />
            <circle cx="170" cy="85" r="26" fill="#182030" stroke="#55D6E8" strokeWidth="1.5" />
            <circle cx="250" cy="85" r="26" fill="#182030" stroke="#F5A623" strokeWidth="1.5" />
            <line x1="116" y1="85" x2="144" y2="85" stroke="#F5A623" strokeWidth="1.8" />
            <line x1="196" y1="85" x2="224" y2="85" stroke="#55D6E8" strokeWidth="1.8" />
            <text x="170" y="125" textAnchor="middle" fill="#A0A7B4" fontSize="8" fontFamily="monospace">TECHNICAL PIPELINE ARCHITECTURE</text>
          </svg>
        </div>
      );
  }
};
