import express from 'express';
import dotenv from 'dotenv';
import rideRoute from './routes/rideRoute.js';
import connectDb from './config/db.js';
import { listenForRideAccept } from './rabbitMq/ride.consumer.js';


dotenv.config();
const app = express();
app.use(express.json());

// Connect Database
connectDb();
listenForRideAccept()

const PORT = process.env.PORT || 4000;

// Routes
app.use('/', rideRoute);

// Start server after RabbitMQ is ready
const startServer = async () => {
  try {

    app.listen(PORT, () => {
      console.log(`🚀 Ride Service running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
