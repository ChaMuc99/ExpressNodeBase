const { Kafka } = require('kafkajs');
const kafkaConfig = require('./config');

const kafka = new Kafka(kafkaConfig);  // Initialize Kafka instance with config
const consumer = kafka.consumer({ groupId: 'school-management-group' });  // Set a consumer group ID

async function consumeMessages(topic) {
  try {
    await consumer.connect();  // Connect to Kafka broker
    await consumer.subscribe({ topic, fromBeginning: true });  // Subscribe to the specified topic

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message from ${topic}:`, message.value.toString());

        // Example: Handle the message, e.g., update student info, process registration
        // You can add your logic here
      },
    });

  } catch (error) {
    console.error(`Error in consuming messages: ${error.message}`);  // Handle connection or runtime errors
  }
}

module.exports = { consumeMessages };
