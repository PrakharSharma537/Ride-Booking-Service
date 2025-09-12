import { publishToQueue } from "../rabbitMq/publisher.js";

async function createRide(data) {
  const ride = {
    rideId: Date.now(),
    userId: data.userId,
    pickup: data.pickup,
    drop: data.drop,
    captainId: data.captainId
  };

  // Send to RabbitMQ
  publishToQueue(ride);

  return ride;
}

export  { createRide };
