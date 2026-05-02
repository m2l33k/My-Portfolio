<div align="center">

# ⚡ Malek Aziz Hassayoun — Portfolio

### Security Engineer & AI Developer

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

*A cyberpunk-themed personal portfolio with AI assistant, multilingual support, and live platform integrations.*

[🌐 Live Demo](#) · [🤖 AI Chat](#) · [📊 Activity](#) · [🐛 Report Bug](https://github.com/m2l33k/My-Portfolio/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Pages & Routes](#-pages--routes)
- [Internationalization](#-internationalization)
- [API Server](#-api-server)
- [Scripts](#-scripts)

---

## 🔍 Overview

This is a fully custom-built personal portfolio for **Malek Aziz Hassayoun**, a Software Engineering student at ESPRIT specializing in Cybersecurity, AI/ML, Blockchain Security, and DevSecOps.

The portfolio goes beyond a static page — it includes a live **AI-powered chat assistant**, a **GitHub & TryHackMe activity dashboard**, a **recruiter-focused view**, and full **EN / FR / AR (RTL)** language support.

---

## ✨ Features

### Portfolio Sections

| Section | Description |
|---|---|
| 🦸 Hero | Typewriter effect, availability badge, social links, CV download |
| 🏆 Achievements | GitHub achievement badges fetched live |
| 📜 Certifications | 15+ certs with modal details |
| 🚀 Projects | 8+ projects with tech stacks and GitHub links |
| 💼 Internships | Experience timeline with modal details |
| 🎓 Education | Degrees and coursework |
| 💡 Motivation | Personal and professional philosophy |
| 📬 Contact | EmailJS-powered contact form |

### Interactive Features

- **Command Palette** — `Ctrl/Cmd + K` for instant navigation and actions
- **Keyboard Shortcuts** — Press `?` to see all shortcuts
- **Theme Toggle** — Light / Dark mode
- **Language Toggle** — English, French, Arabic (with full RTL layout)
- **CV Download** — English and French PDF versions
- **Skills Matrix** — Interactive skill visualization modal
- **vCard Download** — Hire Me banner with contact export
- **AI Chat Assistant** — LLM-powered chat about the portfolio (GitHub Models)
- **Particles Background** — Animated tsParticles effects
- **Cookie Consent** — GDPR-compliant banner
- **Loading Screen** — Animated terminal-style intro
- **PWA Support** — Service worker for offline capability

---

## 🛠 Tech Stack

### Frontend

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 (SWC compiler) |
| Styling | Tailwind CSS 3 + shadcn/ui (Radix UI) |
| Animations | Framer Motion 12 |
| Routing | React Router DOM 6 |
| State / Data | TanStack React Query 5 |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Particles | tsParticles |
| Icons | Lucide React |
| Theming | next-themes |
| Date Utils | date-fns |

### Backend

| Category | Technology |
|---|---|
| Runtime | Node.js + Express 5 |
| AI / LLM | GitHub Models via Azure AI Inference SDK (Llama 3.3-70B) |
| Email | EmailJS |
| Analytics | Vercel Analytics + Speed Insights |

---

## 📁 Project Structure

```
My-Portfolio/
├── src/
│   ├── components/
│   │   ├── portfolio/          # 34 portfolio-specific components
│   │   └── ui/                 # 49 shadcn/ui base components
│   ├── pages/                  # Route-level page components
│   ├── data/
│   │   ├── portfolio.ts        # Main data (projects, internships, certs…)
│   │   ├── portfolio.fr.ts     # French translations
│   │   └── portfolio.ar.ts     # Arabic translations
│   ├── context/
│   │   └── LanguageContext.tsx # i18n context & hook
│   ├── hooks/                  # Custom React hooks
│   ├── test/                   # Vitest test files
│   ├── App.tsx                 # Root component & router
│   └── main.tsx                # Entry point
├── server.js                   # Express API server
├── .env.example                # Environment variable template
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/m2l33k/My-Portfolio.git
cd My-Portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your keys (see Environment Variables section)

# 4. Start the development server
npm run dev
```

The app runs at `http://localhost:5173` and the API server at `http://localhost:3001`.

---

## 🔐 Environment Variables

Create a `.env` file at the project root based on `.env.example`:

```env
# EmailJS — contact form
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_public_key

# GitHub Models — AI chat backend
GITHUB_TOKEN=your_github_token
```

> **EmailJS:** Create a free account at [emailjs.com](https://www.emailjs.com) to get your keys.
> **GitHub Token:** A classic token with no special scopes is enough to access GitHub Models.

---

## 🗺 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Welcome | Landing gate with language selector and navigation |
| `/portfolio` | Portfolio | Full portfolio — all sections |
| `/chat` | AI Chat | LLM-powered assistant about the portfolio |
| `/activity` | Activity | GitHub contributions + TryHackMe stats dashboard |
| `/volunteering` | Volunteering | Volunteering timeline |
| `/recruiter` | Recruiter View | Recruiter-optimized summary page |
| `/blog` | Blog | Write-ups (Coming Soon) |
| `*` | 404 | Not Found page |

---

## 🌍 Internationalization

The portfolio supports **3 languages** with full content translation:

| Language | Code | Direction | File |
|---|---|---|---|
| English | `en` | LTR | `portfolio.ts` (source) |
| French | `fr` | LTR | `portfolio.fr.ts` |
| Arabic | `ar` | **RTL** | `portfolio.ar.ts` |

Translations cover all data: roles, descriptions, periods, locations, project titles, education, and UI strings. The Arabic version automatically switches the entire layout to RTL.

Switch languages from the **Welcome page** or the **Navigation bar**.

---

## 🖥 API Server

`server.js` is a lightweight Express server (port `3001`) that powers dynamic features:

| Endpoint | Method | Description |
|---|---|---|
| `/api/chat` | `POST` | AI chat using GitHub Models (Llama 3.3-70B) |
| `/api/github-achievements` | `GET` | Scrapes and returns GitHub achievement badges |
| `/api/tryhackme-stats` | `GET` | Fetches live TryHackMe profile stats |

Vite proxies `/api` requests to the backend automatically during development.

---

## 📜 Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start frontend (Vite) + backend (Express) concurrently |
| `npm run build` | Production build |
| `npm run build:dev` | Development mode build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `Ctrl / Cmd + K` | Open command palette |
| `?` | Open keyboard shortcuts modal |
| `Esc` | Go home or scroll to top |
| `1` – `7` | Jump to portfolio sections |

---

<div align="center">

Built with ❤️ by **Malek Aziz Hassayoun**

[![GitHub](https://img.shields.io/badge/GitHub-m2l33k-181717?style=flat-square&logo=github)](https://github.com/m2l33k)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-malek--hassayoun-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/malek-hassayoun)
[![TryHackMe](https://img.shields.io/badge/TryHackMe-RootKeeper-212C42?style=flat-square&logo=tryhackme)](https://tryhackme.com/p/RootKeeper)

</div>
