# A ZONE Solutions - Project Plan

## 1. Project Overview & Objectives
**A ZONE Solutions Quote Platform** is an automated quotation and project management system for fabrication, advertising, and digital services.

### Core Objectives:
- ✅ **100% Automated Quotations:** Instant, accurate LKR-based pricing.
- ✅ **Production Workflow:** Real-time tracking from design to delivery.
- ✅ **Customer Transparency:** Dedicated dashboard for project status and documents.
- ✅ **Admin Efficiency:** Centralized material, price, and job management.

---

## 2. Implementation Status (Current vs. Goal)

| Module | Status | Priority |
| :--- | :--- | :--- |
| **Core Architecture** | ✅ Implemented (Next.js, Tailwind, JSON DB) | HIGH |
| **Smart Quote Engine** | ⚠️ Partial (Fabrication done, Digital/Metal pending) | HIGH |
| **Marketing Website** | ✅ Implemented (Hero/Basic structure) | MEDIUM |
| **Customer Dashboard** | ✅ Implemented (Project list/Status) | MEDIUM |
| **Admin Dashboard** | ✅ Implemented (Stats/Project table) | MEDIUM |
| **Scheduler System** | ✅ Implemented (EDF Algorithm) | HIGH |
| **Notification System** | ✅ Implemented (WhatsApp/Email link gen) | MEDIUM |
| **PDF Generation** | ❌ Not Started | HIGH |
| **AI Project Analyzer** | ❌ Not Started | LOW |

---

## 3. Service Modules & Pricing Logic

### A. Fabrication (CNC & Laser)
- **Materials:** Plywood, MDF, Acrylic, Foam Board, PVC, Glass.
- **Formula:** `(Area * Material Price) + (Area * Machine Rate) + Labor + Delivery`
- **Machine Rates:** CNC (300-600/sqft), Laser (200-400/sqft).

### B. Advertising Boards
- **Types:** Glass Signage, Wood Engraved, Light Boxes, Embossed Letters, Infinity Mirrors.
- **Metal Framework (For Light Boxes):**
  - `Frame Length = (2 * W) + (2 * H)`
  - Welding Labor Assigned to coworker automatically.

### C. Creative & Digital Services
- **Logo Design:** 6,000 – 20,000 LKR.
- **Web Dev:** 40,000 – 400,000 LKR (based on pages/features).
- **AI Requirement Analyzer:** Converts text description to estimated scope & budget.

---

## 4. Platform Workflow
1. **Request:** Customer enters specs in the Quote Tool.
2. **Quote:** System generates instant price and downloadable PDF.
3. **Approval:** Customer confirms order; production is scheduled.
4. **Production:** Tasks assigned to workers; status updates in real-time.
5. **Delivery:** Calculated by distance; WhatsApp/Email triggers sent.
6. **Completion:** Final invoice generated; project archived.

---

## 5. E2E Testing Checklist (Reliability & Quality)

### 🛠 Core Functional Tests
- [ ] **Quote Accuracy:** Verify CNC/Laser formulas match `materials.json`.
- [ ] **Boundary Tests:** Ensure 0 or negative dimensions are rejected.
- [ ] **Material Swap:** Changing materials updates total price instantly.
- [ ] **Delivery Logic:** Ensure distance-based pricing triggers correctly.

### 🍱 User Experience Tests
- [ ] **Landing Performance:** Load time < 1.5s on Vercel.
- [ ] **Mobile Responsiveness:** All forms and dashboards work on phones.
- [ ] **Navigation Loop:** Links between Marketing -> Quote -> Login are correct.

### 🛡 Admin & Security Tests
- [ ] **Price Updates:** Updating `materials.json` reflects in new quotes without rebuild.
- [ ] **Dashboard Access:** Verify mock auth prevents unauthorized access to Admin.
- [ ] **Build Safety:** `npm run build` must pass before any deployment.

---

## 6. Technical Stack & Deployment
- **Frontend:** Next.js (App Router), Tailwind CSS.
- **UI Components:** Shadcn-inspired (Radix UI / Lucide React).
- **Database:** Lightweight JSON Storage (Vercel Edge compatible).
- **Hosting:** Vercel Free Tier.
- **PDF:** `react-pdf` / `pdf-lib`.

---

## 7. Future Roadmap
- [ ] **AI Phase:** Implement text-to-quote for custom fabrication requests.
- [ ] **SaaS Phase:** Convert logic into a multi-tenant platform for other CNC shops.
- [ ] **Live Inventory:** Real-time stock tracking for common materials.
