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
const responseMessage = require('@constants/responseMessage')
const httpResponse = require('@constants/httpResponse')
//import Queue from 'bullmq'

const { Queue, Job, Worker } = require('bullmq')
const Redis = require('ioredis')
/**
 * create new job definition
 * @method
 * @name createJobDefinition
 * @param {Object} jobData -request jobData contains job deatails.
 * @returns {JSON} - returns job creation details.
 */

const createJobDefinition = async (requestBody) => {
	try {
		// Add your own configuration here
		const redisConfiguration = {
			connection: {
				host: 'redis_bullmq',
				port: 6379,
			},
		}

		const myQueue = new Queue('email', redisConfiguration)
		//console.log(myQueue)
		//return myQueue
		const jobDetails = _.omit(requestBody, ['schedule', 'jobName', 'jobId'])
		const job = await myQueue.add(requestBody.jobName, jobDetails, {
			//jobId: requestBody.jobId,
			repeat: {
				pattern: requestBody.schedule,
			},
		})
		console.log('Job added, Job ID:', job.id)
		/* 		let pendingJobs = await myQueue.getJobs(
			['waiting', 'active', 'failed', 'paused', 'delayed', 'completed'],
			0,
			-1,
			true
		)
		console.log(pendingJobs) 
		const redis = new Redis({
			port: 6379,
			host: 'redis',
		})
		const keys = await redis.keys('*')
		console.log(keys)
		const key = await redis.scan('0')
		console.log(key) */
		if (job?.id) {
			return common.successResponse({
				statusCode: 200,
				message: 'Job queued',
				result: job,
			})
		} else
			return common.failureResponse({
				message: 'Unable to add job to queue',
				success: false,
				status: httpResponse.BAD_REQUEST,
			})
		/* 		console.log(job.id)
		const joba = await myQueue.getJob('1')
		console.log(joba.id)
		return true */
	} catch (err) {
		console.log(err)
		return common.failureResponse({
			message: err,
			success: false,
			status: httpResponse.BAD_REQUEST,
		})
	}
}

module.exports = {
	createJobDefinition,
}
