<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Keep the Midas Worth single-page experience on the existing home route (`src/routes/index.tsx`). Business copy, reviews, opening hours and contact details live in `src/lib/venue-content.ts`; page sections live in `src/components/venue/`.
- Keep booking rules in `src/lib/booking-validation.ts` with colocated tests in `src/test/booking-validation.test.ts`. Do not invent a guest-capacity limit or other venue claims that have not been supplied.
