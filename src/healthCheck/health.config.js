/**
 * name : health.config.js.
 * author : Mallanagouda R Biradar
 * created-date : 15-Jul-2025
 * Description : Health check config file
 */

const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
module.exports = {
	name: process.env.SERVICE_NAME,
	version: '1.0.0',
	checks: {
		redis: {
			enabled: true,
			url: redisUrl,
		},
		microservices: [],
	},
}
