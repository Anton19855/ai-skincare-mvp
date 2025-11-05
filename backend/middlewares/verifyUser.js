const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

const verifyUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not found' });
  }

  jwt.verify(token,JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        // Token is expired
        return res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
      } else {
        // Other errors, e.g., invalid signature
        return res.status(401).json({ error: 'Invalid token', code: 'INVALID_TOKEN' });
      }
    }

    req.user = decoded; // Attach decoded payload to request
    next();
  });
};

module.exports = verifyUser;
