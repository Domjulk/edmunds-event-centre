# Midas Worth Event Place, Abuja

A single-page public website for Midas Worth Event Place. The app uses **React 19, TypeScript, TanStack Start/Router, Vite, and Tailwind CSS 4**. TanStack's file-based route generator builds the route tree from `src/routes/`; `src/routes/index.tsx` composes the page sections, and the generated `src/routeTree.gen.ts` should not be edited by hand.

## Where to make changes

- **Business details, reviews, highlights, hours, map links, contact links, and SEO copy:** `src/lib/venue-content.ts`.
- **Page sections and interactions:** `src/components/venue/`. The booking/contact form is in `booking-dialog.tsx`; the header, hero, content/reviews, location, and footer each have focused components.
- **Route assembly and route-specific metadata:** `src/routes/index.tsx`.
- **Reusable UI controls:** `src/components/ui/`. Follow the existing React and Tailwind conventions and reuse these controls where appropriate.
- **Global styles and design tokens:** `src/styles.css`.
- **Booking enquiry validation:** `src/lib/booking-validation.ts`; tests are in `src/test/booking-validation.test.ts`. The form prepares a WhatsApp message; it does not store or submit bookings to a backend.
- **Static files:** `public/`. Keep `public/manus-routes.json` synchronized with the page routes; do not edit the generated route tree directly.
- **Framework configuration:** `vite.config.ts`, `tsconfig.json`, and `package.json`.

## Local development and checks

Install locked dependencies with `bun install --frozen-lockfile`, then run `bun run dev`. Use `bun run test`, `bun run lint`, and `bunx tsc --noEmit` for checks. `bun run build` prerenders the public home page into `.output/public`, which is the configured static publishing directory and must contain `index.html`.

Keep public HTML metadata descriptive, and use the real published URL for canonical metadata rather than a Preview address.
