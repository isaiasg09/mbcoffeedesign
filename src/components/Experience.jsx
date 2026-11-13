import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Music, Sparkles, UtensilsCrossed, ChevronDown } from 'lucide-react';
import { business, experiencePillars } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

const pillarIcons = {
  cafe: Coffee,
  mesa: UtensilsCrossed,
  ambiente: Sparkles,
  trilha: Music,
};

const menuTabs = [
  { key: 'cafesQuentes', label: 'Cafés Quentes' },
  { key: 'cafesFiltrados', label: 'Filtrados' },
  { key: 'cafesGelados', label: 'Cafés Gelados' },
  { key: 'comidinhas', label: 'Comidinhas & Doces' },
];

function LiquidLatteMicro({ reducedMotion }) {
  return (
    <div
      className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Condensação sutil no vidro */}
      <div className="absolute inset-0 rounded-full border border-crema/20 bg-espresso/50 backdrop-blur-md shadow-inner" />
      {/* Líquido / crema com oscilação orgânica */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                borderRadius: [
                  '48% 52% 55% 45% / 50% 45% 55% 50%',
                  '54% 46% 48% 52% / 44% 56% 46% 54%',
                  '46% 54% 52% 48% / 55% 46% 54% 45%',
                  '48% 52% 55% 45% / 50% 45% 55% 50%',
                ],
                rotate: [0, 6, -4, 0],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber via-caramel to-cinnamon shadow-[0_0_24px_rgba(232,168,87,0.35)] flex items-center justify-center relative overflow-hidden"
      >
        <div className="w-9 h-9 rounded-full bg-crema/75 blur-[1px] opacity-80 -translate-y-0.5" />
      </motion.div>
      {/* Gotículas sutis de condensação */}
      <span className="absolute top-2.5 right-4 w-1.5 h-1.5 rounded-full bg-crema/45" />
      <span className="absolute bottom-4 left-3 w-1 h-1 rounded-full bg-crema/35" />
    </div>
  );
}

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('cafesQuentes');

  return (
    <section
      id="experiencia"
      className="relative py-24 md:py-36 bg-espresso overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho vertical limpo */}
        <div className="max-w-2xl mb-14 md:mb-16">
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-crema leading-[1.1] tracking-[-0.02em]">
            Quatro sentidos em{' '}
            <em className="italic font-medium text-caramel pb-1 inline-block">
              sintonia.
            </em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-latte leading-[1.7] max-w-xl">
            Do grão especial à trilha sonora, cada escolha dentro da MB Coffee Design existe para acolher quem chega.
          </p>
        </div>

        {/* Bento Grid assimétrico sem lacunas (grid-flow-dense) */}
        <div className="grid grid-cols-1 md:grid-cols-12 grid-flow-dense gap-5 md:gap-6">
          {experiencePillars.map((pillar, idx) => {
            const Icon = pillarIcons[pillar.id] || Coffee;
            const isFeatured = pillar.featuredLiquid;
            const isWideBottom = pillar.id === 'trilha';

            return (
              <motion.article
                key={pillar.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: prefersReducedMotion ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -4, transition: { type: 'spring', stiffness: 220, damping: 20 } }
                }
                className={`${pillar.span} group relative rounded-2xl border border-latte/15 hover:border-amber/45 bg-roast/90 overflow-hidden transition-colors duration-300 shadow-xl shadow-espresso/60`}
              >
                {/* Brilho âmbar sutil no hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-amber/0 via-amber/0 to-amber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                {isFeatured ? (
                  <div className="h-full flex flex-col">
                    <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] md:min-h-[460px] w-full overflow-hidden">
                      <img
                        src={pillar.photo}
                        alt={pillar.alt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-roast via-roast/25 to-transparent" />
                    </div>

                    <div className="relative z-10 -mt-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 bg-gradient-to-t from-roast via-roast to-transparent">
                      <div className="space-y-3 max-w-md">
                        <div className="inline-flex items-center gap-2 text-caramel">
                          <Icon className="w-4 h-4" strokeWidth={1.75} />
                          <span className="font-ui text-xs uppercase tracking-[0.16em]">
                            {pillar.highlight}
                          </span>
                        </div>
                        <h3 className="font-display text-3xl sm:text-4xl text-crema">
                          {pillar.title}
                        </h3>
                        <p className="text-sm sm:text-base text-latte leading-[1.7]">
                          {pillar.description}
                        </p>
                      </div>

                      <LiquidLatteMicro reducedMotion={prefersReducedMotion} />
                    </div>
                  </div>
                ) : isWideBottom ? (
                  <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                    <div className="md:col-span-7 p-6 sm:p-8 space-y-3">
                      <div className="inline-flex items-center gap-2 text-caramel">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                        <span className="font-ui text-xs uppercase tracking-[0.16em]">
                          {pillar.highlight}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl text-crema">
                        {pillar.title}
                      </h3>
                      <p className="text-sm sm:text-base text-latte leading-[1.7] max-w-xl">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="md:col-span-5 aspect-[16/10] md:aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={pillar.photo}
                        alt={pillar.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-between">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={pillar.photo}
                        alt={pillar.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-roast via-roast/20 to-transparent" />
                    </div>
                    <div className="p-6 space-y-2.5">
                      <div className="inline-flex items-center gap-2 text-caramel">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                        <span className="font-ui text-xs uppercase tracking-[0.16em]">
                          {pillar.highlight}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl text-crema">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-latte leading-[1.7]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Destaques reais do cardápio (extraídos do Cardápio.pdf) */}
        <div className="mt-10 rounded-2xl border border-latte/15 bg-roast/70 overflow-hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-mocha/40 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="font-display text-xl sm:text-2xl text-crema">
                Explorar destaques do cardápio
              </h3>
              <p className="text-sm text-latte/85 mt-0.5">
                Cafés quentes, métodos filtrados, gelados e comidinhas artesanais da casa.
              </p>
            </div>
            <span className="w-11 h-11 rounded-full border border-latte/20 flex items-center justify-center text-caramel shrink-0">
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  menuOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {menuOpen && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-latte/10"
              >
                <div className="p-6 space-y-6">
                  <div
                    role="tablist"
                    aria-label="Categorias do cardápio"
                    className="flex flex-wrap gap-2"
                  >
                    {menuTabs.map((tab) => {
                      const active = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveTab(tab.key)}
                          className={`px-4 py-2.5 rounded-full font-ui text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer min-h-[44px] ${
                            active
                              ? 'bg-caramel text-espresso font-semibold'
                              : 'border border-latte/20 text-latte hover:border-caramel/50 hover:text-crema'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {business.menu[activeTab].map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl bg-mocha/55 border border-latte/10 px-4 py-3.5 flex items-baseline justify-between gap-4"
                      >
                        <span className="text-sm sm:text-base text-crema">
                          {item.name}
                        </span>
                        <span className="font-ui text-sm font-semibold text-caramel shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
