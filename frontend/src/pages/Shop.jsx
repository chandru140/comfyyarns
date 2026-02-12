import { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, maxPrice, products]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price
    filtered = filtered.filter((product) => product.price <= maxPrice);

    setFilteredProducts(filtered);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Collection 🧶
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our handmade crochet treasures, each one crafted with love
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-pink-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ₹{maxPrice}
              </label>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-baby-pink-200 rounded-lg appearance-none cursor-pointer accent-baby-pink-500"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-center text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setMaxPrice(10000);
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
