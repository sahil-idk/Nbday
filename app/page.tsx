import BackgroundTransition from "@/components/BackgroundTransition";
import Hero from "@/components/Hero";
import ArcaneSection from "@/components/ArcaneSection";
import Brooklyn99Card from "@/components/Brooklyn99Card";
import BirthdayMessage from "@/components/BirthdayMessage";
import MusicSection from "@/components/MusicSection";
import ImageCarousel from "@/components/ImageCarousel";
import DateCard from "@/components/DateCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <BackgroundTransition />
      <Hero />
      <ArcaneSection />
      <Brooklyn99Card />
      <BirthdayMessage />
      <MusicSection />
      <ImageCarousel />
      <DateCard />
      <Footer />
    </main>
  );
}
