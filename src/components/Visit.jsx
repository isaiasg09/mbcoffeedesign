import { motion } from 'framer-motion';
import { Clock, MapPin, MessageCircle, Phone, Star } from 'lucide-react';
import { business, photos, whatsappUrl } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Visit() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="visite"
      className="relative py-24 md:py-36 bg-gradient-to-b from-espresso via-roast to-espresso overflow-hidden"
    >
      {/* Foto noturna da fachada em atmosfera sutil + glow âmbar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={photos[8]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/85 to-espresso" />
        <div className="absolute inset-0 bg-studio-radial opacity-85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Bloco de convite e conversão */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="font-ui text-xs uppercase tracking-[0.2em] text-caramel">
              VISITE A CASA
            </p>
            <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-crema leading-[1.1] tracking-[-0.02em]">
              Sua mesa está{' '}
              <em className="italic font-medium text-caramel pb-1 inline-block">
                esperando.
              </em>
            </h2>
            <p className="text-base sm:text-lg text-latte leading-[1.75] max-w-xl">
              Passe para um espresso rápido, um French Press sem pressa ou um fim de tarde com croissant quentinho no Centro de Sobral.
            </p>

            <div className="inline-flex items-center gap-2.5 rounded-full border border-latte/20 bg-roast/80 px-4 py-2 text-xs text-crema">
              <Star className="w-3.5 h-3.5 fill-amber text-amber" />
              <span>
                4,8 estrelas · {business.reviewCount} avaliações reais no Google
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-caramel text-espresso font-ui text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] hover:bg-amber transition-colors shadow-[0_0_32px_rgba(232,168,87,0.38)] whitespace-nowrap min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={2} />
                <span>Chamar no WhatsApp</span>
              </a>

              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-latte/35 bg-roast/70 text-crema font-ui text-xs sm:text-sm font-medium uppercase tracking-[0.12em] hover:border-amber hover:text-amber transition-colors whitespace-nowrap min-h-[44px]"
              >
                <MapPin className="w-4 h-4" strokeWidth={1.75} />
                <span>Abrir no Google Maps</span>
              </a>
            </div>

            <p className="text-xs text-latte/80 tracking-wide">
              Resposta rápida · Sem compromisso
            </p>
          </motion.div>

          {/* Cartão de endereço, telefone, horários e preview visual */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl border border-latte/20 bg-roast/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl shadow-espresso/80 space-y-6">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-latte/15 bg-mocha">
                <img
                  src={photos[8]}
                  alt="Fachada noturna iluminada da MB Coffee Design no Centro de Sobral"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-xl text-crema">
                      Centro, Sobral
                    </p>
                    <p className="text-xs text-latte">
                      {business.streetAddress} - {business.postalCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-latte/10 bg-mocha/60 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-caramel">
                    <MapPin className="w-4 h-4" />
                    <span className="font-ui text-xs uppercase tracking-[0.14em]">
                      Endereço
                    </span>
                  </div>
                  <p className="text-sm text-crema leading-relaxed">
                    {business.address}
                  </p>
                </div>

                <div className="rounded-2xl border border-latte/10 bg-mocha/60 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-caramel">
                    <Phone className="w-4 h-4" />
                    <span className="font-ui text-xs uppercase tracking-[0.14em]">
                      Telefone
                    </span>
                  </div>
                  <a
                    href={business.phoneHref}
                    className="inline-block text-sm font-medium text-crema hover:text-amber transition-colors py-1"
                  >
                    {business.phoneDisplay}
                  </a>
                </div>

                <div className="sm:col-span-2 rounded-2xl border border-latte/10 bg-mocha/60 p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-caramel">
                    <Clock className="w-4 h-4" />
                    <span className="font-ui text-xs uppercase tracking-[0.14em]">
                      Horários de funcionamento
                    </span>
                  </div>
                  <p className="text-sm text-latte leading-relaxed">
                    {business.hours}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
