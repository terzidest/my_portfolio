import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ResponsiveImage from './ResponsiveImage';
import type { ResponsiveImageSource } from '../../types';

const source: ResponsiveImageSource = {
  src: '/image.png',
  webpSrcSet: '/image-320.webp 320w, /image-640.webp 640w',
  width: 640,
  height: 320,
  alt: 'Example screenshot',
  sizes: '50vw',
};

describe('ResponsiveImage', () => {
  it('renders responsive metadata and clears the placeholder on load', () => {
    render(<ResponsiveImage source={source} loading="eager" />);
    const image = screen.getByRole('img', { name: source.alt });
    expect(image).toHaveAttribute('width', '640');
    expect(image).toHaveAttribute('height', '320');
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).not.toHaveAttribute('sizes');
    expect(document.querySelector('source')).toHaveAttribute('srcset', source.webpSrcSet);
    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();

    fireEvent.load(image);
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument();
  });

  it('falls back once when the original source fails', () => {
    render(<ResponsiveImage source={source} />);
    const image = screen.getByRole('img', { name: source.alt });
    fireEvent.error(image);
    expect(image.getAttribute('src')).toContain('assets/images/placeholder.jpg');
    expect(document.querySelector('source')).not.toBeInTheDocument();
    fireEvent.error(image);
    expect(screen.queryByTestId('image-placeholder')).not.toBeInTheDocument();
  });
});
