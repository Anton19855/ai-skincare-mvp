require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Simple server without MongoDB
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
