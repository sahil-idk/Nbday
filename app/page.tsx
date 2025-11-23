import BackgroundTransition from "@/components/BackgroundTransition";
import Hero from "@/components/Hero";
import HextechCrystalSection from "@/components/HextechCrystalSection";
import AmySantiagoQuiz from "@/components/AmySantiagoQuiz";
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
      <HextechCrystalSection />
      <AmySantiagoQuiz />
      <BirthdayMessage />
      <MusicSection />
      <ImageCarousel />
      <DateCard />
      <Footer />
    </main>
  );
}
