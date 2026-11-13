import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Coffee, MessageCircle } from 'lucide-react';
import { deconstructedLayers, whatsappUrl } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function DeconstructedCup() {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001,
  });

  // Camada 1: Grão especial (superior esquerda) - mantida dentro do palco central
  const layer1Y = useTransform(smoothProgress, [0, 0.45, 0.88, 1], [-55, -14, 0, 0]);
  const layer1Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1.06, 0.96]);
  const layer1RotY = useTransform(smoothProgress, [0, 0.5, 1], [-10, 4, 0]);
  const layer1Opacity = useTransform(smoothProgress, [0, 0.16, 0.88, 1], [0.55, 1, 1, 0.94]);

  // Camada 2: Crema (superior direita)
  const layer2Y = useTransform(smoothProgress, [0, 0.48, 0.88, 1], [58, 12, 0, 0]);
  const layer2Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.92, 1.07, 0.98]);
  const layer2RotX = useTransform(smoothProgress, [0, 0.5, 1], [10, -4, 0]);
  const layer2Opacity = useTransform(smoothProgress, [0.08, 0.28, 0.88, 1], [0.35, 1, 1, 0.94]);

  // Camada 3: Latte art (centro focal)
  const layer3Y = useTransform(smoothProgress, [0, 0.5, 0.88, 1], [32, -8, 0, 0]);
  const layer3Scale = useTransform(smoothProgress, [0, 0.55, 1], [0.92, 1.08, 1.02]);
  const layer3Opacity = useTransform(smoothProgress, [0.14, 0.36, 1], [0.55, 1, 1]);

  // Camada 4: O acompanhamento (inferior esquerda)
  const layer4Y = useTransform(smoothProgress, [0, 0.6, 0.9, 1], [-48, 16, 0, 0]);
  const layer4Scale = useTransform(smoothProgress, [0, 0.6, 1], [0.9, 1.04, 0.97]);
  const layer4Opacity = useTransform(smoothProgress, [0.22, 0.46, 0.92, 1], [0.3, 1, 1, 0.94]);

  // Legendas sincronizadas + CTA final
  const cap1Opacity = useTransform(smoothProgress, [0.02, 0.14, 0.34, 0.44], [0.45, 1, 1, 0.55]);
  const cap2Opacity = useTransform(smoothProgress, [0.2, 0.32, 0.52, 0.62], [0.35, 1, 1, 0.55]);
  const cap3Opacity = useTransform(smoothProgress, [0.4, 0.52, 0.72, 0.82], [0.35, 1, 1, 0.6]);
  const cap4Opacity = useTransform(smoothProgress, [0.58, 0.7, 0.9, 1], [0.35, 1, 1, 1]);
  const ctaReveal = useTransform(smoothProgress, [0.74, 0.92], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.74, 0.92], [20, 0]);
  const stampRotate = useTransform(smoothProgress, [0, 1], [0, 180]);

  if (prefersReducedMotion) {
    return (
      <section className="py-24 bg-roast border-y border-latte/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="font-ui text-xs uppercase tracking-[0.2em] text-caramel mb-3">
              ANATOMIA DA XÍCARA
            </p>
            <h2 className="font-display font-light text-4xl sm:text-5xl text-crema leading-[1.12]">
              Desmontando o{' '}
              <em className="italic font-medium text-caramel pb-1">perfeito.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deconstructedLayers.map((layer) => (
              <article
                key={layer.id}
                className="rounded-2xl border border-latte/15 bg-mocha/60 p-5 flex flex-col gap-4"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-espresso">
                  <img
                    src={layer.photo}
                    alt={layer.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-2xl text-crema">{layer.title}</h3>
                <p className="text-sm text-latte leading-relaxed">{layer.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex justify-start">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-caramel text-espresso font-ui text-xs font-semibold uppercase tracking-[0.12em] hover:bg-amber transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="Desmontando o perfeito - camadas do café especial"
      className="relative h-[230vh] md:h-[250vh] bg-gradient-to-b from-espresso via-roast to-espresso"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        {/* Glow de estúdio ao fundo */}
        <div
          className="absolute inset-0 bg-studio-radial opacity-85 pointer-events-none"
          aria-hidden="true"
        />

        {/* Tipografia editorial em plano de fundo */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-4"
          aria-hidden="true"
        >
          <p className="font-display font-bold text-center text-[clamp(3.2rem,11vw,9.5rem)] leading-[0.95] tracking-[-0.04em] text-crema/[0.06] uppercase max-w-6xl">
            Desmontando o perfeito
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Coluna esquerda: Título e legendas progressivas */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div>
                <p className="font-ui text-xs uppercase tracking-[0.2em] text-caramel mb-2">
                  ANATOMIA DA XÍCARA
                </p>
                <h2 className="font-display font-light text-3xl sm:text-5xl md:text-6xl text-crema leading-[1.1] tracking-[-0.02em]">
                  Desmontando o{' '}
                  <em className="italic font-medium text-caramel pb-1 inline-block">
                    perfeito.
                  </em>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                <motion.div
                  style={{ opacity: cap1Opacity }}
                  className="rounded-2xl border border-latte/15 bg-mocha/55 backdrop-blur-sm p-3.5 sm:p-4"
                >
                  <h3 className="font-display text-base sm:text-lg text-crema">
                    {deconstructedLayers[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-latte mt-0.5 leading-relaxed">
                    {deconstructedLayers[0].description}
                  </p>
                </motion.div>

                <motion.div
                  style={{ opacity: cap2Opacity }}
                  className="rounded-2xl border border-latte/15 bg-mocha/55 backdrop-blur-sm p-3.5 sm:p-4"
                >
                  <h3 className="font-display text-base sm:text-lg text-crema">
                    {deconstructedLayers[1].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-latte mt-0.5 leading-relaxed">
                    {deconstructedLayers[1].description}
                  </p>
                </motion.div>

                <motion.div
                  style={{ opacity: cap3Opacity }}
                  className="rounded-2xl border border-latte/15 bg-mocha/55 backdrop-blur-sm p-3.5 sm:p-4"
                >
                  <h3 className="font-display text-base sm:text-lg text-crema">
                    {deconstructedLayers[2].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-latte mt-0.5 leading-relaxed">
                    {deconstructedLayers[2].description}
                  </p>
                </motion.div>

                <motion.div
                  style={{ opacity: cap4Opacity }}
                  className="rounded-2xl border border-latte/15 bg-mocha/55 backdrop-blur-sm p-3.5 sm:p-4"
                >
                  <h3 className="font-display text-base sm:text-lg text-crema">
                    {deconstructedLayers[3].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-latte mt-0.5 leading-relaxed">
                    {deconstructedLayers[3].description}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Coluna direita: Palco Parallax 2.5D de 4 camadas centralizado */}
            <div className="lg:col-span-7 relative h-[320px] sm:h-[420px] lg:h-[500px] flex items-center justify-center [perspective:1000px]">
              {/* Camada 1: Grão especial */}
              <motion.div
                style={{
                  y: layer1Y,
                  scale: layer1Scale,
                  rotateY: layer1RotY,
                  opacity: layer1Opacity,
                }}
                className="absolute top-2 left-2 sm:left-8 w-32 h-32 sm:w-44 sm:h-44 z-10 will-change-transform"
              >
                <div className="w-full h-full rounded-full overflow-hidden mask-radial-soft border border-caramel/25 shadow-2xl shadow-espresso">
                  <img
                    src={deconstructedLayers[0].photo}
                    alt={deconstructedLayers[0].alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Camada 2: Crema */}
              <motion.div
                style={{
                  y: layer2Y,
                  scale: layer2Scale,
                  rotateX: layer2RotX,
                  opacity: layer2Opacity,
                }}
                className="absolute top-4 right-2 sm:right-6 w-32 h-32 sm:w-48 sm:h-48 z-20 will-change-transform"
              >
                <div className="w-full h-full rounded-full overflow-hidden mask-radial-soft border border-amber/25 shadow-2xl shadow-espresso">
                  <img
                    src={deconstructedLayers[1].photo}
                    alt={deconstructedLayers[1].alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Camada 3: Latte art (protagonista central) */}
              <motion.div
                style={{
                  y: layer3Y,
                  scale: layer3Scale,
                  opacity: layer3Opacity,
                }}
                className="relative z-30 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 will-change-transform"
              >
                <div className="w-full h-full rounded-full overflow-hidden mask-radial-tight border border-caramel/40 shadow-[0_24px_64px_rgba(20,16,13,0.9)]">
                  <img
                    src={deconstructedLayers[2].photo}
                    alt={deconstructedLayers[2].alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Selo circular rotativo */}
                <motion.div
                  style={{ rotate: stampRotate }}
                  className="hidden sm:flex absolute -bottom-3 -right-5 w-24 h-24 rounded-full bg-roast/90 border border-caramel/35 items-center justify-center shadow-xl"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full p-1">
                    <defs>
                      <path
                        id="circleStampPath"
                        d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      />
                    </defs>
                    <text className="fill-latte text-[8.3px] font-ui uppercase tracking-[0.2em]">
                      <textPath href="#circleStampPath">
                        MB COFFEE DESIGN · CAFÉ ESPECIAL ·
                      </textPath>
                    </text>
                  </svg>
                  <Coffee className="w-5 h-5 text-amber absolute" strokeWidth={1.75} />
                </motion.div>
              </motion.div>

              {/* Camada 4: O acompanhamento */}
              <motion.div
                style={{
                  y: layer4Y,
                  scale: layer4Scale,
                  opacity: layer4Opacity,
                }}
                className="absolute bottom-2 left-4 sm:left-14 w-32 h-32 sm:w-44 sm:h-44 z-20 will-change-transform"
              >
                <div className="w-full h-full rounded-full overflow-hidden mask-radial-soft border border-latte/25 shadow-2xl shadow-espresso">
                  <img
                    src={deconstructedLayers[3].photo}
                    alt={deconstructedLayers[3].alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* CTA revelado quando as camadas se encontram */}
              <motion.div
                style={{ opacity: ctaReveal, y: ctaY }}
                className="absolute bottom-0 right-2 sm:right-6 z-40"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-caramel text-espresso font-ui text-xs font-semibold uppercase tracking-[0.12em] hover:bg-amber transition-colors shadow-[0_0_28px_rgba(232,168,87,0.45)] whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  <span>Pedir recomendação ao Mauro</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
