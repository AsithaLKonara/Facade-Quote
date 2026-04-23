# System Architecture - A ZONE Solutions

## Overview
A lightweight, Next.js-based platform for automated fabrication quotations and project management. Designed for Vercel Free Tier deployment with minimal external dependencies.

## Directory Structure
- `/app`: Next.js App Router (Marketing, Quote, Dashboard, Admin)
- `/components`: Reusable UI components (custom shadcn-style)
- `/lib`: Core business logic (Quote Engine, Scheduler)
- `/data`: JSON-based lightweight storage
- `/types`: TypeScript definitions
- `/services`: Notification and external service wrappers
- `/utils`: Helper functions

## Data Strategy
- Pricing and materials are stored in `/data/*.json` for sub-1.5s page loads.
- Client-side calculation ensures instant feedback.
- Administrative updates can be made to JSON files which are then redeployed or read dynamically.
