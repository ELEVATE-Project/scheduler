/**
 * name : configs/mongodb
 * author : vishnu
 * Date : 22-june-2022
 * Description : Mongodb connections configurations
 */

//Dependencies
const mongoose = require('mongoose')
const { elevateLog } = require('elevate-logger')
const logger = elevateLog.init()
module.exports = function () {
	// Added to remove depreciation warnings from logs.

	let parameters = ''
	if (process.env.REPLICA_SET_NAME) {
		parameters = '?replicaSet=' + process.env.REPLICA_SET_NAME
	}
	if (process.env.REPLICA_SET_NAME && process.env.REPLICA_SET_READ_PREFERENCE) {
		parameters = parameters + '&readPreference=' + process.env.REPLICA_SET_READ_PREFERENCE
	}

	const db = mongoose.createConnection(process.env.MONGODB_URL + parameters, {
		useNewUrlParser: true,
	})

	db.on('error', function () {
		logger.error('Database connection error:')
	})

	db.once('open', function () {
		logger.info('Connected to DB')
	})
	global.db = db
}
