import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { MapPin, MessageCircle, Star } from 'lucide-react';
import { useRef } from 'react';
import { business, photos, whatsappUrl } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SteamCanvas = lazy(() => import('./SteamCanvas'));

function HeroSteamSvgFallback({ reducedMotion }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        className={`w-full h-full opacity-35 ${
          reducedMotion ? '' : 'animate-steamFloat'
        }`}
        viewBox="0 0 800 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter
            id="hero-steam-noise"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.028"
              numOctaves="3"
              seed="7"
              result="noise"
            >
              {!reducedMotion && (
                <animate
                  attributeName="baseFrequency"
                  dur="14s"
                  values="0.014 0.028;0.018 0.022;0.014 0.028"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="56"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <linearGradient id="hero-steam-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#F3E9DC" stopOpacity="0" />
            <stop offset="35%" stopColor="#F3E9DC" stopOpacity="0.22" />
            <stop offset="75%" stopColor="#E8A857" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#F3E9DC" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g filter="url(#hero-steam-noise)">
          <path
            d="M320 740 C260 560, 410 430, 340 220 C310 130, 360 70, 390 20"
            fill="none"
            stroke="url(#hero-steam-grad)"
            strokeWidth="68"
            strokeLinecap="round"
          />
          <path
            d="M470 760 C540 580, 390 420, 465 210 C495 120, 440 60, 420 15"
            fill="none"
            stroke="url(#hero-steam-grad)"
            strokeWidth="52"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

function AnimatedRatingBadge({ reducedMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const raw = useMotionValue(reducedMotion ? business.rating : 3.2);
  const spring = useSpring(raw, { stiffness: 120, damping: 20 });
  const [displayRating, setDisplayRating] = useState(
    reducedMotion ? '4,8' : '3,2'
  );

  useEffect(() => {
    if (inView) {
      raw.set(business.rating);
    }
  }, [inView, raw]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (val) => {
      setDisplayRating(val.toFixed(1).replace('.', ','));
    });
    return () => unsubscribe();
  }, [spring]);

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-3 rounded-full border border-latte/20 bg-roast/80 backdrop-blur-md px-4 py-2 text-xs text-crema shadow-lg shadow-espresso/40"
    >
      <span className="inline-flex items-center gap-1 text-amber font-semibold">
        <Star className="w-3.5 h-3.5 fill-amber text-amber" />
        <span>{displayRating}</span>
      </span>
      <span className="h-3 w-px bg-latte/25" aria-hidden="true" />
      <span className="text-latte">
        {business.reviewCount} avaliações no Google
      </span>
    </div>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [useThreeSteam, setUseThreeSteam] = useState(false);

  useEffect(() => {
    const checkCapability = () => {
      const wideEnough = window.innerWidth >= 768;
      const cores = navigator.hardwareConcurrency || 4;
      setUseThreeSteam(wideEnough && cores >= 4 && !prefersReducedMotion);
    };
    checkCapability();
    window.addEventListener('resize', checkCapability, { passive: true });
    return () => window.removeEventListener('resize', checkCapability);
  }, [prefersReducedMotion]);

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] w-full flex items-center overflow-hidden bg-espresso pt-24 pb-16 md:pb-20"
    >
      {/* Imagem de fundo com Ken Burns sutil */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={photos[7]}
          alt="Xícara de latte art, croissant artesanal e ambiente acolhedor na MB Coffee Design em Sobral"
          fetchPriority="high"
          decoding="async"
          className={`w-full h-full object-cover object-center opacity-55 ${
            prefersReducedMotion ? '' : 'animate-kenburns'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-espresso/35" />
        <div className="absolute inset-0 bg-studio-radial" />
        <div className="absolute inset-0 bg-vignette-noir" />
      </div>

      {/* Camada de vapor orgânico (Three.js desktop / SVG mobile & fallback) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {useThreeSteam ? (
          <Suspense
            fallback={<HeroSteamSvgFallback reducedMotion={prefersReducedMotion} />}
          >
            <SteamCanvas reducedMotion={prefersReducedMotion} />
          </Suspense>
        ) : (
          <HeroSteamSvgFallback reducedMotion={prefersReducedMotion} />
        )}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-ui text-xs uppercase tracking-[0.2em] text-caramel mb-5"
          >
            CAFÉ DE ESPECIALIDADE · SOBRAL, CE
          </motion.p>

          <h1 className="font-display font-light text-[clamp(3rem,8.5vw,7.4rem)] leading-[1.06] tracking-[-0.03em] text-crema">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                Cada xícara,
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block italic font-medium text-caramel leading-[1.12] pb-1"
                initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                uma experiência.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base sm:text-lg text-latte leading-[1.7]"
          >
            Na MB Coffee Design, o café especial encontra o design, a boa música e um anfitrião que te recebe de verdade. Venha viver o seu momento.
          </motion.p>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-caramel text-espresso font-ui text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] hover:bg-amber transition-colors duration-200 shadow-[0_0_32px_rgba(232,168,87,0.35)] active:scale-[0.98] whitespace-nowrap min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              <span>Falar no WhatsApp</span>
            </a>

            <a
              href={business.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-latte/35 bg-roast/60 backdrop-blur-md text-crema font-ui text-xs sm:text-sm font-medium uppercase tracking-[0.12em] hover:border-amber hover:text-amber transition-colors duration-200 active:scale-[0.98] whitespace-nowrap min-h-[44px]"
            >
              <MapPin className="w-4 h-4" strokeWidth={1.75} />
              <span>Como chegar</span>
            </a>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7"
          >
            <AnimatedRatingBadge reducedMotion={prefersReducedMotion} />
          </motion.div>
        </div>
      </div>

      {/* Indicador visual discreto de continuidade */}
      {!prefersReducedMotion && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-px h-10 bg-latte/20 relative overflow-hidden">
            <motion.div
              className="w-full h-4 bg-gradient-to-b from-transparent via-amber to-transparent"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
