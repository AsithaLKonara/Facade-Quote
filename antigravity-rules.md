# FACADE CENTER QUOTATION - Antigravity AI Agent Rules

This file defines the core operating principles for the AI agent working on the FACADE CENTER QUOTATION project.

## 1. Agent Core Rule
The AI agent must follow this hierarchy:
1. `antigravity-rules.md`
2. `project-plan.md`
3. Current task instructions

If there is a conflict, rules override instructions.

## 2. Token Usage Rule (Very Important)
The agent must minimize token usage.
- Never load entire project context.
- Only read files required for the task.
- Never regenerate large files unnecessarily.
- Prefer modifying small functions instead of rewriting modules.
- **Allowed context size:**
  - Maximum: 3000 tokens
  - Preferred: under 1500 tokens

## 3. File Access Rules
The AI should only load files relevant to the current task.
- Example (Editing quote engine):
  - Allowed: `/lib/quote-engine.ts`, `/data/services.json`, `/types/project.ts`
  - Not allowed: `/components/marketing/*`, `/admin/*`, `/settings/*`

## 4. Code Generation Rules
AI must generate:
- Small modular functions
- Clean readable code
- Minimal dependencies
- **Avoid:** ❌ heavy frameworks, ❌ unnecessary abstractions, ❌ long files
- **Preferred file size:** 150 – 300 lines
- **Maximum:** 500 lines

## 5. Project Architecture Rule
The AI must follow this exact structure:
- `/app`
  - `/marketing`
  - `/quote`
  - `/dashboard`
  - `/admin`
- `/components`
- `/lib`
- `/data`
- `/types`
- `/services`
- `/utils`
- Never create random folders.

## 6. Landing Page Rule
Landing page must be high quality UI for a Software Development Agency.
- Use: Tailwind, Framer Motion, modern hero sections, glassmorphism
- Other pages: simple, clean, shadcn components
- No unnecessary animations.

## 7. Dashboard UI Rule
Dashboards must be minimal and data-focused.
- Use: shadcn/ui, tables, cards, forms
- Avoid: custom UI frameworks, complex animations, heavy chart libraries

## 8. Data Storage Rule
Use lightweight storage.
- Allowed: JSON, SQLite, local storage
- Avoid: external database services, paid APIs
- **Reason:** Project must deploy on Vercel free tier.

## 9. Quote Engine Rule
Quote calculation must be formula based for software projects.
- Never hardcode prices in UI.
- All prices must come from: `/data/services.json`, `/data/pricing.json`, `/data/rates.json`

## 10. Service Pricing Rule
## Pricing Engine Architecture
- **4-Layer Formula**: All estimates MUST use the 4-layer structure:
  1. **Direct Delivery**: Role Hours × Loaded Role Rate × Complexity.
  2. **Overhead**: Fixed 15% (min LKR 25k) for PM/Admin/QA overhead.
  3. **Risk Reserve**: 10%-25% based on scope uncertainty.
  4. **Pass-through**: Separate hosting/domain/API costs from labor.
- **Gross Margin Logic**: Final Price = Subtotal / (1 - target margin). Target is typically 35%.
- **Role-Based Rates**: Estimation is role-based (Architect, Senior, Mid, Junior), not just tech-based.
- **FX Strategy**: Export projects are quoted in USD using current LKR cost base converted at daily exchange rates.
- **Complexity Factors**: 1.0x (Simple), 1.3x (Medium), 1.8x (Complex), 2.5x (Enterprise).
- **Packaging**: Use Startup/MVP, Growth, and Enterprise tiers to help clients self-select.

## 11. AI Estimation Rule
AI estimator (Senior Architect Persona) must be deterministic first.
- Priority: 1. Scope-based formula, 2. Historical averages, 3. AI prediction
- AI should break down requests into Frontend, Backend, API, and UI components.

## 12. Task Management Rule
Project timeline logic must stay inside: `/lib/timeline-service.ts`
- Prevent unrealistic delivery estimates.

## 13. Notification Rule
Notifications must support email, whatsapp link, and browser notification.
- Avoid paid APIs.

## 14. PDF Generation Rule
PDF files must include formal Software Proposal, Quotation, and SLA.
- Generated server-side.
- Allowed tools: `react-pdf`, `pdf-lib`

## 15. Performance Rule
Pages must load under 1.2 seconds.
- Avoid: large images, heavy JS bundles, unused dependencies.

## 16. Context Memory Rule
The AI must always read `antigravity-rules.md` before executing tasks.
- The rules file must never be modified automatically.

## 17. Task Execution Rule
Every AI task must follow this workflow:
1. Read rules
2. Read relevant files
3. Generate plan
4. Implement minimal changes
5. Verify code

## 18. Code Style Rule
- TypeScript only
- No `any` types
- Prefer functional components
- Formatting: `eslint`, `prettier`

## 19. Dependency Rule
Before installing packages, AI must verify:
- Is this necessary?
- Can we implement this with native JS?
- Avoid dependency bloat.

## 20. Build Safety Rule
The agent must never break the build.
- Before completing tasks: run type check, run build.

## 21. Documentation Rule
AI must maintain documentation files:
- `/docs/project-plan.md`
- `/docs/software-architecture.md`
- `/docs/estimation-algorithm.md`

## 22. Deployment Rule
- Target: Vercel free tier
- Constraints: Edge compatible, No long-running jobs, Minimal server functions.

## 23. Security Rule
- Never expose: API keys, private data, internal pricing logic.

## 24. Agent Behavior Rule
- Think before coding
- Avoid overengineering
- Prefer simple solutions

## 25. Final Rule
The agent must always follow the FACADE CENTER QUOTATION project plan.
- **Goal:** Build a premium, AI-powered software estimation platform for a high-end development agency.
