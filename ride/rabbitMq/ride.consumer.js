import amqp from 'amqplib'
export const listenForRideAccept = async ()=>{
    try {
        const connection = await amqp.connect('amqp://localhost')
        const channel = await connection.createChannel();
        const exchange = "captain_exchange";
        const routingKey = "captain.ride.accept.routingKey"
        const queue = "captain.ride.accept.queue";
        await channel.assertExchange(exchange,'direct',{durable:true})
        await channel.assertQueue(queue,{durable:false})
        await channel.bindQueue(queue,exchange,routingKey);
        console.log("ride getting status from captain for acceptance");

        channel.consume(queue,(msg)=>{
            if(msg !== null){
                const rideAccept = JSON.parse(msg.content.toString());
                console.log("captain Accept Ride",rideAccept);
                channel.ack(msg);
            }
        })
    } catch (error) {
        console.log(error);
    }
}
listenForRideAccept();