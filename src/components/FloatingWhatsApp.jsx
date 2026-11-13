import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { whatsappUrl } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(latest > 600);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 16 }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-3"
        >
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="hidden sm:inline-block rounded-full border border-latte/25 bg-roast/95 backdrop-blur-md px-4 py-2 text-xs font-medium text-crema shadow-xl whitespace-nowrap"
              >
                Fale com a gente
              </motion.span>
            )}
          </AnimatePresence>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            aria-label="Falar com a MB Coffee Design no WhatsApp"
            className="relative w-14 h-14 rounded-full flex items-center justify-center focus-visible:ring-2 focus-visible:ring-amber"
          >
            {/* Anel de pulso orgânico */}
            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.48], opacity: [0.55, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute inset-0 rounded-full bg-amber/40 pointer-events-none"
              />
            )}

            <motion.span
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: [1, 1.07, 1] }
              }
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-caramel to-amber text-espresso flex items-center justify-center shadow-[0_10px_30px_rgba(201,139,75,0.45)] border border-crema/30"
            >
              <MessageCircle className="w-6 h-6" strokeWidth={2.1} />
            </motion.span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
