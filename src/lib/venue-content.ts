import { Camera, CarFront, Flower2, type LucideIcon } from "lucide-react";

export const venue = {
  name: "Midas Worth Event Place",
  city: "Abuja",
  category: "Event Venue",
  address: "Eden gardens, Jabi, Abuja 900108, Federal Capital Territory",
  plusCode: "3CGQ+42 Abuja",
  displayPhone: "0807 171 7136",
  phoneHref: "+2348071717136",
  whatsappNumber: "2348071717136",
};

export const pageTitle = "Midas Worth Event Place | Garden Venue in Abuja";
export const pageDescription =
  "Midas Worth Event Place in Jabi, Abuja is a garden venue for outdoor events, with open free parking and scenic photo spots. Call to plan your visit.";
export const socialDescription =
  "An open-air event venue in Jabi, Abuja, known for garden-themed occasions, free open parking and scenic photo spots.";
export const socialImage =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663934540637/cYVwsvffgRYpINqy.jpg";

export const navigation = [
  { label: "Venue", href: "#home" },
  { label: "Highlights", href: "#highlights" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location & hours", href: "#location" },
  { label: "Contact", href: "#contact" },
];

export const highlights: { icon: LucideIcon; title: string; detail: string }[] = [
  {
    icon: Flower2,
    title: "Garden gatherings",
    detail: "A lovely setting for outdoor, garden-themed events.",
  },
  {
    icon: CarFront,
    title: "Open, free parking",
    detail: "Convenient open space for guests arriving by car.",
  },
  {
    icon: Camera,
    title: "Scenic photo spots",
    detail: "A quiet, grassy environment with plenty of green views.",
  },
];

export const reviews = [
  {
    name: "Daniel Damian",
    context: "6 years ago · 18 reviews in Abuja",
    quote: "Awesome environment, easy to locate & good views",
  },
  {
    name: "Amina Yahaya",
    context: "9 months ago · 115 reviews in Abuja",
    quote: "Great space for garden themed, outdoor events",
  },
  {
    name: "Aisha abdullahi Ibrahim",
    context: "Local Guide · 50 reviews · 5 years ago",
    quote: "It's has a nice scenery where you can take pictures",
  },
  {
    name: "Ene Esther Ali",
    context: "53 reviews in Abuja · 6 years ago",
    quote:
      "Its very quiet, although its grassy. You're literally on grass. Grass everywhere and more grass😐😐😐",
  },
];

export const openingHours = [
  { day: "Monday", hours: "Open 24 hours" },
  { day: "Tuesday", hours: "Open 24 hours" },
  { day: "Wednesday", hours: "Open 24 hours" },
  { day: "Thursday", hours: "Open 24 hours" },
  { day: "Friday", hours: "Open 24 hours" },
  { day: "Saturday", hours: "Open 24 hours" },
  { day: "Sunday", hours: "Closed" },
];

export const mapQuery = `${venue.name}, ${venue.address}, ${venue.plusCode}`;
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

export function whatsappUrl(message?: string) {
  return `https://wa.me/${venue.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}
