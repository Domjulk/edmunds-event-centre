# Midas Worth Event Place Website

## Build
- Keep a responsive single-page event venue website for Midas Worth Event Place, Abuja.
- Present the supplied venue category, Eden Gardens/Jabi address, Plus Code, phone number, opening hours, rating and visitor highlights; do not invent capacity or other property claims.
- Show the four supplied five-star visitor review excerpts with names and review context.
- Keep the validated event enquiry fields and prepare a WhatsApp handoff; do not claim that an enquiry is a confirmed booking or that bookings are stored.
- Retain the site's burgundy, blush, rose-gold and white palette, accessible responsive layouts, page metadata and static home-page prerender.
- Do not publish the website; the user explicitly deferred public launch.

## Technical details
- Keep the experience on the TanStack Start home route, using the existing shared UI components, Zod validation and Sonner notifications.
- Keep shared venue content in `src/lib/venue-content.ts`, page sections in `src/components/venue/`, and booking validation/tests in `src/lib/booking-validation.ts` and `src/test/`.
- Keep `public/manus-routes.json` synchronized with the file-based page routes.
