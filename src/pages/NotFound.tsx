import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

const NotFound = () => {
  usePageMeta({
    title: 'Page Not Found',
    description: 'This page does not exist.',
    noindex: true,
  });

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <p className="text-6xl font-bold text-primary mb-4">404</p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Page Not Found</h1>
        <p className="text-gray-600 dark:text-slate-300 mb-8">Sorry, the page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
