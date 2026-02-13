import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products/featured');
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-soft section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center animate-slideInUp">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              ComfyYarns 🧶
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 mb-4 font-logo">
              Crochet is a love language!
            </p>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our collection of beautifully handcrafted crochet products. 
              Each piece is made with care, love, and the finest yarn.
            </p>
            <Link to="/shop" className="btn-primary inline-block">
              Shop Now
            </Link>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-6xl animate-float">🧵</div>
            <div className="text-6xl animate-float" style={{ animationDelay: '0.5s' }}>🌸</div>
            <div className="text-6xl animate-float" style={{ animationDelay: '1s' }}>💕</div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our most loved creations, handpicked just for you
            </p>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No featured products available</p>
          )}

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="gradient-soft section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              About Comfy Yarns
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We believe in the magic of handmade. Every piece we create is crafted with 
              love, care, and attention to detail. Our crochet products are more than just 
              items – they're pieces of art that bring warmth and comfort to your life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From cozy blankets to adorable amigurumi, each creation tells a story. 
              Join our community of crochet lovers and discover the joy of handmade.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Follow Our Journey
          </h2>
          <p className="text-gray-600 mb-8">
            See our latest creations and behind-the-scenes on Instagram
          </p>
          <a 
            href="https://www.instagram.com/comfyyarns/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
