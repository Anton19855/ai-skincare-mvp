const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_href: { type: String, required: true },
  product_name: { type: String, required: true },
  product_type: { type: String },
  brand: { type: String },
  notable_effects: { type: String },
  skintype: { type: String },
  price: { type: String },
  description: { type: String },
  picture_src: { type: String },
}, {
  collection: 'products', 
  timestamps: true,
});

const Product = mongoose.models.products || mongoose.model('products', productSchema);

module.exports = Product;
