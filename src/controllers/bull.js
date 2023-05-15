/**
 * name : jobs.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : jobs helper.
 */

// Dependencies

const jobsHelper = require('@services/bull')

module.exports = class Jobs {
	/**
	 * @api {post} /scheduler/create
	 * Define And Schedule Job
	 * @apiVersion 1.0.0
	 * @apiGroup jobs
	 * @apiSampleRequest {base URL}/scheduler/jobs/create
	 * @apiUse successBody
	 * @apiUse errorBody
	 * @apiParamExample {json} Response:
	*   {
			"message": "Successfully scheduled job at given time.",
			"success": true,
			"status": "200"
		}
	*/

	/**
	 * Define and schedule job
	 * @method
	 * @name create
	 * @returns {JSON} schedule status message.
	 */
	//make it create
	async create(req, res) {
		try {
			let newJob = await jobsHelper.createJobDefinition(req.body)
			return newJob
		} catch (err) {
			return err
		}
	}
}
