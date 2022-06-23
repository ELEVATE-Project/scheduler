/**
 * name : configs/mongodb
 * author : vishnu
 * Date : 22-june-2022
 * Description : Mongodb connections configurations
 */

//Dependencies
const mongoose = require('mongoose')

module.exports = function () {
	// Added to remove depreciation warnings from logs.
	const db = mongoose.createConnection(process.env.MONGODB_URL, {
		useNewUrlParser: true,
	})

	db.on('error', function () {
		console.log('Database connection error:')
	})

	db.once('open', function () {
		console.log('Connected to DB')
	})
	global.db = db
}
