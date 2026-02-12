import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  category: {
    type: String,
    default: 'Crochet',
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
