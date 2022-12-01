/**
 * name : generics/kafka-communication
 * author : Vishnudas
 * Date : 12-may-2022
 * Description : Kafka producer methods
 */

const pushEmailToKafka = async (message) => {
	try {
		const payload = { topic: process.env.NOTIFICATION_KAFKA_TOPIC, messages: [{ value: JSON.stringify(message) }] }
		return await pushPayloadToKafka(payload)
	} catch (error) {
		throw error
	}
}

const pushPayloadToKafka = (payload) => {
	return new Promise(async function (resolve, reject) {
		let response = await kafkaProducer.send(payload)
		if (response) {
			resolve(response)
		} else {
			reject(false)
		}
	})
}

module.exports = {
	pushEmailToKafka,
}
