import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { bookingSchema, eventTypes, type BookingInput } from "@/lib/booking-validation";
import { venue, whatsappUrl } from "@/lib/venue-content";

const makeEmptyErrors = (): Record<keyof BookingInput, string | undefined> => ({
  fullName: undefined,
  phoneNumber: undefined,
  eventType: undefined,
  expectedGuests: undefined,
  preferredDate: undefined,
});

export function BookingDialog({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState(makeEmptyErrors);
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
      const nextErrors = makeEmptyErrors();
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof BookingInput;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      toast.error("Please check the highlighted details.");
      return;
    }

    const booking = result.data;
    const message = [
      `Hello ${venue.name}, I would like to enquire about a ${booking.eventType.toLowerCase()}.`,
      `Preferred date: ${booking.preferredDate}.`,
      `Expected guests: ${booking.expectedGuests}.`,
      `My name is ${booking.fullName}; my phone number is ${booking.phoneNumber}.`,
      "Please let me know about availability.",
    ].join(" ");

    toast.success("Your event enquiry is ready.", {
      description: `Open WhatsApp to send your enquiry to ${venue.name}.`,
      action: {
        label: "Open WhatsApp",
        onClick: () => window.open(whatsappUrl(message), "_blank", "noopener,noreferrer"),
      },
    });
    event.currentTarget.reset();
    setErrors(makeEmptyErrors());
    setOpen(false);
  }

  function fieldError(field: keyof BookingInput) {
    return errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 text-xs text-destructive" role="alert">
        {errors[field]}
      </p>
    ) : null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>{children}</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] max-w-xl overflow-y-auto rounded-sm border-border bg-background p-6 sm:p-8">
        <DialogHeader className="pr-8 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-gold">
            Start planning your occasion
          </p>
          <DialogTitle className="mt-2 font-display text-4xl text-foreground">
            Tell us about your event.
          </DialogTitle>
          <DialogDescription>
            Share a few details, then send your enquiry to the Midas Worth team on WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="booking-fullName" className="mb-1.5 block text-sm font-medium">
              Full name
            </label>
            <Input
              id="booking-fullName"
              name="fullName"
              autoComplete="name"
              maxLength={100}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              onChange={() => setErrors((existing) => ({ ...existing, fullName: undefined }))}
            />
            {fieldError("fullName")}
          </div>
          <div>
            <label htmlFor="booking-phoneNumber" className="mb-1.5 block text-sm font-medium">
              Phone number
            </label>
            <Input
              id="booking-phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              maxLength={24}
              placeholder="0807 171 7136"
              aria-invalid={Boolean(errors.phoneNumber)}
              aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
              onChange={() => setErrors((existing) => ({ ...existing, phoneNumber: undefined }))}
            />
            {fieldError("phoneNumber")}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="booking-eventType" className="mb-1.5 block text-sm font-medium">
                Event type
              </label>
              <select
                id="booking-eventType"
                name="eventType"
                defaultValue=""
                aria-invalid={Boolean(errors.eventType)}
                aria-describedby={errors.eventType ? "eventType-error" : undefined}
                onChange={() => setErrors((existing) => ({ ...existing, eventType: undefined }))}
                className="h-10 w-full rounded-sm border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select an occasion
                </option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {fieldError("eventType")}
            </div>
            <div>
              <label htmlFor="booking-expectedGuests" className="mb-1.5 block text-sm font-medium">
                Expected guests
              </label>
              <Input
                id="booking-expectedGuests"
                name="expectedGuests"
                type="number"
                min={1}
                step={1}
                inputMode="numeric"
                placeholder="150"
                aria-invalid={Boolean(errors.expectedGuests)}
                aria-describedby={errors.expectedGuests ? "expectedGuests-error" : undefined}
                onChange={() =>
                  setErrors((existing) => ({ ...existing, expectedGuests: undefined }))
                }
              />
              {fieldError("expectedGuests")}
            </div>
          </div>
          <div>
            <label htmlFor="booking-preferredDate" className="mb-1.5 block text-sm font-medium">
              Preferred date
            </label>
            <Input
              id="booking-preferredDate"
              name="preferredDate"
              type="date"
              min={today}
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
              onChange={() => setErrors((existing) => ({ ...existing, preferredDate: undefined }))}
            />
            {fieldError("preferredDate")}
          </div>
          <Button
            type="submit"
            className="h-12 w-full rounded-sm bg-primary text-primary-foreground"
          >
            Prepare WhatsApp enquiry <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            This enquiry does not secure a booking. Call{" "}
            <a
              href={`tel:${venue.phoneHref}`}
              className="font-medium text-foreground underline underline-offset-2"
            >
              {venue.displayPhone}
            </a>{" "}
            to speak with the team.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
