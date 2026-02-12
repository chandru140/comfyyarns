import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Link to="/shop" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I am interested in ${product.name} priced at ₹${product.price}`
  );
  const whatsappLink = `https://wa.me/917715010026?text=${whatsappMessage}`;

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-baby-pink-600">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-baby-pink-600">Shop</Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="card overflow-hidden">
            <img
              src={product.image.replace('/upload/', '/upload/f_auto,q_auto,w_800,c_limit/')}
              alt={product.name}
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {product.featured && (
              <span className="inline-block bg-baby-pink-100 text-baby-pink-700 text-sm px-4 py-1 rounded-full mb-4 w-fit">
                ✨ Featured Product
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-baby-pink-600 mb-6">
              ₹{product.price}
            </p>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 mb-2">Handmade Details</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-baby-pink-500">✓</span>
                  100% Handmade with love
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-baby-pink-500">✓</span>
                  Premium quality yarn
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-baby-pink-500">✓</span>
                  Unique, one-of-a-kind piece
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-baby-pink-500">✓</span>
                  Made with care and attention to detail
                </li>
              </ul>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp justify-center text-lg py-4"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Buy on WhatsApp
            </a>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
