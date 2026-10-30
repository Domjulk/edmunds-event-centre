import { createFileRoute } from "@tanstack/react-router";

import {
  EnquiryBand,
  HighlightsSection,
  ReviewsSection,
  VenueOverviewSection,
} from "@/components/venue/content-sections";
import { HeroSection } from "@/components/venue/hero-section";
import { LocationSection } from "@/components/venue/location-section";
import { MobileContactBar, SiteFooter } from "@/components/venue/site-footer";
import { SiteHeader } from "@/components/venue/site-header";
import {
  pageDescription,
  pageTitle,
  socialDescription,
  socialImage,
  venue,
} from "@/lib/venue-content";

export const Route = createFileRoute("/")({
  component: MidasWorthHome,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "Midas Worth Event Place, Abuja event venue, Jabi garden venue, outdoor events Abuja",
      },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: socialDescription },
      { property: "og:site_name", content: venue.name },
      { property: "og:type", content: "website" },
      { property: "og:image", content: socialImage },
      {
        property: "og:image:alt",
        content: "Outdoor event setup on the grassy garden grounds at Midas Worth Event Place",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: socialDescription },
      { name: "twitter:image", content: socialImage },
      {
        name: "twitter:image:alt",
        content: "Outdoor event setup on the grassy garden grounds at Midas Worth Event Place",
      },
    ],
  }),
});

function MidasWorthHome() {
  return (
    <main className="min-h-screen overflow-x-clip bg-background pb-16 text-foreground md:pb-0">
      <SiteHeader />
      <HeroSection />
      <HighlightsSection />
      <VenueOverviewSection />
      <EnquiryBand />
      <ReviewsSection />
      <LocationSection />
      <SiteFooter />
      <MobileContactBar />
    </main>
  );
}
