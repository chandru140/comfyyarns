import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import comfyYarnsLogo from '../assets/comfyyarns.jpeg';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const isAdminLoggedIn = Boolean(localStorage.getItem('adminToken'));

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-pink-md sticky top-0 z-50 transition-all duration-300">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="logo-text group">
             <img 
              src={comfyYarnsLogo} 
              alt="Comfy Yarns" 
              className="h-20 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`relative font-medium transition-colors duration-300 ${
                  isActive(link.path) 
                    ? 'text-baby-pink-600' 
                    : 'text-gray-700 hover:text-baby-pink-600'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-baby-pink-500 transform origin-left transition-transform duration-300 ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                }`}></span>
              </Link>
            ))}

            {/* Cart icon with count badge */}
            <Link to="/cart" className="relative text-gray-700 hover:text-baby-pink-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-baby-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin dashboard link — only shown when already logged in */}
            {isAdminLoggedIn && (
              <Link 
                to="/admin/dashboard" 
                className="btn-primary text-sm py-2.5 px-6 shadow-pink-sm hover:shadow-pink-md transform hover:-translate-y-0.5 transition-all"
              >
                Dashboard
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Cart Icon */}
            <Link to="/cart" className="relative text-gray-700 hover:text-baby-pink-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-baby-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="text-gray-700 hover:text-baby-pink-600 focus:outline-none transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-64 opacity-100 mb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-baby-pink-50 text-baby-pink-600 font-semibold border-l-4 border-baby-pink-500 pl-3'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-baby-pink-600 font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdminLoggedIn && (
              <Link 
                to="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center mx-4 mt-2"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
