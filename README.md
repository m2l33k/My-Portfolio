# RootKeeper Portfolio

Modern, responsive portfolio for **Hassayoun Malek Aziz** focused on cybersecurity, AI, and software engineering.

## Overview

RootKeeper is a multi-page React + TypeScript portfolio with:

- Rich homepage sections (projects, certifications, internships, education, skills, motivation)
- AI assistant page (`/chat`)
- Activity dashboard (`/activity`) with GitHub and TryHackMe integrations
- Volunteering timeline (`/volunteering`)
- Blog/Write-ups Coming Soon page (`/blog`)
- Command palette, keyboard shortcuts, theme switcher, language switcher, and floating back-to-top action

## Documentation

Project documentation is maintained in `docs/`:

- [Full Technical Handbook](./docs/README.md)
- [API Reference](./docs/API.md)
- [Changelog](./docs/CHANGELOG.md)

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui + Radix UI
- Framer Motion
- React Router
- next-themes

### Backend (Local API)

- Express
- CORS
- dotenv
- GitHub Models inference via `@azure-rest/ai-inference`

### Integrations

- EmailJS (contact form)
- GitHub APIs / public contribution sources
- TryHackMe public profile API
- Vercel Analytics + Speed Insights

## Routes

| Route | Description |
|---|---|
| `/` | Main portfolio homepage |
| `/chat` | Portfolio AI assistant |
| `/activity` | GitHub + TryHackMe activity |
| `/volunteering` | Community and leadership timeline |
| `/blog` | Blog and write-ups coming soon |

## Quick Start

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

Create `.env` in the project root:

```env
# EmailJS (frontend)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_public_key

# Local API server (chat endpoint)
GITHUB_TOKEN=your_github_models_token
```

### 3) Run development mode

```bash
npm run dev
```

This runs:

- Vite app on `http://localhost:8080`
- API server on `http://localhost:3001`

### 4) Build for production

```bash
npm run build
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start Vite + local API server concurrently |
| `npm run build` | Production build |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint source code |
| `npm test` | Run Vitest test suite |
| `npm run test:watch` | Run Vitest in watch mode |

## Keyboard UX Highlights

- `Ctrl/Cmd + K`: open command palette
- `?`: open keyboard shortcuts modal
- `Esc`: go home or scroll to top
- `1..7`: jump to key homepage sections

## Contact and CV

- Contact modal uses EmailJS with anti-spam safeguards (honeypot + client rate limit)
- CV modal supports preview and download (English/French PDFs)

## License

This repository currently has no explicit license file.
If you plan to open-source broadly, add a `LICENSE` file.
