import type { ResponsiveImageSource } from '../types';

interface ResponsiveImageConfig {
  path: string;
  webpWidths: number[];
  width: number;
  height: number;
  alt: string;
  sizes: string;
}

export const getAssetPath = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;

export const createResponsiveImage = ({
  path,
  webpWidths,
  width,
  height,
  alt,
  sizes,
}: ResponsiveImageConfig): ResponsiveImageSource => {
  const extensionIndex = path.lastIndexOf('.');
  const stem = extensionIndex >= 0 ? path.slice(0, extensionIndex) : path;

  return {
    src: getAssetPath(path),
    webpSrcSet: webpWidths
      .map((candidateWidth) => `${getAssetPath(`${stem}-${candidateWidth}.webp`)} ${candidateWidth}w`)
      .join(', '),
    width,
    height,
    alt,
    sizes,
  };
};
