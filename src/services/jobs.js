/**
 * name : jobs.js
 * author : Nevil
 * created-date : 22/May/2023
 * Description : Jobs helpers
 */
const common = require('@constants/common')
const responseMessage = require('@constants/responseMessage')
const httpResponse = require('@constants/httpResponse')

const { redisConfiguration } = require('@configs/redis')
const { Queue } = require('bullmq')

exports.create = async (requestBody) => {
	try {
		const myQueue = new Queue(process.env.DEFAULT_QUEUE, redisConfiguration)

		const jobExists = await myQueue.getJob(requestBody.jobOptions.jobId)
		const allRepeatableJobs = await myQueue.getRepeatableJobs()
		const repeatableJobExists = allRepeatableJobs.find((job) => job.id === requestBody.jobOptions.jobId)

		if (repeatableJobExists || jobExists) {
			return common.failureResponse({
				message: responseMessage.JOB_EXISTS,
				success: false,
				status: httpResponse.CONFLICT,
			})
		}

		const jobDetails = Object.assign({}, requestBody)
		delete jobDetails.jobName
		delete jobDetails.jobOptions

		const newJob = await myQueue.add(requestBody.jobName, jobDetails, requestBody.jobOptions)

		if (newJob) {
			return common.successResponse({
				status: httpResponse.CREATED,
				message: responseMessage.JOB_QUEUED,
				result: newJob,
			})
		}

		return common.failureResponse({
			message: responseMessage.FAILED_TO_ADD_JOB,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	} catch (err) {
		console.error(err)
		return common.failureResponse({
			message: responseMessage.JOB_NOT_FOUND,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

exports.remove = async (requestBody) => {
	try {
		const myQueue = new Queue(process.env.DEFAULT_QUEUE, redisConfiguration)

		const jobExists = await myQueue.getJob(requestBody.jobId)

		const allRepeatableJobs = await myQueue.getRepeatableJobs()
		const repeatableJobExists = allRepeatableJobs.find((job) => job.id === requestBody.jobId)

		let removedRepeatableJob, removedJob

		if (!jobExists && !repeatableJobExists) {
			return common.failureResponse({
				message: responseMessage.JOB_NOT_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			})
		}

		if (repeatableJobExists) {
			removedRepeatableJob = await myQueue.removeRepeatableByKey(repeatableJobExists.key)
		}

		if (jobExists) {
			await jobExists.remove().then(() => {
				removedJob = true
			})
		}

		if (removedRepeatableJob || removedJob) {
			return common.successResponse({
				status: httpResponse.OK,
				message: responseMessage.JOB_REMOVED,
				result: removedRepeatableJob || removedJob,
			})
		}
		return common.failureResponse({
			message: responseMessage.FAILED_TO_REMOVE_JOB,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	} catch (err) {
		console.error(err)
		return common.failureResponse({
			message: responseMessage.FAILED_TO_PROCESS,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

exports.list = async (query) => {
	try {
		const filters = query.filter ? query.filter.split(',') : [] // Split the filter string if it exists, otherwise use an empty array

		const myQueue = new Queue(process.env.DEFAULT_QUEUE, redisConfiguration)

		let allJobs = await myQueue.getJobs(filters, 0, -1, true)
		allJobs.forEach((pendingJob) => {
			delete pendingJob['data']
		})

		if (allJobs.length === 0) {
			return common.failureResponse({
				message: responseMessage.NO_JOBS_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			})
		}
		return common.successResponse({
			status: httpResponse.OK,
			message: responseMessage.JOB_LIST_FETCHED,
			result: allJobs,
		})
	} catch (err) {
		console.error(err)
		return common.failureResponse({
			message: responseMessage.FAILED_TO_PROCESS,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

exports.purge = async (requestBody) => {
	try {
		const myQueue = new Queue(process.env.DEFAULT_QUEUE, redisConfiguration)
		let isDeleted, deletedJobIds, responseMessageKey
		switch (requestBody.method) {
			case 'clean':
				deletedJobIds = await myQueue.clean(
					requestBody.options.gracePeriod, // 1 minute
					requestBody.options.limit, // max number of jobs to clean
					requestBody.options.jobStatus
				)
				responseMessageKey = 'CLEAN_SUCCESS'
				break
			case 'drain':
				await myQueue.drain(true).then(() => {
					isDeleted = true
				})
				responseMessageKey = 'DRAIN_SUCCESS'

				break
			case 'obliterate':
				await myQueue.obliterate().then(() => {
					isDeleted = true
				})
				responseMessageKey = 'OBLITERATE_SUCCESS'
				break
			default:
				break
		}
		if (deletedJobIds || isDeleted) {
			return common.successResponse({
				status: httpResponse.OK,
				message: responseMessage[responseMessageKey],
				result: deletedJobIds,
			})
		}
		return common.failureResponse({
			message: responseMessage.PURGE_FAILURE,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	} catch (err) {
		console.error(err)
		return common.failureResponse({
			message: responseMessage.FAILED_TO_PROCESS,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}
