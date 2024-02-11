import {Kafka} from "kafkajs";
import {getLocalBroker, getTopic} from "../config/config.js";
import {convertTimestamp} from "./divers.js";

const isLocalBroker = getLocalBroker();
const redpanda = new Kafka({
    brokers: [
        isLocalBroker ? `${process.env.HOST_IP}:9092` : 'redpanda-0:9092',
        'localhost:19092'
    ]
});
const consumer = redpanda.consumer({
    groupId: 'redpanda-group'
});
const topic = getTopic();


export async function connect() {
    await consumer.connect();
    await consumer.subscribe({topic: topic, fromBeginning: true});
    try {
        await consumer.run({
            eachMessage: async ({topic, partition, message}) => {
                console.log({
                    value: message.value.toString(),
                    timestamp: convertTimestamp(new Date(message.timestamp))
                });
            }
        });
    }
    catch (error) {
        console.error("Error:", error);
    }

}