import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { faqs } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-32 bg-espresso">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="font-display font-light text-4xl sm:text-5xl text-crema leading-[1.12] tracking-[-0.02em]">
            Dúvidas{' '}
            <em className="italic font-medium text-caramel pb-1 inline-block">
              frequentes.
            </em>
          </h2>
          <p className="mt-3 text-base text-latte leading-[1.7]">
            Informações diretas para planejar sua visita à MB Coffee Design.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-latte/15 bg-roast/75 overflow-hidden transition-colors hover:border-caramel/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer min-h-[44px]"
                >
                  <span className="font-display text-lg sm:text-xl text-crema">
                    {item.question}
                  </span>
                  <span className="w-9 h-9 rounded-full border border-latte/20 flex items-center justify-center text-caramel shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-latte leading-[1.75] border-t border-latte/10">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
