/**
 * name : jobs.spec.js
 * author : nevil
 * created-date : 9-NOV-2022
 * Description : jobs test cases.
 */
const commonHelper = require('../commonTests')
const { faker } = require('@faker-js/faker')
const jobData = require('./jobData')
const schema = require('./responseSchema')

describe('/scheduler/jobs', () => {
	beforeAll(async () => {
		await commonHelper.loadDefaults()
	})
	afterAll(async () => {})
	it('/list', async () => {
		await jobData.insertJob()
		const response = await request.get('/scheduler/jobs/list')
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.listSchema)
	})
	it('/create-cronJob', async () => {
		const response = await request.post('/scheduler/jobs/create').send({
			jobName: 'emailCronJobBeforeOneHour',
			email: ['nevil@tunerlabs.com'],
			request: {
				url: 'http://mentoring:3000/mentoring/v1/notifications/emailCronJobBeforeOneHour',
				method: 'get',
				header: {
					internal_access_token: 'Fgn1xT7pmCK9PSxVt7yr',
				},
			},
			jobOptions: {
				jobId: 'emailCronJobBeforeOneHour',
				repeat: {
					pattern: '15 3 * * *',
				},
				removeOnComplete: 100,
				removeOnFail: 200,
				attempts: 3,
			},
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.createCronSchema)
	})
	it('/create-delay', async () => {
		const response = await request.post('/scheduler/jobs/create').send({
			jobName: 'emailCronJobBeforeOneHour-delay',
			email: ['nevil@tunerlabs.com'],
			request: {
				url: 'http://mentoring:3000/mentoring/v1/notifications/emailCronJobBeforeOneHour',
				method: 'get',
				header: {
					internal_access_token: 'Fgn1xT7pmCK9PSxVt7yr',
				},
			},
			jobOptions: {
				jobId: 'emailCronJobBeforeOneHour-delay',
				delay: 500000,
				removeOnComplete: true,
				removeOnFail: false,
				attempts: 1,
			},
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.createDelaySchema)
	})
	it('/create-interval', async () => {
		const response = await request.post('/scheduler/jobs/create').send({
			jobName: 'emailCronJobBeforeOneHour',
			email: ['nevil@tunerlabs.com'],
			request: {
				url: 'http://mentoring:3000/mentoring/v1/notifications/emailCronJobBeforeOneHour',
				method: 'get',
				header: {
					internal_access_token: 'Fgn1xT7pmCK9PSxVt7yr',
				},
			},
			jobOptions: {
				jobId: 'emailCronJobBeforeOneHour-interval',
				repeat: {
					every: 10000,
					limit: 2,
				},
				removeOnComplete: 2,
				removeOnFail: 200,
				attempts: 1,
			},
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.createIntervalSchema)
	})
	it('/remove', async () => {
		let job = await jobData.insertJob()

		const response = await request.post('/scheduler/jobs/remove').send({
			jobId: job,
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.removeSchema)
	})
	it('/purge-clean', async () => {
		let job = await jobData.insertJob()

		const response = await request.post('/scheduler/jobs/purge').send({
			method: 'clean',
			options: {
				gracePeriod: 60,
				limit: 0,
				jobStatus: 'failed',
			},
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.purgeCleanSchema)
	})
	it('/purge-drain', async () => {
		let job = await jobData.insertJob()

		const response = await request.post('/scheduler/jobs/purge').send({ method: 'drain' })
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.purgeDrainSchema)
	})
	it('/purge-obliterate', async () => {
		let job = await jobData.insertJob()

		const response = await request.post('/scheduler/jobs/purge').send({
			method: 'obliterate',
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.purgeObliterateSchema)
	})
})
