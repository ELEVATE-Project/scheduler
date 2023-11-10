'use strict'
const { Worker } = require('bullmq')
const needle = require('needle')
const process = require('process')
let { redisConfiguration } = require('@configs/redis')
const { sendErrorMail } = require('@generics/utils')

module.exports = function () {
	try {
		const worker = new Worker(
			process.env.DEFAULT_QUEUE,
			async (job) => {
				const options = {
					headers: job.data.request.header ? job.data.request.header : {},
				}
				const bodyData = {
					jobId: job.opts.jobId,
					emailTemplateCode: job.opts.emailTemplate,
					jobCreatorOrgId: job.opts.creatorOrgId,
				}
				try {
					needle.request(
						job.data.request.method,
						job.data.request.url,
						bodyData,
						options,
						(error, response, body) => {
							if (!error && response.statusCode === 200) {
								console.log('Request was successful')
								console.log('Response:', body)
							} else {
								console.error('Request failed with error:', error)
								console.error('Response:', body)
							}
						}
					)
				} catch (err) {
					console.log('Job failed', err)
					worker.emit('requestFail', job, err)
					throw new Error(err) //to trigger retries
				}
			},
			redisConfiguration
		)
		worker.concurrency = 5
		if (worker?.id) {
			console.log('Worker initialized with ID:', worker.id)
		}
		worker.on('completed', (job) => {
			console.log(`${job.id} has completed!`)
		})
		worker.on('requestFail', (job, err) => {
			sendErrorMail(job.data.email, job, err)
			console.error(`${job.id} has failed!`)
		})
	} catch (err) {
		console.error(err)
		throw err
	}
}
