Placify – College Placement Tracker

Placify is a modern, full-stack placement tracking platform designed for college students. It helps you discover opportunities, track applications, prepare for interviews, and manage your placement journey — all in one place.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)

---

## ✨ Features

### 🏠 Landing Page
- Animated hero section with call-to-action
- Value propositions & how-it-works walkthrough
- Responsive navbar with smooth scroll

### 🔐 Authentication
- **Google Sign-In** via Firebase Authentication
- Email & password login/signup
- Persistent sessions using `browserLocalPersistence`
- Protected dashboard routes with `AuthGuard`

### 📝 Gamified Onboarding
- Multi-step onboarding wizard (Personal → Academic → Skills & Resume)
- Progress saved to both localStorage and Firestore
- Skip-friendly with smart defaults

### 📊 Dashboard
- **Overview** – Stats cards (applications, interviews, offers, success rate), recent activity, and opportunity matches
- **Opportunities** – Browse company listings with match percentages, deadlines, filters, and one-click "Apply Now"
- **Profile** – View and edit personal details, academic info, skills, resume link, and achievements
- **Checklist** – Track DSA problems, aptitude questions, and mock interviews with increment-based logging and animated progress bars
- **Notifications** – Smart, context-aware notifications generated from real data (deadlines, profile gaps, milestones, application updates)
- **Settings** – Notification preferences, change password (with re-authentication), export data as JSON, sign out, and delete account

### 🔄 Real-Time Data Sync
- Dual-storage architecture: **localStorage** (instant UI) + **Cloud Firestore** (persistent sync)
- All hooks follow the same pattern — optimistic local writes with background Firestore sync

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + custom warm palette (Silk, Marble, Champagne, Pearl, Velvet, Onyx) |
| **Components** | [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation |
| **Auth** | [Firebase Authentication](https://firebase.google.com/products/auth) (Google + Email/Password) |
| **Database** | [Cloud Firestore](https://firebase.google.com/products/firestore) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Package Manager** | [pnpm](https://pnpm.io/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
placify-frontend-build/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout (fonts, theme, toaster)
│   ├── globals.css               # Global styles & CSS variables
│   ├── auth/
│   │   ├── layout.tsx            # Auth layout
│   │   ├── login/page.tsx        # Login page
│   │   └── signup/page.tsx       # Signup page
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard layout (AuthGuard + Shell)
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── checklist/page.tsx    # Preparation checklist
│   │   ├── notifications/page.tsx# Smart notifications
│   │   ├── opportunities/page.tsx# Browse & apply to companies
│   │   ├── profile/page.tsx      # User profile & achievements
│   │   └── settings/page.tsx     # Account settings
│   └── onboarding/
│       └── page.tsx              # Multi-step onboarding wizard
├── components/
│   ├── auth/
│   │   ├── auth-form.tsx         # Login/signup form component
│   │   └── auth-guard.tsx        # Route protection wrapper
│   ├── dashboard/
│   │   ├── dashboard-shell.tsx   # Sidebar + top bar layout
│   │   ├── opportunity-card.tsx  # Company opportunity card
│   │   ├── stats-cards.tsx       # Stats overview cards
│   │   ├── filter-bar.tsx        # Opportunity filter controls
│   │   ├── match-indicator.tsx   # Skill match percentage ring
│   │   └── deadline-badge.tsx    # Countdown deadline badge
│   ├── landing/
│   │   ├── navbar.tsx            # Landing page navigation
│   │   ├── hero.tsx              # Hero section
│   │   ├── value-props.tsx       # Feature highlights
│   │   ├── how-it-works.tsx      # Step-by-step guide
│   │   ├── cta-section.tsx       # Call to action
│   │   └── footer.tsx            # Site footer
│   ├── onboarding/
│   │   ├── onboarding-wizard.tsx # Multi-step wizard controller
│   │   ├── step-personal.tsx     # Step 1: Personal info
│   │   ├── step-academic.tsx     # Step 2: Academic details
│   │   └── step-skills-resume.tsx# Step 3: Skills & resume
│   └── ui/                       # shadcn/ui component library (40+ components)
├── hooks/
│   ├── use-applications.ts       # Application tracking (Firestore-synced)
│   ├── use-auth-user.ts          # Current Firebase user state
│   ├── use-checklist.ts          # DSA/aptitude/mock progress tracking
│   ├── use-notifications.ts      # Smart notification generation
│   ├── use-settings.ts           # Notification preference persistence
│   └── use-user-profile.ts      # Full user profile (Firestore-synced)
├── lib/
│   ├── firebase.ts               # Firebase app initialization
│   ├── firestore.ts              # Firestore CRUD service layer
│   ├── mock-data.ts              # Opportunity & company seed data
│   └── utils.ts                  # Utility functions (cn, etc.)
├── public/                       # Static assets
├── styles/
│   └── globals.css               # Additional global styles
├── components.json               # shadcn/ui configuration
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind theme & custom colors
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** ≥ 9 (install via `npm install -g pnpm` or `corepack enable`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Raagini-Singh/Placify.git
cd Placify

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The app will be running at **http://localhost:3000**.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## 🔑 Firebase Configuration

The project uses Firebase for authentication and data storage. The Firebase config is in `lib/firebase.ts`. To use your own Firebase project:

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Sign-in providers → **Google** and **Email/Password**
3. Create a **Cloud Firestore** database
4. Replace the config object in `lib/firebase.ts` with your project's credentials:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### Firestore Data Model

```
users/{uid}
├── displayName: string
├── email: string
├── photoURL: string
├── phone: string
├── college: string
├── branch: string
├── year: string
├── cgpa: string
├── skills: string[]
├── resumeLink: string
├── onboardingCompleted: boolean
├── applications: { [opportunityId]: status }
├── checklist: { dsa: number, aptitude: number, mockInterview: number }
├── readNotifications: string[]
├── settings: { emailNotifications: boolean, pushNotifications: boolean }
├── createdAt: Timestamp
└── updatedAt: Timestamp
```

---

## 🌐 Deployment

The project is configured for **Vercel** deployment:

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com/)
3. Vercel auto-detects Next.js and pnpm — no extra config needed
4. Deploy 🚀

---

## 🎨 Design System

Placify uses a warm, premium color palette:

| Token | Color | Usage |
|---|---|---|
| **Silk** | `#FAF7F2` | Backgrounds |
| **Marble** | `#F0EBE3` | Cards, borders |
| **Champagne** | `#D4A574` | Primary accent |
| **Pearl** | `#E8DDD3` | Subtle highlights |
| **Velvet** | `#8B4513` | Deep accent |
| **Onyx** | `#2C1810` | Text, headings |

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Create production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint |

---

## 📄 License

This project is private and not licensed for redistribution.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Raagini-Singh">Raagini Singh</a>
</p>
