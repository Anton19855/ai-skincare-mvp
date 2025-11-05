const Product = require('../models/Product'); // Your Mongoose model

// Fetch products filtered by skin defect string
exports.getProductsByDefect = async (req, res) => {
  try {
    const defect = req.params.defect;
    if (!defect) {
      return res.status(400).json({ error: 'Defect parameter is required' });
    }

    // Find products where 'notable_effects' or other field matches defect (case insensitive)
    const products = await Product.find({
      $or: [
        { notable_effects: { $regex: defect, $options: 'i' } },
        { skintype: { $regex: defect, $options: 'i' } }
      ]
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
