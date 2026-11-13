import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Instagram, Menu, X, MessageCircle } from 'lucide-react';
import { business, localMedia, navLinks, whatsappUrl } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 36);
    if (!mobileOpen && latest > 140 && latest > previous) {
      setHidden(true);
    } else if (latest < previous || latest <= 140) {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={false}
        animate={
          prefersReducedMotion
            ? { y: 0 }
            : { y: hidden ? '-100%' : '0%' }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-espresso/85 backdrop-blur-xl border-b border-latte/15 shadow-lg shadow-espresso/60'
            : 'bg-gradient-to-b from-espresso/80 via-espresso/40 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-3 group shrink-0 rounded-full focus-visible:ring-2 focus-visible:ring-caramel"
            aria-label="MB Coffee Design - Ir para o topo"
          >
            <span className="relative w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-latte/25 bg-crema shrink-0">
              <img
                src={localMedia.logo}
                alt="Logo MB Coffee Design"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                decoding="async"
              />
            </span>
            <span className="font-display text-lg md:text-xl tracking-tight text-crema whitespace-nowrap leading-none">
              MB Coffee{' '}
              <em className="italic font-medium text-caramel">Design</em>
            </span>
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-ui text-xs uppercase tracking-[0.18em] text-latte/90 hover:text-amber transition-colors duration-200 whitespace-nowrap py-2"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram oficial da MB Coffee Design"
              className="w-11 h-11 rounded-full border border-latte/20 bg-roast/70 flex items-center justify-center text-latte hover:text-amber hover:border-amber/50 transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.75} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-caramel text-espresso font-ui text-xs font-semibold uppercase tracking-[0.12em] hover:bg-amber transition-colors duration-200 shadow-[0_0_24px_rgba(201,139,75,0.28)] whitespace-nowrap active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              <span>Reservar pelo WhatsApp</span>
            </a>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da MB Coffee Design"
              className="w-11 h-11 rounded-full border border-latte/20 bg-roast/70 flex items-center justify-center text-latte hover:text-amber transition-colors"
            >
              <Instagram className="w-4 h-4" strokeWidth={1.75} />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              className="w-11 h-11 rounded-full border border-latte/20 bg-roast/80 flex items-center justify-center text-crema hover:border-caramel/60 transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" strokeWidth={1.75} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-espresso/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 pb-10 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação móvel"
          >
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fechar menu"
              className="absolute top-3 right-4 w-11 h-11 rounded-full border border-latte/25 bg-roast flex items-center justify-center text-crema cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <nav className="flex flex-col gap-5 mt-4" aria-label="Links principais">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: 20 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: prefersReducedMotion ? 0 : index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-4xl text-crema hover:text-caramel transition-colors py-1 leading-[1.15]"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.25 }}
              className="flex flex-col gap-4 border-t border-latte/15 pt-6"
            >
              <p className="text-sm text-latte/80">{business.address}</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-caramel text-espresso font-ui text-xs font-semibold uppercase tracking-[0.14em] hover:bg-amber transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={2} />
                <span>Reservar pelo WhatsApp</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
