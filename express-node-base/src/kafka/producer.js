const { Kafka } = require('kafka-node');
const kafkaConfig = require('./config');

const kafka = new (kafkaConfig);
const producer = kafka.producer();

async function sendMessage(topic, message){
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [{ valu: JSON.stringify(message)}],
    });
    await producer.disconnect();

}
module.exports = { sendMessage };