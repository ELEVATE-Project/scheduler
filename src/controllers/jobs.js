/**
 * name : jobs.js
 * author : Nevil
 * created-date : 22/May/2023
 * Description : Jobs routes
 */

const jobsHelper = require('@services/jobs')
module.exports = class Jobs {
	async create(req, res) {
		try {
			let newJob = await jobsHelper.create(req.body)
			return newJob
		} catch (err) {
			return err
		}
	}
	async remove(req, res) {
		try {
			let newJob = await jobsHelper.remove(req.body)
			return newJob
		} catch (err) {
			return err
		}
	}
	async list(req, res) {
		try {
			let newJob = await jobsHelper.list(req.body)
			return newJob
		} catch (err) {
			return err
		}
	}
}
