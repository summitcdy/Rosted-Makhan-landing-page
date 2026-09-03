import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { FlavourTheme } from '../types';

interface NavbarProps {
  currentFlavour: FlavourTheme;
  onOpenComingSoon: (context: string) => void;
  onSelectFlavour: (id: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentFlavour,
  onOpenComingSoon,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Flavours', href: '#flavours' },
    { name: 'Experience', href: '#interactive' },
    { name: 'Nutrition', href: '#nutrition' },
    { name: 'Ingredients', href: '#ingredients' },
    { name: 'Our Story', href: '#story' },
    { name: 'Freshness', href: '#freshness' },
  ];

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-white/40 backdrop-blur-2xl border-b border-white/60 shadow-sm'
          : 'py-5 sm:py-7 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="brand-logo-link"
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 shadow-sm border border-white/50"
            style={{
              backgroundColor: currentFlavour.accentColor,
              boxShadow: `0 4px 14px ${currentFlavour.glowColor}`,
            }}
          >
            <span className="text-white text-xs font-serif-luxury font-bold">SB</span>
          </div>
          <div>
            <span className="block font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">
              THE <span className="italic" style={{ color: currentFlavour.accentColor }}>SUNDAY</span> BASKET
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-[#2B2B2B]/60 mt-0.5">
              Roasted Makhana
            </span>
          </div>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <nav
          id="desktop-nav-links"
          className="hidden md:flex items-center gap-1.5 lg:gap-2 px-5 py-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-xs"
        >
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2B2B2B]/75 hover:text-[#1A1A1A] transition-colors rounded-full hover:bg-white/60"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={() => onOpenComingSoon('Contact Concierge')}
            className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#2B2B2B]/75 hover:text-[#1A1A1A] transition-colors rounded-full hover:bg-white/60"
          >
            Contact
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-coming-soon-btn"
            onClick={() => onOpenComingSoon('Nav Header / Shop Launch')}
            className="group relative inline-flex items-center gap-2 bg-[#2B2B2B] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-[#1A1A1A] active:scale-95 transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
            <span>Coming Soon</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/60 text-[#2B2B2B]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden mx-4 mt-3 p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-xl flex flex-col gap-3 animate-in slide-in-from-top-4"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2B2B2B] hover:text-[#1A1A1A] hover:bg-white/50 rounded-xl"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenComingSoon('Contact Concierge');
              }}
              className="text-left px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#2B2B2B] hover:text-[#1A1A1A] hover:bg-white/50 rounded-xl"
            >
              Contact
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenComingSoon('Mobile Header CTA');
                }}
                className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-[#2B2B2B] shadow-md text-center"
              >
                Join Sunday VIP Batch
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
