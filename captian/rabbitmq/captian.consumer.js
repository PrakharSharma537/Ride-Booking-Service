import amqp from "amqplib";

export const listenForRide = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchange = "ride_exchange";
    const routingKey = "ride.created";
    const queue = "ride.created";

    await channel.assertExchange(exchange, "direct");
    await channel.assertQueue(queue, { durable: true});
    await channel.bindQueue(queue, exchange, routingKey);

    console.log("👨‍✈️ Captain Service is waiting for rides...");

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        const ride = JSON.parse(msg.content.toString());
        console.log("📥 New ride received:", ride);

        channel.ack(msg);
      }
    });
  } catch (err) {
    console.error("❌ Error in Captain Service:", err);
  }
};

listenForRide();
