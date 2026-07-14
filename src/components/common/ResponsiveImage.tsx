import { useState } from 'react';
import type { ResponsiveImageSource } from '../../types';

interface ResponsiveImageProps {
  source: ResponsiveImageSource;
  containerClassName?: string;
  imageClassName?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}

const fallbackPath = `${import.meta.env.BASE_URL}assets/images/placeholder.jpg`;

const ResponsiveImage = ({
  source,
  containerClassName = '',
  imageClassName = '',
  loading = 'lazy',
  sizes = source.sizes,
}: ResponsiveImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!loaded && (
        <div
          data-testid="image-placeholder"
          className="shimmer absolute inset-0 overflow-hidden bg-gray-200 dark:bg-slate-600"
          aria-hidden="true"
        />
      )}
      <picture className="contents">
        {!failed && <source type="image/webp" srcSet={source.webpSrcSet} sizes={sizes} />}
        <img
          src={failed ? fallbackPath : source.src}
          alt={source.alt}
          width={source.width}
          height={source.height}
          sizes={sizes}
          loading={loading}
          decoding="async"
          className={`block transition-all duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${imageClassName}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (!failed) {
              setFailed(true);
              setLoaded(false);
            } else {
              setLoaded(true);
            }
          }}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
