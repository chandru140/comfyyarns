import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917715010026';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  // Close lightbox on ESC key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightboxOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // Reset image state when product changes
    setImgLoaded(false);
    setImgError(false);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      const fetchedProduct = response.data.product;
      setProduct(fetchedProduct);

      // Update page title dynamically
      document.title = `${fetchedProduct.name} – ComfyYarns`;

      // Fetch related products (all products except current)
      const allProductsResponse = await api.get('/products');
      const related = allProductsResponse.data.products
        .filter((p) => p._id !== id)
        .slice(0, 4);
      setRelatedProducts(related);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!product) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/shop" className="btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
`Hello! I would like to place an order for:

*${product.name}*

Price: ₹${product.price}

Kindly confirm availability and share payment details.

My Details:
Name:
Address:
Phone:`
  );

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`);
  };

  // Optimized Cloudinary URL — square crop, high quality
  const optimizedImage = product.image
    ? product.image.replace('/upload/', '/upload/f_auto,q_auto,w_800,h_800,c_fill,g_auto/')
    : '';

  return (
    <div className="section-padding animate-fadeIn">
      <div className="container-custom">

        {/* Breadcrumb */}
        <nav className="flex gap-2 text-sm text-gray-500 mb-8 flex-wrap">
          <Link to="/" className="hover:text-baby-pink-600 transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link to="/shop" className="hover:text-baby-pink-600 transition-colors">Shop</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* ── Main Product Section ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20">

          {/* ── LEFT: Image ── */}
          <div className="flex justify-center md:justify-start">
            <div className="w-full max-w-lg group">
              {/* Image container — 1:1 aspect */}
              <div className="relative w-full aspect-square bg-pink-50 rounded-3xl overflow-hidden shadow-lg border border-pink-100">
                {/* Skeleton shimmer */}
                {!imgLoaded && !imgError && (
                  <div className="skeleton absolute inset-0 rounded-3xl" />
                )}

                {/* Error fallback */}
                {imgError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-50 text-6xl gap-3">
                    <span>🧶</span>
                    <span className="text-sm text-gray-400 font-medium">Image unavailable</span>
                  </div>
                )}

                {/* Product image — click to open lightbox */}
                {!imgError && (
                  <img
                    src={optimizedImage}
                    alt={product.name}
                    className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-[1.04] cursor-zoom-in ${
                      imgLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    decoding="async"
                    onLoad={() => setImgLoaded(true)}
                    onError={() => { setImgError(true); setImgLoaded(true); }}
                    onClick={() => !imgError && setLightboxOpen(true)}
                  />
                )}

                {/* Click to expand hint */}
                {imgLoaded && !imgError && (
                  <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm pointer-events-none">
                    🔍 Click to expand
                  </div>
                )}

                {/* Featured badge */}
                {product.featured && (
                  <span className="absolute top-4 left-4 bg-baby-pink-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md font-medium">
                    ✨ Featured
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Product Details ── */}
          <div className="flex flex-col justify-center">
            {/* Category tag */}
            {product.category && (
              <span className="inline-block text-xs font-semibold text-baby-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full mb-4 w-fit uppercase tracking-wider">
                {product.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 leading-tight">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-baby-pink-600 mb-6">
              ₹{product.price}
            </p>

            {/* Divider */}
            <div className="w-16 h-1 bg-gradient-to-r from-pink-300 to-pink-100 rounded-full mb-6" />

            {/* Description */}
            <div className="mb-7">
              <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wider">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Handmade badges */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wider">Why you'll love it</h3>
              <ul className="space-y-2">
                {[
                  '100% Handmade with love 💕',
                  'Premium quality yarn',
                  'Unique, one-of-a-kind piece',
                  'Made with care & attention to detail',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-600 text-sm">
                    <span className="w-5 h-5 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-baby-pink-500 text-xs shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-secondary justify-center flex items-center gap-2 text-base py-3.5 rounded-2xl"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-whatsapp justify-center text-base py-3.5 rounded-2xl"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Buy on WhatsApp
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                { icon: '🚚', label: 'Ships in 3–5 days' },
                { icon: '🎁', label: 'Gift wrapping available' },
                { icon: '💬', label: 'WhatsApp support' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">You Might Also Like</h2>
              <div className="flex-1 h-px bg-pink-100" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Lightbox Modal ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn p-4"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-all backdrop-blur-sm"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Full image */}
          <img
            src={product.image?.replace('/upload/', '/upload/f_auto,q_auto,w_1200/')}
            alt={product.name}
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
