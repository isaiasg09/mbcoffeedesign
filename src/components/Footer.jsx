import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { business, localMedia, whatsappUrl } from '../data/siteData';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Footer() {
  const footerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  const watermarkY = useTransform(scrollYProgress, [0, 1], [36, -12]);

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 pb-10 bg-roast border-t border-latte/15 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-latte/10">
          <div className="md:col-span-5 space-y-4">
            <a
              href="#top"
              className="inline-flex items-center gap-3.5 group"
              aria-label="Voltar ao topo da página"
            >
              <span className="w-12 h-12 rounded-full overflow-hidden border border-latte/25 bg-crema shrink-0">
                <img
                  src={localMedia.logo}
                  alt="Logo MB Coffee Design"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </span>
              <span className="font-display text-2xl sm:text-3xl text-crema">
                MB Coffee{' '}
                <em className="italic font-medium text-caramel">Design</em>
              </span>
            </a>

            <p className="text-sm sm:text-base text-latte leading-[1.7] max-w-sm">
              {business.tagline}.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="font-ui text-xs uppercase tracking-[0.18em] text-caramel">
              Onde nos encontrar
            </h3>
            <p className="text-sm text-crema/90 leading-relaxed">
              {business.address}
            </p>
            <div className="pt-1 flex flex-col gap-2 text-sm">
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2 text-latte hover:text-amber transition-colors w-fit"
              >
                <Phone className="w-4 h-4 text-caramel" />
                <span>{business.phoneDisplay}</span>
              </a>
              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-latte hover:text-amber transition-colors w-fit"
              >
                <MapPin className="w-4 h-4 text-caramel" />
                <span>Ver rota no Google Maps</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="font-ui text-xs uppercase tracking-[0.18em] text-caramel">
              Contato direto
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-caramel text-espresso font-ui text-xs font-semibold uppercase tracking-[0.12em] hover:bg-amber transition-colors w-fit whitespace-nowrap min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar no WhatsApp</span>
              </a>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-latte hover:text-amber transition-colors w-fit py-1"
              >
                <Instagram className="w-4 h-4 text-caramel" />
                <span>Instagram ({business.instagramHandle})</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-latte/80">
          <p>
            © {new Date().getFullYear()} {business.name}. Todos os direitos reservados.
          </p>
          <p className="font-medium text-crema/90">Feito com ☕ em Sobral</p>
        </div>
      </div>

      {/* Marca d'água tipográfica gigante com Parallax */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y: watermarkY }}
        aria-hidden="true"
        className="mt-8 select-none pointer-events-none text-center will-change-transform"
      >
        <p className="font-display font-bold text-[clamp(3.6rem,15vw,13rem)] leading-[0.82] tracking-[-0.04em] text-crema/[0.04] whitespace-nowrap">
          MB COFFEE
        </p>
      </motion.div>
    </footer>
  );
}
