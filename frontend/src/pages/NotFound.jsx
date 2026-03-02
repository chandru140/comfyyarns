import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found – ComfyYarns';
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center max-w-md mx-auto animate-slideInUp">
        <div className="text-8xl mb-6">🧶</div>
        <h1 className="text-6xl font-bold text-baby-pink-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Oops! This page got tangled up
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looks like the page you're looking for has unraveled. 
          Let's get you back to something cozy!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
          <Link to="/shop" className="btn-secondary">
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
