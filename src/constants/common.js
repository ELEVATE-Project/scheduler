/**
 * name : common.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : all common constants
 */

const successResponse = ({ message, success = true, status = 200, result = {} }) => {
	return {
		message,
		success,
		status,
		result,
	}
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
