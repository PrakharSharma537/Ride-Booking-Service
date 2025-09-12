import amqp from 'amqplib'

export const publishRideAccepted =  async (rideId, captainId,captainName,captainContact) =>{
    try {
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel();
        const exchange = "captain_exchange";
        const routingKey = "captain.ride.accept.routingKey";
        await channel.assertExchange(exchange, "direct", { durable: true });
        const message = {
            rideId,
            captainId,
            captainName,
            captainContact,
            status: 'accepted'
        };

        channel.publish(exchange,routingKey, Buffer.from(JSON.stringify(message)));
        console.log("RideAccepted event published");
        setTimeout(() => {
            connection.close();
            }, 500);
            
    } catch (error) {
        console.log(error)   
    }
   
}
