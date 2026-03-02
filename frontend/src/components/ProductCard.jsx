import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '917715010026';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

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

  // Optimize image with Cloudinary transformations
  const optimizeImage = (imageUrl) => {
    if (!imageUrl) return '';
    return imageUrl.replace('/upload/', '/upload/f_auto,q_auto,w_600,h_600,c_fill,g_auto/');
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart! 🛒`, { duration: 2000 });
  };

  return (
    <div className="product-card group animate-fadeIn">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl bg-pink-50">
          {/* Skeleton loader */}
          {!imgLoaded && !imgError && (
            <div className="skeleton absolute inset-0 rounded-t-2xl" />
          )}

          {/* Actual image */}
          <img
            src={optimizeImage(product.image)}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              setImgError(true);
              setImgLoaded(true);
            }}
          />

          {/* Fallback if image fails */}
          {imgError && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-50 text-5xl">
              🧶
            </div>
          )}

          {/* Featured badge */}
          {product.featured && (
            <span className="absolute top-3 right-3 bg-baby-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-medium">
              ✨ Featured
            </span>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 rounded-t-2xl" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-baby-pink-600 transition-colors mb-1 line-clamp-1 text-base">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-baby-pink-600">
            ₹{product.price}
          </span>
          {product.category && (
            <span className="text-xs bg-pink-50 text-baby-pink-500 px-2 py-0.5 rounded-full border border-pink-100">
              {product.category}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-baby-pink-50 text-baby-pink-600 border-2 border-baby-pink-200 hover:bg-baby-pink-500 hover:text-white hover:border-baby-pink-500 text-sm py-2 px-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-4H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
          </button>

          {/* Buy on WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm py-2 px-4 rounded-xl"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Buy
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
