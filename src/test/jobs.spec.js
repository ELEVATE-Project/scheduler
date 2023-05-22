const jobs = require('@services/jobs')
const common = require('@constants/common')
const responseMessage = require('@constants/responseMessage')
const httpResponse = require('@constants/httpResponse')

jest.mock('bullmq')

describe('Jobs Helpers', () => {
	let redisConfiguration
	beforeAll(async () => {
		redisConfiguration = require('@configs/redis')
		return
	})
	describe('create', () => {
		it('should create a new job', async () => {
			const requestBody = {
				jobName: 'emailCronJobBeforeOneHour',
				jobOptions: {
					jobId: 'emailCronJobBeforeOneHour',
					delay: 5000,
					removeOnComplete: true,
					removeOnFail: false,
					attempts: 1,
				},
				// Rest of the request body properties...
			}

			const expectedResponse = {
				statusCode: 200,
				message: responseMessage.JOB_QUEUED,
				result: {
					/* New job details */
				},
			}

			const response = await jobs.create(requestBody)

			expect(response).toEqual(expectedResponse)
		})

		it('should return failure response if job already exists', async () => {
			const requestBody = {
				jobName: 'emailCronJobBeforeOneHour',
				jobOptions: {
					jobId: 'emailCronJobBeforeOneHour',
					delay: 5000,
					removeOnComplete: true,
					removeOnFail: false,
					attempts: 1,
				},
				// Rest of the request body properties...
			}

			const expectedResponse = common.failureResponse({
				message: responseMessage.JOB_EXISTS,
				success: false,
				status: httpResponse.CONFLICT,
			})

			const response = await jobs.create(requestBody)

			expect(response).toEqual(expectedResponse)
		})

		// Add more test cases for different scenarios...
	})

	describe('remove', () => {
		it('should remove an existing job', async () => {
			const requestBody = {
				jobId: 'emailCronJobBeforeOneHour',
			}

			const expectedResponse = {
				statusCode: 200,
				message: responseMessage.JOB_REMOVED,
				result: true,
			}

			const response = await jobs.remove(requestBody)

			expect(response).toEqual(expectedResponse)
		})

		it('should return failure response if job does not exist', async () => {
			const requestBody = {
				jobId: 'nonExistentJob',
			}

			const expectedResponse = common.failureResponse({
				message: responseMessage.JOB_NOT_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			})

			const response = await jobs.remove(requestBody)

			expect(response).toEqual(expectedResponse)
		})

		// Add more test cases for different scenarios...
	})

	describe('list', () => {
		it('should fetch the list of jobs', async () => {
			const expectedResponse = {
				statusCode: 200,
				message: responseMessage.JOB_LIST_FETCHED,
				result: [
					/* Array of job objects */
				],
			}

			const response = await jobs.list()

			expect(response).toEqual(expectedResponse)
		})

		it('should return failure response if no jobs found', async () => {
			const expectedResponse = common.failureResponse({
				message: responseMessage.NO_JOBS_FOUND,
				success: false,
				status: httpResponse.BAD_REQUEST,
			})

			const response = await jobs.list()

			expect(response).toEqual(expectedResponse)
		})

		// Add more test cases for different scenarios...
	})
})
