const { elevateLog, correlationId } = require('elevate-logger')
const logger = elevateLog.init()

/**
 * name : common.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : all common constants
 */

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
	ONCE: 'once',
	NOW: 'now',
	EVERY: 'every',
	SUCCESS: 'success',
	FAILED: 'failed',
}
