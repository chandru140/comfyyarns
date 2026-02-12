import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import comfyYarnsLogo from '../assets/comfyyarns.jpeg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/admin', label: 'Admin', isButton: true }
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
              link.isButton ? (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="btn-primary text-sm py-2.5 px-6 shadow-pink-sm hover:shadow-pink-md transform hover:-translate-y-0.5 transition-all"
                >
                  {link.label}
                </Link>
              ) : (
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
              )
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-baby-pink-600 focus:outline-none transition-colors"
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
                  link.isButton 
                    ? 'btn-primary text-center mx-4 mt-2' 
                    : isActive(link.path)
                      ? 'bg-baby-pink-50 text-baby-pink-600 font-semibold border-l-4 border-baby-pink-500 pl-3'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-baby-pink-600 font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
