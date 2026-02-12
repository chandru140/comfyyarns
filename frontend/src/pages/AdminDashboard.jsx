import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Crochet',
    featured: false
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image;

      // Upload image if it's a new file
      if (imageFile) {
        const uploadResponse = await api.post('/upload', { image: formData.image });
        imageUrl = uploadResponse.data.url;
      }

      const productData = {
        ...formData,
        image: imageUrl,
        price: Number(formData.price)
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, productData);
      } else {
        await api.post('/products', productData);
      }

      // Reset form and refresh products
      setFormData({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Crochet',
        featured: false
      });
      setImageFile(null);
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category || 'Crochet',
      featured: product.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      image: '',
      category: 'Crochet',
      featured: false
    });
    setImageFile(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <div className="bg-white shadow-pink-md">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <button onClick={handleLogout} className="btn-secondary text-sm py-2">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom section-padding">
        {/* Actions */}
        <div className="mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : '+ Add New Product'}
          </button>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="card p-8 mb-12 animate-slideInUp">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="e.g., Cozy Blanket"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="input-field"
                    placeholder="e.g., 1500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="textarea-field"
                  placeholder="Describe your product..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!editingProduct}
                  className="input-field"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-4 w-40 h-40 object-cover rounded-xl"
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Crochet, Amigurumi"
                  />
                </div>

                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 text-baby-pink-500 border-gray-300 rounded focus:ring-baby-pink-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Mark as Featured
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              All Products ({products.length})
            </h2>
          </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-full">
                <thead className="bg-baby-pink-50">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Image</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Featured</th>
                    <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-4 md:px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-4 md:px-6 py-4 font-medium text-gray-800 text-sm md:text-base">{product.name}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base">₹{product.price}</td>
                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm md:text-base">{product.category}</td>
                      <td className="px-4 md:px-6 py-4">
                        {product.featured ? (
                          <span className="bg-baby-pink-100 text-baby-pink-700 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs whitespace-nowrap">
                            Featured
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-baby-pink-600 hover:text-baby-pink-700 font-medium text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            {products.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No products yet. Add your first product to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
