/*
 *   name : configs/kafka.js
 *   author : Vishnudas
 *   date : 12-may-2022
 *   description : kafka connection configaration
 */

//Dependencies

const { Kafka } = require('kafkajs')

module.exports = async () => {
	const kafkaIps = process.env.KAFKA_URL.split(',')
	const KafkaClient = new Kafka({
		clientId: 'mentoring',
		brokers: kafkaIps,
	})

	/* Uncomment while writing consuming actions for this service */
	// const Consumer = Kafka.Consumer;
	// const consumer = new Consumer(KafkaClient, [ { topic: process.env.KAFKA_TOPIC } ], { autoCommit: true, groupId: process.env.KAFKA_GROUP_ID })

	/* Registered events */

	const producer = KafkaClient.producer()
	await producer.connect()

	producer.on('producer.connect', () => {
		console.log(`KafkaProvider: connected`)
	})

	producer.on('producer.disconnect', () => {
		console.log(`KafkaProvider: could not connect`)
	})

	global.kafkaProducer = producer
	global.kafkaClient = KafkaClient
}
