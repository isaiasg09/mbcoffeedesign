import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { galleryItems } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

function GalleryCard({ item, index, onOpen, reducedMotion }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reducedMotion ? [0, 0] : [item.speed, -item.speed]
  );

  return (
    <motion.article
      ref={cardRef}
      style={reducedMotion ? undefined : { y }}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: reducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${item.layout} group relative flex flex-col gap-3 will-change-transform`}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Ampliar foto: ${item.title}`}
        className="relative w-full h-full min-h-[260px] rounded-2xl overflow-hidden border border-latte/15 hover:border-amber/50 bg-mocha text-left cursor-pointer transition-colors duration-300 shadow-xl shadow-espresso/60"
      >
        <img
          src={item.url}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-espresso/75 border border-latte/25 backdrop-blur-md flex items-center justify-center text-crema opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Expand className="w-4 h-4" strokeWidth={1.75} />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="font-display text-xl sm:text-2xl text-crema">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-latte/90 mt-1 line-clamp-2">
            {item.caption}
          </p>
        </div>
      </button>
    </motion.article>
  );
}

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % galleryItems.length
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + galleryItems.length) % galleryItems.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const activeItem =
    selectedIndex !== null ? galleryItems[selectedIndex] : null;

  return (
    <section
      id="galeria"
      className="relative py-24 md:py-36 bg-espresso overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14 md:mb-20">
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-crema leading-[1.12] tracking-[-0.02em]">
            Um lugar para{' '}
            <em className="italic font-medium text-caramel pb-1 inline-block">
              fotografar
            </em>{' '}
            e{' '}
            <em className="italic font-medium text-caramel pb-1 inline-block">
              sentir.
            </em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-latte leading-[1.7]">
            Cada cantinho da casa combina luz natural, texturas quentes e xícaras preparadas sem pressa.
          </p>
        </div>

        {/* Grid Bento / Masonry assimétrico sem lacunas */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-flow-dense gap-6 md:gap-8 items-stretch">
          {galleryItems.map((item, idx) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={idx}
              onOpen={setSelectedIndex}
              reducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Lightbox com AnimatePresence */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Visualização ampliada: ${activeItem.title}`}
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full rounded-2xl border border-latte/20 bg-roast p-3 sm:p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 pb-3 px-1">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-crema">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-latte">
                    {activeItem.caption}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Fechar galeria ampliada"
                  className="w-11 h-11 rounded-full border border-latte/25 bg-mocha flex items-center justify-center text-crema hover:border-caramel hover:text-amber transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <motion.div
                key={activeItem.id}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-square sm:aspect-[16/10] w-full rounded-xl overflow-hidden bg-espresso"
              >
                <img
                  src={activeItem.url}
                  alt={activeItem.alt}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <div className="flex items-center justify-between pt-3 px-1">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + galleryItems.length) %
                        galleryItems.length
                    )
                  }
                  aria-label="Foto anterior"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-latte/20 text-xs font-ui uppercase tracking-[0.14em] text-crema hover:border-caramel hover:text-amber transition-colors cursor-pointer min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % galleryItems.length)
                  }
                  aria-label="Próxima foto"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-latte/20 text-xs font-ui uppercase tracking-[0.14em] text-crema hover:border-caramel hover:text-amber transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
