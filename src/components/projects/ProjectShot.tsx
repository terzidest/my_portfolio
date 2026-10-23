import ResponsiveImage from '../common/ResponsiveImage';
import type { ResponsiveImageSource } from '../../types';

interface ProjectShotProps {
  image: ResponsiveImageSource;
  /** Box the shot fills; give it a height. */
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
  /** Scale up slightly when an ancestor `.group` is hovered. */
  zoomOnHover?: boolean;
  /** Landscape shots size to their own aspect ratio instead of a set height. */
  natural?: boolean;
}

/**
 * A project screenshot sized to its box. Landscape shots fill it; portrait
 * (phone) shots sit in a slim device frame on a soft glow, so a wide box
 * never crops an app screen.
 */
const ProjectShot = ({ image, className = '', loading, sizes, zoomOnHover = false, natural = false }: ProjectShotProps) => {
  const zoom = zoomOnHover ? 'transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]' : '';

  if (image.height <= image.width) {
    const shot = (
      <ResponsiveImage
        source={image}
        loading={loading}
        sizes={sizes}
        containerClassName={`bg-surface-raised ${className}`}
        imageClassName={`h-full w-full object-cover object-top ${zoom}`}
      />
    );
    return natural ? <div style={{ aspectRatio: `${image.width} / ${image.height}` }}>{shot}</div> : shot;
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-[radial-gradient(closest-side,rgb(var(--neon)/0.35),transparent)] py-[6%] ${className}`}
    >
      <div
        className={`h-full overflow-hidden rounded-[22px] border-[5px] border-[#0b1220] shadow-[0_18px_40px_rgb(0_0_0/0.35),0_0_0_1px_rgb(var(--line)/0.3)] ${zoom}`}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        <ResponsiveImage
          source={image}
          loading={loading}
          sizes={sizes}
          containerClassName="h-full w-full"
          imageClassName="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProjectShot;
