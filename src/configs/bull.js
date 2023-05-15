'use strict'
const { Worker } = require('bullmq')
const needle = require('needle')
const process = require('process')

module.exports = function () {
	try {
		const redisConfiguration = {
			connection: {
				host: 'localhost',
				port: 6379,
			},
		}

		const worker = new Worker(
			'email',
			async (job) => {
				//console.log(job.data)
				const options = {
					headers: job.data.request.header ? job.data.request.header : {},
				}

				needle(job.data.request.method, job.data.request.url, options)
					.then(function (response) {
						console.log('job executed successfully')
						//addExicutionLog(jobDef, common.SUCCESS, { response: common.SUCCESS }, job.attrs.lastRunAt)
						return 'good'
					})
					.catch(function (err) {
						console.log('Job failed', err)
						//throw err
						//addExicutionLog(jobDef, common.FAILED, err, job.attrs.lastRunAt)
						//send mail notification in case of an error
						//sendErrorMail(email, jobDef, err)
					})
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
		worker.on('fail', (job) => {
			console.log(`${job.id} has failed!`)
		})
		process.on('SIGINT', async () => {
			console.log('Shutting down worker')
			await worker.close()
		})
	} catch (err) {
		console.log(err)
		throw err
	}
}
