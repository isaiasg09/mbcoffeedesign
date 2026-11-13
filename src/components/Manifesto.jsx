import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { manifestoText, marqueeItems } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

function KineticWord({ word, index, total, progress, reducedMotion }) {
  const start = (index / total) * 0.75;
  const end = Math.min(start + 0.22, 1);
  const opacity = useTransform(progress, [start, end], [0.22, 1]);

  const normalized = word.toLowerCase().replace(/[.,]/g, '');
  const isAccent = normalized === 'ritual' || normalized === 'demore';

  if (reducedMotion) {
    return (
      <span
        className={`inline-block mr-[0.26em] ${
          isAccent ? 'italic font-medium text-caramel pb-1' : 'text-crema'
        }`}
      >
        {word}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.26em] transition-colors ${
        isAccent ? 'italic font-medium text-caramel pb-1' : 'text-crema'
      }`}
    >
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const words = manifestoText.split(' ');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.45'],
  });

  const marqueeSequence = marqueeItems.join(' · ');

  return (
    <>
      {/* Marquee único de atributos */}
      <div
        className="w-full overflow-hidden border-y border-latte/10 bg-roast/80 py-4 select-none"
        aria-label="Destaques da cafeteria"
      >
        {prefersReducedMotion ? (
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-6 gap-y-2 font-ui text-xs uppercase tracking-[0.2em] text-latte">
            {marqueeItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ) : (
          <div className="flex w-max animate-marquee">
            <span className="font-ui text-xs sm:text-sm uppercase tracking-[0.22em] text-latte whitespace-nowrap pr-8">
              {marqueeSequence} · {marqueeSequence} ·{' '}
            </span>
            <span
              className="font-ui text-xs sm:text-sm uppercase tracking-[0.22em] text-latte whitespace-nowrap pr-8"
              aria-hidden="true"
            >
              {marqueeSequence} · {marqueeSequence} ·{' '}
            </span>
          </div>
        )}
      </div>

      {/* Manifesto cinético por scroll */}
      <section
        ref={sectionRef}
        className="relative py-28 md:py-40 bg-gradient-to-b from-espresso via-roast/60 to-espresso overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-studio-radial opacity-45 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-display font-light text-3xl sm:text-5xl md:text-6xl leading-[1.22] tracking-[-0.02em]">
            {words.map((word, idx) => (
              <KineticWord
                key={`${word}-${idx}`}
                word={word}
                index={idx}
                total={words.length}
                progress={scrollYProgress}
                reducedMotion={prefersReducedMotion}
              />
            ))}
          </p>
        </div>
      </section>
    </>
  );
}
