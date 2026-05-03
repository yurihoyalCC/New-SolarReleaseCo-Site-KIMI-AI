import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from '../sections/Header';
import Hero from '../sections/Hero';
import Problem from '../sections/Problem';
import Process from '../sections/Process';
import Differentiation from '../sections/Differentiation';
import ReportValue from '../sections/ReportValue';
import LegalPartner from '../sections/LegalPartner';
import Protection from '../sections/Protection';
import Urgency from '../sections/Urgency';
import Contact from '../sections/Contact';

import '../App.css';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.08 && value <= r.end + 0.08
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <Problem />
        <Process />
        <Differentiation />
        <ReportValue />
        <LegalPartner />
        <Protection />
        <Urgency />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 py-8 z-[100] relative">
        <div className="w-full px-6 lg:px-[8vw]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-white font-heading font-bold">
              Solar Release Co.
            </div>
            <p className="text-white/50 text-sm text-center">
              Consumer advocacy organization. Not a law firm.
            </p>
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} Solar Release Co. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;