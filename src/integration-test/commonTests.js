var supertest = require('supertest') //require supertest
var defaults = require('superagent-defaults')
//supertest hits the HTTP server (your app)
let defaultHeaders
let baseURL = 'http://localhost:4000'

const loadDefaults = async () => {
	try {
		let waitOn = require('wait-on')
		let opts = {
			resources: [baseURL],
			delay: 100, // initial delay in ms
			interval: 250, // poll interval in ms
			timeout: 30000,
			validateStatus: function (status) {
				return status >= 200 && status < 500 //Will only success if status code is in between 200 & 500
			},
		}
		await waitOn(opts)
		defaultHeaders = {
			Connection: 'keep-alive',
			'Content-Type': 'application/json',
		}
		global.request = defaults(supertest(baseURL))

		global.request.set(defaultHeaders)
	} catch (error) {
		console.error(error)
	}
}

function logError(res) {
	let successCodes = [200, 201, 202]
	if (!successCodes.includes(res.statusCode)) {
		console.log('Response Body', res.body)
	}
}
module.exports = {
	loadDefaults,
}
