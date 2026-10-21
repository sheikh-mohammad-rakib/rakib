# Portfolio Data Integration Plan
> Sheikh Mohammad Rakib — Real Data Replacement

This document is the authoritative plan for replacing every placeholder in
`d:\animation-pro` with real resume content.  
Work through the tasks **in order** — each section builds on the file above it.

---

## Overview of Changes

| File | Change Type | Summary |
|---|---|---|
| `components/sections/Hero.tsx` | **Update data** | Real name, title, tagline, CTA targets |
| `components/sections/About.tsx` | **Update data** | Real bio, career objective, stats |
| `components/sections/Skills.tsx` | **Update data** | Real skill tags grouped by domain |
| `components/sections/Projects.tsx` | **Update data + structure** | 3 real projects + 3 academic projects |
| `components/sections/Contact.tsx` | **Update data** | Real email, LinkedIn, GitHub links |
| `components/sections/Experience.tsx` | **New file** | Industrial experience + academic visits |
| `components/sections/Education.tsx` | **New file** | BSc, HSC, SSC + certifications + award |
| `app/page.tsx` | **Update assembly** | Wire in Experience + Education sections |

---

## Task 1 - Hero.tsx

File: components/sections/Hero.tsx

Replace the 5 placeholder constants near the top of the file:

BEFORE (placeholder):
  EYEBROW    = "Full Stack Creative Developer"
  NAME_LINE1 = "Sheikh Mohammad"
  NAME_LINE2 = "Rakib."
  SUBHEADING = "I design and build products..."
  CTA_PRIMARY   = "View My Work"
  CTA_SECONDARY = "Get in touch"

AFTER (real data):
  EYEBROW    = "Mechatronics & Industrial Engineering Student"
  NAME_LINE1 = "Sheikh Mohammad"
  NAME_LINE2 = "Rakib."
  SUBHEADING = "Mechatronics and Industrial Engineering student skilled at bridging low-level edge hardware with high-level software orchestration — designing, integrating, and optimising automated mechatronic platforms."
  CTA_PRIMARY   = "View My Work"   (unchanged)
  CTA_SECONDARY = "Get in touch"   (unchanged)

Note: CTA hrefs #work and #contact are already correct.

---

## Task 2 - About.tsx

File: components/sections/About.tsx

Replace the placeholder data block:

  PULL_QUOTE = "Bridging low-level edge hardware with high-level software orchestration."

  BIO[0] = "Based in Chattogram, Bangladesh, I'm a Mechatronics and Industrial Engineering student at CUET with a strong foundation in control theory, robotics, and IIoT. I apply sharp debugging instincts and systems-level thinking to the design, integration, and optimisation of automated mechatronic platforms."

  BIO[1] = "When I'm not in the lab, I'm building full-stack web tools, training RL agents in simulation, or exploring the intersection of ML and industrial fault detection."

  STATS:
    { label: "University",  value: "CUET — Batch 2022" }
    { label: "Location",    value: "Chattogram, Bangladesh" }
    { label: "Currently",   value: "Open to opportunities" }

---

## Task 3 - Skills.tsx

File: components/sections/Skills.tsx

Replace the flat SKILLS array with real skill tags:

  // Industrial Controls & Robotics
  "ROS 2", "Gazebo", "Control Theory", "Kinematics & Dynamics", "PID Controllers",
  // IIoT & Edge Computing
  "Arduino", "ESP32", "I2C / SPI", "Real-Time Telemetry",
  // Programming Languages
  "Python", "C++", "MATLAB", "SQL", "JavaScript", "TypeScript",
  // DevOps & Deployment
  "Git", "Linux", "Docker",
  // Web / ML Frameworks
  "Next.js", "Prisma", "Scikit-learn", "Pandas"

Optional enhancement: Group skills by domain with category sub-labels.

---

## Task 4 - Projects.tsx

File: components/sections/Projects.tsx

### 4a - Replace PROJECTS array (main / industrial projects)

  Project 01: "RL Obstacle Avoidance — UR3"
    description: Distributed ROS 2 node ecosystem, Gazebo/PPO training loop, sim-to-real transfer to physical UR3 via tf2 and ros2_control.
    tags: ["ROS 2", "Gazebo", "Python", "PPO", "UR3"]

  Project 02: "IIoT Telemetry & Monitoring System"
    description: Full-stack IIoT architecture, ESP32 edge devices, Prisma ORM + NeonDB, RBAC.
    tags: ["ESP32", "Next.js", "Prisma", "NeonDB", "RBAC"]

  Project 03: "Predictive Maintenance — ML Fault Detection"
    description: End-to-end Scikit-learn pipeline, spectral feature extraction, early-stage mechanical degradation classification.
    tags: ["Scikit-learn", "Pandas", "Python", "Signal Processing"]

### 4b - Add ACADEMIC_PROJECTS constant (rendered in a second subsection below)

  Project 04: "4-DOF Pick & Place Robotic Arm"
    description: 4-DOF arm with C++ inverse kinematics on Arduino, optical proximity sensors, industrial material-handling.
    tags: ["C++", "Arduino", "Inverse Kinematics", "Servo Actuation"]

  Project 05: "Automated Liquid Filling & Conveyor"
    description: DC motor conveyor + optical sensors, relay/solenoid valve control logic, precise dispensing volumes.
    tags: ["Microcontroller", "Relay Logic", "Solenoid Valves", "DC Motor"]

Academic cards have no image — use a simplified card layout (number + title + description + tags).
Section label for academic group: "Academic Projects"

---

## Task 5 - Contact.tsx

File: components/sections/Contact.tsx

LINKS array is already correct (email, GitHub, LinkedIn all present with real URLs).
No change needed to LINKS.

Optionally update SUBTEXT to:
  "Whether you have a project, a research collaboration, or just want to connect — my inbox is always open."

---

## Task 6 - New Experience.tsx section

File to create: components/sections/Experience.tsx
Position: between Skills and Projects in page.tsx

Data:
  EXPERIENCES[0]:
    role:   "Industrial Attachment Trainee"
    org:    "Transcom Beverages Limited"
    period: "January 2026"
    bullets:
      - Analysed automation architecture of beverage bottling lines (PLCs, VFDs, pneumatic actuators).
      - Investigated real-time process control + fault diagnostics through SCADA interfaces.
      - Participated in root-cause analysis for electromechanical faults during preventive maintenance.

  EXPERIENCES[1]:
    role:   "Industrial Visit"
    org:    "Shikalbaha 225 MW Combined Cycle Power Plant, Chattogram"
    period: "2025"
    bullets:
      - Gained knowledge of CCPP operations: Gas Turbines, Steam Turbines, HRSG.

Layout: Follow Design.md conventions.
  - Eyebrow: "Industrial Experience" in text-xs uppercase tracking-widest text-[#555550]
  - Each entry: bordered row (border border-[#D8D8D4]) with header (role | org | period) + bullet body
  - Motion whileInView fade-up on each card (same fadeUp variant as About.tsx)

---

## Task 7 - New Education.tsx section

File to create: components/sections/Education.tsx
Position: between About and Skills in page.tsx

Data:

  DEGREES:
    { degree: "BSc — Mechatronics and Industrial Engineering", school: "CUET", period: "March 2022 – Present", note: null }
    { degree: "Higher Secondary Certificate (HSC)", school: "Chattogram Govt. Model School and College", period: "2018 – 2020", note: "GPA 5.00 / 5.00" }
    { degree: "Secondary School Certificate (SSC)", school: "Govt. Muslim High School", period: "2018", note: "GPA 5.00 / 5.00" }

  CERTIFICATIONS:
    { title: "Machine Learning Engineer (Career Track)", org: "DataCamp", note: "End-to-end ML pipelines, deployment, MLOps." }
    { title: "Associate AI Engineer for Developers (Career Track)", org: "DataCamp", note: "AI model integration via modern APIs and open-source libraries." }

  AWARD:
    title:   "Winner — Codex $100 Credit | Hack Days CUET"
    period:  "July 2026"
    project: "MedClarify AI"
    note:    "AI agent using LLMs to reduce medical diagnostic uncertainty via information-theoretic follow-up questioning."

Layout:
  - Two subsections: Degrees | Certifications & Awards
  - Degrees: vertical stacked rows with border-b border-[#D8D8D4], period right-aligned
  - Certifications: bordered panel (same stats-panel style as About.tsx)
  - Award title: text-[#1A4A2E] accent

---

## Task 8 - Update page.tsx

File: app/page.tsx

Wire in the two new sections. Final page order:

  Hero
  SectionDivider (bracket)
  About
  SectionDivider (line)
  Education          <-- NEW import + render
  SectionDivider (line)
  Skills
  SectionDivider (line)
  Experience         <-- NEW import + render
  SectionDivider (line)
  Projects
  SectionDivider (corner)
  Contact
  Footer

---

## Execution Order

1. Task 1 — Hero.tsx data constants
2. Task 2 — About.tsx data constants
3. Task 3 — Skills.tsx skill tags
4. Task 5 — Contact.tsx verification / SUBTEXT update
5. Task 4 — Projects.tsx data + academic section
6. Task 6 — Create Experience.tsx
7. Task 7 — Create Education.tsx
8. Task 8 — Update page.tsx to include new sections

---

## Notes & Constraints

- No terminal commands — all changes are file edits only.
- Follow Design.md aesthetic throughout: no rounded corners, #D8D8D4 borders, #1A4A2E accent, #555550 body text.
- All new sections must be "use client" components with Motion whileInView fade-up animations.
- New section files go in components/sections/.
- Project images /images/projects/project-*.png already exist — no new images needed for main projects.
- Academic project cards have no image.
