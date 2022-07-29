/**
 * name : models/log
 * author : Vishnudas
 * Date : 16-may-2022
 * Description : agenda exicution logs schema
 **/
// Dependencies
const mongoose = require('mongoose')
//require('@configs/mongodb')

const Schema = mongoose.Schema

const logsSchema = new Schema({
	jobDetails: {
		type: Object,
		required: true,
	},
	runAt: {
		type: String,
	},
	response: {
		type: Object,
	},
	exicutionStatus: {
		type: String,
	},
	expire_at: {
		type: Date,
		default: Date.now,
		index: { expires: 604800 },
	},
})
const Logs = db.model('logs', logsSchema)
module.exports = Logs
