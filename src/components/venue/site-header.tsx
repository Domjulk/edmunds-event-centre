import { useState } from "react";
import { Flower2, Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingDialog } from "@/components/venue/booking-dialog";
import { navigation, venue } from "@/lib/venue-content";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-3"
          aria-label={`${venue.name} home`}
        >
          <span className="flex h-10 w-10 items-center justify-center border border-rose-gold/65 text-rose-gold">
            <Flower2 size={19} strokeWidth={1.3} />
          </span>
          <span>
            <span className="block text-[13px] font-semibold tracking-[0.12em]">MIDAS WORTH</span>
            <span className="mt-0.5 block text-[10px] tracking-[0.12em] text-muted-foreground">
              Event Place · Abuja
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] transition-colors hover:text-rose-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <BookingDialog className="h-10 rounded-sm border border-border bg-transparent px-4 text-xs font-medium hover:bg-blush">
            Plan your event
          </BookingDialog>
          <Button asChild className="h-10 rounded-sm px-4 text-xs">
            <a href={`tel:${venue.phoneHref}`}>
              <Phone size={14} /> Call now
            </a>
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-border bg-background px-5 pb-5 pt-2 md:hidden"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center border-b border-border text-sm"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            <BookingDialog className="min-h-11 flex-1 rounded-sm px-3 text-xs">
              Plan your event
            </BookingDialog>
            <Button asChild className="min-h-11 flex-1 rounded-sm px-3 text-xs">
              <a href={`tel:${venue.phoneHref}`}>
                <Phone size={14} /> Call now
              </a>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
