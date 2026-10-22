# Cinematic Developer Portfolio — Ganesh S

> A studio-grade, editorial, high-performance personal developer portfolio engineered for **Ganesh S** — Computer Science Engineering student, aspiring software developer, and future AI engineer.

---

## ✦ Key Architectural Highlights

1. **Advanced CSS Design System**:
   - Built on CSS `@layer` ordering: `reset`, `tokens`, `base`, `components`, `utilities`, `animations`, `responsive`.
   - Perceptually uniform **OKLCH** color ramps with dynamic tints derived via `color-mix()`.
   - Fluid typography and spatial rhythm powered entirely by CSS `clamp()`, eliminating awkward breakpoint jumps.
   - Component-level container queries (`@container`) for true modular responsiveness.
   - 1px gradient borders and interactive card hover lighting responding to `--mx` and `--my` custom properties.
   - Zero-overhead static SVG `feTurbulence` noise overlay and subtle mathematical grid surface.

2. **Signature "0 1" Green Cursor**:
   - Frame-rate independent **lerp physics** (lag factor ~0.15 for outer ring, ~0.5 for monospace glyph).
   - Independent randomized binary bit flicker (120–400 ms) producing an organic digital feel.
   - Dynamic velocity-gated recycled trail node pool (14 pre-allocated elements, zero GC pressure).
   - Contextual interaction states: morphs to action labels (`EXPLORE`, `CONTACT`, `VIEW PROJECT`) over links/buttons, with up to 8px magnetic pull.
   - Strict accessibility: automatically disabled on touch/coarse pointers and under `prefers-reduced-motion: reduce`. Native cursor is never blocked (`pointer-events: none`).

3. **Cinematic Hero Choreography**:
   - Interactive 3D wireframe particle sphere rendered via `<canvas>` with inertia-based pointer responsiveness and golden-angle Fibonacci distribution.
   - Automatic viewport culling (`IntersectionObserver`) pauses canvas RAF when off-screen to preserve battery and GPU cycles.
   - Character/word clip-mask with directional blur-to-sharp entrance animation.
   - Monogram SVG logo with dynamic path drawing stroke on initial load.

4. **Authentic Project Showcase & Deep-Dive Modals**:
   - 5 authentic academic & engineering projects:
     1. *Student Daily Activity Tracker*
     2. *Student Feedback Management System*
     3. *Library Management System using Linked Lists*
     4. *Vehicle Rental Management System*
     5. *Agricultural Marketplace and Smart Farming Platform*
   - Honest status badges (`In Progress`, `Concept`, `Completed`).
   - Generative SVG architecture previews and deep-dive technical modals with focus trapping and ESC-key dismissal.

5. **Client-Side Form Demonstration**:
   - Accessible inline error feedback, `aria-describedby` associations, and `aria-live` status regions.
   - Clear upfront disclosure that the form is an interactive client-side demonstration.

---

## 📂 File Directory Structure

```text
portfolio/
├── index.html            # Semantic HTML5 markup & accessibility landmarks
├── README.md             # Complete documentation and configuration guide
├── css/
│   ├── tokens.css        # Design tokens: OKLCH palette, clamp type scale, motion curves, z-indices
│   ├── base.css          # Reset, background grid, SVG noise texture, typography primitives
│   ├── components.css    # Navigation, buttons, cards, skills, timeline, modal, cursor elements
│   ├── animations.css    # Keyframes, directional blur transitions, scroll-driven timelines
│   └── responsive.css    # Breakpoints (<768px, <1024px), container queries, reduced-motion overrides
├── js/
│   ├── main.js           # App orchestration, DOM rendering, nav spy, card lighting, form validation
│   ├── cursor.js         # "0 1" cursor engine, lerp loop, bit flicker, trail pool, magnetic pull
│   ├── animations.js     # 3D canvas sphere, scroll reveals, scroll progress calculation
│   ├── projects.js       # Authentic project catalog, schemas, problem/solution data
│   └── config.js         # Single source of truth: Name, email, socials, education, timeline
└── assets/
    ├── images/           # Profile photo and placeholder graphic
    └── icons/            # SVG monogram and interface icons
```

---

## 🚀 Running Locally (No Build Step Required)

The site is built with modern web standards and native ES modules. It runs out of the box with any static file server:

### Option A: Using Node.js / NPX
```bash
# Navigate to portfolio directory
cd "C:\Users\ganes\.gemini\antigravity\scratch\portfolio"

# Serve using 'serve' or 'http-server'
npx serve .
# or
npx http-server -p 3000
```
Open your browser at `http://localhost:3000`.

### Option B: Using Python
```bash
cd "C:\Users\ganes\.gemini\antigravity\scratch\portfolio"
python -m http.server 8000
```
Open `http://localhost:8000`.

### Option C: VS Code Live Server
Right-click `index.html` inside VS Code and choose **"Open with Live Server"**.

---

## ⚙️ Customization & Updates

### 1. Where to Add Your Profile Image
Simply place your portrait photo at:
```text
portfolio/assets/images/profile.jpg
```
The site automatically detects the image and displays it with a neon-accented frame. If no photo is found, it automatically falls back to the stylized cybernetic placeholder graphic.

### 2. Updating Social Links, Email & Bio
Open `portfolio/js/config.js` and edit the values:
```javascript
export const CONFIG = {
  profile: {
    name: "Ganesh S",
    availability: {
      badgeText: "AVAILABLE FOR INTERNSHIPS & COLLABORATIONS",
      ...
    },
    ...
  },
  social: {
    email: "your.real.email@domain.com",
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username"
  }
};
```
All references in the navigation, hero, about cards, and contact section update automatically.

### 3. Adding or Modifying Projects
Open `portfolio/js/projects.js` and add or edit project objects in the `PROJECTS` array. Each project accepts:
- `title`: Project title
- `status`: `"In Progress" | "Concept" | "Completed"`
- `category`: Subtitle / domain
- `shortDescription`: 1-2 sentence card summary
- `problemStatement`: Detailed problem description for modal
- `solutionOverview`: Architectural solution overview for modal
- `technologies`: Array of tech stack tags
- `keyFeatures`: Array of bullet points
- `architectureNotes`: In-depth engineering context
- `sourceCodeUrl`: Link to GitHub repository

---

## 🌐 Deployment Guide

### Deploying to GitHub Pages
1. Push the `portfolio` folder to a new GitHub repository (e.g., `ganesh-portfolio`).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Deploying to Netlify
1. Drag and drop the `portfolio` folder into the Netlify Dashboard, or connect your GitHub repository.
2. Build command: *(leave blank)*.
3. Publish directory: `.` (root).

### Deploying to Vercel
1. Run `npx vercel` inside the `portfolio` directory or import the Git repository.
2. Framework Preset: **Other**.
3. Output Directory: `./`.
