const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const user_route = require('./routes/auth/route')
const analysis_route = require('./routes/analysis/route');
const productRoutes = require('./routes/products/productRoute')

const app = express();

// Security HTTP headers
app.use(helmet());

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
}));

// Logging
app.use(morgan('combined'));

// Parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/auth', user_route);
app.use('/analysis', analysis_route);
app.use('/products', productRoutes);

module.exports = app;
