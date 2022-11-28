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
	afterAll(async () => {
		try {
			await db.dropDatabase()
		} catch (error) {
			console.log(error)
		}
	})
	it('/list', async () => {
		await jobData.insertJob()
		const response = await request.get('/scheduler/jobs/list')
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.listSchema)
	})
	it('/create', async () => {
		const response = await request.post('/scheduler/jobs/create').send({
			name: faker.random.alpha(5),
			email: ['nevil@tunerlabs.com'],
			request: {
				url: 'http://localhost:3000/mentoring/v1/notifications/emailCronJobBeforeOneHour',
				method: 'get',
				header: { internal_access_token: 'asdgbsd891237bzus81923ziu3y1283ziu318237aSXS' },
			},
			schedule: {
				scheduleType: 'once',
				interval: '1 minute',
			},
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.commonResponseSchema)
	})
	it('/once', async () => {
		let jobName = await jobData.insertJob()
		const response = await request.post('/scheduler/jobs/once').send({
			name: jobName,
			interval: '5 minutes',
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.commonResponseSchema)
	})
	it('/every', async () => {
		let jobName = await jobData.insertJob()
		const response = await request.post('/scheduler/jobs/every').send({
			name: jobName,
			interval: '*/1 * * * *',
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.commonResponseSchema)
	})
	it('/run', async () => {
		let jobName = await jobData.insertJob()
		const response = await request.post('/scheduler/jobs/run').send({
			name: jobName,
			interval: '*/1 * * * *',
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.commonResponseSchema)
	})
	it('/cancel', async () => {
		let jobName = await jobData.insertJob()
		const response = await request.post('/scheduler/jobs/cancel').send({
			name: jobName,
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.commonResponseSchema)
	})
	it('/update', async () => {
		let jobName = await jobData.insertJob()
		const response = await request.post('/scheduler/jobs/update').send({
			name: jobName,
			email: ['support@elevate.com'],
			request: {
				url: 'http://localhost:3000/mentoring/v1/notifications/emailCronJobBeforeOneHour',
				method: 'get',
				header: {
					internal_access_token: 'asdgbsd891237bzus81923ziu3y1283ziu318237aSXS',
				},
			},
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.commonResponseSchema)
	})
	it('/delete', async () => {
		let jobName = await jobData.insertJob()
		const response = await request.post('/scheduler/jobs/delete').send({
			jobname: jobName,
		})
		expect(response.statusCode).toBe(200)
		expect(response.body).toMatchSchema(schema.commonResponseSchema)
	})
})
