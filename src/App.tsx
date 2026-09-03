import React, { useState, useEffect } from 'react';
import { FLAVOURS } from './data/snackData';
import { FlavourId } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlavourShift } from './components/FlavourShift';
import { InteractiveExperienceSection } from './components/InteractiveExperienceSection';
import { NutritionSection } from './components/NutritionSection';
import { IngredientsSection } from './components/IngredientsSection';
import { BrandStorySection } from './components/BrandStorySection';
import { PackagingFreshness } from './components/PackagingFreshness';
import { FlavourQuizSection } from './components/FlavourQuizSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ComingSoonModal } from './components/ComingSoonModal';
import { Sparkles, Palette } from 'lucide-react';

export default function App() {
  const [currentFlavourId, setCurrentFlavourId] = useState<FlavourId>('himalayan-salt');
  const [isComingSoonOpen, setIsComingSoonOpen] = useState<boolean>(false);
  const [comingSoonTrigger, setComingSoonTrigger] = useState<string>('');

  const currentFlavour = FLAVOURS[currentFlavourId];

  const handleOpenComingSoon = (context: string) => {
    setComingSoonTrigger(context);
    setIsComingSoonOpen(true);
  };

  const handleSelectFlavour = (id: FlavourId) => {
    if (id !== currentFlavourId) {
      setCurrentFlavourId(id);
    }
  };

  // Keyboard shortcut: 1, 2, 3 for instant flavour switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === '1') setCurrentFlavourId('himalayan-salt');
      if (e.key === '2') setCurrentFlavourId('cheese');
      if (e.key === '3') setCurrentFlavourId('peri-peri');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${currentFlavour.bgGradient} transition-colors duration-1000 ease-in-out font-sans-clean text-neutral-900 relative selection:bg-[#B88746] selection:text-white`}
      style={{
        color: currentFlavour.textColor,
      }}
    >
      {/* Dynamic Ambient Background Canvas Lighting */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${currentFlavour.accentColor}12 0%, transparent 60%)`,
        }}
      />

      {/* Global Minimal Navigation */}
      <Navbar
        currentFlavour={currentFlavour}
        onOpenComingSoon={handleOpenComingSoon}
        onSelectFlavour={handleSelectFlavour}
      />

      {/* 01 & 02: CINEMATIC HERO & PRODUCT REVEAL */}
      <main>
        <HeroSection
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 03: FLAVOUR TRANSFORMATION SYSTEM */}
        <FlavourShift
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 04: INTERACTIVE PRODUCT EXPERIENCE & 3D MACRO ZOOM */}
        <InteractiveExperienceSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 05: NUTRITION / WHY ROASTED ("GOOD SNACK. BETTER CHOICE.") */}
        <NutritionSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 06: INGREDIENTS EXPERIENCE */}
        <IngredientsSection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 07: BRAND STORY ("NOT JUST A SNACK. IT'S A LITTLE SUNDAY, EVERY DAY.") */}
        <BrandStorySection
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 08: PACKAGING / PRODUCT SPECIFICATION ("BUILT FOR FRESHNESS.") */}
        <PackagingFreshness
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 09: FLAVOUR COLLECTION ("WHICH SUNDAY ARE YOU?") */}
        <FlavourQuizSection
          currentFlavour={currentFlavour}
          allFlavours={FLAVOURS}
          onSelectFlavour={handleSelectFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />

        {/* 10: PREMIUM FINAL CTA ("MAKE EVERY DAY A LITTLE SUNDAY.") */}
        <FinalCTA
          currentFlavour={currentFlavour}
          onOpenComingSoon={handleOpenComingSoon}
        />
      </main>

      {/* 11: MINIMAL PREMIUM FOOTER */}
      <Footer
        currentFlavour={currentFlavour}
        onOpenComingSoon={handleOpenComingSoon}
      />

      {/* Floating Quick Theme Switcher Pill (Frosted Glass) */}
      <aside
        aria-label="Theme selector"
        className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-full bg-white/40 backdrop-blur-2xl border border-white/60 shadow-lg transition-transform hover:scale-105"
      >
        <div className="pl-3 pr-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2B2B2B]/60">
          <Palette className="w-3.5 h-3.5" style={{ color: currentFlavour.accentColor }} />
          <span className="hidden md:inline">Theme:</span>
        </div>
        {(['himalayan-salt', 'cheese', 'peri-peri'] as FlavourId[]).map((fid, idx) => {
          const flv = FLAVOURS[fid];
          const isAct = fid === currentFlavourId;
          return (
            <button
              key={fid}
              onClick={() => handleSelectFlavour(fid)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAct
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#2B2B2B]/70 hover:text-[#1A1A1A] hover:bg-white/60'
              }`}
              title={`Press ${idx + 1} on keyboard or click to switch to ${flv.name}`}
            >
              <span
                className="w-2 h-2 rounded-full shadow-xs"
                style={{ backgroundColor: flv.accentColor }}
              />
              <span>{flv.name}</span>
            </button>
          );
        })}
      </aside>

      {/* E-COMMERCE COMING SOON MODAL */}
      <ComingSoonModal
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
        currentFlavour={currentFlavour}
        triggerContext={comingSoonTrigger}
      />
    </div>
  );
}
