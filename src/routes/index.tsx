import { useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown, ArrowRight, ArrowUpRight, CalendarCheck2, CarFront, Check, Clock3,
  DoorOpen, Flower2, MapPin, Menu, MessageCircle, Mic2, Music2, Phone, ShieldCheck,
  Snowflake, Sparkles, Star, Wind, X, Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { bookingSchema, eventTypes, type BookingInput } from "@/lib/edmunds-booking-validation";
import celebration from "@/assets/edmunds-venue-celebration.asset.json";
import intimateVenue from "@/assets/edmunds-event-details.asset.json";
import grandMarquee from "@/assets/edmunds-grand-marquee.jpg";

const phone = "+2349087487034";
const whatsapp = `https://wa.me/${phone.slice(1)}`;

export const Route = createFileRoute("/")({
  component: EdmundsHome,
  head: () => ({
    meta: [
      { title: "Edmunds Event Centre | Luxury Event Venue in Wuse 2, Abuja" },
      { name: "description", content: "Discover Edmunds Event Centre, Wuse 2, Abuja: a 2,000-guest marquee with air conditioning, VIP suites and dedicated parking. Book your inspection." },
      { property: "og:title", content: "Edmunds Event Centre | Abuja's Premier Grand Event Venue" },
      { property: "og:description", content: "A spectacular 2,000-guest venue in the heart of Wuse 2, Abuja. Enquire about your event dates." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navigation = [
  { label: "Venue specs", href: "#venue-specs" },
  { label: "Amenities", href: "#amenities" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

const benefits = [
  { icon: Snowflake, title: "Room to celebrate.", detail: "2,000 guest capacity" },
  { icon: Wind, title: "Comfort, considered.", detail: "Full commercial A/C" },
  { icon: Zap, title: "Celebrations uninterrupted.", detail: "Standby soundproof generators" },
  { icon: CarFront, title: "Every arrival made easy.", detail: "Secure car park + VIP area" },
];

const amenities = [
  { icon: DoorOpen, category: "01 — THE MARQUEE", name: "A grand canvas", description: "Soaring ceilings and expansive, pillar-free floor space, reimagined for an intimate banquet or an unforgettable grand celebration." },
  { icon: Snowflake, category: "02 — CLIMATE CONTROL", name: "Comfort, without compromise", description: "High-capacity commercial 5HP standing air conditioners keep every corner cool, even as the celebration fills the room." },
  { icon: Sparkles, category: "03 — YOUR PRIVATE MOMENT", name: "Suites reserved for you", description: "Private, beautifully appointed dressing rooms and holding lounges give wedding parties and VIP guests space to exhale." },
  { icon: Check, category: "04 — EVERY LAST DETAIL", name: "A better kind of amenity", description: "Thoughtful, spacious multi-stall executive restrooms, maintained to the standard your guests deserve." },
  { icon: Music2, category: "05 — THE FINER LOGISTICS", name: "Space behind the scenes", description: "Dedicated catering preparation bays and a separate vendor service access keep the occasion effortless from first arrival." },
];

const reviews = [
  { name: "Nathaniel Sam-Sele", tag: "Google review", quote: "This is the largest event venue I have seen so far in Abuja. Its amazing to get this much space in the heart of Abuja." },
  { name: "Verified Guest", tag: "Google review", quote: "Clean environment with lots of parking space, VIP parking by the side, and the cooling systems work perfectly." },
];

function BookingDialog({ className = "", children }: { className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingInput, string>>>({});
  const today = new Date().toISOString().slice(0, 10);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = bookingSchema.safeParse({
      fullName: form.get("fullName"),
      phoneNumber: form.get("phoneNumber"),
      eventType: form.get("eventType"),
      expectedGuests: form.get("expectedGuests"),
      preferredDate: form.get("preferredDate"),
    });
    if (!result.success) {
      const nextErrors: Partial<Record<keyof BookingInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof BookingInput;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      toast.error("Please check the highlighted details.");
      return;
    }
    const booking = result.data;
    toast.success("Your inspection enquiry is ready.", {
      description: `Call or WhatsApp ${phone} to confirm ${booking.eventType.toLowerCase()} availability.`,
      action: { label: "WhatsApp", onClick: () => window.open(whatsapp, "_blank", "noopener,noreferrer") },
    });
    event.currentTarget.reset();
    setErrors({});
    setOpen(false);
  }

  function fieldError(field: keyof BookingInput) {
    return errors[field] ? <p id={`${field}-error`} className="mt-1.5 text-xs text-destructive" role="alert">{errors[field]}</p> : null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] max-w-xl overflow-y-auto rounded-sm border-border bg-background p-6 sm:p-8">
        <DialogHeader className="pr-8 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-gold">A date worth celebrating</p>
          <DialogTitle className="mt-2 font-display text-4xl text-foreground">Come see for yourself.</DialogTitle>
          <DialogDescription>Tell us a little about your plans and we’ll help you take the next step.</DialogDescription>
        </DialogHeader>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="booking-fullName" className="mb-1.5 block text-sm font-medium">Full name</label>
            <Input id="booking-fullName" name="fullName" autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "fullName-error" : undefined} onChange={() => setErrors((existing) => ({ ...existing, fullName: undefined }))} />
            {fieldError("fullName")}
          </div>
          <div>
            <label htmlFor="booking-phoneNumber" className="mb-1.5 block text-sm font-medium">Phone number</label>
            <Input id="booking-phoneNumber" name="phoneNumber" type="tel" autoComplete="tel" maxLength={24} placeholder="+234 800 000 0000" aria-invalid={Boolean(errors.phoneNumber)} aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined} onChange={() => setErrors((existing) => ({ ...existing, phoneNumber: undefined }))} />
            {fieldError("phoneNumber")}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-eventType" className="mb-1.5 block text-sm font-medium">Event type</label>
              <select id="booking-eventType" name="eventType" defaultValue="" aria-invalid={Boolean(errors.eventType)} aria-describedby={errors.eventType ? "eventType-error" : undefined} onChange={() => setErrors((existing) => ({ ...existing, eventType: undefined }))} className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="" disabled>Select an occasion</option>
                {eventTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
              {fieldError("eventType")}
            </div>
            <div>
              <label htmlFor="booking-expectedGuests" className="mb-1.5 block text-sm font-medium">Expected guests</label>
              <Input id="booking-expectedGuests" name="expectedGuests" type="number" min={1} max={2000} step={1} inputMode="numeric" placeholder="250" aria-invalid={Boolean(errors.expectedGuests)} aria-describedby={errors.expectedGuests ? "expectedGuests-error" : undefined} onChange={() => setErrors((existing) => ({ ...existing, expectedGuests: undefined }))} />
              {fieldError("expectedGuests")}
            </div>
          </div>
          <div>
            <label htmlFor="booking-preferredDate" className="mb-1.5 block text-sm font-medium">Preferred date</label>
            <Input id="booking-preferredDate" name="preferredDate" type="date" min={today} aria-invalid={Boolean(errors.preferredDate)} aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined} onChange={() => setErrors((existing) => ({ ...existing, preferredDate: undefined }))} />
            {fieldError("preferredDate")}
          </div>
          <Button type="submit" className="h-12 w-full rounded-sm bg-primary text-primary-foreground">Request an inspection <ArrowRight className="h-4 w-4" /></Button>
          <p className="text-center text-xs leading-relaxed text-muted-foreground">This enquiry doesn’t secure a booking. Call us on <a href={`tel:${phone}`} className="font-medium text-foreground underline underline-offset-2">+234 908 748 7034</a> to confirm your date.</p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EdmundsHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-x-clip bg-background pb-16 text-foreground md:pb-0">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" className="group flex shrink-0 items-center gap-3" aria-label="Edmunds Event Centre home">
            <span className="flex h-10 w-10 items-center justify-center border border-rose-gold/65 text-rose-gold"><Flower2 size={19} strokeWidth={1.3} /></span>
            <span><span className="block text-[15px] font-semibold tracking-[0.18em]">EDMUNDS</span><span className="mt-0.5 block text-[10px] tracking-[0.12em] text-muted-foreground">Event Centre · Abuja</span></span>
          </a>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {navigation.map((item) => <a key={item.href} href={item.href} className="text-[13px] transition-colors hover:text-rose-gold">{item.label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <BookingDialog className="h-10 rounded-sm border border-border bg-transparent px-4 text-xs font-medium hover:bg-blush">Book an inspection</BookingDialog>
            <Button asChild className="h-10 rounded-sm px-4 text-xs"><a href={`tel:${phone}`}><Phone size={14} /> Call now</a></Button>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        {menuOpen && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-5 pb-5 pt-2 md:hidden">
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center border-b border-border text-sm">{item.label}</a>)}
          <div className="mt-4 flex gap-3"><BookingDialog className="min-h-11 flex-1 rounded-sm px-3 text-xs">Book an inspection</BookingDialog><Button asChild className="min-h-11 flex-1 rounded-sm px-3 text-xs"><a href={`tel:${phone}`}><Phone size={14} /> Call now</a></Button></div>
        </nav>}
      </header>

      <section id="home" className="relative isolate min-h-[690px] overflow-hidden bg-burgundy-deep text-white sm:min-h-[740px] lg:min-h-[790px]">
        <img src={grandMarquee} alt="A beautifully dressed marquee ready to welcome a grand celebration" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-burgundy-deep/80" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-burgundy-deep/95 via-burgundy-deep/80 to-burgundy-deep/25" />
        <div className="mx-auto flex min-h-[690px] max-w-[1400px] items-center px-5 pb-14 pt-16 sm:min-h-[740px] sm:px-8 lg:min-h-[790px] lg:px-12 lg:pb-16">
          <div className="max-w-[720px]">
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#e0b9ad] sm:text-xs"><span className="h-px w-9 bg-[#c69588]" /> A WUSE 2 ORIGINAL · ABUJA, NIGERIA</p>
            <h1 className="mt-7 max-w-[680px] font-display text-6xl leading-[0.98] sm:text-7xl lg:text-[94px] lg:leading-[0.94]">Abuja’s premier<br />grand event venue<span className="text-[#dbafa2]">.</span></h1>
            <p className="mt-6 max-w-[550px] text-[15px] leading-7 text-white/80 sm:text-base sm:leading-8">Experience unmatched space, luxury ambience, and world-class hospitality in the heart of Wuse 2 — made for grand weddings, banquets, and corporate conferences.</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs text-white/90 sm:gap-x-7">
              <span className="flex items-center gap-2"><Check size={14} className="text-[#e0b9ad]" />2,000 capacity marquee</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-[#e0b9ad]" />Full climate control</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-[#e0b9ad]" />Dedicated VIP parking</span>
            </div>
            <div className="mt-9 flex flex-col gap-3 min-[420px]:flex-row">
              <BookingDialog className="h-12 rounded-sm bg-[#dbb7a9] px-6 text-sm font-semibold text-burgundy-deep hover:bg-[#e9cabd]">Inquire about dates <ArrowRight size={16} /></BookingDialog>
              <Button asChild variant="outline" className="h-12 rounded-sm border-white/40 bg-white/5 px-6 text-sm text-white hover:bg-white/15 hover:text-white"><a href="#venue-specs">Explore the venue <ArrowDown size={16} /></a></Button>
            </div>
            <a href="#venue-specs" aria-label="Explore the venue" className="mt-12 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.19em] text-white/65"><span className="h-px w-9 bg-white/40" /> THE ART OF A GRAND OCCASION</a>
          </div>
        </div>
        <div className="absolute bottom-9 right-10 hidden items-center gap-3 text-xs text-white/75 lg:flex"><MapPin size={15} className="text-[#dbb7a9]" /> WUSE 2, ABUJA <span className="ml-2 h-px w-10 bg-white/50" /></div>
      </section>

      <section id="venue-specs" className="scroll-mt-20 border-b border-border bg-white" aria-label="Venue highlights">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, detail }) => <article key={title} className="flex min-h-[138px] items-center gap-4 bg-white px-5 py-7 sm:px-7 lg:px-8"><span className="flex h-11 w-11 shrink-0 items-center justify-center border border-rose-gold/40 text-rose-gold"><Icon size={19} strokeWidth={1.6} /></span><div><p className="font-display text-[20px] leading-tight text-foreground">{title}</p><p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{detail}</p></div></article>)}
        </div>
      </section>

      <section className="bg-background px-5 py-20 sm:px-8 sm:py-28 lg:px-12" aria-label="About Edmunds Event Centre">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1fr_0.94fr] lg:gap-20">
          <div className="relative min-h-[370px] overflow-hidden sm:min-h-[470px]">
            <img src={celebration.url} alt="Warmly illuminated reception tables ready for an evening celebration" width={1200} height={775} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 bg-white/95 px-5 py-4 sm:bottom-7 sm:left-7"><p className="font-display text-3xl leading-none text-foreground">2,000</p><p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">reasons to celebrate</p></div>
          </div>
          <div className="max-w-[490px]"><p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs"><span className="h-px w-7 bg-rose-gold" /> MORE ROOM FOR WHAT MATTERS</p><h2 className="mt-5 font-display text-5xl leading-[1.06] sm:text-6xl">A setting worthy of your <span className="text-rose-gold">moment.</span></h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Some occasions deserve more than a venue. At Edmunds, exceptional scale meets the quieter details: an uninterrupted dance floor, a private moment before the doors open, and a welcoming arrival for every guest.</p><p className="mt-4 text-sm leading-7 text-muted-foreground">Set in the heart of Wuse 2, our grand marquee brings the room, the comfort, and the people you need together — ready for the occasion you have imagined.</p><div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-6"><div><p className="font-display text-3xl text-foreground">01</p><p className="mt-1 text-xs text-muted-foreground">A central Abuja address</p></div><div><p className="font-display text-3xl text-foreground">∞</p><p className="mt-1 text-xs text-muted-foreground">Space to make it yours</p></div></div><a href="#amenities" className="mt-7 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] transition-colors hover:text-rose-gold">Discover what’s included <ArrowRight size={15} /></a></div>
        </div>
      </section>

      <section id="amenities" className="scroll-mt-20 bg-blush px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1200px]"><div className="max-w-[560px]"><p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs"><span className="h-px w-7 bg-rose-gold" /> THE DETAILS THAT MAKE THE DAY</p><h2 className="mt-5 font-display text-5xl leading-[1.04] text-foreground sm:text-6xl">Everything in its <span className="text-rose-gold">right place.</span></h2><p className="mt-4 max-w-[440px] text-sm leading-7 text-muted-foreground">A thoughtful collection of spaces and services, designed around the way great occasions come together.</p></div><div className="mt-12 border-y border-rose-gold/25 sm:mt-16">{amenities.map(({ icon: Icon, category, name, description }, index) => <article key={category} className="grid gap-4 border-b border-rose-gold/20 py-7 last:border-b-0 sm:grid-cols-[58px_1fr_1.25fr_28px] sm:items-center sm:gap-6 sm:py-8"><span className="flex h-11 w-11 items-center justify-center border border-rose-gold/50 text-rose-gold"><Icon size={19} strokeWidth={1.5} /></span><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-rose-gold">{category}</p><h3 className="mt-2 font-display text-[26px] leading-tight text-foreground">{name}</h3></div><p className="max-w-[490px] text-[13px] leading-6 text-muted-foreground">{description}</p><span className="hidden text-xs text-rose-gold sm:block">0{index + 1}</span></article>)}</div></div>
      </section>

      <section className="relative isolate overflow-hidden bg-burgundy-deep px-5 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between"><div className="max-w-[640px]"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dbb7a9]">SPACE FOR EVERY ARRIVAL</p><p className="mt-3 font-display text-4xl leading-tight sm:text-5xl">The welcome starts before the doors.</p><p className="mt-3 text-sm leading-6 text-white/75">Secure car parking for your guests, with a dedicated VIP area for your most important arrivals.</p></div><CarFront className="hidden shrink-0 text-[#dbb7a9] sm:block" size={65} strokeWidth={1} /></div>
      </section>

      <section id="reviews" className="scroll-mt-20 bg-white px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1200px]"><div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><div><p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs"><span className="h-px w-7 bg-rose-gold" /> WORDS FROM THE OCCASION</p><h2 className="mt-5 font-display text-5xl text-foreground sm:text-6xl">Guests remember.</h2></div><div className="flex w-fit items-center gap-4 border border-border px-5 py-4"><div className="flex gap-0.5 text-rose-gold" aria-label="4.5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" strokeWidth={1} className={index === 4 ? "opacity-55" : ""} />)}</div><span className="h-9 w-px bg-border" /><div><p className="text-sm font-semibold">4.5 / 5</p><p className="mt-0.5 text-[10px] text-muted-foreground">Google reviews</p></div></div></div><div className="mt-10 grid gap-5 md:grid-cols-2">{reviews.map((review) => <article key={review.name} className="flex min-h-[245px] flex-col border border-border bg-background p-6 sm:min-h-[265px] sm:p-8"><div className="flex items-center justify-between"><span className="flex gap-0.5 text-rose-gold" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill="currentColor" strokeWidth={1} />)}</span><span className="text-[10px] font-medium text-muted-foreground">{review.tag}</span></div><p className="mt-6 flex-1 font-display text-[27px] leading-[1.35] text-foreground sm:text-[30px]">“{review.quote}”</p><div className="mt-6 flex items-center gap-3 border-t border-border pt-4"><span className="flex h-9 w-9 items-center justify-center bg-blush text-sm font-semibold text-primary">{review.name.charAt(0)}</span><span className="text-xs font-semibold">{review.name}</span><ShieldCheck size={14} className="text-rose-gold" /><span className="text-[10px] text-muted-foreground">Guest experience</span></div></article>)}</div></div>
      </section>

      <section className="bg-blush px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs"><span className="h-px w-7 bg-rose-gold" /> MADE FOR THE OCCASION</p><h2 className="mt-5 font-display text-5xl leading-[1.04] text-foreground sm:text-6xl">A day this special starts here.</h2><p className="mt-4 max-w-[390px] text-sm leading-7 text-muted-foreground">Come take in the space, picture your occasion, and meet the team ready to welcome you.</p><div className="mt-7 flex items-center gap-3 text-xs text-muted-foreground"><CalendarCheck2 size={17} className="text-rose-gold" /> Private inspections by enquiry</div></div><div className="relative min-h-[360px] overflow-hidden sm:min-h-[470px]"><img src={intimateVenue.url} alt="Details of a dressed reception space ready to welcome your guests" width={1000} height={667} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /></div></div>
        <div className="mx-auto mt-10 max-w-[1200px] border-t border-rose-gold/30 pt-8 sm:mt-14 sm:flex sm:items-center sm:justify-between"><p className="font-display text-3xl text-foreground">Let’s find your date.</p><BookingDialog className="mt-5 h-12 w-full rounded-sm px-6 sm:mt-0 sm:w-auto">Book an inspection <ArrowRight size={15} /></BookingDialog></div>
      </section>

      <section id="location" className="scroll-mt-20 bg-background px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1200px]"><div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"><div><p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.19em] text-rose-gold sm:text-xs"><span className="h-px w-7 bg-rose-gold" /> FIND YOUR WAY TO US</p><h2 className="mt-5 font-display text-5xl leading-tight text-foreground sm:text-6xl">Right in the<br />heart of <span className="text-rose-gold">Wuse 2.</span></h2><p className="mt-6 flex max-w-[420px] gap-3 text-sm leading-6 text-muted-foreground"><MapPin size={18} className="mt-0.5 shrink-0 text-rose-gold" />80 Aminu Kano Crescent, opposite Hyde Filling Station, near Dabras Hotel, Wuse 2, Abuja.</p><div className="mt-7 flex flex-wrap gap-3"><Button asChild className="h-11 rounded-sm px-5 text-xs"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Edmunds Event Centre, 80 Aminu Kano Crescent, Wuse 2, Abuja")}`} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a></Button><Button asChild variant="outline" className="h-11 rounded-sm px-5 text-xs"><a href={`tel:${phone}`}><Phone size={14} /> +234 908 748 7034</a></Button></div></div><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Edmunds Event Centre, 80 Aminu Kano Crescent, Wuse 2, Abuja")}`} target="_blank" rel="noreferrer" aria-label="View Edmunds Event Centre in Google Maps" className="group relative min-h-[330px] overflow-hidden border border-border bg-blush sm:min-h-[410px]"><img src={intimateVenue.url} alt="Visit Edmunds Event Centre in Wuse 2, Abuja" width={1000} height={667} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-burgundy-deep/30" /><div className="absolute inset-0 flex items-center justify-center"><div className="flex max-w-[280px] items-center gap-4 bg-card px-5 py-4 shadow-lg"><span className="flex h-10 w-10 shrink-0 items-center justify-center bg-blush text-primary"><MapPin size={18} /></span><span><span className="block text-sm font-semibold text-foreground">Edmunds Event Centre</span><span className="mt-1 block text-xs text-muted-foreground">80 Aminu Kano Crescent · Wuse 2</span></span><ArrowUpRight size={16} className="shrink-0 text-rose-gold" /></div></div></a></div></div>
      </section>

      <footer className="bg-burgundy-deep px-5 pb-28 pt-12 text-white sm:px-8 sm:pb-12 lg:px-12">
        <div className="mx-auto max-w-[1200px]"><div className="grid gap-10 sm:grid-cols-[1.2fr_1fr_0.8fr] sm:gap-8"><div><a href="#home" className="inline-flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center border border-[#dbb7a9]/70 text-[#dbb7a9]"><Flower2 size={18} strokeWidth={1.3} /></span><span><span className="block text-sm font-semibold tracking-[0.18em]">EDMUNDS</span><span className="mt-0.5 block text-[10px] text-white/60">Event Centre · Abuja</span></span></a><p className="mt-4 max-w-[295px] text-xs leading-6 text-white/65">A remarkable setting for life’s most important occasions, in the heart of Wuse 2.</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#dbb7a9]">FIND YOUR MOMENT</p><div className="mt-4 flex flex-col gap-3">{navigation.map((item) => <a key={item.href} href={item.href} className="w-fit text-xs text-white/80 transition-colors hover:text-[#e7c6ba]">{item.label}</a>)}</div></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#dbb7a9]">HERE WHEN YOU NEED US</p><p className="mt-4 flex items-center gap-2 text-xs text-white/85"><Clock3 size={14} className="text-[#dbb7a9]" />Open 24/7 for event bookings</p><a href={`tel:${phone}`} className="mt-3 inline-flex items-center gap-2 text-xs text-white/85"><Phone size={14} className="text-[#dbb7a9]" />+234 908 748 7034</a><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-xs text-white/85"><MessageCircle size={14} className="text-[#dbb7a9]" />WhatsApp our team</a></div></div><div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-[10px] text-white/55 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Edmunds Event Centre. Wuse 2, Abuja.</span><span>Designed for the moments that matter.</span></div></div>
      </footer>

      <aside aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_var(--color-foreground)/8] backdrop-blur-md md:hidden"><div className="mx-auto grid max-w-md grid-cols-2 gap-3"><Button asChild className="h-11 rounded-sm text-sm"><a href={`tel:${phone}`}><Phone size={16} /> Call now</a></Button><Button asChild className="h-11 rounded-sm bg-[#315f48] text-sm text-white hover:bg-[#264c39]"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a></Button></div></aside>
    </main>
  );
}
