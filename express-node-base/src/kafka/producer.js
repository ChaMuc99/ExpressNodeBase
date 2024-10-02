const { Kafka, Partitioners } = require('kafkajs');  // Correct import
const kafkaConfig = require('./config');  // Make sure this config is correctly structured

const kafka = new Kafka(kafkaConfig); 
const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,  // Use the legacy partitioner
  });

async function sendMessage(topic, message) {
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify(message) }],  // Correct 'value' typo
    });
    await producer.disconnect();
}

module.exports = { sendMessage };
