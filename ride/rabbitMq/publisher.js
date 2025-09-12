import amqp from "amqplib";

export const publishRideNotification = async (ride) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "ride_exchange";
    const routingKey = "ride.created";

    await channel.assertExchange(exchange, "direct", { durable: true });

    const messageBuffer = Buffer.from(JSON.stringify({
      rideId: ride._id,
      user: ride.user,
      pickup: ride.pickup,
      destination: ride.destination,
      fare: ride.fare,
    }));

    channel.publish(exchange, routingKey, messageBuffer);
    console.log("📤 Ride message published to RabbitMQ");

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (err) {
    console.error("❌ Error publishing ride notification:", err);
  }
};
