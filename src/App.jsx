import { MotionConfig } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import SchemaMarkup from './components/SchemaMarkup';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import DeconstructedCup from './components/DeconstructedCup';
import Experience from './components/Experience';
import MauroSection from './components/MauroSection';
import Gallery from './components/Gallery';
import SocialProof from './components/SocialProof';
import Instagram from './components/Instagram';
import Visit from './components/Visit';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  useLenis();

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-espresso text-crema">
        <SchemaMarkup />

        {/* Overlay fixo de grão cinematográfico (anti-slop) */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-50 pointer-events-none opacity-[0.06] mix-blend-overlay film-grain-overlay"
        />

        <Header />

        <main className="overflow-x-clip w-full max-w-full">
          <Hero />
          <Manifesto />
          <DeconstructedCup />
          <Experience />
          <MauroSection />
          <Gallery />
          <SocialProof />
          <Instagram />
          <Visit />
          <FAQ />
        </main>

        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}
