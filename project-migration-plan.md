# Project Migration Plan: FACADE CENTER QUOTATION

Lets migrate the project from **A ZONE Solutions** (Industrial CNC/Laser) to **FACADE CENTER QUOTATION** (Software Development Company).

## 1. Project Rebranding
- [x] Rename project in `package.json` to `facade-center-quote`.
- [x] Update `antigravity-rules.md` with new project name and software-specific rules.
- [x] Update site metadata (Title, Description) in `layout.tsx`.
- [x] Update Navbar and Footer branding in marketing pages.

## 2. Data Schema Overhaul
- [x] **Materials to Services**: Replace `data/materials.json` with `data/services.json`.
  - Categories: `FRONTEND`, `BACKEND`, `FULLSTACK`, `MOBILE`, `UI_UX`, `DEVOPS`, `QA`.
  - Pricing: Hourly rates for different tech stacks (React, Next.js, Node.js, Python, Flutter).
- [x] **Pricing Adjustments**: Update `data/pricing.json`.
  - Remove machine/setup fees.
  - Add developer hourly rates (Junior, Senior, Specialist).
  - Add Project Management (PM) percentage fees.

## 3. Core Engine Migration (`lib/quote-engine.ts`)
- [x] Refactor `calculateLineItem` to handle software project components.
  - Cost = (Base Hours * Complexity Multiplier * Developer Hourly Rate).
- [x] Update `calculateProjectQuote` to include:
  - Project Management fees.
  - Infrastructure/Cloud setup costs.
  - Maintenance plans.

## 4. AI Model Re-training (Prompt Engineering)
- [x] Update `app/api/parse-quote/route.ts` system prompt.
  - Change persona to "Senior Software Architect Estimator".
  - Update categories to software modules (User Auth, Payment, Dashboard, etc.).
  - Change dimension extraction (Width/Height) to scope extraction (Complexity, Pages, Endpoints).

## 5. UI/UX Refactoring
- [x] Update Quote Form components to remove CNC-specific fields (Material, Size).
- [x] Add software-specific fields:
  - Platform (Web, iOS, Android).
  - Tech Stack (MERN, Next.js, T3, etc.).
  - Timeline (Express, Standard, Extended).
- [x] Refactor Dashboard to show software project status (Development, Testing, UAT).

## 6. PDF and Reporting
- [x] Update Quotation PDF template to look like a professional software proposal.
- [x] Include "Scope of Work" and "Technical Stack" sections.

## 7. Cleanup
- [x] Remove CNC-specific utilities (`lib/machine-time.ts`, `lib/metal-calculator.ts`).
- [x] Clean up `data/` folder of unused JSON files.

---
**Migration Status: 100% Complete**
*The project has been fully transitioned to FACADE CENTER QUOTATION.*
