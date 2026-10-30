import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mapQuery, mapUrl, openingHours, venue } from "@/lib/venue-content";

export function LocationSection() {
  return (
    <section
      id="location"
      className="scroll-mt-20 bg-background px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs">
              <span className="h-px w-7 bg-rose-gold" /> FIND YOUR WAY TO US
            </p>
            <h2 className="mt-5 font-display text-5xl leading-tight text-foreground sm:text-6xl">
              See you in <span className="text-rose-gold">Jabi.</span>
            </h2>
            <p className="mt-6 flex max-w-[460px] gap-3 text-sm leading-6 text-muted-foreground">
              <MapPin size={18} className="mt-0.5 shrink-0 text-rose-gold" />
              {venue.address}.
            </p>
            <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin size={17} className="shrink-0 text-rose-gold" /> Plus Code: {venue.plusCode}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-sm px-5 text-xs">
                <a href={mapUrl} target="_blank" rel="noreferrer">
                  Get directions <ArrowUpRight size={15} />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-sm px-5 text-xs">
                <a href={`tel:${venue.phoneHref}`}>
                  <Phone size={14} /> {venue.displayPhone}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative min-h-[330px] overflow-hidden border border-border bg-blush sm:min-h-[410px]">
            <iframe
              title={`Map showing ${venue.name} in Jabi, Abuja`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
            />
            <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-center sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto flex max-w-full items-center gap-3 border border-border bg-card/95 px-4 py-3 shadow-lg"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-blush text-primary">
                  <MapPin size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-foreground">{venue.name}</span>
                  <span className="mt-1 block text-[10px] text-muted-foreground">
                    Eden Gardens · Jabi, Abuja
                  </span>
                </span>
                <ArrowUpRight size={16} className="shrink-0 text-rose-gold" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-rose-gold sm:text-xs">
              <Clock3 size={15} /> OPENING HOURS
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Open every day except Sunday.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            {openingHours.map(({ day, hours }) => (
              <div
                key={day}
                className="flex items-center justify-between gap-4 border-b border-border py-3 text-xs"
              >
                <dt className="font-medium">{day}</dt>
                <dd className={hours === "Closed" ? "text-rose-gold" : "text-muted-foreground"}>
                  {hours}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
