/**
 * name : responses.js
 * author : Vishnudas
 * created-date : 31-Jan-2024
 * Description : API response used in the service
 */
const { elevateLog, correlationId } = require('elevate-logger')
const logger = elevateLog.init()

const successResponse = ({ message, success = true, status = 200, result = {}, meta = {} }) => {
	let response = {
		message,
		success,
		status,
		result,
		meta: { ...meta, correlation: correlationId.getId() },
	}
	logger.info('Request Response', { response: response })

	return response
}

const failureResponse = ({ message, success = false, status = 500 }) => {
	return {
		message,
		success,
		status,
	}
}
module.exports = {
	successResponse,
	failureResponse,
}
