/**
 * name : models/log
 * author : Vishnudas
 * Date : 16-may-2022
 * Description : agenda exicution logs schema
 **/
// Dependencies
const mongoose = require('mongoose')
const connection = require('@configs/mongodb')
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
})

const Logs = connection.model('logs', logsSchema)
module.exports = Logs
