import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should match User Service
    req.user = decoded; // decoded contains userId and other info
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
