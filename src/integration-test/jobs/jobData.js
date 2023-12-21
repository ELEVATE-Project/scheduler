const { faker } = require('@faker-js/faker')
let bodyData

const insertJob = async () => {
	try {
		let name = faker.random.alpha(5)
		bodyData = {
			jobName: name,
			email: ['nevil@tunerlabs.com'],
			request: {
				url: 'http://mentoring:3000/mentoring/v1/notifications/emailCronJobBeforeOneHour',
				method: 'get',
				header: {
					internal_access_token: 'Fgn1xT7pmCK9PSxVt7yr',
				},
			},
			jobOptions: {
				jobId: name,
				repeat: {
					pattern: '15 3 * * *',
				},
				removeOnComplete: 100,
				removeOnFail: 200,
				attempts: 3,
			},
		}
		await request
			.get('/scheduler/jobs/create') //uses the request function that calls on express app instance
			.send(bodyData)
		return name
	} catch (error) {
		console.error(error)
	}
}

module.exports = {
	insertJob,
}
