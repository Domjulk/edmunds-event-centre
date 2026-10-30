import { describe, expect, it } from "vitest";

import { bookingSchema } from "@/lib/booking-validation";

const validBooking = {
  fullName: "Ada Okafor",
  phoneNumber: "0807 171 7136",
  eventType: "Wedding Reception",
  expectedGuests: "250",
  preferredDate: "2027-05-16",
};

describe("Midas Worth event enquiry validation", () => {
  it("accepts all four event types available in the form", () => {
    for (const eventType of ["Wedding Reception", "Conference", "Gala", "Birthday"]) {
      expect(bookingSchema.safeParse({ ...validBooking, eventType }).success).toBe(true);
    }
  });

  it("accepts a positive guest count without asserting a venue capacity", () => {
    expect(bookingSchema.safeParse({ ...validBooking, expectedGuests: "2001" }).success).toBe(true);
  });

  it("requires a positive whole-number guest count", () => {
    expect(bookingSchema.safeParse({ ...validBooking, expectedGuests: "0" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...validBooking, expectedGuests: "12.5" }).success).toBe(
      false,
    );
  });

  it("requires the contact and date fields specified for an enquiry", () => {
    const result = bookingSchema.safeParse({
      ...validBooking,
      fullName: "",
      phoneNumber: "",
      preferredDate: "",
    });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(
      expect.arrayContaining(["fullName", "phoneNumber", "preferredDate"]),
    );
  });

  it("rejects preferred dates in the past", () => {
    const result = bookingSchema.safeParse({ ...validBooking, preferredDate: "1900-01-01" });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.message)).toContain(
      "Choose today or a future date.",
    );
  });
});
