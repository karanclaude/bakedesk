# BakeDesk — AI Bakery Business Consultant

## Project Overview

BakeDesk is a PWA-first AI business consultant for bakers, cafe owners, and food entrepreneurs. Built by TruffleNation, India's leading professional baking academy.

**Stack:** Next.js 14 (App Router) + Tailwind CSS + Supabase (optional auth) + Claude API

## Commands

```bash
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Architecture

### Route Structure
- `/` — Landing page
- `/chat` — Main AI consultant chat
- `/toolkit` — Interactive business tools grid
- `/toolkit/[tool]` — Individual tool (pricing, costing, etc.)
- `/history` — Past conversations
- `/settings` — User preferences (business type, location, currency)
- `/login` — Optional Supabase auth

### Key Directories
```
src/app/api/chat/route.ts         # Claude API streaming endpoint
src/components/chat/              # ChatInterface, MessageBubble, ChatInput
src/components/toolkit/           # PricingCalculator, RecipeCosting, BreakEvenCalculator, BatchPlanner, MenuTemplate
src/components/layout/            # AppHeader, BottomNav
src/lib/knowledge/                # Knowledge base documents (appendable)
src/lib/system-prompt.ts          # Builds system prompt from knowledge base
src/lib/hooks/                    # useChat, useConversations, usePreferences
src/lib/toolkit-registry.ts       # Static registry of all toolkit tools
```

### Knowledge Base System
The AI consultant's expertise comes from modular knowledge documents in `src/lib/knowledge/`.

**Current knowledge files:**
- `foundation.ts` — Core BakeDesk persona, expertise areas, conversation style
- `pricing.ts` — Pricing strategies (4x rule India, margin targets global)
- `operations.ts` — Kitchen setup, equipment, SOPs, hiring
- `marketing.ts` — Instagram, WhatsApp, Google Business, influencer strategy
- `licensing.ts` — FSSAI (India), food safety compliance, permits
- `scaling.ts` — Home → rented kitchen → storefront → franchise path

**To add new knowledge:** Create a new `.ts` file in `src/lib/knowledge/` exporting a string, then import and append it in `src/lib/system-prompt.ts`. Update this CLAUDE.md with the new file.

### Data Layer
- **Chat:** localStorage (`bakedesk_conversations`) + optional Supabase sync
- **Preferences:** localStorage (`bakedesk_preferences`)
- **Toolkit data:** localStorage per tool (`bakedesk_toolkit_*`)
- **Auth:** Supabase (optional, graceful fallback)

### Design System
- **Primary:** #6D2E46 (burgundy)
- **Secondary:** #A26769 (mauve)
- **Accent:** #ECE2D0 (cream)
- **Background:** #FAF7F2 (warm beige)
- **Fonts:** Playfair Display (headings) + Inter (body)
- **Border radius:** 16px cards, 12px buttons, 8px inputs

### PWA
- `public/manifest.json` — App manifest (start_url: /chat)
- `public/sw.js` — Service worker (network-first with cache fallback)
- Installable on Android/iOS/Desktop

### Environment Variables
```
ANTHROPIC_API_KEY=         # Required for AI chat
NEXT_PUBLIC_SUPABASE_URL=  # Optional, for auth
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Optional, for auth
```
