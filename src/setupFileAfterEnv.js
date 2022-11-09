const mongoose = require('mongoose')
const { matchers } = require('jest-json-schema')
expect.extend(matchers)

//Connect to database

const db = mongoose.createConnection('mongodb://localhost:27017/tl-cron-rest', {
	useNewUrlParser: true,
})

db.on('error', function () {
	console.log('Database connection error:')
})

db.once('open', function () {
	//console.log('Connected to DB')
})

global.db = db

beforeAll(async () => {})

afterAll(async () => {
	try {
		await db.dropDatabase()
		await db.close()
		mongoose.disconnect()
	} catch (error) {
		console.log(error)
	}
	//mongoose.disconnect()
})
