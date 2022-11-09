const { faker } = require('@faker-js/faker')
let bodyData

const insertJob = async () => {
	try {
		let name = faker.random.alpha(5)
		bodyData = {
			name: name,
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
