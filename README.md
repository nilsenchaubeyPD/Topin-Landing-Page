# Topin landing page (V2 flow)

Corporate-only landing page for topin.tech. Next.js 14 (App Router, TS strict), Tailwind 3, Framer Motion 11, Lenis, Radix (Dialog, Tabs), Zod + React Hook Form, Vercel Analytics + `dataLayer`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

- `content/*.ts` is the single source of copy (hero, how, features, testimonials, comparison, closing, faq, footer, nav) plus `flags.ts`.
- `components/sections/*` are the page sections in order: Nav, Hero, TrustBand, HowItWorks, Features, Testimonials, Comparison, ClosingCTA, FAQ, Footer. Each is self-contained for the Framer rebuild.
- `components/features/*` are the six bento cards with their live UI mocks.
- `components/ui/*` are shared primitives (Button, Pill, Eyebrow, Photo, Reveal, CountUp, VideoDialog, Accordion, Logo, StartModal, Toast).
- `lib/analytics.ts` (events + UTM/referrer), `lib/motion.ts` (easing, Lenis, reveal variants), `lib/useLoop.ts` (pauses loops off-screen / hidden tab).
- `/start` page + modal (any "Try for Free"), `/api/start` stub (validates, logs, 200), `/demo` (redirect or embed via env).

## Placeholders to replace

| What | How |
|---|---|
| 5 photos | Drop `hero`, `video-poster`, `proctoring`, `devices`, `closing` (`.webp` preferred, `.jpg` works) into `public/images/` and rebuild. Slots show a gradient until then. |
| 8 customer logos | Add files, list them in `LOGOS` in `components/sections/TrustBand.tsx`, set `flags.logos = true`. |
| Video | Set `NEXT_PUBLIC_VIDEO_URL` (mp4 or YouTube/Vimeo/Loom embed). Empty shows a "Video coming soon" toast. |
| Book a Demo | Set `NEXT_PUBLIC_DEMO_URL`. Add `NEXT_PUBLIC_DEMO_EMBED=true` to embed instead of redirect. |
| Support email | `links.supportEmail` in `content/flags.ts`. |
| Resources / legal links | `content/footer.ts` (currently `#`). |
| Testimonials | Add 2+ approved quotes to `content/testimonials.ts` and set `flags.testimonials = true`. |
| `/start` backend | Replace the stub in `app/api/start/route.ts`. |

## Flags (`content/flags.ts`)

`logos`, `testimonials`, `video` (auto from env), `unverifiedProctoring`, `jdPlainTextVoice`, `stickyNavHideOnScroll`, `comparisonCta`, `closingProductTour`, `heroDotGrid`. The two unverified product claims stay off until the product team confirms.
