import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
  const whatsappLink = `https://wa.me/917715010026?text=${whatsappMessage}`;

  // Optimize image with Cloudinary transformations
  const optimizeImage = (imageUrl) => {
    if (!imageUrl) return '';
    return imageUrl.replace('/upload/', '/upload/f_auto,q_auto,w_500,c_limit/');
  };

  return (
    <div className="product-card animate-fadeIn">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={optimizeImage(product.image)} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
          {product.featured && (
            <span className="absolute top-3 right-3 bg-baby-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-5">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg text-gray-800 hover:text-baby-pink-600 transition-colors mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-baby-pink-600">
            ₹{product.price}
          </span>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm py-2 px-4"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
