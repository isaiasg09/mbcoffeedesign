import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram as InstagramIcon } from 'lucide-react';
import { business, photos } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Instagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 md:py-36 bg-espresso overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-latte/15 bg-gradient-to-br from-roast via-mocha/75 to-espresso p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-light text-4xl sm:text-5xl text-crema leading-[1.12] tracking-[-0.02em]">
              Acompanhe os{' '}
              <em className="italic font-medium text-caramel pb-1 inline-block">
                bastidores.
              </em>
            </h2>
            <p className="text-base sm:text-lg text-latte leading-[1.7] max-w-xl">
              Extrações do dia, fornadas quentinhas de croissant, latte art ao vivo e o clima da casa direto no nosso perfil oficial.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-caramel text-espresso font-ui text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] hover:bg-amber transition-colors shadow-[0_0_24px_rgba(201,139,75,0.28)] whitespace-nowrap min-h-[44px]"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Seguir {business.instagramHandle} no Instagram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Moldura estilizada do perfil */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir perfil ${business.instagramHandle} no Instagram`}
              whileHover={prefersReducedMotion ? undefined : { y: -6, rotate: 0.5 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="group relative w-64 sm:w-72 aspect-[9/14] rounded-[2rem] overflow-hidden border border-caramel/40 bg-espresso shadow-[0_24px_60px_rgba(20,16,13,0.9)] block"
            >
              <img
                src={photos[4]}
                alt="Croissant artesanal e café em camadas na MB Coffee Design"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-espresso/40" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-crema">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-espresso/75 backdrop-blur-md border border-latte/20 font-ui tracking-wider">
                  <InstagramIcon className="w-3.5 h-3.5 text-amber" />
                  <span>{business.instagramHandle}</span>
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-lg text-crema">
                  {business.name}
                </p>
                <p className="text-xs text-latte mt-0.5">
                  Toque para visitar o perfil oficial
                </p>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
