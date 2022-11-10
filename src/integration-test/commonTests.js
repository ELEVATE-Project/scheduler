var supertest = require('supertest') //require supertest
var defaults = require('superagent-defaults')
let baseURL = 'http://localhost:4000'
//supertest hits the HTTP server (your app)
let defaultHeaders

const loadDefaults = async () => {
	try {
		let waitOn = require('wait-on')
		let opts = {
			resources: ['http://localhost:4000'],
			delay: 1000, // initial delay in ms, default 0
			interval: 500, // poll interval in ms, default 250ms
			timeout: 300,
		}
		await waitOn(opts)
		console.log(res)
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
