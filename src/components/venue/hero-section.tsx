import { ArrowDown, ArrowRight, Check, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/venue/booking-dialog";
import { RatingBadge } from "@/components/venue/rating-badge";
import { venue } from "@/lib/venue-content";

export function HeroSection() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-burgundy-deep text-ivory">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_22%,oklch(0.52_0.10_12/0.55),transparent_42%),linear-gradient(120deg,oklch(0.22_0.06_12),oklch(0.31_0.07_12))]" />
      <div className="mx-auto grid min-h-[660px] max-w-[1400px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-12">
        <div className="max-w-[690px]">
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-gold-soft sm:text-xs">
            <span className="h-px w-9 bg-rose-gold" /> AN OPEN-AIR EVENT VENUE · JABI, ABUJA
          </p>
          <h1 className="mt-7 font-display text-6xl leading-[0.98] sm:text-7xl lg:text-[84px] lg:leading-[0.94]">
            Gather where the <span className="text-rose-gold-soft">garden</span> grows.
          </h1>
          <p className="mt-6 max-w-[560px] text-[15px] leading-7 text-ivory/80 sm:text-base sm:leading-8">
            Midas Worth Event Place is a grassy, open-air setting for garden-themed occasions, with
            room to celebrate and scenic spots to remember.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-ivory/90 sm:gap-x-7">
            <span className="flex items-center gap-2">
              <Check size={14} className="text-rose-gold-soft" /> Garden events
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-rose-gold-soft" /> Open, free parking
            </span>
            <span className="flex items-center gap-2">
              <Check size={14} className="text-rose-gold-soft" /> Scenic photo spots
            </span>
          </div>
          <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
            <BookingDialog className="h-12 rounded-sm bg-rose-gold-soft px-6 text-sm font-semibold text-burgundy-deep hover:bg-rose-gold-soft/90">
              Enquire about your date <ArrowRight size={16} />
            </BookingDialog>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-sm border-ivory/40 bg-card/5 px-6 text-sm text-ivory hover:bg-card/15 hover:text-ivory"
            >
              <a href="#highlights">
                Explore the venue <ArrowDown size={16} />
              </a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <RatingBadge compact className="text-ivory" />
            <a
              href={`tel:${venue.phoneHref}`}
              className="inline-flex items-center gap-2 text-xs text-ivory/80 hover:text-rose-gold-soft"
            >
              <Phone size={14} /> {venue.displayPhone}
            </a>
          </div>
        </div>
        <figure className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
          <div className="absolute -inset-3 border border-rose-gold/30" aria-hidden="true" />
          <img
            src="/images/midas-worth-garden.jpg"
            alt="Outdoor event setup on the grassy garden grounds at Midas Worth Event Place"
            width={1080}
            height={804}
            fetchPriority="high"
            className="relative aspect-[4/3] w-full object-cover"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-burgundy-deep/90 px-4 py-3 text-xs text-ivory backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-rose-gold-soft" /> Eden Gardens · Jabi, Abuja
            </span>
            <span className="hidden text-rose-gold-soft sm:inline">{venue.category}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
