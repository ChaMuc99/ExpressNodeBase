const Kafka = require('kafka-node');
const kafkaConfig = require('./config');
const { partition } = require('lodash');

const kafka = new Kafka(kafkaConfig);
const consumer = kafka.consumer({ groupId: 'school-managment-group'});

async function consumeMessages(topic) {
    await consumer.connect();
    await consumer.subcribe({ topic, frombeginning: true});

    await consumer.run({
        eachMessage: async ({ topic, partition, message}) => {

            console.log(`Received message from ${topic}:`, message.value.toString());
        },

    });

}

module.exports = consumeMessages