/**
 * name : jobs.js
 * author : Vishnudas
 * created-date : 19-may-2022
 * Description : jobs helper.
 */

// Dependencies
const utils = require('@generics/utils')
const _ = require('lodash')
const common = require('@constants/common')
const { jobsReady, agenda, defineJob, scheduleEvery, scheduleNow, scheduleOnce } = require('./agendaServices')
const responseMessage = require('@constants/responseMessage')
const httpResponse = require('@constants/httpResponse')

/**
 * create new job definition
 * @method
 * @name createJobDefinition
 * @param {Object} jobData -request jobData contains job deatails.
 * @returns {JSON} - returns job creation details.
 */

const createJobDefinition = async (jobData) => {
	try {
		const jobDetails = _.omit(jobData, ['schedule'])
		const job = jobDetails || {}
		const jobs = await jobsReady
		const jobExists = await utils.checkForDuplicateJobDefinition(job, jobs)

		if (jobExists == 0) {
			const newJobData = await defineJob(job, jobs, agenda)

			if (newJobData && newJobData.success) {
				const instanceType = (jobData.schedule.scheduleType || '').toLowerCase()

				if (instanceType == common.ONCE && jobData.schedule.interval && jobData.schedule.interval != '') {
					const newInstance = await createJobInstanceForOnce(jobData.name, jobData.schedule.interval)
					return newInstance
				} else if (
					instanceType == common.EVERY &&
					jobData.schedule.interval &&
					jobData.schedule.interval != ''
				) {
					const newInstance = await createJobInstanceForEvery(jobData.name, jobData.schedule.interval)
					return newInstance
				} else {
					const newInstance = await createJobInstanceForNow(jobData.name)
					return newInstance
				}
			}
		} else {
			return {
				message: responseMessage.JOB_DEFINITION_ALREADY_EXISTS,
				success: false,
				status: httpResponse.BAD_REQUEST,
			}
		}
	} catch (err) {
		return {
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		}
	}
}

/**
 * create new job instance that exicute once
 * @method
 * @name jobInstanceForOnce
 * @param {Object} jobName -name of job definition.
 * @param {Object} scheduleTime -job exicution time.
 * @returns {JSON} - returns job instance creation details.
 */

const createJobInstanceForOnce = async (jobName, scheduleTime) => {
	try {
		const job = {
			name: jobName,
			interval: scheduleTime,
		}
		//get all jobs definition from DB
		const jobs = await jobsReady
		//checking job Definition is present
		const jobExists = await utils.checkForDuplicateJobDefinition(job, jobs)

		if (jobExists > 0) {
			const scheduleJob = await scheduleOnce(job, agenda)
			return scheduleJob
		} else {
			return {
				message: responseMessage.JOB_DEFINITION_NOT_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			}
		}
	} catch (err) {
		return {
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		}
	}
}

/**
 * create new job instance that exicute repeatly at given interval
 * @method
 * @name jobInstanceForEvery
 * @param {Object} jobName -name of job definition.
 * @param {Object} scheduleInterval -job exicution interval.
 * @returns {JSON} - returns job instance creation details.
 */

const createJobInstanceForEvery = async (jobName, scheduleInterval) => {
	try {
		const job = {
			name: jobName,
			interval: scheduleInterval,
		}
		//get all jobs definition from DB
		const jobs = await jobsReady
		//checking job Definition is present
		const jobExists = await utils.checkForDuplicateJobDefinition(job, jobs)

		if (jobExists > 0) {
			const scheduleJob = await scheduleEvery(job, agenda)
			return scheduleJob
		} else {
			return {
				message: responseMessage.JOB_DEFINITION_NOT_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			}
		}
	} catch (err) {
		return {
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		}
	}
}

/**
 * create new job instance that exicute immediately.
 * @method
 * @name jobInstanceForNow
 * @param {Object} jobName -name of job definition to be exicuted.
 * @returns {JSON} - returns job instance creation details.
 */

const createJobInstanceForNow = async (jobName) => {
	try {
		const job = {
			name: jobName,
		}
		//get all jobs definition from DB
		const jobs = await jobsReady
		//checking job Definition is present
		const jobExists = await utils.checkForDuplicateJobDefinition(job, jobs)

		if (jobExists > 0) {
			const scheduleJob = await scheduleNow(jobName, agenda)
			return scheduleJob
		} else {
			return {
				message: responseMessage.JOB_DEFINITION_NOT_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			}
		}
	} catch (err) {
		return {
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		}
	}
}

module.exports = {
	createJobDefinition,
	createJobInstanceForOnce,
	createJobInstanceForEvery,
	createJobInstanceForNow,
}
