import { describe, expect, it } from "vitest";

import { bookingSchema } from "@/lib/edmunds-booking-validation";

const validBooking = {
  fullName: "Ada Okafor",
  phoneNumber: "+234 908 748 7034",
  eventType: "Wedding Reception",
  expectedGuests: "250",
  preferredDate: "2027-05-16",
};

describe("Edmunds inspection booking validation", () => {
  it("accepts all four event types requested for the form", () => {
    for (const eventType of ["Wedding Reception", "Conference", "Gala", "Birthday"]) {
      expect(bookingSchema.safeParse({ ...validBooking, eventType }).success).toBe(true);
    }
  });

  it("rejects a booking for more than the venue's 2,000-person capacity", () => {
    const result = bookingSchema.safeParse({ ...validBooking, expectedGuests: "2001" });

    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe("Our venue accommodates up to 2,000 guests.");
  });

  it("requires the contact and date fields specified in the inspection form", () => {
    const result = bookingSchema.safeParse({ ...validBooking, fullName: "", phoneNumber: "", preferredDate: "" });

    expect(result.success).toBe(false);
    expect(result.error?.issues.map((issue) => issue.path[0])).toEqual(
      expect.arrayContaining(["fullName", "phoneNumber", "preferredDate"]),
    );
  });
});