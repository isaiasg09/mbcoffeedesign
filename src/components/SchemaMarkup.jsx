import { business, faqs, photos } from '../data/siteData';

export default function SchemaMarkup() {
  const siteUrl =
    typeof window !== 'undefined' ? window.location.origin : '';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CafeOrCoffeeShop',
        name: business.name,
        description: business.tagline,
        telephone: business.phoneIntl,
        url: siteUrl || business.maps,
        hasMap: business.maps,
        image: photos.slice(0, 6),
        servesCuisine: ['Café especial', 'Cafeteria artesanal', 'Confeitaria'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: business.streetAddress,
          addressLocality: business.city,
          addressRegion: business.state,
          postalCode: business.postalCode,
          addressCountry: 'BR',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: business.rating,
          reviewCount: business.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        sameAs: [business.instagram],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
