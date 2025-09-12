import rateLimit from 'express-rate-limit';

// middleware/limit.js
import rateLimit from 'express-rate-limit';

export const globalLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 500 requests per window
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
    message: {
      status: 429,
      message: "Too many requests. Please try again later."
    }
  });


app.use(globalLimiter); 
