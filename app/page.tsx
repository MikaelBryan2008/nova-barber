import Hero from "../components/Hero";
import ScrollExperience from "../components/ScrollExperience";
import Services from "@/components/Services";
import Barbers from "@/components/Barbers";
import Transformation from "@/components/Transformation";
import Reviews from "@/components/Reviews";
import TheSpace from "@/components/TheSpace";
import Location from "@/components/Location";
import Booking from "@/components/Booking";

export default function Home() {
  return (
    <main className="bg-[#050505]">
      <Hero />
      <ScrollExperience />
      <Services />
      <Barbers />
      <Transformation />
      <Reviews />
      <TheSpace />
      <Location />
      <Booking />
    </main>
  );
}