import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'solar-agri-robot',
    title: 'Solar-Based Multipurpose Agriculture Robot',
    subtitle: 'Autonomous Field Robotics with ESP8266 & Firebase IoT Control',
    category: 'embedded',
    categoryLabel: 'Embedded & IoT Robotics',
    isPrimaryEmbedded: true,
    problemStatement: 'Manual farming operations like precision seed sowing, pesticide spraying, and weed trimming are labor-intensive, hazardous, and lack real-time telemetry.',
    implementationSummary: 'Engineered an autonomous, solar-powered agricultural rover driven by an ESP8266 microcontroller and Firebase cloud telemetry. Incorporates solar MPPT charging, obstacle-avoidance logic via ultrasonic sensing, and motorized actuators for precision seeding, spraying, and grass cutting.',
    verifiedDetails: [
      'Implemented C++ motor drive logic on ESP8266 interfacing dual H-Bridge motor controllers (L298N).',
      'Integrated real-time bidirectional telemetry with Firebase for remote operation and command dispatching.',
      'Designed ultrasonic sensor obstacle detection routine with immediate motor interrupt handling.',
      'Configured solar power management circuit enabling sustained outdoor field autonomy.',
      'Verified physical hardware prototype with actual project documentation and build photographs.'
    ],
    technologies: ['C++', 'ESP8266', 'Firebase IoT', 'H-Bridge L298N', 'Ultrasonic Sensing', 'Solar MPPT', 'Embedded Systems'],
    metrics: [
      { label: 'Power Source', value: 'Solar / 12V Li-Ion' },
      { label: 'Control Latency', value: '<150ms' },
      { label: 'Actuation Modes', value: 'Seed / Spray / Cut' }
    ],
    hardwareSpecs: [
      'Microcontroller: ESP8266 Wi-Fi NodeMCU',
      'Actuators: High-torque DC Geared Motors + Servo Seed Dispenser',
      'Sensors: HC-SR04 Ultrasonic Obstacle Sensor',
      'Power: Photovoltaic Solar Panel + Charge Controller'
    ],
    protocols: ['Wi-Fi 802.11', 'HTTP / REST', 'Firebase Realtime DB'],
    githubUrl: 'https://github.com/Somujavooru/Solar-Based-Agriculture-Robot',
    liveDemoUrl: null,
    image: '/images/projects/solar-agri-robot.jpg',
    imageAlt: 'Verified hardware build of Solar-Based Agriculture Robot in testing',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Power Management', description: 'Photovoltaic Solar Panel -> Charge Controller -> 12V Li-Ion Battery -> 5V/3.3V Step-Down Buck Converters', technologies: ['Solar PV', 'Buck Converter', 'Li-Ion'] },
      { layer: 'Processing Core', description: 'ESP8266 running deterministic event loop for telemetry and sensor polling', technologies: ['C++', 'ESP8266 NodeMCU'] },
      { layer: 'Actuation & Safety', description: 'Dual L298N drivers powering drive motors, spray pump relay, seed servo, and grass cutting cutter with ultrasonic collision override', technologies: ['PWM', 'GPIO', 'Ultrasonic ISR'] },
      { layer: 'Cloud Telemetry', description: 'Bi-directional state synchronization with Firebase Realtime Database over Wi-Fi', technologies: ['Firebase SDK', 'Wi-Fi 802.11 b/g/n'] }
    ]
  },
  {
    id: 'esp32-cam-face-display',
    title: 'ESP32-CAM Video Telemetry & TFT Touchscreen UI',
    subtitle: 'Embedded Camera Streaming & SPI Display Hardware Integration',
    category: 'embedded',
    categoryLabel: 'Embedded Systems & Firmware',
    isPrimaryEmbedded: true,
    problemStatement: 'Streaming live camera video while simultaneously rendering an interactive touchscreen UI on resource-constrained microcontrollers causes memory starvation and display lag.',
    implementationSummary: 'Developed firmware for ESP32-CAM interfacing an OV2640 image sensor, ST7789 TFT touchscreen display, and HTTP streaming server. Leveraged EEZ Studio for embedded GUI design and optimized frame buffer memory allocation to maintain responsive touch controls alongside high-throughput telemetry.',
    verifiedDetails: [
      'Engineered C/C++ firmware interfacing OV2640 CMOS camera over DVP interface with DMA frame buffering.',
      'Integrated SPI TFT Touchscreen display utilizing EEZ Studio GUI assets and touch controller routines.',
      'Maintained stable HTTP multipart video stream over Wi-Fi to remote monitoring endpoints with <200ms latency.',
      'Systematically debugged memory leaks in DMA and heap during prolonged video transmission, sustaining 48+ hour uptime.',
      'Repository incorporates custom implementations for TFT touchscreen GUI, actions handler, and Wi-Fi streaming.'
    ],
    technologies: ['C/C++', 'ESP32-CAM', 'OV2640', 'SPI Display (ST7789)', 'HTTP Streaming', 'EEZ Studio', 'FreeRTOS'],
    metrics: [
      { label: 'Stream Latency', value: '<200ms' },
      { label: 'Continuous Uptime', value: '48+ Hours' },
      { label: 'Frame Rate', value: 'Up to 30 FPS' }
    ],
    hardwareSpecs: [
      'Microcontroller: ESP32-S (Dual-core Xtensa 32-bit LX6)',
      'Camera: Omnivision OV2640 2MP CMOS Sensor',
      'Display: SPI TFT Touchscreen Display with Touch IC',
      'Memory: 520 KB SRAM + 4MB External PSRAM'
    ],
    protocols: ['SPI Bus', 'DVP Camera Bus', 'Wi-Fi 802.11', 'HTTP Multipart Stream'],
    githubUrl: 'https://github.com/Somujavooru/ESP32-CAM-face-recognition-and-TFT-display-project',
    liveDemoUrl: null,
    isForked: true,
    forkNote: 'Forked baseline camera repository; authored and integrated custom ESP32 TFT Touchscreen UI module, EEZ Studio GUI workflow, and dual-output streaming routines.',
    image: '/images/projects/esp32-cam-system.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Hardware Interface', description: 'OV2640 camera over 8-bit DVP + SPI ST7789 display controller + I2C/SPI touch sensor', technologies: ['DVP', 'SPI', 'DMA'] },
      { layer: 'Dual-Core Firmware', description: 'Core 0 handles camera capture DMA buffers; Core 1 executes EEZ Studio touch UI and display rendering', technologies: ['FreeRTOS Tasks', 'Ring Buffers'] },
      { layer: 'Network Streamer', description: 'Async HTTP server dispatching JPEG multipart frames to central clients with bandwidth throttle control', technologies: ['TCP/IP', 'HTTP Multipart'] }
    ]
  },
  {
    id: 'lpg-gas-leakage-system',
    title: 'Automated LPG Gas Leakage Detection & Safety System',
    subtitle: 'Event-Driven Hazard Monitoring with Emergency Actuation & Telemetry',
    category: 'embedded',
    categoryLabel: 'Embedded & Safety Firmware',
    isPrimaryEmbedded: true,
    problemStatement: 'Domestic and industrial gas leaks require instantaneous, sub-second mechanical valve cutoff and simultaneous remote notifications to prevent catastrophic fire hazards.',
    implementationSummary: 'Built an embedded safety system on ESP32 executing continuous analog gas concentration monitoring. Upon detecting levels above safety thresholds, the firmware immediately executes emergency mechanical shutoff via servo actuation (90° physical valve shutoff), sounds an alarm, and dispatches HTTP/MQTT telemetry alerts.',
    verifiedDetails: [
      'Programmed ADC continuous sampling routine on ESP32 GPIO34 with noise filtering and calibrated PPM thresholds.',
      'Implemented automated emergency cutoff routine triggering a high-torque servo motor to 90° shutoff position.',
      'Automated local audible buzzer alert, status warning LED, and safety relay isolation in <500ms.',
      'Engineered non-blocking HTTP webhook / MQTT notification routine over Wi-Fi with alert state hysteresis to prevent duplicate triggers.',
      'Verified complete C++ source code in repository including pinout map and formal technical documentation.'
    ],
    technologies: ['C/C++', 'ESP32', 'MQ Gas Sensor', 'ADC Calibration', 'Servo Motor PWM', 'HTTP Webhooks', 'MQTT', 'Safety Relays'],
    metrics: [
      { label: 'Safety Response', value: '<500ms' },
      { label: 'Telemetry Uptime', value: '99.9%' },
      { label: 'Valve Actuation', value: '0° -> 90° Auto' }
    ],
    hardwareSpecs: [
      'MCU: ESP32 DevKit V1 (38-pin)',
      'Sensor: MQ Analog Gas Sensor (GPIO 34 ADC1)',
      'Valve Cutoff: Micro Servo Motor (GPIO 13 500-2500μs PWM)',
      'Alert Outputs: Active Buzzer (GPIO 27) + Indicator LED (GPIO 2) + Power Relay (GPIO 4)'
    ],
    protocols: ['ADC Analog Sampling', 'PWM 50Hz', 'Wi-Fi 802.11', 'HTTP POST / Webhooks'],
    githubUrl: 'https://github.com/Somujavooru/lpg-gas-leakage-detection-system',
    liveDemoUrl: null,
    image: '/images/projects/lpg-gas-system.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Sensing Layer', description: 'MQ Gas Sensor -> Analog output -> ESP32 12-bit ADC with moving average smoothing', technologies: ['MQ Sensor', 'ADC GPIO34'] },
      { layer: 'Safety Logic Core', description: 'Threshold comparator with hysteresis; triggers immediate event-driven alarm and state lockout', technologies: ['C++', 'State Machine'] },
      { layer: 'Emergency Actuation', description: 'Servo PWM driver rotates valve 90° to isolate gas supply; relay trips power circuits; buzzer sounds', technologies: ['PWM GPIO13', 'Relay GPIO4'] },
      { layer: 'Remote Notification', description: 'HTTP POST webhook dispatched over Wi-Fi to cloud endpoints with gas level readings', technologies: ['HTTPClient', 'JSON Webhook'] }
    ]
  },
  {
    id: 'esp32-ota-system',
    title: 'ESP32 Over-The-Air (OTA) Firmware Deployment Pipeline',
    subtitle: 'Dual-Partition Flash Architecture with Remote Update Verification',
    category: 'embedded',
    categoryLabel: 'Embedded Systems & Firmware',
    isPrimaryEmbedded: true,
    problemStatement: 'Field-deployed embedded systems require secure, reliable firmware updates over wireless networks without physical access or bricking risks.',
    implementationSummary: 'Developed an Over-The-Air (OTA) firmware deployment framework for ESP32 microcontrollers. Utilizes a dual-partition flash memory structure (`ota_0` and `ota_1`), polling remote JSON update manifests for version control, validating binary payloads, and managing seamless bootloader switching.',
    verifiedDetails: [
      'Configured dual-partition flash layout on ESP32 ensuring uninterrupted execution during background downloads.',
      'Created JSON version manifest parser (`update.json`) to detect new binary releases and manage update logic.',
      'Implemented HTTP client stream handler writing binary firmware chunks directly to passive flash partition.',
      'Configured safe bootloader partition flag switching and fallback rollback protection against corrupt binaries.',
      'Verified binary release build (`app2.ino.doitESP32devkitV1.bin`) and update manifest in repository.'
    ],
    technologies: ['C/C++', 'ESP32', 'Flash Partitioning', 'HTTP OTA', 'Bootloader Switching', 'JSON Manifest', 'Firmware Rollback'],
    metrics: [
      { label: 'Flash Partitions', value: 'Dual OTA (ota_0 / ota_1)' },
      { label: 'Payload Integrity', value: 'CRC / SHA256' },
      { label: 'Zero-Downtime', value: 'Background Flashing' }
    ],
    hardwareSpecs: [
      'Target MCU: ESP32 DevKit V1 (4MB SPI Flash)',
      'Partition Table: Custom OTA Table with NVS, PHY, ota_0, ota_1',
      'Transport: Wi-Fi 802.11 b/g/n HTTP Streaming Client'
    ],
    protocols: ['HTTP / TCP', 'JSON Serialization', 'SPI Flash Programming'],
    githubUrl: 'https://github.com/Somujavooru/esp32-ota',
    image: '/images/projects/esp32-ota-system.jpg',
    imageAlt: 'ESP32 OTA firmware deployment workbench with dual partition memory telemetry',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Manifest Check', description: 'ESP32 queries remote server for update.json containing target firmware version and binary URL', technologies: ['HTTP Client', 'JSON Parser'] },
      { layer: 'Dual-Partition Flashing', description: 'Firmware writes incoming bytes to inactive OTA partition while current code runs uninterrupted from active partition', technologies: ['SPI Flash API', 'ota_write'] },
      { layer: 'Validation & Boot Switch', description: 'Validates binary size and checksum; invokes esp_ota_set_boot_partition to point bootloader to new build; reboots', technologies: ['Bootloader API', 'Safe Rollback'] }
    ]
  },
  {
    id: 'plant-watering-system',
    title: 'Automatic Plant Watering & Soil Moisture System',
    subtitle: 'Autonomous Microcontroller Irrigation — Physics CIE Project (VTU 2023)',
    category: 'iot',
    categoryLabel: 'IoT & Microcontroller Systems',
    isPrimaryEmbedded: true,
    problemStatement: 'Inconsistent irrigation leads to plant stress and inefficient water consumption in agricultural and domestic botany.',
    implementationSummary: 'Developed an automated plant watering system using an Arduino microcontroller, resistive soil moisture sensing probe, and a 5V relay controlling a mini submersible DC water pump. Completed as part of the Physics CIE Project (VTU, 2023) at Bapuji Institute of Engineering and Technology, Davangere.',
    verifiedDetails: [
      'Programmed Arduino control loop polling analog moisture readings against calibrated dry/wet thresholds.',
      'Implemented relay actuation logic to trigger DC water pump with hysteresis timing to prevent pump chatter.',
      'Incorporated LED status indicators signaling soil hydration states and pump operational status.',
      'Authored formal technical project documentation and published open-source hardware schema.'
    ],
    technologies: ['C/C++', 'Arduino Uno', 'Soil Moisture Sensor', '5V Relay Module', 'DC Submersible Pump', 'ADC Calibration'],
    metrics: [
      { label: 'Context', value: 'BIET CIE Project 2023' },
      { label: 'Actuation', value: '5V Submersible Pump' },
      { label: 'Control Loop', value: 'Hysteresis Protected' }
    ],
    hardwareSpecs: [
      'Microcontroller: ATmega328P (Arduino Uno)',
      'Sensor: Analog Resistive Soil Hygrometer Probe',
      'Actuator: 5V DC Submersible Water Pump via Optocoupled Relay'
    ],
    protocols: ['ADC 10-bit', 'Digital I/O', 'Relay Switching'],
    githubUrl: 'https://github.com/Somujavooru/automatic-plant-watering-system',
    liveDemoUrl: null,
    image: '/images/projects/smart-irrigation-system.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Sensory Input', description: 'Soil moisture probe measures resistance differential; outputs analog voltage to Arduino A0', technologies: ['Hygrometer', 'ADC A0'] },
      { layer: 'Control Logic', description: 'ATmega328P evaluates reading against dry setpoint; executes pump run duration loop with debounce delay', technologies: ['Embedded C', 'Timer Delays'] },
      { layer: 'Mechanical Output', description: 'Optocoupler isolation activates relay coil; DC pump delivers water until wet threshold is reached', technologies: ['5V Relay', 'DC Water Pump'] }
    ]
  },
  {
    id: 'farmer-assistant-ai',
    title: 'Farmer Assistant AI (Mobile & Edge Intelligence)',
    subtitle: 'Cross-Platform Flutter App with On-Device TensorFlow Lite Paddy Disease ML',
    category: 'android-web',
    categoryLabel: 'Mobile & Edge AI (Supporting)',
    isPrimaryEmbedded: false,
    problemStatement: 'Farmers in rural regions face delayed crop disease diagnosis and fragmented farm management records with limited or intermittent internet connectivity.',
    implementationSummary: 'Architected a cross-platform Android mobile application using Flutter and Dart, backed by an on-device TensorFlow Lite (MobileNetV3) classification model. Delivers sub-250ms offline disease diagnosis for paddy crops, a conversational assistant handling 15+ agricultural intents, and an offline-first SQLite datastore for farm records.',
    verifiedDetails: [
      'Deployed on-device lightweight convolutional neural network (MobileNetV3 TFLite) achieving 85.4% test accuracy for paddy disease classification.',
      'Engineered offline-first local data layer in SQLite logging 50+ farm metrics, expense records, and crop histories.',
      'Built resilient UI state management (loading, empty, error, and retry states) with graceful local fallbacks during API drops.',
      'Created intuitive farm dashboard and agricultural assistant with clean UX design.',
      'Verified working screenshots and Flutter codebase in GitHub repository.'
    ],
    technologies: ['Flutter', 'Dart', 'TensorFlow Lite (MobileNetV3)', 'SQLite', 'Python', 'REST APIs', 'Android Studio'],
    metrics: [
      { label: 'On-Device Inference', value: '<250ms' },
      { label: 'Classification Accuracy', value: '85.4% Test' },
      { label: 'Offline Support', value: '100% SQLite Core' }
    ],
    protocols: ['TFLite Tensor Quantization', 'SQLite DB', 'HTTP / REST'],
    githubUrl: 'https://github.com/Somujavooru/farmer-assistant-ai',
    liveDemoUrl: null,
    image: '/images/projects/farmer-assistant-home.png',
    imageAlt: 'Verified screenshot of Farmer Assistant AI Home Dashboard and Crop Management UI',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Client Presentation', description: 'Flutter/Dart reactive UI with BLoC state management and robust loading/error states', technologies: ['Flutter', 'Material 3'] },
      { layer: 'Edge Machine Learning', description: 'On-device TFLite MobileNetV3 model executing image inference locally without cloud dependency', technologies: ['TensorFlow Lite', 'Quantized CNN'] },
      { layer: 'Local Data Persistence', description: 'SQLite relational storage tracking crop lifecycles, treatment logs, and expenses', technologies: ['SQLite Engine', 'sqflite'] }
    ]
  },
  {
    id: 'social-media-publisher',
    title: 'Unified Social Media Publishing SaaS',
    subtitle: 'Distributed Multi-Platform Automation Engine with Cloudflare Workers, D1 & Queues',
    category: 'android-web',
    categoryLabel: 'Distributed Cloud SaaS',
    isPrimaryEmbedded: false,
    problemStatement: 'Digital creators, startups, and marketing teams face severe fragmented workflows, API rate limits, and scheduling failures when publishing content across multiple social platforms simultaneously.',
    implementationSummary: 'Architected a production-ready, distributed social media publishing SaaS utilizing Cloudflare Workers, Hono, Cloudflare D1 SQL, KV Token storage, R2 Object Storage, and Cloudflare Queues with Durable Object precision alarms. Features a unified React dashboard, multi-platform OAuth token management, resilient asynchronous job workers, and automated Workers AI content optimization.',
    verifiedDetails: [
      'Engineered distributed backend with Hono on Cloudflare Workers handling REST endpoints and webhook telemetry at sub-50ms edge latency.',
      'Designed high-precision scheduling engine with Durable Object alarms triggering Cloudflare Queues for guaranteed asynchronous execution.',
      'Integrated multi-platform API adapters for X (Twitter) v2, LinkedIn REST API, and Meta Graph API with automatic token refresh in KV.',
      'Configured Cloudflare R2 bucket for high-throughput media asset staging and Workers AI integration for automated post copy optimization.'
    ],
    technologies: ['React', 'Cloudflare Workers', 'Hono', 'Cloudflare D1', 'Cloudflare Queues', 'Durable Objects', 'Cloudflare R2', 'TypeScript', 'Workers AI'],
    metrics: [
      { label: 'Edge Latency', value: '<50ms Cloudflare Global' },
      { label: 'Queue Engine', value: 'Cloudflare Queues + DO' },
      { label: 'Platform Adapters', value: 'X / LinkedIn / Meta' }
    ],
    protocols: ['Cloudflare Queues', 'Durable Objects Alarms', 'RESTful API / Hono', 'OAuth 2.0 PKCE'],
    githubUrl: 'https://github.com/Somujavooru/social-media-publisher',
    liveDemoUrl: null,
    image: '/images/projects/social-media-publisher.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Client Presentation', description: 'Responsive React dashboard managing multi-platform compose queues, scheduling calendars, and live post telemetry', technologies: ['React', 'TypeScript', 'Tailwind'] },
      { layer: 'Edge API & Queues', description: 'Hono API Worker routing payloads to Cloudflare D1, KV, and queuing jobs via Durable Object alarms and Cloudflare Queues', technologies: ['Cloudflare Workers', 'Hono', 'Queues', 'Durable Objects'] },
      { layer: 'Media & Platform Dispatch', description: 'R2 object storage asset management, Workers AI copy tuning, and consumer workers dispatching to X, LinkedIn, and Meta APIs', technologies: ['Cloudflare R2', 'Workers AI', 'Platform Adapters'] }
    ]
  },
  {
    id: 'edunova-platform',
    title: 'EduNova Tech — Student Project Platform',
    subtitle: 'Full-Stack Technical Project Discovery & Collaboration Engine',
    category: 'android-web',
    categoryLabel: 'Web Applications (Supporting)',
    isPrimaryEmbedded: false,
    problemStatement: 'Engineering students struggle to find structured hardware-software project architectures, design schematics, and vetted technical mentorship.',
    implementationSummary: 'Developed a full-stack web marketplace and repository platform enabling engineering students to explore technical project architectures, discover implementations, and request personalized hardware/software project guidance.',
    verifiedDetails: [
      'Built modern frontend with Next.js and TypeScript featuring responsive exploration filters and search.',
      'Designed relational database schema supporting student user profiles, project blueprints, and inquiry queues for 100+ simulated users.',
      'Implemented RESTful endpoints handling secure client requests, payload serialization, and optimized data retrieval.',
      'Reduced average network payload latency by 30% through lightweight JSON structuring and caching.'
    ],
    technologies: ['TypeScript', 'Next.js', 'React', 'REST APIs', 'SQL Database', 'Tailwind CSS'],
    metrics: [
      { label: 'Payload Latency', value: '-30% Optimized' },
      { label: 'Concurrent Users', value: '100+ Tested' }
    ],
    protocols: ['HTTP/2', 'RESTful JSON', 'SQL ORM'],
    githubUrl: 'https://github.com/Somujavooru/EduNova_Tech',
    liveDemoUrl: null,
    image: '/images/projects/edunova-platform.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Web Client', description: 'Responsive Next.js application with modular UI components and real-time project filtering', technologies: ['Next.js 14', 'TypeScript', 'Tailwind'] },
      { layer: 'API Layer', description: 'REST API routing handling authentication, project discovery queries, and support submissions', technologies: ['Node.js', 'API Routes'] },
      { layer: 'Data Storage', description: 'Relational SQL database storing catalog metadata, categories, and student interaction history', technologies: ['SQL Database', 'Prisma/ORM'] }
    ]
  },
  {
    id: 'skill-assessment-agent',
    title: 'AI-Powered Skill Assessment Agent',
    subtitle: 'LLM-Driven Technical Evaluation, Resume Parsing & Benchmarking Suite',
    category: 'software-ai',
    categoryLabel: 'Generative AI & Agentic Suite',
    isPrimaryEmbedded: false,
    problemStatement: 'Technical hiring and skill benchmarking require hours of manual resume parsing, subjective grading of candidate code submissions, and lack automated structured gap analysis.',
    implementationSummary: 'Engineered an end-to-end AI-powered skill assessment application using Streamlit, LangChain, and Generative AI (Gemini & OpenAI). Ingests multi-format resumes (PDF, DOCX) and code submissions, extracts skill libraries across 30+ domains, runs automated technical evaluations, and generates comprehensive PDF assessment reports with scoring breakdowns and personalized learning paths.',
    verifiedDetails: [
      'Developed Streamlit reactive interface for candidate resume uploads, code input, and live assessment telemetry.',
      'Implemented LangChain evaluation agents powered by Google Generative AI (Gemini) and OpenAI API for semantic code and resume analysis.',
      'Constructed dual multi-format document parser utilizing PyPDF and python-docx extracting candidate competencies across 30+ technical keywords.',
      'Automated dynamic executive report compilation in Python using FPDF outputting structured scorecards and remediation roadmaps.'
    ],
    technologies: ['Streamlit', 'Python 3', 'LangChain', 'Gemini AI', 'OpenAI API', 'PyPDF', 'python-docx', 'FPDF'],
    metrics: [
      { label: 'Skills Taxonomy', value: '30+ Tech Domains' },
      { label: 'Document Parser', value: 'PDF & DOCX Multi-Format' },
      { label: 'Report Generation', value: 'Automated FPDF Reports' }
    ],
    protocols: ['Generative AI API', 'LangChain Agents', 'AST Code Parsing'],
    githubUrl: 'https://github.com/Somujavooru/AI-Powered-Skill-Assessment-Agent',
    liveDemoUrl: 'https://ai-powered-skill-assessment-agent.streamlit.app/',
    image: '/images/projects/skill-assessment-agent.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Interactive Web UI', description: 'Streamlit dashboard managing resume ingestion, code benchmarking, and live evaluation display', technologies: ['Streamlit', 'Python UI'] },
      { layer: 'Agentic Intelligence', description: 'LangChain pipeline integrating Gemini and OpenAI LLMs for semantic extraction and rubric scoring', technologies: ['LangChain', 'Google Gemini', 'OpenAI'] },
      { layer: 'Document & PDF Engine', description: 'PyPDF and python-docx multi-format parsing paired with FPDF executive summary scorecard generator', technologies: ['PyPDF', 'python-docx', 'FPDF'] }
    ]
  },
  {
    id: 'food-health-app',
    title: 'Food & Health Contextual Nutrition App',
    subtitle: 'Full-Stack Nutrition Intelligence with Flask REST API & React 19 Frontend',
    category: 'android-web',
    categoryLabel: 'Full-Stack Web App',
    isPrimaryEmbedded: false,
    problemStatement: 'Modern wellness and diet trackers fail to adapt nutritional recommendations dynamically based on real-time bio-context, such as sleep quality, current ambient weather conditions, and metabolic timing.',
    implementationSummary: 'Architected a full-stack contextual nutrition platform with a Python Flask REST API backend and a responsive React 19 + Tailwind CSS frontend. Features dynamic meal recommendations based on biometric and environmental factors (sleep quality, weather, time of day), macro tracking (calories, protein, carbs, fats), and interactive meal filtering.',
    verifiedDetails: [
      'Engineered Python Flask REST API serving dynamic meal datasets with multi-variable contextual filtering (time, sleep, weather).',
      'Built reactive frontend in React 19 and Vite styled with modern Tailwind CSS utilities and custom macro progress visualization.',
      'Configured Flask-CORS middleware for seamless bi-directional client-server telemetry and payload serialization.',
      'Designed structured meal schema logging calories, protein, carbohydrates, fats, and wellness contextual tags.'
    ],
    technologies: ['React 19', 'Python (Flask)', 'Flask-CORS', 'Vite', 'Tailwind CSS', 'REST API', 'JavaScript', 'Contextual UI'],
    metrics: [
      { label: 'Architecture', value: 'Full-Stack (Flask + React 19)' },
      { label: 'Recommendation Engine', value: 'Multi-Variable Bio-Matching' },
      { label: 'State Sync', value: 'RESTful JSON / CORS' }
    ],
    protocols: ['HTTP / REST', 'JSON Serialization', 'CORS Middleware'],
    githubUrl: 'https://github.com/Somujavooru/food-health-app',
    liveDemoUrl: null,
    image: '/images/projects/food-health-app.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Frontend Presentation', description: 'React 19 + Tailwind CSS responsive UI with dynamic macro charts and meal cards', technologies: ['React 19', 'Vite', 'Tailwind'] },
      { layer: 'API Gateway', description: 'Flask Python server handling contextual query routing and real-time meal filtering', technologies: ['Python Flask', 'Flask-CORS'] },
      { layer: 'Nutrition Database', description: 'Structured JSON catalog detailing calories, macros, and environmental suitability rules', technologies: ['JSON Dataset', 'Recommendation Engine'] }
    ]
  },
  {
    id: 'hospital-appointment-system',
    title: 'Government Hospital Appointment Management System',
    subtitle: 'Full-Stack Healthcare Operations Portal with Role-Based JWT Auth',
    category: 'android-web',
    categoryLabel: 'Full-Stack Web System',
    isPrimaryEmbedded: false,
    problemStatement: 'Public healthcare facilities face overwhelming patient overcrowding, manual scheduling bottlenecks, and fragmented department doctor availability records.',
    implementationSummary: 'Built a comprehensive full-stack healthcare workflow management system for government hospitals. Features role-based access control (Patient, Doctor, Administrator), automated appointment scheduling, doctor availability calendars, department queues, and secure patient records backed by Node.js, Express, and MongoDB.',
    verifiedDetails: [
      'Engineered backend REST API with Node.js and Express implementing role-based JWT authentication for Patients, Doctors, and Admins.',
      'Designed MongoDB relational schemas with Mongoose for doctors, departments, patient histories, and time slots.',
      'Created responsive patient booking interface and administrative schedule management dashboard using Bootstrap and JavaScript.',
      'Implemented appointment status state machine (Waiting, In Session, Completed, Cancelled) preventing scheduling conflicts.'
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Authentication', 'JavaScript', 'Bootstrap', 'REST APIs'],
    metrics: [
      { label: 'User Roles', value: 'Patient / Doctor / Admin' },
      { label: 'Auth Security', value: 'Role-Based JWT' },
      { label: 'Database', value: 'MongoDB + Mongoose' }
    ],
    protocols: ['HTTP / REST', 'JSON Web Tokens (JWT)', 'Bcrypt Hashing'],
    githubUrl: 'https://github.com/Somujavooru/Government-Hospital-Appointment-Management-System',
    liveDemoUrl: null,
    image: '/images/projects/hospital-appointment-system.jpg',
    hasVerifiedScreenshot: true,
    architectureDiagram: [
      { layer: 'Client Interface', description: 'Responsive patient booking portal, doctor schedule dashboard, and administrative queue management', technologies: ['HTML5', 'Bootstrap 5', 'JavaScript'] },
      { layer: 'Backend REST API', description: 'Node.js + Express API handling role-based JWT authentication, route protection, and scheduling logic', technologies: ['Node.js', 'Express', 'JWT Middleware'] },
      { layer: 'Data Storage', description: 'MongoDB document database managed via Mongoose models for users, appointments, and hospital departments', technologies: ['MongoDB', 'Mongoose ODM'] }
    ]
  }
];
