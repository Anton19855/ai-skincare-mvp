const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "uploads", // Cloudinary folder
    format: file.mimetype.split('/')[1], // e.g. jpg, png, etc.
    public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '')}` // unique filename
  }),
});

const parser = multer({ storage });

module.exports = parser;
