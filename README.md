# LearnLingo

A web application for finding and booking language tutors online. Users can
browse a filterable catalog of teachers, view detailed profiles with reviews,
save favorites, and request trial lessons.

## About the project

Built as a training project (pet-project) based on a provided technical
specification and Figma design. The app has three pages:

- **Home** — company benefits and a call-to-action leading to the catalog.
- **Teachers** — filterable list of tutors (language, level, price) with
  infinite "Load more" pagination sourced from Firebase Realtime Database.
- **Favorites** — a private page (visible only to authenticated users)
  listing the teachers the user has bookmarked.

## Features

- Firebase Authentication: registration, login, logout, persisted session
- Realtime Database used both for the teacher catalog and per-user favorites
- Favorites persist across page reloads for the same authenticated user
- Unauthenticated users see a toast notification instead of the favorites
  action
- Expandable teacher cards ("Read more") revealing full bio and reviews
- "Book trial lesson" modal with `react-hook-form` + `yup` validation
- Registration / login modal with `react-hook-form` + `yup` validation
- Modals close on backdrop click, the close (x) button, or the Escape key
- Routing via `react-router-dom`
- Fully responsive layout: desktop, tablet, and mobile breakpoints
- Hover states across cards, buttons, links, and form controls

## Tech Stack

- React 19 + Vite
- React Router
- Firebase (Authentication + Realtime Database)
- React Hook Form + Yup
- React Toastify
- CSS Modules

## Design

Figma mockup provided by the mentor/task author. UI implemented as a close,
professional reinterpretation of the source design across breakpoints.

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Authentication (Email/Password) and Realtime
  Database enabled

### Installation

```bash
git clone <your-repo-url>
cd learnlingo
npm install
```

### Environment variables

Copy `.env.example` to `.env.local` and fill in your Firebase project config
(Project settings -> General -> Your apps -> SDK setup and configuration):

```bash
cp .env.example .env.local
```

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Seed the database

See [firebase-seed/README.md](./firebase-seed/README.md) for two ways to
import `firebase-seed/teachers.json` into Realtime Database.

### Run locally

```bash
npm run dev
```

### Available scripts

| Command            | Description                   |
| ------------------- | ------------------------------ |
| `npm run dev`      | Start the development server  |
| `npm run build`    | Create a production build     |
| `npm run preview`  | Preview the production build  |

## Deployment

Deployed to Netlify / Vercel / GitHub Pages (update this line with your live
link once deployed).

## Technical Specification

This project was built to satisfy a full technical specification covering
authentication, filtering, favorites persistence, booking modal validation,
and responsive semantic markup.

## License

This project is licensed under the MIT License.
