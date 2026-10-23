# Somashekhar Javooru — Premium 3D Engineering Portfolio
### Creative Concept: *The Engineering Universe*

> **Professional Positioning:** Embedded Software Engineer  
> **Headline:** "Engineering Intelligence. Connecting Hardware and Software."  
> **Supporting Statement:** "I build embedded software, firmware, and connected systems, with additional experience developing software and mobile applications."

A production-quality personal engineering portfolio website built for **Somashekhar Javooru**, a 2026 Electronics and Communication Engineering graduate from **Bapuji Institute of Engineering and Technology (BIET), Davangere**, targeting roles in **Embedded Software**, **Firmware Development**, **Embedded Linux**, and **IoT Systems**.

---

## ⚡ Tech Stack & Architecture

- **Core Framework:** React 19 + TypeScript + Vite 8
- **Styling System:** Tailwind CSS v4 + Custom Semiconductor Grid Tokens
- **3D Interactive Core:** Three.js, React Three Fiber (`@react-three/fiber`), and Drei (`@react-three/drei`)
- **Iconography:** Lucide React + Custom Silicon Vector SVGs
- **Fallbacks:** Lightweight CSS/SVG animated circuit schematic for environments without WebGL or with `prefers-reduced-motion`

---

## 📁 Project Architecture

```
d:/Somu_profile/
├── public/
│   ├── favicon.svg               # Semiconductor processor SVG favicon
│   ├── resumes/
│   │   ├── embedded-resume.pdf   # Official Embedded Firmware Resume
│   │   └── software-resume.pdf   # Official Software Engineering Resume
│   └── images/
│       └── projects/             # Verified hardware photographs & screenshots
│           ├── solar-agri-robot.jpg
│           ├── solar-control-panel.jpg
│           ├── farmer-assistant-home.png
│           └── farmer-paddy-ai.png
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── SiliconProcessorCore.tsx   # Interactive 3D processor assembly
│   │   │   ├── ThreeSceneContainer.tsx    # Responsive canvas, lighting & HUD
│   │   │   └── CanvasFallback.tsx         # Graceful SVG vector schematic fallback
│   │   ├── common/
│   │   │   ├── Navbar.tsx                 # Sticky navigation with scroll-spy
│   │   │   ├── Footer.tsx                 # Bengaluru IST clock & telemetry
│   │   │   ├── SectionHeader.tsx          # Engineering module typography
│   │   │   ├── TechBadge.tsx              # Protocol & hardware tags
│   │   │   ├── ProjectIllustrations.tsx   # Custom SVG circuit architecture diagrams
│   │   │   └── SocialIcons.tsx            # Pixel-perfect GitHub & LinkedIn icons
│   │   └── modals/
│   │       ├── ProjectModal.tsx           # In-depth architectural case study modal
│   │       └── ResumeModal.tsx            # Dual resume download & inspection modal
│   ├── data/
│   │   ├── profile.ts            # Central personal info, email placeholder, and links
│   │   ├── skills.ts             # Verified technical taxonomy (No fake percentages)
│   │   ├── projects.ts           # Central project database with hardware specs
│   │   ├── experience.ts         # Centralized, editable internship configurations
│   │   └── education.ts          # Academic degrees, coursework & verified awards
│   ├── hooks/
│   │   └── useScrollSpy.ts       # Active section tracker for navbar
│   ├── types/
│   │   └── index.ts              # Comprehensive TypeScript interfaces
│   ├── App.tsx                   # Main layout assembling all 8 modules
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Design tokens, circuit grid & dark theme
├── Resume/                       # Local source curriculum vitae archive
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended; verified on Node v22.17)
- npm (version 9 or higher)

### Installation
```bash
# Clone or navigate to the repository
cd d:/Somu_profile

# Install all dependencies
npm install
```

### Development Server
```bash
npm run dev
# The dev server will launch at http://localhost:5173/ or http://127.0.0.1:5173/
```

### Production Build
```bash
npm run build
# Compiles TypeScript and generates optimized bundle in dist/
```

### Local Production Preview
```bash
npm run preview
```

---

## 🛠️ How to Customize & Configure

### 1. How to Configure Your Email Address
Open [src/data/profile.ts](file:///d:/Somu_profile/src/data/profile.ts) and locate the `email` field:
```typescript
export const PROFILE_CONFIG = {
  // Replace YOUR_EMAIL_HERE with your real email:
  email: 'somashekharjavooru@gmail.com',
  isEmailConfigured: true, // Flip to true to remove the placeholder badge
  ...
};
```
*Note: A placeholder `YOUR_EMAIL_HERE` is used by default to prevent publishing unconfirmed addresses.*

### 2. How to Update or Add Resume PDFs
The website provides two distinct download buttons:
- **Button A: "Download Embedded Resume"** -> requests `/resumes/embedded-resume.pdf`
- **Button B: "Download Software Resume"** -> requests `/resumes/software-resume.pdf`

To update the documents:
1. Place your updated PDF files into `public/resumes/`.
2. Name them `embedded-resume.pdf` and `software-resume.pdf`.
3. If you want to change the file names or target paths, edit `PROFILE_CONFIG.resumes` in [src/data/profile.ts](file:///d:/Somu_profile/src/data/profile.ts).

### 3. How to Update Projects
All project data is centralized in [src/data/projects.ts](file:///d:/Somu_profile/src/data/projects.ts). Each project entry adheres to the `Project` interface with:
- `title`, `subtitle`, `category` (`embedded` | `iot` | `software-ai` | `android-web`)
- `problemStatement` & `implementationSummary`
- `verifiedDetails` (checklist of verified technical feats)
- `hardwareSpecs` & `protocols`
- `architectureDiagram` (layer-by-layer description)
- `githubUrl` (verified public repository link)
- `image` & `hasVerifiedScreenshot` (flag distinguishing real build photos from technical SVG architecture diagrams)

### 4. How to Update Skills
Skills are structured in [src/data/skills.ts](file:///d:/Somu_profile/src/data/skills.ts) into 5 honest, recruiter-friendly categories without fabricated proficiency percentages:
1. **Embedded Software & Firmware** (Primary emphasis)
2. **Embedded Linux & Systems**
3. **Networking & IoT Systems**
4. **Software Development & Fundamentals**
5. **Mobile, Web & Edge AI** (Supporting experience)

### 5. How to Update Experience
Experience entries are located in [src/data/experience.ts](file:///d:/Somu_profile/src/data/experience.ts). If dates or exact titles vary between resumes, update the fields directly with verified details.

---

## 🌐 Deployment Instructions

### Vercel
1. Push your repository to GitHub (`github.com/Somujavooru/<repo-name>`).
2. Log into [vercel.com](https://vercel.com) and import the repository.
3. Framework Preset will automatically detect **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**.

### Netlify
1. Connect repository on [netlify.com](https://netlify.com).
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Click **Deploy Site**.

### GitHub Pages
1. In `vite.config.ts`, set `base: '/<repo-name>/'`.
2. Use GitHub Actions with the standard Vite deployment workflow to deploy `dist/` to `gh-pages`.

---

## 🔒 Verification & Compliance Summary
- **Verified GitHub Repositories:** All 8 projects ground in actual public repositories on `https://github.com/Somujavooru`.
- **Honest Fork Attribution:** `ESP32-CAM-face-recognition-and-TFT-display-project` clearly acknowledges its baseline fork and highlights custom TFT Touchscreen UI & EEZ-GUI authoring.
- **Genuine Project Media:** Real photos for Solar Agriculture Robot and real screenshots for Farmer Assistant AI.
- **Dual Resumes:** Both `embedded-resume.pdf` and `software-resume.pdf` are mapped to genuine PDFs extracted from the workspace.
- **Accessible & Deterministic:** Smooth 60 FPS WebGL rendering, graceful SVG fallback, zero layout shifts, zero console errors.
