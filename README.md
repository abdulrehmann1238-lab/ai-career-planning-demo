# AI Career Planning & Job Search Management Platform

> *"Your career deserves a plan, not another open browser tab."*

An AI-powered career planning and job search management platform prototype designed for professionals actively searching for employment, preparing for upcoming interviews, and managing their career pipelines.

---

## 🌟 Key Features

### 1. Public Marketing Website
- **Cinematic Workspace Hero:** Ambient workspace scene with layered sunlight motion and live floating preview cards.
- **Problem & Solution Breakdown:** Three illustrated candidate challenges and four product solution pillars.
- **Interactive Product Preview:** Working tabs (*Career Dashboard*, *Interview Practice*, *Job Tracker*, *Weekly Plan*) dynamically updating live interface previews.
- **AI Interview Practice Spotlight:** Interactive sample question with real-time STAR rubric breakdown toggle.
- **Pricing & FAQ:** Monthly / Annual pricing recalculation and collapsible accordion FAQ.
- **Interactive Contact Form:** Validated feedback form with instant confirmation toasts.

### 2. Candidate Career Application
- **Interactive Overview Dashboard:** Dynamic greetings, today's priorities checklist (instantly updates progress metrics), upcoming interview timeline, deadlines, and AI insight cards.
- **AI Career Coach:** Contextual career intelligence assistant with discussion history, prompt starters, typing indicator, local reasoning engine, and inline action items.
- **Interview Practice Studio:** Multi-format interview simulator (Behavioral, Technical, Situational, Leadership, HR) with 4-dimensional rubric evaluations (Communication, Relevance, Structure, Specificity), STAR model answers, and follow-ups.
- **Job Application Tracker:** 6-column Kanban board and sortable Table view with full CRUD, search, status filters, and timeline event logging.
- **Weekly Career Planner:** Monday through Sunday roadmap with task prioritization and AI weekly plan synthesis.
- **Progress Analytics:** 7d/30d/90d interactive charts for readiness calibration and focus allocation.
- **Saved Items & Library:** Centralized repository for coaching discussions, rubric feedback, and notes.
- **Subscription Management:** Simulated Free vs. Premium tiers with 1-click tier switching.
- **Settings & Demo Reset:** Profile preferences, notification toggles, privacy overview, and 1-click workspace reset.

### 3. Administrative SaaS Console
- **Console Overview:** 6 operational KPIs (Users, MRR, AI Sessions, Interview volume) with growth and revenue charts.
- **User Directory:** Searchable candidate registry with account detail drawers and simulated status management.
- **AI Prompts Manager:** Prompt registry across 5 categories, modal editor, duplication, and an interactive prompt testing sandbox.
- **Subscription & System Reporting:** MRR metrics and latency indicators.

---

## 🚀 Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (Custom warm-neutral editorial palette)
- **Icons:** Lucide React
- **Charts:** Recharts
- **Deployment:** Netlify Ready (`netlify.toml` configured)

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Netlify Deployment

This repository is pre-configured for Netlify deployment via `netlify.toml`:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **SPA redirect:** `/* -> /index.html 200`
