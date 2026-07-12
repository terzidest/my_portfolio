import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Canonical URLs always point at the primary deployment so search engines
// treat the GitHub Pages mirror as a duplicate of Netlify, not a competitor.
const SITE_URL = 'https://terzidest.netlify.app';
const SITE_NAME = 'Triantaphilos Terzides';
const DEFAULT_TITLE = 'Triantaphilos Terzides | Frontend Engineer';

interface PageMeta {
  /** Page-specific title part; omit for the site-wide default. */
  title?: string;
  description: string;
  /** Keep search engines away from soft-404s and other non-content pages. */
  noindex?: boolean;
}

const setMeta = (name: string, content: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
};

/**
 * Sets document title, meta description, canonical URL, and (optionally) a
 * robots noindex for the current route. Call once at the top of each page.
 *
 * Only affects clients that execute JS — Google renders SPAs, but social
 * crawlers don't; site-wide Open Graph tags live statically in index.html.
 */
const usePageMeta = ({ title, description, noindex = false }: PageMeta) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
    setMeta('description', description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    // location.pathname excludes the router basename, so this is identical
    // on both deploy targets.
    canonical.href = `${SITE_URL}${pathname}`;

    if (noindex) {
      setMeta('robots', 'noindex');
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }
  }, [title, description, noindex, pathname]);
};

export default usePageMeta;
