const FeatureCard = ({ title, description, icon }) => {
  // Render appropriate icon based on the icon prop
  const renderIcon = () => {
    switch (icon) {
      case 'mobile':
        return (
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 6.06a3.94 3.94 0 1 1-3.94 3.94A3.94 3.94 0 0 1 10 6.06zM6.51 0h6.97a2.17 2.17 0 0 1 2.17 2.16v15.68a2.17 2.17 0 0 1-2.17 2.16H6.51a2.16 2.16 0 0 1-2.16-2.16V2.16A2.16 2.16 0 0 1 6.51 0zM4.99 17.01h10.02V2.34H4.99v14.67zM10 17.7a0.89 0.89 0 1 1-0.89 0.89 0.89 0.89 0 0 1 0.89-0.89zM10.63 7.2l-0.26 1.7h1.09L9.35 13.07l0.5-2.54-1.3 0.02 2.1-3.61-0.03 0.27z" />
          </svg>
        );
      case 'web':
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0041 0.9959H0.9959C0.4466 0.9959 0 1.4425 0 1.9918v16.0162c0 0.5493 0.4466 0.9959 0.9959 0.9959h18.0082c0.5493 0 0.9959-0.4466 0.9959-0.9959V1.9918C20 1.4425 19.5534 0.9959 19.0041 0.9959zM16.58 3.0082c0.6174 0 1.118 0.5006 1.118 1.118c0 0.6173-0.5006 1.118-1.118 1.118c-0.6173 0-1.118-0.5007-1.118-1.118C15.462 3.5088 15.9627 3.0082 16.58 3.0082zM13.0488 3.0082c0.6173 0 1.118 0.5006 1.118 1.118c0 0.6173-0.5007 1.118-1.118 1.118c-0.6173 0-1.118-0.5007-1.118-1.118C11.9308 3.5088 12.4315 3.0082 13.0488 3.0082zM9.5177 3.0082c0.6173 0 1.118 0.5006 1.118 1.118c0 0.6173-0.5007 1.118-1.118 1.118c-0.6173 0-1.118-0.5007-1.118-1.118C8.3997 3.5088 8.9004 3.0082 9.5177 3.0082zM18.3334 17.3384H1.6666V6.8293h16.6668V17.3384z"/>
            <rect x="3.4146" y="8.5842" width="8.8414" height="1.7816"/>
            <rect x="3.4146" y="12.1615" width="13.1707" height="1.7816"/>
          </svg>
        );
      case 'firebase':
        return (
          <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.057 19.96c0.195 0.104 0.402-0.121 0.282-0.307c-0.65-1.011-1.264-2.712-0.285-4.903
              c1.634-3.653 2.628-5.544 2.628-5.544s0.529 2.207 1.962 4.171c1.38 1.889 2.135 4.265 0.917 6.245
              c-0.114 0.186 0.087 0.405 0.281 0.306c1.507-0.771 3.197-2.317 3.388-5.394c0.07-0.94-0.035-2.257-0.562-3.918
              c-0.678-2.105-1.512-3.088-1.994-3.51c-0.144-0.126-0.369-0.014-0.357 0.177c0.141 2.272-0.714 2.849-1.2 1.549
              c-0.194-0.519-0.308-1.416-0.308-2.51c0-1.82-0.528-3.693-1.692-5.215c-0.303-0.396-0.657-0.766-1.063-1.081
              c-0.147-0.114-0.36 0.001-0.347 0.186c0.089 1.234 0.008 4.77-3.093 8.993c-2.813 3.918-1.723 6.928-1.336 7.742
              C5.023 18.533 6.055 19.504 7.057 19.96z"/>
          </svg>
        );  
      default:
        return (
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
      <div className="w-16 h-16 bg-blue-100 text-primary rounded-lg flex items-center justify-center mb-6">
        {renderIcon()}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;