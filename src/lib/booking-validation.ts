import { z } from "zod";

export const eventTypes = ["Wedding Reception", "Conference", "Gala", "Birthday"] as const;

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  phoneNumber: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(24, "Please enter a valid phone number.")
    .regex(/^[+]?\d[\d\s().-]*$/, "Please enter a valid phone number.")
    .refine(
      (value) => (value.match(/\d/g)?.length ?? 0) >= 7,
      "Please enter a valid phone number.",
    ),
  eventType: z.enum(eventTypes, { message: "Please select an event type." }),
  expectedGuests: z.coerce
    .number({ message: "Enter an expected guest count." })
    .int("Enter a whole number of guests.")
    .min(1, "At least one guest is required."),
  preferredDate: z
    .string()
    .min(1, "Please choose a preferred date.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date.")
    .refine(
      (date) => date >= new Date().toISOString().slice(0, 10),
      "Choose today or a future date.",
    ),
});

export type BookingInput = z.infer<typeof bookingSchema>;
