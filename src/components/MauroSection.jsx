import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote } from 'lucide-react';
import { mauroContent } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function MauroSection() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-28, 28]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section
      id="mauro"
      ref={sectionRef}
      className="relative py-24 md:py-36 bg-gradient-to-b from-espresso via-roast to-espresso overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-studio-radial opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Retrato orgânico com Parallax */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={prefersReducedMotion ? undefined : { y: imageY }}
              className="relative rounded-[2.25rem] overflow-hidden border border-latte/20 bg-mocha shadow-2xl shadow-espresso will-change-transform"
            >
              <div className="aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden">
                <img
                  src={mauroContent.photo}
                  alt={mauroContent.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Foto de apoio orgânica em sobreposição sutil */}
            <motion.div
              style={prefersReducedMotion ? undefined : { y: badgeY }}
              className="hidden sm:block absolute -bottom-8 -right-4 lg:-right-8 w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-caramel/45 shadow-2xl shadow-espresso bg-roast will-change-transform"
            >
              <img
                src={mauroContent.photoSecondary}
                alt={mauroContent.altSecondary}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Conteúdo humano e citação em destaque */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-caramel mb-3">
                {mauroContent.eyebrow}
              </p>
              <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-crema leading-[1.1] tracking-[-0.02em]">
                {mauroContent.headingPrefix}{' '}
                <em className="italic font-medium text-caramel pb-1 inline-block">
                  {mauroContent.headingHighlight}
                </em>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-latte leading-[1.75] max-w-xl">
              {mauroContent.bio}
            </p>

            <blockquote className="relative rounded-2xl border border-caramel/25 bg-mocha/65 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-espresso/50">
              <Quote
                className="w-7 h-7 text-caramel/75 mb-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="font-display italic font-light text-xl sm:text-2xl text-crema leading-[1.45]">
                “{mauroContent.featuredQuote}”
              </p>
              <footer className="mt-5 flex items-center gap-3 text-sm text-latte">
                <span className="font-semibold text-amber">
                  {mauroContent.featuredAuthor}
                </span>
                <span className="h-3 w-px bg-latte/25" aria-hidden="true" />
                <span className="text-latte/80">{mauroContent.featuredMeta}</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
