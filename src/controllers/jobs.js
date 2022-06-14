/**
 * name : jobs.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : jobs helper.
 */

// Dependencies

const responseMessage = require('@constants/responseMessage')
const httpResponse = require('@constants/httpResponse')
const { jobsReady, agenda, defineJob } = require('@services/agendaServices')
const jobsHelper = require('@services/jobs')
const utils = require('@generics/utils')

/**
 * @api {get} /jobs/jobList
 * Jobs List
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/jobList
 * @apiUse successBody
 * @apiUse errorBody
* @apiParamExample {json} Response:
* {
"message": "Sucessfully fetched job list",
"status": "200",
"result": {
    "data": [{
            "_id": "627df0e88f801acf12a636cf",
            "name": "job one",
            "url": "http://localhost:5000/jobEvery",
            "method": "post",
            "owner": "vishnu",
            "email": "vishnu@tunerlabs.com"
        }]
    }
}
*/

/**
 * Lists of all jobs defined.
 * @method
 * @name jobList
 * @returns {JSON} List of jobs.
 */

const jobList = async (req, res) => {
	try {
		const list = await jobsReady.then((jobs) => jobs.toArray())
		res.status(200).json({
			message: responseMessage.JOB_LIST_FETCH_SUCCESS,
			status: httpResponse.OK,
			result: {
				data: list,
			},
		})
	} catch (err) {
		res.status(400).json({
			message: err,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

/**
 * @api {post} /scheduleJob
 * Define And Schedule Job
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/scheduleJob
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
 * @name scheduleJob
 * @returns {JSON} schedule status message.
 */

const scheduleJob = async (req, res) => {
	try {
		let newJob = await jobsHelper.createJobDefinition(req.body)
		res.status(newJob.status).json(newJob)
	} catch (err) {
		res.status(400).json({
			message: err,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

/**
 * @api {post} /every
 * Define And Schedule Job
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/every
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
 * Define job intance which repeat exicute at given interval.
 * @method
 * @name every
 * @returns {JSON} schedule status message.
 */

const every = async (req, res) => {
	try {
		//need to add request validation
		const newInstance = await jobsHelper.createJobInstanceForEvery(req.body.name, req.body.interval)
		res.status(newInstance.status).json(newInstance)
	} catch (err) {
		res.status(400).json({
			message: err,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

/**
 * @api {post} /now
 * Define And Schedule Job
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/now
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
 * Define job intance which exicute immediately.
 * @method
 * @name now
 * @returns {JSON} schedule status message.
 */

const now = async (req, res) => {
	try {
		//need to add request validation
		const newInstance = await jobsHelper.createJobInstanceForNow(req.body.name)
		res.status(newInstance.status).json(newInstance)
	} catch (err) {
		res.status(400).json({
			message: err,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

/**
 * @api {post} /once
 * Define And Schedule Job
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/once
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
 * Define job intance which exicute once.
 * @method
 * @name once
 * @returns {JSON} schedule status message.
 */

const once = async (req, res) => {
	try {
		//need to add request validation
		const newInstance = await jobsHelper.createJobInstanceForOnce(req.body.name, req.body.interval)
		res.status(newInstance.status).json(newInstance)
	} catch (err) {
		res.status(400).json({
			message: err,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

/**
 * @api {post} /cancel
 * cancel all instances in DB running on a job.
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/cancel
 * @apiUse successBody
 * @apiUse errorBody
* @apiParamExample {json} Response:
*   {
        "message": "1- job instance cancelled",
        "success": true,
        "status": "200"
    }
*/

/**
 * Delete all job instances those are registered under a job.
 * @method
 * @name cancel
 * @returns {JSON} cancel status message.
 */

const cancel = async (req, res) => {
	try {
		//add validation for job name
		const cancelInstance = await agenda.cancel({ name: req.body.name })
		if (cancelInstance > 0) {
			res.status(200).json({
				message: cancelInstance + responseMessage.JOB_INSTANCE_CANCELLED,
				success: true,
				status: httpResponse.OK,
			})
		} else {
			res.status(400).json({
				message: responseMessage.INSTANCE_NOT_PRESENT,
				success: false,
				status: httpResponse.BAD_REQUEST,
			})
		}
	} catch (err) {
		res.status(400).json({
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

/**
 * @api {delete} /jobs/:jobName
 * delete job data.
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/:sessionName
 * @apiUse successBody
 * @apiUse errorBody
* @apiParamExample {json} Response:
*   {
        "message": "Successfully deleted job data",
        "success": true,
        "status": "200"
    }
*/

/**
 * Delete job data of specified job.
 * @method
 * @name cancel
 * @returns {JSON} deletion status message.
 */

const deleteJob = async (req, res) => {
	try {
		//add validation for param job name
		if (req.params.jobname != '') {
			const job = {
				name: req.params.jobname,
			}
			const jobs = await jobsReady
			const jobExist = await utils.checkForDuplicateJobDefinition(job, jobs)
			if (jobExist > 0) {
				await agenda.cancel({ name: job.name })
				await jobs.deleteOne({ name: job.name })
				res.status(200).json({
					message: responseMessage.JOB_DELETED,
					success: true,
					status: httpResponse.OK,
				})
			} else {
				res.status(400).json({
					message: responseMessage.JOB_NOT_FOUND,
					success: false,
					status: httpResponse.BAD_REQUEST,
				})
			}
		}
	} catch (err) {
		res.status(400).json({
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

/**
 * @api {put} /jobs/:jobName
 * update job data.
 * @apiVersion 1.0.0
 * @apiGroup jobs
 * @apiSampleRequest {base URL}/jobs/:sessionName
 * @apiUse successBody
 * @apiUse errorBody
* @apiParamExample {json} Response:
*   {
        "message": "Successfully updated job",
        "success": true,
        "status": "200"
    }
*/

/**
 * update job data of specified job.
 * @method
 * @name updateJob
 * @returns {JSON} updation status message.
 */

const updateJob = async (req, res) => {
	try {
		//add param validation
		const job = req.body || {}
		job.name = req.params.jobname
		const jobs = await jobsReady
		const jobExist = await utils.checkForDuplicateJobDefinition(job, jobs)
		if (jobExist > 0) {
			await defineJob(job, jobs, agenda)
			res.status(200).json({
				message: responseMessage.JOB_UPDATED,
				success: true,
				status: httpResponse.OK,
			})
		} else {
			res.status(400).json({
				message: responseMessage.JOB_NOT_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			})
		}
	} catch (err) {
		res.status(400).json({
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

module.exports = {
	once,
	every,
	now,
	cancel,
	deleteJob,
	updateJob,
	jobList,
	scheduleJob,
}
