import { ArrowRight, Camera, CarFront, Leaf, ShieldCheck, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/venue/booking-dialog";
import { RatingBadge } from "@/components/venue/rating-badge";
import { highlights, reviews } from "@/lib/venue-content";

export function HighlightsSection() {
  return (
    <section
      id="highlights"
      className="scroll-mt-20 border-b border-border bg-card"
      aria-label="Venue highlights"
    >
      <div className="mx-auto grid max-w-[1400px] gap-px bg-border sm:grid-cols-3">
        {highlights.map(({ icon: Icon, title, detail }) => (
          <article
            key={title}
            className="flex min-h-[148px] items-center gap-4 bg-card px-5 py-7 sm:px-7 lg:px-9"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-rose-gold/40 text-rose-gold">
              <Icon size={19} strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-display text-[22px] leading-tight text-foreground">{title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function VenueOverviewSection() {
  return (
    <section
      id="venue-overview"
      className="scroll-mt-20 bg-background px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs">
            <span className="h-px w-7 bg-rose-gold" /> A BREATH OF GREEN IN JABI
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[1.06] sm:text-6xl">
            A little more <span className="text-rose-gold">outdoors.</span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            Some celebrations feel right beneath the open sky. Midas Worth Event Place offers a
            quiet, grassy setting for outdoor occasions, with garden scenery and room for guests to
            enjoy the day.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Find us at Eden Gardens in Jabi, Abuja. Open, free parking and memorable photo spots
            make it easy for guests to arrive and enjoy the surroundings.
          </p>
          <a
            href="#location"
            className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-rose-gold"
          >
            Find the venue <ArrowRight size={15} />
          </a>
        </div>
        <div className="relative overflow-hidden border border-border bg-blush p-7 sm:p-10">
          <div
            className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-rose-gold/25"
            aria-hidden="true"
          />
          <div
            className="absolute -right-2 -top-2 h-32 w-32 rounded-full border border-rose-gold/25"
            aria-hidden="true"
          />
          <div className="relative grid gap-5 sm:grid-cols-2">
            <article className="min-h-[165px] border border-rose-gold/30 bg-background/75 p-5">
              <Leaf size={22} className="text-rose-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-2xl">On the grass</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                A quiet green setting for open-air celebrations.
              </p>
            </article>
            <article className="min-h-[165px] border border-rose-gold/30 bg-background/75 p-5">
              <Camera size={22} className="text-rose-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-2xl">Photo-ready views</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Scenic spots to capture the moments that matter.
              </p>
            </article>
            <article className="min-h-[165px] border border-rose-gold/30 bg-background/75 p-5 sm:col-span-2">
              <CarFront size={22} className="text-rose-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-2xl">A warm arrival</h3>
              <p className="mt-2 max-w-[420px] text-xs leading-5 text-muted-foreground">
                Open and free parking space is available for guests visiting the venue.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EnquiryBand() {
  return (
    <section className="relative isolate overflow-hidden bg-burgundy-deep px-5 py-16 text-ivory sm:px-8 lg:px-12">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_50%,oklch(0.48_0.09_12/0.5),transparent_50%)]" />
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-[650px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-gold-soft">
            MAKE IT YOUR OCCASION
          </p>
          <p className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
            Let the garden set the scene.
          </p>
          <p className="mt-3 text-sm leading-6 text-ivory/75">
            Tell us what you are planning and speak with the Midas Worth team about your date.
          </p>
        </div>
        <Sparkles
          className="hidden shrink-0 text-rose-gold-soft sm:block"
          size={62}
          strokeWidth={1}
          aria-hidden="true"
        />
        <BookingDialog className="h-12 rounded-sm bg-rose-gold-soft px-6 text-sm font-semibold text-burgundy-deep hover:bg-rose-gold-soft/90">
          Start an enquiry <ArrowRight size={16} />
        </BookingDialog>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-card px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs">
              <span className="h-px w-7 bg-rose-gold" /> WORDS FROM VISITORS
            </p>
            <h2 className="mt-5 font-display text-5xl text-foreground sm:text-6xl">
              Guests remember.
            </h2>
          </div>
          <RatingBadge className="w-fit border border-border px-5 py-4 text-foreground" />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="flex min-h-[250px] flex-col border border-border bg-background p-6 sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex gap-0.5 text-rose-gold" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      size={13}
                      fill="currentColor"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  ))}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground">
                  Visitor review
                </span>
              </div>
              <p className="mt-6 flex-1 font-display text-[27px] leading-[1.35] text-foreground sm:text-[30px]">
                “{review.quote}”
              </p>
              <div className="mt-6 flex items-start gap-3 border-t border-border pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-blush text-sm font-semibold text-primary">
                  {review.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold">{review.name}</span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    {review.context}
                  </span>
                </span>
                <ShieldCheck
                  size={14}
                  className="ml-auto shrink-0 text-rose-gold"
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>
        <div className="sr-only">
          <Button asChild variant="link">
            <a href="#location">Visit the venue</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
