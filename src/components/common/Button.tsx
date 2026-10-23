import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'dark' | 'energy' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    to?: never;
    href?: never;
  };

type InternalLinkProps = CommonProps &
  Omit<LinkProps, keyof CommonProps | 'to'> & {
    to: LinkProps['to'];
    href?: never;
  };

type ExternalLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'href'> & {
    href: string;
    to?: never;
  };

export type ButtonProps = NativeButtonProps | InternalLinkProps | ExternalLinkProps;

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary',
  secondary: 'bg-white text-primary border border-primary hover:bg-gray-50 focus-visible:ring-primary',
  outline: 'bg-transparent text-primary border border-primary hover:bg-blue-50 dark:hover:bg-blue-500/10 focus-visible:ring-primary',
  text: 'bg-transparent text-primary hover:text-primary-dark hover:underline',
  dark: 'bg-gray-800 text-white hover:bg-gray-900 focus-visible:ring-gray-500',
  // Redesign pills. `energy` is the animated CTA (see the effects layer in index.css).
  energy: 'cta-energy font-semibold focus-visible:ring-neon',
  ghost: 'hover-neon rounded-full font-semibold text-ink border border-line/30 hover:text-ink focus-visible:ring-neon',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};

const pillSizes: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-4 text-sm',
  md: 'min-h-[44px] px-6 text-base',
  lg: 'min-h-[52px] px-7 text-base',
};

const isPill = (variant: ButtonVariant) => variant === 'energy' || variant === 'ghost';

const getStyles = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className = '',
) => isPill(variant)
  ? `inline-flex items-center justify-center gap-2 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ground ${variants[variant]} ${pillSizes[size]} ${className}`
  : `inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${variants[variant]} ${sizes[size]} ${className}`;

// The energy CTA paints its rim and light layers as siblings under the label.
const renderContent = (variant: ButtonVariant | undefined, children: ReactNode) =>
  variant === 'energy' ? (
    <>
      <span className="cta-energy__rim" aria-hidden="true" />
      <span className="cta-energy__fx" aria-hidden="true" />
      <span className="relative z-[3] inline-flex items-center gap-2">{children}</span>
    </>
  ) : children;

const Button = (props: ButtonProps) => {
  if (props.to !== undefined) {
    const { children, to, variant, size, className, ...linkProps } = props;
    return (
      <Link to={to} className={getStyles(variant, size, className)} {...linkProps}>
        {renderContent(variant, children)}
      </Link>
    );
  }

  if (props.href !== undefined) {
    const {
      children,
      href,
      variant,
      size,
      className,
      target = '_blank',
      rel = target === '_blank' ? 'noopener noreferrer' : undefined,
      ...anchorProps
    } = props;
    return (
      <a
        href={href}
        className={getStyles(variant, size, className)}
        target={target}
        rel={rel}
        {...anchorProps}
      >
        {renderContent(variant, children)}
      </a>
    );
  }

  const { children, variant, size, className, type = 'button', ...buttonProps } = props;
  return (
    <button type={type} className={getStyles(variant, size, className)} {...buttonProps}>
      {renderContent(variant, children)}
    </button>
  );
};

export default Button;
