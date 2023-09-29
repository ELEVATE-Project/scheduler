/**
 * name : jobs.js
 * author : Nevil
 * created-date : 22/May/2023
 * Description : Jobs routes
 */

const jobsService = require('@services/jobs')
module.exports = class Jobs {
	async create(req, res) {
		try {
			let newJob = await jobsService.create(req.body)
			return newJob
		} catch (err) {
			return err
		}
	}
	async remove(req, res) {
		try {
			let newJob = await jobsService.remove(req.body)
			return newJob
		} catch (err) {
			return err
		}
	}
	async list(req, res) {
		try {
			let newJob = await jobsService.list(req.query)
			return newJob
		} catch (err) {
			return err
		}
	}
	async purge(req, res) {
		try {
			let newJob = await jobsService.purge(req.body)
			return newJob
		} catch (err) {
			return err
		}
	}
}
