import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { business, reviews } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

function RatingCounter({ reducedMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const targetVal = useMotionValue(reducedMotion ? business.rating : 3.0);
  const springVal = useSpring(targetVal, { stiffness: 110, damping: 20 });
  const [text, setText] = useState(reducedMotion ? '4,8' : '3,0');

  useEffect(() => {
    if (inView) {
      targetVal.set(business.rating);
    }
  }, [inView, targetVal]);

  useEffect(() => {
    const unsub = springVal.on('change', (v) => {
      setText(v.toFixed(1).replace('.', ','));
    });
    return () => unsub();
  }, [springVal]);

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-3 rounded-full border border-caramel/35 bg-mocha/70 px-5 py-2.5"
    >
      <span className="inline-flex items-center gap-1.5 font-display text-2xl font-medium text-amber">
        <Star className="w-5 h-5 fill-amber text-amber" />
        <span>{text}</span>
      </span>
      <span className="h-4 w-px bg-latte/25" aria-hidden="true" />
      <span className="text-sm text-crema">
        no Google ({business.reviewCount} avaliações)
      </span>
    </div>
  );
}

export default function SocialProof() {
  const prefersReducedMotion = useReducedMotion();
  const trackContainerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackContainerRef.current) return;
      const el = trackContainerRef.current;
      setDragWidth(Math.max(0, el.scrollWidth - el.offsetWidth));
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  const handleStep = (direction) => {
    setActiveSlide((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next >= reviews.length) return reviews.length - 1;
      return next;
    });
  };

  return (
    <section className="relative py-24 md:py-36 bg-roast/70 border-y border-latte/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="font-display font-light text-4xl sm:text-5xl text-crema leading-[1.12] tracking-[-0.02em]">
              Quem visita,{' '}
              <em className="italic font-medium text-caramel pb-1 inline-block">
                volta.
              </em>
            </h2>
            <p className="mt-3 text-base text-latte leading-[1.7]">
              Avaliações reais de clientes que transformaram a MB Coffee Design em ponto de encontro em Sobral.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <RatingCounter reducedMotion={prefersReducedMotion} />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                disabled={activeSlide === 0}
                aria-label="Avaliação anterior"
                className="w-11 h-11 rounded-full border border-latte/25 bg-mocha/80 flex items-center justify-center text-crema hover:border-amber disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                disabled={activeSlide === reviews.length - 1}
                aria-label="Próxima avaliação"
                className="w-11 h-11 rounded-full border border-latte/25 bg-mocha/80 flex items-center justify-center text-crema hover:border-amber disabled:opacity-35 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Trilha arrastável com inércia */}
        <div ref={trackContainerRef} className="overflow-hidden">
          <motion.div
            drag={prefersReducedMotion ? false : 'x'}
            dragConstraints={{ left: -dragWidth, right: 0 }}
            dragElastic={0.12}
            animate={
              prefersReducedMotion
                ? undefined
                : { x: -Math.min(activeSlide * 360, dragWidth) }
            }
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
          >
            {reviews.map((review) => (
              <article
                key={review.id}
                className="w-[86vw] sm:w-[400px] md:w-[430px] shrink-0 rounded-2xl border border-latte/15 bg-espresso/85 p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-xl shadow-espresso/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span
                      className="font-display text-5xl leading-none text-caramel/75 select-none"
                      aria-hidden="true"
                    >
                      “
                    </span>
                    <div
                      className="flex items-center gap-1"
                      aria-label={`${review.rating} de 5 estrelas`}
                    >
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-caramel text-caramel"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-crema/95 leading-[1.7]">
                    {review.quote}
                  </p>
                </div>

                <footer className="pt-4 border-t border-latte/10 flex items-center justify-between">
                  <cite className="not-italic font-display text-lg text-amber">
                    {review.author}
                  </cite>
                  <span className="font-ui text-xs uppercase tracking-[0.14em] text-latte/75">
                    Google Reviews
                  </span>
                </footer>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
