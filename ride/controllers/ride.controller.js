import rideModel from '../models/ride.model.js';

import { publishRideNotification } from "../rabbitMq/publisher.js"

export const createRide = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const { pickup, destination, fare } = req.body;
    if (!pickup || !destination || !fare) {
      return res.status(400).json({ message: "Pickup, destination and fare are required" });
    }

    // DB me save
    const ride = new rideModel({
      user: userId,
      pickup,
      destination,
      fare,
      status: "requested",
    });
    await ride.save();

    // // RabbitMQ me publish
    await publishRideNotification(ride);

console.log("Message published to RabbitMQ");

    res.status(201).json({
      message: "Ride requested successfully",
      ride,
    });

  } catch (error) {
    console.error("❌ Error creating ride:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
