<div align="center">

# Dilemma Dynamics

Collaborative debate platform with real-time messaging and a Team Performance Heatmap that turns discussions into actionable insights.

![Hero](https://picsum.photos/seed/dilemma-hero/1200/420)

</div>

## ✨ What’s Inside

- Real-time rooms for multi‑participant debates
- Speech‑to‑text input (hands‑free debating)
- Team Performance Heatmap with quality scoring and participation intelligence
- Clean, responsive UI with dark/light themes (shadcn/ui + Tailwind)

## 🧱 Architecture

```
Next.js (App Router)
   ├─ UI (Tailwind + shadcn/ui)
   ├─ Components (game/*)
   └─ Hooks (speech recognition, toasts)

Supabase (Postgres + Realtime)
   ├─ rooms, participants, messages tables
   └─ websocket subscriptions (postgres_changes)

Analytics Engine
   ├─ Message quality & relevance scoring
   └─ Team metrics → Heatmap visualization
```

## �️ Tech Stack

- Framework: Next.js 15 (React, Turbopack)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Data & Realtime: Supabase (PostgreSQL + WebSockets)
- Charts/Visuals: Custom heatmap + Progress bars
- Voice: Web Speech API

## 🚀 Quickstart

1) Install dependencies

```bash
npm install
```

2) Environment variables (create `.env.local` in project root)

```ini
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3) Run locally

```bash
npm run dev
```

Open http://localhost:9002

### Optional: Access from other devices on your LAN

```bash
npm run dev -- -H 0.0.0.0 -p 9002
```

Then browse to: http://<your-computer-ip>:9002 on phones/tablets.

## 📦 Project Structure

```
src/
  app/                 # Next.js routes (App Router)
  components/game/     # Debate UI, team heatmap, provider
  hooks/               # Speech recognition, toasts
  lib/                 # Supabase client, rooms API, analytics engine
docs/                  # Setup guides & notes
```

## 💬 Messaging (Realtime)

- Messages are inserted into `messages` with `room_id`, `text`, `name`, `player_index`.
- All clients subscribe to `postgres_changes` on `messages` for the active room.
- On INSERT, clients refetch ordered messages → instant sync across devices.

## 📊 Team Performance Heatmap

- Scores message quality (relevance, evidence, counterpoints, questions)
- Computes participation balance (dominated / active / limited)
- Color‑coded tiles + progress bars for quick visual understanding

## 🔐 Security & Secrets

- Secrets live in `.env.local` (never commit this file)
- `.gitignore` ignores `.env*`, build artifacts, and IDE metadata
- Supabase anon key is public by design but still treat `.env.local` as sensitive

## 🧭 Deployment

- Netlify (via `netlify.toml`) or any Next.js host
- Set the same env vars in the hosting provider dashboard

## 📚 Useful Docs

- `SUPABASE_SETUP.md` – how to provision and connect Supabase
- `FIREBASE_SETUP.md` – optional voice/AI notes (if used)
- `docs/blueprint.md` – product blueprint

---

Made with ❤️ for collaborative, data‑driven debates.
