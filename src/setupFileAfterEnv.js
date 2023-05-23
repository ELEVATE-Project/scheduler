const { matchers } = require('jest-json-schema')
expect.extend(matchers)
const Redis = require('ioredis')
let redis
beforeAll(async () => {
	redis = new Redis(6380, 'localhost')

	redis.on('connect', () => {
		console.log('Redis connected successfully')
	})

	redis.on('error', (error) => {
		console.error('Error connecting to Redis:', error)
	})

	await new Promise((resolve) => {
		redis.on('connect', resolve)
	})
})

afterAll(async () => {
	await new Promise((resolve, reject) => {
		redis.flushdb((err, succeeded) => {
			if (err) {
				console.error('Error flushing Redis database:', err)
				reject(err)
			} else {
				console.log('Redis database flushed successfully')
				resolve(succeeded)
			}
		})
	})

	redis.quit()
})
