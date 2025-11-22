import Hero from "@/components/Hero";
import ArcaneSection from "@/components/ArcaneSection";
import Brooklyn99Card from "@/components/Brooklyn99Card";
import MemoryGallery from "@/components/MemoryGallery";
import InteractiveScroll from "@/components/InteractiveScroll";
import ShayariSection from "@/components/ShayariSection";
import PlaylistSection from "@/components/PlaylistSection";
import DateCard from "@/components/DateCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <ArcaneSection />
      <Brooklyn99Card />
      <MemoryGallery />
      <InteractiveScroll />
      <ShayariSection />
      <PlaylistSection />
      <DateCard />
      <Footer />
    </main>
  );
}
