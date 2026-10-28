import { DESKTOP } from '../hooks/useMediaQuery';

/**
 * The test setup's matchMedia matches nothing, so components render their
 * phone layout. Call this before rendering to get the desktop one.
 */
export const mockDesktopViewport = () => {
  const phone = window.matchMedia;
  window.matchMedia = (query: string) => ({ ...phone(query), matches: query === DESKTOP });
};
