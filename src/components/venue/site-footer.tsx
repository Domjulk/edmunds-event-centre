import { Flower2, MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigation, venue, whatsappUrl } from "@/lib/venue-content";

export function SiteFooter() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 bg-burgundy-deep px-5 pb-28 pt-12 text-ivory sm:px-8 sm:pb-12 lg:px-12"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 sm:grid-cols-[1.2fr_1fr_0.8fr] sm:gap-8">
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-3"
              aria-label={`${venue.name} home`}
            >
              <span className="flex h-10 w-10 items-center justify-center border border-rose-gold-soft/70 text-rose-gold-soft">
                <Flower2 size={18} strokeWidth={1.3} />
              </span>
              <span>
                <span className="block text-sm font-semibold tracking-[0.13em]">MIDAS WORTH</span>
                <span className="mt-0.5 block text-[10px] text-ivory/60">Event Place · Abuja</span>
              </span>
            </a>
            <p className="mt-4 max-w-[320px] text-xs leading-6 text-ivory/65">
              A grassy, open-air venue for garden-themed events in Jabi, Abuja.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-rose-gold-soft">
              EXPLORE
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {navigation.slice(0, 4).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit text-xs text-ivory/80 transition-colors hover:text-rose-gold-soft"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-rose-gold-soft">
              CONTACT THE VENUE
            </p>
            <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-ivory/85">
              <MapPin size={14} className="mt-0.5 shrink-0 text-rose-gold-soft" /> {venue.address}
            </p>
            <a
              href={`tel:${venue.phoneHref}`}
              className="mt-3 inline-flex items-center gap-2 text-xs text-ivory/85"
            >
              <Phone size={14} className="text-rose-gold-soft" /> {venue.displayPhone}
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-fit items-center gap-2 text-xs text-ivory/85"
            >
              <MessageCircle size={14} className="text-rose-gold-soft" /> WhatsApp our team
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-ivory/15 pt-5 text-[10px] text-ivory/55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {venue.name}. Jabi, Abuja.
          </span>
          <span>
            {venue.category} · {venue.plusCode}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function MobileContactBar() {
  return (
    <aside
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_var(--color-foreground)/8] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <Button asChild className="h-11 rounded-sm text-sm">
          <a href={`tel:${venue.phoneHref}`}>
            <Phone size={16} /> Call now
          </a>
        </Button>
        <Button
          asChild
          className="h-11 rounded-sm bg-whatsapp text-sm text-ivory hover:bg-whatsapp/90"
        >
          <a href={whatsappUrl()} target="_blank" rel="noreferrer">
            <MessageCircle size={16} /> WhatsApp
          </a>
        </Button>
      </div>
    </aside>
  );
}
