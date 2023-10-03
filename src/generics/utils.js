/**
 * name : jobs.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : jobs helper.
 */

//Dependencies
const kafkaCommunication = require('../generics/kafka-communication')
const md5 = require('md5')

//Push error mail to Kafka
const sendErrorMail = async (email, jobData, errorDetails) => {
	try {
		const payload = {
			type: 'email',
			email: {
				to: email,
				subject: 'Job Failure Report : ' + jobData.name, // Subject line
				body: `Details Name : ${jobData.name} URL : ${jobData.data.request.url} Fail reason : ${JSON.stringify(
					errorDetails
				)}`,
			},
		}
		await kafkaCommunication.pushEmailToKafka(payload)
	} catch (err) {
		throw err
	}
}

function md5Hash(value) {
	return md5(value)
}

const getIstDate = () => {
	return new Date(new Date().getTime() + (5 * 60 + 30) * 60000)
}

module.exports = {
	sendErrorMail,
	md5Hash,
	getIstDate,
}
