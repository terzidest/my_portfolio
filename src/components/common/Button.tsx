import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-primary border border-primary hover:bg-gray-50 focus:ring-blue-500',
    outline: 'bg-transparent text-primary border border-primary hover:bg-blue-50 focus:ring-blue-500',
    text: 'bg-transparent text-primary hover:text-blue-700 hover:underline',
    dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500',
  };

  const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  // Render as Link for internal navigation
  if (to) {
    return (
      <Link to={to} className={buttonStyles}>
        {children}
      </Link>
    );
  }

  // Render as anchor for external links
  if (href) {
    return (
      <a href={href} className={buttonStyles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  //
  // Render as button for click events
  return (
    <button type="button" className={buttonStyles} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
