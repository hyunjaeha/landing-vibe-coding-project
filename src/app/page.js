import LandingPage from "@/components/LandingPage";
import {
  introItems,
  preparationItems,
  schedules,
  workshop,
} from "@/lib/workshop-data";

export default function HomePage() {
  return (
    <LandingPage
      introItems={introItems}
      preparationItems={preparationItems}
      schedules={schedules}
      workshop={workshop}
    />
  );
}
