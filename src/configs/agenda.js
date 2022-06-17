/*
 *   name : configs/agenda.js
 *   author : Vishnudas
 *   date : 17-june-2022
 *   description : db connection establishment via Agenda.
 */
//Dependencies
const Agenda = require('agenda')
const configuration = require('@root/config')

//connect Agenda to default collection--agendaJobs
const agenda = new Agenda({
	db: {
		address: configuration.mongourl,
		collection: configuration.collection ? configuration.collection : undefined,
	},
})

module.exports = {
	agenda,
}
